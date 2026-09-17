import { NextResponse } from 'next/server';

const serverCache = new Map<string, { payload: any; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  const cached = serverCache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json(cached.payload, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  }

  // Extract shortcode from URL
  const shortcodeMatch = url.match(/\/reel\/([A-Za-z0-9_-]+)/);
  const shortcode = shortcodeMatch ? shortcodeMatch[1] : null;

  try {
    console.log(`[IG Fetch] Fetching metadata for: ${url}`);

    let imageUrl: string | null = null;
    let title = 'Instagram Reel';
    let description = '';
    let likes: string | null = null;

    // --- Strategy 1: Attempt Microlink API ---
    try {
      const cleanUrl = url.split('?')[0];
      const microLinkUrl = `https://api.microlink.io?url=${encodeURIComponent(cleanUrl)}`;
      const response = await fetch(microLinkUrl, {
        next: { revalidate: 3600 },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'success' && data.data) {
          const candidateImage = data.data.image?.url;
          // Validate candidate is not generic data:image base64 logo
          if (candidateImage && !candidateImage.startsWith('data:image')) {
            imageUrl = candidateImage;
            const rawDescription = data.data.description || '';
            const likesMatch = rawDescription.match(/([\d,]+)\s+likes/i);
            likes = likesMatch ? likesMatch[1] : null;

            const captionMatch = rawDescription.match(/: [”"]?(.*)/);
            description = captionMatch ? captionMatch[1].replace(/[”"]+$/, '') : rawDescription;
            title = description ? description.split(' ').slice(0, 5).join(' ') + '...' : 'Instagram Reel';
          }
        }
      }
    } catch (err) {
      console.warn('[IG Fetch] Microlink attempt warning:', err);
    }

    // --- Strategy 2: Direct Instagram Embed Scraper Fallback ---
    if (!imageUrl && shortcode) {
      console.log(`[IG Fetch] Falling back to direct embed scraper for shortcode: ${shortcode}`);
      const embedUrl = `https://www.instagram.com/reel/${shortcode}/embed/captioned/`;
      const embedRes = await fetch(embedUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        next: { revalidate: 3600 },
      });

      if (embedRes.ok) {
        const html = await embedRes.text();

        // Extract caption
        const captionMatch = html.match(/class="Caption"[^>]*>([\s\S]*?)<\/div>/);
        if (captionMatch) {
          const cleanCaption = captionMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
          description = cleanCaption;
          title = cleanCaption.split(' ').slice(0, 5).join(' ') + '...';
        }

        // Extract high-resolution media images
        const imgMatches = [...html.matchAll(/<img[^>]+src="([^">]+)"[^>]*>/g)];
        const mediaImages = imgMatches
          .map((m) => m[1].replace(/&amp;/g, '&'))
          .filter(
            (src) =>
              !src.includes('profile_pic') &&
              !src.includes('s100x100') &&
              !src.startsWith('data:image') &&
              (src.includes('t51.') || src.includes('fbcdn.net') || src.includes('cdninstagram.com'))
          );

        if (mediaImages.length > 0) {
          imageUrl = mediaImages[0];
          console.log(`[IG Fetch] Successfully scraped embed image for ${shortcode}`);
        }
      }
    }

    if (imageUrl) {
      const payload = { imageUrl, title, description, likes };
      serverCache.set(url, { payload, timestamp: Date.now() });

      return NextResponse.json(payload, {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      });
    }

    // Fallback response if both strategies yield no media
    return NextResponse.json(
      {
        imageUrl: null,
        title: 'Instagram Reel',
        description: 'Watch this reel on Instagram.',
        likes: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[IG Fetch] Error fetching IG thumbnail:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
