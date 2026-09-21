import path from "path";
import fs from "fs/promises";
import os from "os";
import { FEATURED_POST, BLOG_POSTS, BlogPost } from "@/data/blogs";

export interface StoredBlogPost extends BlogPost {
  status: "Published" | "Draft";
  content?: string;
}

// In production (Vercel serverless), project root is read-only.
// We use the OS temp directory for runtime writes.
const IS_PROD = process.env.NODE_ENV === "production";
const WRITE_FILE = IS_PROD
  ? path.join(os.tmpdir(), "click_aarambh_blogs.json")
  : path.join(process.cwd(), "src", "data", "blogs.json");

// Committed seed file — always readable in both dev and production
const SEED_FILE = path.join(process.cwd(), "src", "data", "blogs.json");

/** Build the default seed array from static mock data */
function buildSeed(): StoredBlogPost[] {
  return [
    { ...FEATURED_POST, status: "Published" },
    ...BLOG_POSTS.map((p) => ({ ...p, status: "Published" as const })),
  ];
}

/** Read the entire store */
async function readStore(): Promise<StoredBlogPost[]> {
  // 1. In production, check writable temp store first (preserves runtime updates)
  if (IS_PROD) {
    try {
      const raw = await fs.readFile(WRITE_FILE, "utf-8");
      const parsed = JSON.parse(raw) as StoredBlogPost[];
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // Temp file does not exist yet; fall through to seed file
    }
  }

  // 2. Read from committed seed file
  try {
    const raw = await fs.readFile(SEED_FILE, "utf-8");
    const parsed = JSON.parse(raw) as StoredBlogPost[];
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // Fall back to in-memory seed
  }

  return buildSeed();
}

/** Write the store safely */
async function writeStore(posts: StoredBlogPost[]): Promise<void> {
  const json = JSON.stringify(posts, null, 2);
  try {
    await fs.mkdir(path.dirname(WRITE_FILE), { recursive: true });
  } catch {
    // Directory exists or cannot be created
  }

  if (IS_PROD) {
    await fs.writeFile(WRITE_FILE, json, "utf-8");
  } else {
    const tmp = WRITE_FILE + ".tmp";
    await fs.writeFile(tmp, json, "utf-8");
    await fs.rename(tmp, WRITE_FILE);
  }
}

/** Return all published posts, newest first */
export async function getPublishedBlogs(): Promise<StoredBlogPost[]> {
  const all = await readStore();
  return all.filter((p) => p.status === "Published");
}

/** Return ALL posts (for the admin dashboard) */
export async function getAllBlogs(): Promise<StoredBlogPost[]> {
  return readStore();
}

/** Return a single post by slug */
export async function getBlogBySlug(slug: string): Promise<StoredBlogPost | null> {
  const all = await readStore();
  return all.find((p) => p.slug === slug) ?? null;
}

/** Create or update a post */
export async function upsertBlog(post: StoredBlogPost): Promise<StoredBlogPost> {
  const all = await readStore();
  const idx = all.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    all[idx] = post;
  } else {
    all.unshift(post); // newest first
  }
  await writeStore(all);
  return post;
}

/** Delete a post by slug. Returns true if deleted, false if not found. */
export async function deleteBlog(slug: string): Promise<boolean> {
  const all = await readStore();
  const next = all.filter((p) => p.slug !== slug);
  if (next.length === all.length) return false;
  await writeStore(next);
  return true;
}
