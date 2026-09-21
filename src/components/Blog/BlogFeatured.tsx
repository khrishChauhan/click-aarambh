"use client";

import Link from "next/link";
import { BlogPost } from "@/data/blogs";

interface BlogFeaturedProps {
  post: BlogPost;
}

export default function BlogFeatured({ post }: BlogFeaturedProps) {
  return (
    <div className="mb-16 md:mb-20">
      {/* Section Subtitle Tag */}
      <div className="flex items-center gap-2 mb-4">
        <span className="h-1.5 w-1.5 rounded-full bg-[#70BA28]" />
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#2E4D45]">
          Flagship Editorial Essay
        </span>
      </div>

      <article className="group relative overflow-hidden rounded-3xl border border-[#0D2E26]/12 bg-white p-8 md:p-12 lg:p-16 shadow-[0_4px_24px_-4px_rgba(13,46,38,0.06),0_2px_8px_-2px_rgba(13,46,38,0.03)] hover:shadow-[0_20px_40px_-8px_rgba(13,46,38,0.1)] transition-all duration-500">
        {/* Subtle architectural background coordinate lines */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(13,46,38,1) 1px, transparent 1px), linear-gradient(90deg, rgba(13,46,38,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Ambient emerald radial wash in corner */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#70BA28] opacity-[0.06] blur-[80px]"
        />

        <div className="relative z-10 max-w-4xl">
          {/* Metadata Row: Category Tag + Date + Read Time */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="rounded-full bg-[#70BA28]/15 border border-[#70BA28]/35 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0D2E26]">
              {post.category}
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#2E4D45]">
              {post.date}
            </span>
            <span className="text-xs font-mono text-[#2E4D45]/60">•</span>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#2E4D45]">
              {post.readTime}
            </span>
          </div>

          {/* Large-Format Typographic Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-[-0.03em] text-[#0D2E26] leading-[1.15] mb-6 group-hover:text-[#62A422] transition-colors duration-300">
            {post.title}
          </h2>

          {/* Compelling 3-sentence summary in readable muted green */}
          <p className="text-base sm:text-lg lg:text-xl text-[#2E4D45] leading-relaxed mb-10 max-w-3xl font-normal">
            {post.excerpt}
          </p>

          {/* Author Signature & Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-8 border-t border-[#0D2E26]/10">
            {/* Author Byline */}
            <div className="flex flex-col">
              <div className="text-sm font-bold text-[#0D2E26]">
                {post.author.name}
              </div>
              <div className="font-mono text-xs text-[#4B635D] tracking-wide">
                {post.author.role}
              </div>
            </div>

            {/* Bold Call to Action with hover arrow slide */}
            <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#0D2E26] group-hover:text-[#70BA28] transition-colors duration-300">
              <span>Read Full Article</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-2"
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
        </div>
      </article>
    </div>
  );
}
