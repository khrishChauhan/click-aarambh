import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, COOKIE_NAME } from "@/lib/auth";
import { getAllBlogs, upsertBlog, StoredBlogPost } from "@/lib/blogs-store";
import { revalidatePath } from "next/cache";

async function isAuthed(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value ?? "";
  return verifySessionToken(token);
}

/** GET /api/blogs — public, returns all published posts */
export async function GET() {
  try {
    const { getPublishedBlogs } = await import("@/lib/blogs-store");
    const posts = await getPublishedBlogs();
    return NextResponse.json(posts);
  } catch (err) {
    console.error("[GET /api/blogs]", err);
    return NextResponse.json({ error: "Failed to load posts" }, { status: 500 });
  }
}

/** POST /api/blogs — protected, create or update a post */
export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as StoredBlogPost;
    if (!body.slug || !body.title) {
      return NextResponse.json({ error: "slug and title are required" }, { status: 400 });
    }

    const saved = await upsertBlog(body);
    revalidatePath("/blog");
    revalidatePath(`/blog/${saved.slug}`);
    return NextResponse.json(saved, { status: 201 });
  } catch (err) {
    console.error("[POST /api/blogs]", err);
    return NextResponse.json({ error: "Failed to save post" }, { status: 500 });
  }
}

// Suppress unused import warning — getAllBlogs used implicitly by upsertBlog
void getAllBlogs;
