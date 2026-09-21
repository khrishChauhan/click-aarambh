"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BLOG_POSTS, FEATURED_POST } from "@/data/blogs";

export default function WorkBlogSection() {
  // Curate 3 flagship preview articles for the work section
  const previewPosts = [FEATURED_POST, BLOG_POSTS[0], BLOG_POSTS[1]];

  return (
    <div className="container relative z-10 w-full max-w-[1400px] mx-auto px-6 mt-16 md:mt-32">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#70BA28]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#2E4D45]">
                Engineering &amp; Growth Telemetry
              </span>
            </div>
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight text-[#0D2E26] tracking-tight">
              Perspectives
            </h2>
          </motion.div>
        </div>

        {/* View More Link (Desktop) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="hidden md:block"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2.5 rounded-full border border-[#0D2E26]/15 bg-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#0D2E26] hover:border-[#70BA28] hover:bg-[#70BA28]/10 hover:text-[#0D2E26] transition-all duration-300 shadow-sm"
          >
            <span>View More</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1 text-[#0D2E26]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* 3-Column Text-Driven Article Preview Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {previewPosts.map((post) => (
          <Link
            key={post.slug}
            href="/blog"
            className="group relative flex flex-col justify-between rounded-2xl border border-[#0D2E26]/10 bg-white p-7 md:p-8 transition-all duration-300 hover:bg-[#F8FAF8] hover:border-[#0D2E26]/20 shadow-[0_4px_20px_-2px_rgba(13,46,38,0.05),0_2px_6px_-1px_rgba(13,46,38,0.03)] hover:shadow-[0_12px_28px_-4px_rgba(13,46,38,0.08)] hover:-translate-y-1 outline-none"
          >
            <div>
              {/* Category Badge + Read Time */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="rounded-full bg-[#70BA28]/10 border border-[#70BA28]/25 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#0D2E26]">
                  {post.category}
                </span>
                <span className="font-mono text-[11px] text-[#4B635D]">
                  {post.readTime}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold tracking-tight text-[#0D2E26] leading-snug mb-3 group-hover:text-[#62A422] transition-colors line-clamp-2">
                {post.title}
              </h3>

              {/* Teaser Excerpt */}
              <p className="text-sm text-[#2E4D45] leading-relaxed line-clamp-2 font-normal mb-8">
                {post.excerpt}
              </p>
            </div>

            {/* Footer Metadata: Author Name, Publication Date, and Hover Arrow Indicator */}
            <div className="pt-4 border-t border-[#0D2E26]/10 flex items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#4B635D]">
                <span className="font-semibold text-[#0D2E26]">{post.author.name}</span>
                <span className="text-[#0D2E26]/30">·</span>
                <span>{post.date}</span>
              </div>

              {/* Arrow Indicator */}
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0D2E26]/5 text-[#0D2E26] group-hover:bg-[#70BA28] group-hover:text-[#0D2E26] transition-all duration-300 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 transform transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </motion.div>

      {/* View More Button (Mobile) */}
      <div className="mt-8 flex justify-center md:hidden">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2.5 rounded-full border border-[#0D2E26]/15 bg-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#0D2E26] hover:border-[#70BA28] hover:bg-[#70BA28]/10 transition-all duration-300 shadow-sm"
        >
          <span>View More</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1 text-[#0D2E26]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
