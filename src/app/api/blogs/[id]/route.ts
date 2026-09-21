import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, COOKIE_NAME } from "@/lib/auth";
import { deleteBlog } from "@/lib/blogs-store";
import { revalidatePath } from "next/cache";

async function isAuthed(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value ?? "";
  return verifySessionToken(token);
}

/** DELETE /api/blogs/[id] — protected, deletes a post by slug */
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: slug } = await params;
  try {
    const deleted = await deleteBlog(slug);
    if (!deleted) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(`[DELETE /api/blogs/${slug}]`, err);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
