import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    console.log(`[IG Fetch] Fetching metadata for: ${url}`);
    
    // Using microlink.io as a robust fallback for scraping Instagram metadata
    const microLinkUrl = `https://api.microlink.io?url=${encodeURIComponent(url)}`;
    
    const response = await fetch(microLinkUrl, {
      next: { revalidate: 3600 } // cache for 1 hour
    });

    if (!response.ok) {
      console.error(`[IG Fetch] Microlink API returned status ${response.status}`);
      return NextResponse.json({ error: 'Failed to fetch Instagram page metadata' }, { status: response.status });
    }

    const data = await response.json();
    
    if (data.status === 'success' && data.data) {
      const imageUrl = data.data.image?.url;
      const rawDescription = data.data.description || '';
      
      // Extract likes
      const likesMatch = rawDescription.match(/([\d,]+)\s+likes/i);
      const likes = likesMatch ? likesMatch[1] : null;

      // Extract caption
      const captionMatch = rawDescription.match(/: [”"]?(.*)/);
      let description = captionMatch ? captionMatch[1] : rawDescription;
      // Strip trailing quote if exists
      description = description.replace(/[”"]+$/, '');

      // Extract a mock title from the first few words of the description, or default
      const title = description ? description.split(' ').slice(0, 5).join(' ') + '...' : 'Instagram Reel';
      
      console.log(`[IG Fetch] Successfully fetched data for: ${url}`);
      
      return NextResponse.json(
        { imageUrl, title, description, likes },
        {
          status: 200,
          headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        }
      );
    } else {
      console.error(`[IG Fetch] Microlink API did not return expected data format`);
      return NextResponse.json({ error: 'Image not found in metadata' }, { status: 404 });
    }
  } catch (error) {
    console.error('[IG Fetch] Error fetching IG thumbnail:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
