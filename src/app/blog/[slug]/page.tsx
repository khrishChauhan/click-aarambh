import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug, getPublishedBlogs } from "@/lib/blogs-store";
import { FEATURED_POST, BLOG_POSTS } from "@/data/blogs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const posts = await getPublishedBlogs();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [...BLOG_POSTS, FEATURED_POST].map((p) => ({ slug: p.slug }));
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getBlogBySlug(slug);
    if (!post) return { title: "Article Not Found" };
    return {
      title: `${post.title} | Click Aarambh Ventures`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [{ url: post.image }],
        type: "article",
      },
    };
  } catch {
    return { title: "Article | Click Aarambh Ventures" };
  }
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;

  let post;
  try {
    post = await getBlogBySlug(slug);
  } catch {
    // Fallback to static data
    post = [...BLOG_POSTS, FEATURED_POST].find((p) => p.slug === slug) ?? null;
  }

  if (!post) notFound();

  // Parse simple markdown headings and paragraphs for content display
  const contentBody = (post as { content?: string }).content ?? null;

  return (
    <main className="min-h-screen bg-[#F8FAF8]">
      {/* ── Hero Section ── */}
      <section className="bg-white border-b border-[#0D2E26]/10">
        <div className="mx-auto max-w-4xl px-6 md:px-12 py-16 md:py-24">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 font-mono text-xs text-[#4B635D]">
            <Link href="/" className="hover:text-[#0D2E26] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#0D2E26] transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-[#0D2E26] font-semibold truncate max-w-[200px]">{post.title}</span>
          </nav>

          {/* Category + Read Time */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="rounded-full bg-[#70BA28]/15 border border-[#70BA28]/35 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0D2E26]">
              {post.category}
            </span>
            <span className="font-mono text-xs text-[#2E4D45] font-semibold uppercase tracking-wider">
              {post.date}
            </span>
            <span className="font-mono text-xs text-[#2E4D45]/60">•</span>
            <span className="font-mono text-xs text-[#2E4D45] font-semibold uppercase tracking-wider">
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-[#0D2E26] leading-[1.1] mb-6">
            {post.title}
          </h1>

          {/* Excerpt / Lede */}
          <p className="text-lg sm:text-xl text-[#2E4D45] leading-relaxed font-normal mb-10 max-w-3xl">
            {post.excerpt}
          </p>

          {/* Author byline */}
          <div className="flex items-center gap-3 pt-8 border-t border-[#0D2E26]/10">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0D2E26] font-mono text-sm font-bold text-white shrink-0">
              {post.author.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-sm font-bold text-[#0D2E26]">{post.author.name}</div>
              <div className="font-mono text-xs text-[#4B635D]">{post.author.role}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cover Image ── */}
      {post.image && (
        <div className="w-full h-[300px] md:h-[420px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* ── Article Body ── */}
      <section className="mx-auto max-w-3xl px-6 md:px-12 py-16 md:py-24">
        {contentBody ? (
          <div className="prose prose-lg max-w-none text-[#0D2E26] prose-headings:text-[#0D2E26] prose-headings:font-extrabold prose-p:text-[#2E4D45] prose-p:leading-relaxed prose-a:text-[#70BA28] prose-strong:text-[#0D2E26]">
            <div className="whitespace-pre-wrap font-sans text-base leading-relaxed text-[#0D2E26]/90 space-y-4">
              {contentBody}
            </div>
          </div>
        ) : (
          /* Placeholder content for seed posts that have no full article body */
          <div className="space-y-6 text-[#2E4D45]">
            <p className="text-lg leading-relaxed">
              {post.excerpt}
            </p>
            <div className="rounded-2xl border border-dashed border-[#0D2E26]/20 bg-white p-8 text-center">
              <p className="font-mono text-sm text-[#4B635D] mb-2">Full article body coming soon.</p>
              <p className="font-mono text-xs text-[#4B635D]/70">
                Use the Admin Portal to compose and publish the complete article content.
              </p>
            </div>
          </div>
        )}

        {/* Back to Blog */}
        <div className="mt-16 pt-8 border-t border-[#0D2E26]/10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#0D2E26] hover:text-[#70BA28] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to all articles
          </Link>
        </div>
      </section>
    </main>
  );
}
