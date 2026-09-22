"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BLOG_CATEGORIES, BlogCategory, BlogPost } from "@/data/blogs";
import BlogFeatured from "./BlogFeatured";
import BlogCard from "./BlogCard";

interface BlogListProps {
  initialPosts: BlogPost[];
  featuredPost: BlogPost | null;
}

export default function BlogList({ initialPosts, featuredPost }: BlogListProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [featured, setFeatured] = useState<BlogPost | null>(featuredPost);
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Live client-side sync from API to guarantee any published, edited, or deleted blogs appear immediately
  useEffect(() => {
    fetch("/api/blogs", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: BlogPost[] | null) => {
        if (data && Array.isArray(data) && data.length > 0) {
          const feat = data.find((p) => p.featured) ?? data[0] ?? null;
          const reg = data.filter((p) => p.slug !== feat?.slug);
          setFeatured(feat);
          setPosts(reg);
        }
      })
      .catch(() => {});
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const showFeatured =
    featured !== null &&
    searchQuery === "" &&
    (selectedCategory === "All" || featured.category === selectedCategory);

  return (
    <section className="relative bg-[#F8FAF8] py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
        {/* ── Category Filter Tabs & Real-Time Search Bar ── */}
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

          {/* Search Input Field */}
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

        {/* ── 1. Editorial Featured Article ── */}
        {showFeatured && featured && <BlogFeatured post={featured} />}

        {/* ── Section Divider / Header ── */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#0D2E26]/10">
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

        {/* ── 2. Article Grid ── */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, idx) => (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
