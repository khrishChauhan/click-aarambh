import path from "path";
import fs from "fs/promises";
import { FEATURED_POST, BLOG_POSTS, BlogPost } from "@/data/blogs";

export interface StoredBlogPost extends BlogPost {
  status: "Published" | "Draft";
  content?: string;
}

// Absolute path to the JSON file on disk
const DATA_FILE = path.join(process.cwd(), "src", "data", "blogs.json");

/** Read the entire store (creates and seeds the file if it doesn't exist) */
async function readStore(): Promise<StoredBlogPost[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as StoredBlogPost[];
  } catch {
    // First run: seed from static mock data
    const seed: StoredBlogPost[] = [
      { ...FEATURED_POST, status: "Published" },
      ...BLOG_POSTS.map((p) => ({ ...p, status: "Published" as const })),
    ];
    await writeStore(seed);
    return seed;
  }
}

/** Atomically write the store (write to temp file then rename) */
async function writeStore(posts: StoredBlogPost[]): Promise<void> {
  const tmp = DATA_FILE + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(posts, null, 2), "utf-8");
  await fs.rename(tmp, DATA_FILE);
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
