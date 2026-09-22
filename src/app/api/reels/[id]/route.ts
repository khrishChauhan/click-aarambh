import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, COOKIE_NAME } from "@/lib/auth";
import { deleteReel } from "@/lib/reels-store";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function isAuthed(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value ?? "";
  return verifySessionToken(token);
}

/** DELETE /api/reels/[id] — protected, removes a reel by ID from the carousel */
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const deleted = await deleteReel(id);
    if (!deleted) {
      return NextResponse.json({ error: "Reel not found" }, { status: 404 });
    }

    try {
      revalidatePath("/");
    } catch (e) {
      console.warn("revalidatePath error:", e);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(`[DELETE /api/reels/${id}]`, err);
    return NextResponse.json({ error: "Failed to delete reel" }, { status: 500 });
  }
}
