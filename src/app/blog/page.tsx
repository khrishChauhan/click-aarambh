import type { Metadata } from "next";
import BlogHero from "@/components/Blog/BlogHero";
import BlogList from "@/components/Blog/BlogList";
import BlogNewsletter from "@/components/Blog/BlogNewsletter";
import { getPublishedBlogs, StoredBlogPost } from "@/lib/blogs-store";
import { FEATURED_POST, BLOG_POSTS } from "@/data/blogs";

export const metadata: Metadata = {
  title: "Blog & Intelligence | Click Aarambh Ventures",
  description:
    "Explore perspectives on software engineering, data systems, automation, and sustainable venture growth from the engineers and operators at Click Aarambh Ventures.",
  openGraph: {
    title: "Blog & Intelligence | Click Aarambh Ventures",
    description:
      "Insights on modern software engineering, data systems, and sustainable venture growth engines.",
    type: "website",
  },
};

export default async function BlogPage() {
  let allPosts: StoredBlogPost[] = [];

  try {
    allPosts = await getPublishedBlogs();
  } catch {
    // Fallback to static data if store isn't ready yet
    allPosts = [
      { ...FEATURED_POST, status: "Published" },
      ...BLOG_POSTS.map((p) => ({ ...p, status: "Published" as const })),
    ];
  }

  // Split into featured (first) and the rest
  const featuredPost = allPosts.find((p) => p.featured) ?? allPosts[0] ?? null;
  const regularPosts = allPosts.filter((p) => p.slug !== featuredPost?.slug);

  return (
    <main className="min-h-screen bg-[#F8FAF8]" aria-label="Blog & Intelligence Page">
      {/* 1 — Header / Hero with architectural grid */}
      <BlogHero />

      {/* 2 — Interactive Filter Tabs, Featured Flagship Card, and 3-Column Grid */}
      <BlogList featuredPost={featuredPost} initialPosts={regularPosts} />

      {/* 3 — Weekly Digest Newsletter Subscription */}
      <BlogNewsletter />
    </main>
  );
}
