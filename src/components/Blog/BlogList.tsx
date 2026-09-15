"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BLOG_POSTS,
  FEATURED_POST,
  BLOG_CATEGORIES,
  BlogCategory,
  BlogPost,
} from "@/data/blogs";

export default function BlogList() {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const showFeatured =
    searchQuery === "" &&
    (selectedCategory === "All" || FEATURED_POST.category === selectedCategory);

  return (
    <section className="relative bg-[#F8FAF8] py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
        {/* ── Category Filter Bar & Search ── */}
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {BLOG_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative rounded-full px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#70BA28] ${
                    isActive
                      ? "bg-[#70BA28] text-[#0D2E26] font-bold shadow-sm"
                      : "bg-white text-[#2E4D45] hover:text-[#0D2E26] border border-[#0D2E26]/10 hover:border-[#70BA28]/40 hover:bg-[#70BA28]/5"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <input
              type="text"
              placeholder="Search perspectives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-[#0D2E26]/15 bg-white px-4 py-2.5 pl-10 text-xs font-mono text-[#0D2E26] placeholder-[#4B635D]/70 outline-none transition-all focus:border-[#70BA28] focus:ring-2 focus:ring-[#70BA28]/20 shadow-sm"
            />
            <svg
              className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4B635D]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#4B635D] hover:text-[#0D2E26]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ── Featured Flagship Article (Top Hero Card) ── */}
        {showFeatured && (
          <div className="mb-20">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#70BA28]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[#2E4D45]">
                Featured Flagship Post
              </span>
            </div>

            <article className="group relative overflow-hidden rounded-3xl border border-[#0D2E26]/10 bg-white p-6 md:p-8 lg:p-10 shadow-[0_4px_24px_-4px_rgba(13,46,38,0.06),0_2px_8px_-2px_rgba(13,46,38,0.03)] hover:shadow-[0_20px_40px_-8px_rgba(13,46,38,0.12)] transition-all duration-500">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 lg:items-center">
                {/* Left: Featured Image */}
                <div className="lg:col-span-7">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#0D2E26]/10 bg-[#0D2E26]/5">
                    <Image
                      src={FEATURED_POST.image}
                      alt={FEATURED_POST.title}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>
                </div>

                {/* Right: Editorial Content */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full">
                  <div>
                    {/* Metadata Header */}
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className="rounded-full bg-[#70BA28]/15 border border-[#70BA28]/30 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#0D2E26]">
                        {FEATURED_POST.category}
                      </span>
                      <span className="text-xs font-mono text-[#4B635D]">
                        {FEATURED_POST.date}
                      </span>
                      <span className="text-xs font-mono text-[#4B635D]">•</span>
                      <span className="text-xs font-mono text-[#4B635D]">
                        {FEATURED_POST.readTime}
                      </span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2E26] leading-tight mb-4 tracking-tight group-hover:text-[#62A422] transition-colors">
                      {FEATURED_POST.title}
                    </h2>

                    {/* Teaser Excerpt */}
                    <p className="text-base text-[#2E4D45] leading-relaxed mb-8">
                      {FEATURED_POST.excerpt}
                    </p>
                  </div>

                  {/* Author & Action Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-[#0D2E26]/10">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full border border-[#0D2E26]/15">
                        <Image
                          src={FEATURED_POST.author.avatar}
                          alt={FEATURED_POST.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#0D2E26]">
                          {FEATURED_POST.author.name}
                        </div>
                        <div className="text-xs font-mono text-[#4B635D]">
                          {FEATURED_POST.author.role}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#0D2E26] group-hover:text-[#70BA28] transition-colors">
                      <span>Read Article</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* ── Section Divider / Section Title ── */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#70BA28]" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-[#2E4D45]">
              {selectedCategory === "All"
                ? "All Perspectives"
                : `${selectedCategory} (${filteredPosts.length})`}
            </h3>
          </div>
          <span className="font-mono text-xs text-[#4B635D]">
            Showing {filteredPosts.length} article{filteredPosts.length === 1 ? "" : "s"}
          </span>
        </div>

        {/* ── Article 3-Column Grid ── */}
        {filteredPosts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#0D2E26]/20 bg-white p-12 text-center">
            <p className="font-mono text-sm text-[#4B635D]">
              No articles found matching &ldquo;{searchQuery}&rdquo; in {selectedCategory}.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 rounded-full bg-[#70BA28] px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#0D2E26] hover:bg-[#62A422] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, idx) => (
                <motion.article
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#0D2E26]/10 bg-white shadow-[0_4px_20px_-2px_rgba(13,46,38,0.05),0_2px_6px_-1px_rgba(13,46,38,0.03)] hover:shadow-[0_16px_36px_-6px_rgba(13,46,38,0.12)] hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0D2E26]/5">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                      {/* Category & Read Time */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="rounded-full bg-[#70BA28]/10 border border-[#70BA28]/25 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#0D2E26]">
                          {post.category}
                        </span>
                        <span className="font-mono text-[11px] text-[#4B635D]">
                          {post.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-lg font-bold text-[#0D2E26] leading-snug mb-2.5 tracking-tight group-hover:text-[#62A422] transition-colors line-clamp-2">
                        {post.title}
                      </h4>

                      {/* Excerpt */}
                      <p className="text-xs text-[#4B635D] leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Author + Date */}
                  <div className="px-6 pb-6 pt-4 border-t border-[#0D2E26]/5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="relative h-7 w-7 overflow-hidden rounded-full border border-[#0D2E26]/10">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#0D2E26]">
                          {post.author.name}
                        </div>
                        <div className="text-[10px] font-mono text-[#4B635D]">
                          {post.date}
                        </div>
                      </div>
                    </div>

                    {/* Arrow Icon Indicator */}
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0D2E26]/5 text-[#0D2E26] group-hover:bg-[#70BA28] group-hover:text-[#0D2E26] transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
