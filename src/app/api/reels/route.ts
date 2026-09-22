import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, COOKIE_NAME } from "@/lib/auth";
import { getAllReels, addReel, StoredReel } from "@/lib/reels-store";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function isAuthed(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value ?? "";
  return verifySessionToken(token);
}

/** Extract metadata (thumbnail, title, likes) from an Instagram URL */
async function extractInstagramMeta(url: string): Promise<{
  thumbnail: string | null;
  title: string;
  description: string;
  likes: string | null;
}> {
  let thumbnail: string | null = null;
  let title = "Instagram Reel";
  let description = "Watch this reel on Instagram.";
  let likes: string | null = null;

  const shortcodeMatch = url.match(/\/reel\/([A-Za-z0-9_-]+)/);
  const shortcode = shortcodeMatch ? shortcodeMatch[1] : null;

  // 1. Attempt Microlink
  try {
    const cleanUrl = url.split("?")[0];
    const microLinkUrl = `https://api.microlink.io?url=${encodeURIComponent(cleanUrl)}`;
    const response = await fetch(microLinkUrl, { next: { revalidate: 3600 } });
    if (response.ok) {
      const data = await response.json();
      if (data.status === "success" && data.data) {
        const candidate = data.data.image?.url;
        if (candidate && !candidate.startsWith("data:image")) {
          thumbnail = candidate;
          const rawDescription = data.data.description || "";
          const likesMatch = rawDescription.match(/([\d,]+)\s+likes/i);
          likes = likesMatch ? likesMatch[1] : null;
          const captionMatch = rawDescription.match(/: [”"]?(.*)/);
          description = captionMatch ? captionMatch[1].replace(/[”"]+$/, "") : rawDescription;
          if (description) {
            title = description.split(" ").slice(0, 5).join(" ") + "...";
          }
        }
      }
    }
  } catch (err) {
    console.warn("[Reels Meta] Microlink warning:", err);
  }

  // 2. Direct embed scraper fallback
  if (!thumbnail && shortcode) {
    try {
      const embedUrl = `https://www.instagram.com/reel/${shortcode}/embed/captioned/`;
      const embedRes = await fetch(embedUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
      });

      if (embedRes.ok) {
        const html = await embedRes.text();
        const captionMatch = html.match(/class="Caption"[^>]*>([\s\S]*?)<\/div>/);
        if (captionMatch) {
          const cleanCaption = captionMatch[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
          if (cleanCaption) {
            description = cleanCaption;
            title = cleanCaption.split(" ").slice(0, 5).join(" ") + "...";
          }
        }

        const imgMatches = [...html.matchAll(/<img[^>]+src="([^">]+)"[^>]*>/g)];
        const mediaImages = imgMatches
          .map((m) => m[1].replace(/&amp;/g, "&"))
          .filter(
            (src) =>
              !src.includes("profile_pic") &&
              !src.includes("s100x100") &&
              !src.startsWith("data:image") &&
              (src.includes("t51.") || src.includes("fbcdn.net") || src.includes("cdninstagram.com"))
          );

        if (mediaImages.length > 0) {
          thumbnail = mediaImages[0];
        }
      }
    } catch (err) {
      console.warn("[Reels Meta] Scraper fallback warning:", err);
    }
  }

  // Fallback stock image if Instagram blocks media
  if (!thumbnail) {
    thumbnail = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop";
  }

  return { thumbnail, title, description, likes };
}

/** GET /api/reels — public, returns all active reels */
export async function GET() {
  try {
    const reels = await getAllReels();
    return NextResponse.json(reels, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch (err) {
    console.error("[GET /api/reels]", err);
    return NextResponse.json({ error: "Failed to load reels" }, { status: 500 });
  }
}

/** POST /api/reels — protected, adds a new reel URL to the carousel */
export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json().catch(() => ({}))) as { url?: string; title?: string };
    const rawUrl = body.url?.trim() || "";

    if (!rawUrl) {
      return NextResponse.json({ error: "Reel URL is required" }, { status: 400 });
    }

    // Validate Instagram URL
    const isInstagram = /instagram\.com\/(?:reel|p)\/([A-Za-z0-9_-]+)/i.test(rawUrl);
    if (!isInstagram) {
      return NextResponse.json(
        { error: "Invalid Instagram Reel URL. Must be in the format: https://www.instagram.com/reel/CODE/" },
        { status: 400 }
      );
    }

    const shortcodeMatch = rawUrl.match(/\/(?:reel|p)\/([A-Za-z0-9_-]+)/);
    const shortcode = shortcodeMatch ? shortcodeMatch[1] : `reel-${Date.now()}`;
    const id = `reel-${shortcode}`;

    // Extract thumbnail and metadata
    const meta = await extractInstagramMeta(rawUrl);

    const newReel: StoredReel = {
      id,
      url: rawUrl,
      title: body.title?.trim() || meta.title,
      thumbnail: meta.thumbnail,
      description: meta.description,
      likes: meta.likes,
      dateAdded: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };

    const saved = await addReel(newReel);

    try {
      revalidatePath("/");
    } catch (e) {
      console.warn("revalidatePath error:", e);
    }

    return NextResponse.json(saved, { status: 201 });
  } catch (err) {
    console.error("[POST /api/reels]", err);
    return NextResponse.json({ error: "Failed to add reel" }, { status: 500 });
  }
}
