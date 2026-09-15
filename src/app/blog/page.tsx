import type { Metadata } from "next";
import BlogHero from "@/components/Blog/BlogHero";
import BlogList from "@/components/Blog/BlogList";
import BlogNewsletter from "@/components/Blog/BlogNewsletter";

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

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#F8FAF8]" aria-label="Blog & Intelligence Page">
      {/* 1 — Header / Hero with architectural grid */}
      <BlogHero />

      {/* 2 — Interactive Filter Tabs, Featured Flagship Card, and 3-Column Grid */}
      <BlogList />

      {/* 3 — Weekly Digest Newsletter Subscription */}
      <BlogNewsletter />
    </main>
  );
}
