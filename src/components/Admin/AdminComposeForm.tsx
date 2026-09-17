"use client";

import { useState, FormEvent } from "react";
import { BLOG_CATEGORIES, BlogCategory } from "@/data/blogs";
import { AdminBlogPost } from "./AdminPostList";

interface AdminComposeFormProps {
  initialPost?: AdminBlogPost | null;
  onSave: (post: AdminBlogPost, isDraft: boolean) => void;
  onCancel: () => void;
}

export default function AdminComposeForm({
  initialPost,
  onSave,
  onCancel,
}: AdminComposeFormProps) {
  const [title, setTitle] = useState(initialPost?.title || "");
  const [category, setCategory] = useState<BlogCategory>(
    initialPost?.category || "Engineering"
  );
  const [authorName, setAuthorName] = useState(
    initialPost?.author.name || "Aarav Roy"
  );
  const [readTime, setReadTime] = useState(initialPost?.readTime || "5 min read");
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || "");
  const [content, setContent] = useState(
    initialPost
      ? `# ${initialPost.title}\n\n${initialPost.excerpt}\n\n## Core Architecture\n\nDetailed systems narrative goes here...`
      : "## Executive Summary\n\nOutline the primary architectural hypothesis and system findings.\n\n## Systems Breakdown\n\n1. Telemetry ingestion\n2. Pipeline throughput\n3. Edge caching layer"
  );
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  const handleSubmit = (isDraft: boolean) => {
    if (!title.trim()) {
      alert("Please provide an article title.");
      return;
    }

    const slug =
      initialPost?.slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") ||
      `article-${Date.now()}`;

    const newPost: AdminBlogPost = {
      slug,
      title: title.trim(),
      excerpt:
        excerpt.trim() ||
        "An in-depth analysis on modern software engineering and growth frameworks.",
      category: category === "All" ? "Engineering" : category,
      date: initialPost?.date || new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      readTime: readTime.trim() || "5 min read",
      image:
        initialPost?.image ||
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
      author: {
        name: authorName.trim() || "Aarav Roy",
        role: "Systems Architect",
        avatar:
          initialPost?.author.avatar ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      },
      status: isDraft ? "Draft" : "Published",
    };

    onSave(newPost, isDraft);
  };

  const insertMarkdown = (prefix: string, suffix: string = "") => {
    setContent((prev) => `${prev}\n${prefix}Sample Text${suffix}\n`);
  };

  return (
    <div className="rounded-3xl border border-[#0D2E26]/10 bg-white p-6 md:p-10 lg:p-12 shadow-[0_4px_24px_-4px_rgba(13,46,38,0.06)]">
      {/* ── Header Toolbar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-[#0D2E26]/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#70BA28] mb-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#70BA28]" />
            <span>{initialPost ? "Edit Existing Essay" : "Drafting Mode · Markdown Engine"}</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#0D2E26] tracking-tight">
            {initialPost ? "Edit Article" : "Compose New Article"}
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-[#0D2E26]/15 bg-white px-4 py-2.5 font-mono text-xs font-semibold text-[#4B635D] hover:text-[#0D2E26] hover:bg-[#F8FAF8] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleSubmit(true)}
            className="rounded-xl border border-[#0D2E26]/20 bg-[#F8FAF8] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#0D2E26] hover:bg-white hover:border-[#0D2E26]/40 transition-all"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSubmit(false)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#70BA28] px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#0D2E26] hover:bg-[#62A422] shadow-sm transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#70BA28]"
          >
            <span>Publish Post →</span>
          </button>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
        {/* ── Article Title Field (Prominent & Minimalist) ── */}
        <div>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter article title here..."
            className="w-full bg-transparent pb-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D2E26] placeholder-[#0D2E26]/20 border-b border-[#0D2E26]/15 outline-none transition-colors focus:border-[#70BA28]"
          />
        </div>

        {/* ── Category & Metadata Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          {/* Category Selector */}
          <div>
            <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#0D2E26] mb-2">
              Category Pillar
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as BlogCategory)}
              className="w-full rounded-xl border border-[#0D2E26]/15 bg-[#F8FAF8] px-4 py-3 font-mono text-xs text-[#0D2E26] outline-none transition-all focus:border-[#70BA28] focus:bg-white focus:ring-2 focus:ring-[#70BA28]/20"
            >
              {BLOG_CATEGORIES.filter((c) => c !== "All").map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Author Name */}
          <div>
            <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#0D2E26] mb-2">
              Author
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="e.g. Aarav Roy"
              className="w-full rounded-xl border border-[#0D2E26]/15 bg-[#F8FAF8] px-4 py-3 font-mono text-xs text-[#0D2E26] outline-none transition-all focus:border-[#70BA28] focus:bg-white focus:ring-2 focus:ring-[#70BA28]/20"
            />
          </div>

          {/* Read Time */}
          <div>
            <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#0D2E26] mb-2">
              Read Duration
            </label>
            <input
              type="text"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              placeholder="e.g. 5 min read"
              className="w-full rounded-xl border border-[#0D2E26]/15 bg-[#F8FAF8] px-4 py-3 font-mono text-xs text-[#0D2E26] outline-none transition-all focus:border-[#70BA28] focus:bg-white focus:ring-2 focus:ring-[#70BA28]/20"
            />
          </div>
        </div>

        {/* ── Short Excerpt / Teaser ── */}
        <div>
          <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#0D2E26] mb-2">
            Synopsis / Teaser Summary (2-3 sentences)
          </label>
          <textarea
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="A compelling 2-3 sentence overview that appears in the card preview..."
            className="w-full rounded-xl border border-[#0D2E26]/15 bg-[#F8FAF8] p-4 text-sm text-[#0D2E26] placeholder-[#4B635D]/60 outline-none transition-all focus:border-[#70BA28] focus:bg-white focus:ring-2 focus:ring-[#70BA28]/20"
          />
        </div>

        {/* ── Markdown Content Editor Area ── */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#0D2E26]/10 pb-3">
            <div className="flex items-center gap-1 font-mono text-[11px]">
              <button
                type="button"
                onClick={() => setActiveTab("write")}
                className={`rounded-lg px-3 py-1.5 uppercase font-bold tracking-wider transition-colors ${
                  activeTab === "write"
                    ? "bg-[#0D2E26] text-white"
                    : "text-[#4B635D] hover:bg-[#0D2E26]/5 hover:text-[#0D2E26]"
                }`}
              >
                Write (Markdown)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`rounded-lg px-3 py-1.5 uppercase font-bold tracking-wider transition-colors ${
                  activeTab === "preview"
                    ? "bg-[#0D2E26] text-white"
                    : "text-[#4B635D] hover:bg-[#0D2E26]/5 hover:text-[#0D2E26]"
                }`}
              >
                Live Preview
              </button>
            </div>

            {/* Markdown Formatting Helper Pills */}
            {activeTab === "write" && (
              <div className="hidden sm:flex items-center gap-1 font-mono text-[10px]">
                <button
                  type="button"
                  onClick={() => insertMarkdown("## ")}
                  className="rounded px-2 py-1 bg-[#F8FAF8] text-[#0D2E26] hover:bg-[#70BA28]/20 transition-colors"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("### ")}
                  className="rounded px-2 py-1 bg-[#F8FAF8] text-[#0D2E26] hover:bg-[#70BA28]/20 transition-colors"
                >
                  H3
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("**", "**")}
                  className="rounded px-2 py-1 bg-[#F8FAF8] text-[#0D2E26] hover:bg-[#70BA28]/20 transition-colors"
                >
                  Bold
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("`", "`")}
                  className="rounded px-2 py-1 bg-[#F8FAF8] text-[#0D2E26] hover:bg-[#70BA28]/20 transition-colors"
                >
                  Code
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("> ")}
                  className="rounded px-2 py-1 bg-[#F8FAF8] text-[#0D2E26] hover:bg-[#70BA28]/20 transition-colors"
                >
                  Quote
                </button>
              </div>
            )}
          </div>

          {activeTab === "write" ? (
            <textarea
              rows={14}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article narrative in full markdown..."
              className="w-full rounded-2xl border border-[#0D2E26]/15 bg-[#F8FAF8] p-5 font-mono text-sm leading-relaxed text-[#0D2E26] placeholder-[#4B635D]/50 outline-none transition-all focus:border-[#70BA28] focus:bg-white focus:ring-2 focus:ring-[#70BA28]/20"
            />
          ) : (
            <div className="min-h-[350px] rounded-2xl border border-[#0D2E26]/15 bg-[#F8FAF8] p-8 prose prose-slate max-w-none text-[#0D2E26]">
              <h1 className="text-3xl font-extrabold text-[#0D2E26] mb-4">
                {title || "Untitled Article"}
              </h1>
              <div className="flex items-center gap-3 font-mono text-xs text-[#4B635D] mb-6 pb-4 border-b border-[#0D2E26]/10">
                <span className="text-[#70BA28] font-bold uppercase">{category}</span>
                <span>•</span>
                <span>{authorName}</span>
                <span>•</span>
                <span>{readTime}</span>
              </div>
              <p className="text-lg text-[#2E4D45] font-medium leading-relaxed italic mb-8">
                {excerpt || "Synopsis preview..."}
              </p>
              <div className="whitespace-pre-wrap font-sans text-base leading-relaxed text-[#0D2E26]/90 space-y-4">
                {content}
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
