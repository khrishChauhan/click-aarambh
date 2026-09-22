"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AdminPasswordGate from "@/components/Admin/AdminPasswordGate";
import AdminPostList, { AdminBlogPost } from "@/components/Admin/AdminPostList";
import AdminComposeForm from "@/components/Admin/AdminComposeForm";
import AdminReelsManager from "@/components/Admin/AdminReelsManager";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [adminSection, setAdminSection] = useState<"blogs" | "reels">("blogs");
  const [activeTab, setActiveTab] = useState<"posts" | "compose">("posts");
  const [editingPost, setEditingPost] = useState<AdminBlogPost | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [posts, setPosts] = useState<AdminBlogPost[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // ── Auth check on mount ──────────────────────────────────────────────────
  useEffect(() => {
    fetch("/api/admin/check-auth")
      .then((r) => {
        if (r.ok) setIsAuthenticated(true);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  // ── Load posts from API ──────────────────────────────────────────────────
  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/blogs");
      if (res.ok) {
        const data = (await res.json()) as AdminBlogPost[];
        setPosts(data);
      }
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) fetchPosts();
  }, [isAuthenticated, fetchPosts]);

  // ── Toast helper ─────────────────────────────────────────────────────────
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // ── Auth handlers ─────────────────────────────────────────────────────────
  const handleUnlock = () => {
    setIsAuthenticated(true);
    showToast("Access verified — Welcome to Admin Studio");
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
    setPosts([]);
  };

  // ── CRUD handlers for blogs ───────────────────────────────────────────────
  const handleSavePost = async (newPost: AdminBlogPost, isDraft: boolean) => {
    setIsSaving(true);
    try {
      const postToSave: AdminBlogPost = { ...newPost, status: isDraft ? "Draft" : "Published" };
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postToSave),
      });
      if (!res.ok) throw new Error("Save failed");
      await fetchPosts();
      setEditingPost(null);
      setActiveTab("posts");
      showToast(
        isDraft
          ? `Draft "${newPost.title}" saved`
          : `Article "${newPost.title}" published successfully`
      );
    } catch {
      showToast("Error: Failed to save post. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePost = async (slug: string) => {
    const postToDelete = posts.find((p) => p.slug === slug);
    if (!postToDelete) return;
    if (!window.confirm(`Delete "${postToDelete.title}"?`)) return;
    try {
      const res = await fetch(`/api/blogs/${slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      await fetchPosts();
      showToast(`"${postToDelete.title}" removed`);
    } catch {
      showToast("Error: Failed to delete post.");
    }
  };

  const handleEditPost = (post: AdminBlogPost) => {
    setEditingPost(post);
    setActiveTab("compose");
  };

  // ── Render states ─────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAF8]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#0D2E26]/20 border-t-[#70BA28]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminPasswordGate onUnlock={handleUnlock} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-[#0D2E26]">
      {/* ── Toast Notification ── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-[#70BA28]/40 bg-[#0D2E26] px-5 py-3.5 text-white shadow-2xl"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#70BA28]" />
            <span className="font-mono text-xs font-semibold">{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="ml-2 text-xs text-white/60 hover:text-white"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Top Header Navigation Bar ── */}
      <header className="sticky top-0 z-40 border-b border-[#0D2E26]/10 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12 lg:px-24">
          {/* Left: Branding & Status Badge */}
          <div className="flex items-center gap-4">
            <Link href="/" className="group flex items-center outline-none">
              <Image
                src="/images/click-aarambh-logo.png"
                alt="Click Aarambh Ventures Logo"
                width={160}
                height={50}
                className="h-9 w-auto object-contain transition-opacity duration-300 group-hover:opacity-90"
                unoptimized
              />
            </Link>

            <span className="hidden sm:block h-4 w-px bg-[#0D2E26]/15" />

            <div className="hidden sm:flex items-center gap-2 font-mono text-xs font-bold text-[#0D2E26]">
              <span>Admin Studio</span>
              <span className="rounded-full bg-[#70BA28]/15 border border-[#70BA28]/30 px-2.5 py-0.5 text-[10px] font-bold text-[#0D2E26]">
                Live
              </span>
            </div>
          </div>

          {/* Center: Top Section Switcher [ Blogs Manager | Instagram Reels ] */}
          <nav className="flex items-center gap-1 rounded-xl bg-[#F8FAF8] p-1 border border-[#0D2E26]/10">
            <button
              onClick={() => setAdminSection("blogs")}
              className={`flex items-center gap-2 rounded-lg px-3 sm:px-4 py-2 font-mono text-xs font-bold transition-all duration-200 ${
                adminSection === "blogs"
                  ? "bg-white text-[#0D2E26] shadow-sm"
                  : "text-[#4B635D] hover:text-[#0D2E26]"
              }`}
            >
              <span>📝</span>
              <span>Blogs</span>
            </button>
            <button
              onClick={() => setAdminSection("reels")}
              className={`flex items-center gap-2 rounded-lg px-3 sm:px-4 py-2 font-mono text-xs font-bold transition-all duration-200 ${
                adminSection === "reels"
                  ? "bg-white text-[#0D2E26] shadow-sm"
                  : "text-[#4B635D] hover:text-[#0D2E26]"
              }`}
            >
              <span>🎬</span>
              <span>Reels Manager</span>
            </button>
          </nav>

          {/* Right: Public Links & Logout */}
          <div className="flex items-center gap-3">
            <Link
              href={adminSection === "reels" ? "/#work" : "/blog"}
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-[#0D2E26]/15 px-3.5 py-2 font-mono text-[11px] font-semibold text-[#0D2E26] hover:border-[#70BA28] hover:bg-[#70BA28]/10 transition-colors"
            >
              <span>{adminSection === "reels" ? "View Carousel" : "View Blog"}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-red-200 bg-white px-3.5 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Content Body ── */}
      <main className="mx-auto max-w-7xl px-6 py-10 md:px-12 lg:px-24">
        {adminSection === "blogs" ? (
          <div>
            {/* Blogs Sub-navigation Tabs */}
            <div className="mb-8 flex items-center justify-between border-b border-[#0D2E26]/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#70BA28]" />
                <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#2E4D45]">
                  Editorial Post Management
                </h2>
              </div>

              <div className="flex items-center gap-1 rounded-xl bg-[#F8FAF8] p-1 border border-[#0D2E26]/10">
                <button
                  onClick={() => {
                    setActiveTab("posts");
                    setEditingPost(null);
                  }}
                  className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    activeTab === "posts"
                      ? "bg-white text-[#0D2E26] shadow-sm"
                      : "text-[#4B635D] hover:text-[#0D2E26]"
                  }`}
                >
                  All Posts ({posts.length})
                </button>
                <button
                  onClick={() => {
                    setEditingPost(null);
                    setActiveTab("compose");
                  }}
                  className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    activeTab === "compose"
                      ? "bg-white text-[#0D2E26] shadow-sm"
                      : "text-[#4B635D] hover:text-[#0D2E26]"
                  }`}
                >
                  {editingPost ? "Edit Article" : "+ Compose"}
                </button>
              </div>
            </div>

            {activeTab === "posts" ? (
              <AdminPostList
                posts={posts}
                onDeletePost={handleDeletePost}
                onEditPost={handleEditPost}
                onNewPost={() => {
                  setEditingPost(null);
                  setActiveTab("compose");
                }}
              />
            ) : (
              <AdminComposeForm
                initialPost={editingPost}
                onSave={handleSavePost}
                onCancel={() => {
                  setEditingPost(null);
                  setActiveTab("posts");
                }}
                isSaving={isSaving}
              />
            )}
          </div>
        ) : (
          <AdminReelsManager onShowToast={showToast} />
        )}
      </main>
    </div>
  );
}
