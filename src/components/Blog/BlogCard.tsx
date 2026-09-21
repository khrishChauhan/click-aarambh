"use client";

import Link from "next/link";
import { BlogPost } from "@/data/blogs";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group outline-none focus-visible:ring-2 focus-visible:ring-[#70BA28] rounded-2xl">
      <article className="flex flex-col justify-between rounded-2xl border border-[#0D2E26]/10 bg-white p-7 md:p-8 transition-all duration-300 hover:bg-[#F8FAF8] hover:border-[#0D2E26]/20 shadow-[0_2px_12px_-2px_rgba(13,46,38,0.04)] hover:shadow-[0_12px_28px_-4px_rgba(13,46,38,0.08)] hover:-translate-y-1 h-full">
        <div>
          {/* Top Header: Category Badge + Read Time */}
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

          {/* 2-line Teaser Excerpt in readable muted green */}
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

          {/* Micro-interaction Arrow Indicator */}
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0D2E26]/5 text-[#0D2E26] group-hover:bg-[#70BA28] group-hover:text-[#0D2E26] transition-all duration-300">
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
      </article>
    </Link>
  );
}
