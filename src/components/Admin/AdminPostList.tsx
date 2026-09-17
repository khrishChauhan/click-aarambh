"use client";

import { useState, useMemo } from "react";
import { BlogPost, BLOG_CATEGORIES, BlogCategory } from "@/data/blogs";

export interface AdminBlogPost extends BlogPost {
  status: "Published" | "Draft";
}

interface AdminPostListProps {
  posts: AdminBlogPost[];
  onDeletePost: (slug: string) => void;
  onEditPost: (post: AdminBlogPost) => void;
  onNewPost: () => void;
}

export default function AdminPostList({
  posts,
  onDeletePost,
  onEditPost,
  onNewPost,
}: AdminPostListProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>("All");
  const [statusFilter, setStatusFilter] = useState<"All" | "Published" | "Draft">("All");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCat =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchStatus =
        statusFilter === "All" || post.status === statusFilter;
      const matchSearch =
        search === "" ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.author.name.toLowerCase().includes(search.toLowerCase()) ||
        post.category.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchStatus && matchSearch;
    });
  }, [posts, selectedCategory, statusFilter, search]);

  const stats = useMemo(() => {
    const total = posts.length;
    const published = posts.filter((p) => p.status === "Published").length;
    const drafts = posts.filter((p) => p.status === "Draft").length;
    return { total, published, drafts };
  }, [posts]);

  return (
    <div className="space-y-8">
      {/* ── Metric Snapshot Cards ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#0D2E26]/10 bg-white p-6 shadow-sm">
          <div className="font-mono text-xs uppercase tracking-wider text-[#4B635D]">
            Total Essays
          </div>
          <div className="mt-2 text-3xl font-extrabold text-[#0D2E26]">
            {stats.total}
          </div>
          <div className="mt-1 text-xs text-[#2E4D45]">In repository catalog</div>
        </div>

        <div className="rounded-2xl border border-[#0D2E26]/10 bg-white p-6 shadow-sm">
          <div className="font-mono text-xs uppercase tracking-wider text-[#4B635D]">
            Live Published
          </div>
          <div className="mt-2 text-3xl font-extrabold text-[#70BA28]">
            {stats.published}
          </div>
          <div className="mt-1 text-xs text-[#2E4D45]">Accessible in public index</div>
        </div>

        <div className="rounded-2xl border border-[#0D2E26]/10 bg-white p-6 shadow-sm">
          <div className="font-mono text-xs uppercase tracking-wider text-[#4B635D]">
            Drafts in Progress
          </div>
          <div className="mt-2 text-3xl font-extrabold text-[#0D2E26]">
            {stats.drafts}
          </div>
          <div className="mt-1 text-xs text-[#2E4D45]">Pending editorial review</div>
        </div>
      </div>

      {/* ── Controls Toolbar ── */}
      <div className="flex flex-col gap-4 rounded-2xl border border-[#0D2E26]/10 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by title, author, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#0D2E26]/15 bg-[#F8FAF8] py-2.5 pl-10 pr-4 font-mono text-xs text-[#0D2E26] placeholder-[#4B635D]/60 outline-none transition-all focus:border-[#70BA28] focus:bg-white focus:ring-2 focus:ring-[#70BA28]/20"
          />
          <svg
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4B635D]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filters & New Article Button */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as BlogCategory)}
            className="rounded-xl border border-[#0D2E26]/15 bg-[#F8FAF8] px-3.5 py-2.5 font-mono text-xs text-[#0D2E26] outline-none transition-all focus:border-[#70BA28] focus:bg-white"
          >
            {BLOG_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="rounded-xl border border-[#0D2E26]/15 bg-[#F8FAF8] px-3.5 py-2.5 font-mono text-xs text-[#0D2E26] outline-none transition-all focus:border-[#70BA28] focus:bg-white"
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published Only</option>
            <option value="Draft">Drafts Only</option>
          </select>

          {/* New Article Action */}
          <button
            onClick={onNewPost}
            className="inline-flex items-center gap-2 rounded-xl bg-[#70BA28] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#0D2E26] shadow-sm transition-all duration-200 hover:bg-[#62A422] outline-none focus-visible:ring-2 focus-visible:ring-[#70BA28]"
          >
            <span>+ Compose</span>
          </button>
        </div>
      </div>

      {/* ── Articles Data Table ── */}
      <div className="overflow-hidden rounded-2xl border border-[#0D2E26]/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#0D2E26]/10 bg-[#F8FAF8]/80 text-[11px] font-mono font-bold uppercase tracking-wider text-[#4B635D]">
                <th className="py-4 px-6">Article Title &amp; Synopsis</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Author</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0D2E26]/5 text-xs">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sm font-mono text-[#4B635D]">
                    No articles found matching the current query.
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr
                    key={post.slug}
                    className="group transition-colors duration-150 hover:bg-[#F8FAF8]"
                  >
                    {/* Title & Excerpt */}
                    <td className="py-4 px-6 max-w-sm">
                      <div className="font-bold text-[#0D2E26] group-hover:text-[#62A422] transition-colors line-clamp-1 text-sm">
                        {post.title}
                      </div>
                      <div className="text-[11px] text-[#4B635D] line-clamp-1 mt-0.5">
                        {post.excerpt}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-block rounded-full bg-[#70BA28]/15 border border-[#70BA28]/30 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#0D2E26]">
                        {post.category}
                      </span>
                    </td>

                    {/* Author */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="font-semibold text-[#0D2E26]">
                        {post.author.name}
                      </div>
                      <div className="text-[10px] font-mono text-[#4B635D]">
                        {post.readTime}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 whitespace-nowrap font-mono text-[11px] text-[#4B635D]">
                      {post.date}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${
                          post.status === "Published"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-amber-100 text-amber-800 border border-amber-300"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            post.status === "Published" ? "bg-emerald-600" : "bg-amber-600"
                          }`}
                        />
                        {post.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEditPost(post)}
                          className="rounded-lg border border-[#0D2E26]/10 bg-white px-3 py-1 font-mono text-[11px] font-semibold text-[#0D2E26] transition-colors hover:border-[#70BA28] hover:text-[#70BA28]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDeletePost(post.slug)}
                          className="rounded-lg border border-red-200 bg-white px-3 py-1 font-mono text-[11px] font-semibold text-red-600 transition-colors hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="border-t border-[#0D2E26]/10 bg-[#F8FAF8] py-3.5 px-6 text-xs font-mono text-[#4B635D] flex items-center justify-between">
          <div>
            Showing {filteredPosts.length} of {posts.length} entries
          </div>
          <div className="text-[11px]">
            Phase 1 UI Sandbox · Client-side State
          </div>
        </div>
      </div>
    </div>
  );
}
