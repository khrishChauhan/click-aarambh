import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, COOKIE_NAME } from "@/lib/auth";
import { getAllBlogs, getPublishedBlogs, upsertBlog, StoredBlogPost } from "@/lib/blogs-store";
import { revalidatePath } from "next/cache";

async function isAuthed(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value ?? "";
  return verifySessionToken(token);
}

/** GET /api/blogs — returns all posts if authenticated, or published posts if public */
export async function GET() {
  try {
    const authed = await isAuthed();
    const posts = authed ? await getAllBlogs() : await getPublishedBlogs();
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
    try {
      revalidatePath("/blog");
      revalidatePath(`/blog/${saved.slug}`);
    } catch (e) {
      console.warn("revalidatePath error:", e);
    }
    return NextResponse.json(saved, { status: 201 });
  } catch (err) {
    console.error("[POST /api/blogs]", err);
    return NextResponse.json({ error: "Failed to save post" }, { status: 500 });
  }
}
