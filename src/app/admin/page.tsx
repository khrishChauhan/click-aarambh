"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BLOG_POSTS, FEATURED_POST } from "@/data/blogs";
import AdminPasswordGate from "@/components/Admin/AdminPasswordGate";
import AdminPostList, { AdminBlogPost } from "@/components/Admin/AdminPostList";
import AdminComposeForm from "@/components/Admin/AdminComposeForm";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"posts" | "compose">("posts");
  const [editingPost, setEditingPost] = useState<AdminBlogPost | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize client-side posts list from mock blogs
  const [posts, setPosts] = useState<AdminBlogPost[]>(() => {
    const initial: AdminBlogPost[] = [
      { ...FEATURED_POST, status: "Published" },
      ...BLOG_POSTS.map((p) => ({ ...p, status: "Published" as const })),
    ];
    return initial;
  });

  // Verify session on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("ca_admin_auth");
      if (stored === "true") {
        setIsAuthenticated(true);
      }
    } catch {
      // In case storage is restricted
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleUnlock = () => {
    setIsAuthenticated(true);
    try {
      sessionStorage.setItem("ca_admin_auth", "true");
    } catch {}
    showToast("Access key verified: Welcome to Admin Blog Studio");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem("ca_admin_auth");
    } catch {}
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleSavePost = (newPost: AdminBlogPost, isDraft: boolean) => {
    setPosts((prev) => {
      const existsIndex = prev.findIndex((p) => p.slug === newPost.slug);
      if (existsIndex >= 0) {
        const updated = [...prev];
        updated[existsIndex] = newPost;
        return updated;
      } else {
        return [newPost, ...prev];
      }
    });

    setEditingPost(null);
    setActiveTab("posts");
    showToast(
      isDraft
        ? `Draft "${newPost.title}" saved locally (Phase 1 preview)`
        : `Article "${newPost.title}" created successfully (Phase 1 preview)`
    );
  };

  const handleDeletePost = (slug: string) => {
    const postToDelete = posts.find((p) => p.slug === slug);
    if (!postToDelete) return;

    if (window.confirm(`Are you sure you want to delete "${postToDelete.title}"?`)) {
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
      showToast(`Article "${postToDelete.title}" removed from catalog`);
    }
  };

  const handleEditPost = (post: AdminBlogPost) => {
    setEditingPost(post);
    setActiveTab("compose");
  };

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
                src="/logo.png"
                alt="Click Aarambh Ventures Logo"
                width={160}
                height={50}
                className="h-9 w-auto object-contain transition-opacity duration-300 group-hover:opacity-90"
              />
            </Link>

            <span className="hidden sm:block h-4 w-px bg-[#0D2E26]/15" />

            <div className="hidden sm:flex items-center gap-2 font-mono text-xs font-bold text-[#0D2E26]">
              <span>Blog Studio</span>
              <span className="rounded-full bg-[#70BA28]/15 border border-[#70BA28]/30 px-2.5 py-0.5 text-[10px] font-bold text-[#0D2E26]">
                Phase 1 · UI Mode
              </span>
            </div>
          </div>

          {/* Center: Main View Tabs */}
          <nav className="flex items-center gap-1 rounded-xl bg-[#F8FAF8] p-1 border border-[#0D2E26]/10">
            <button
              onClick={() => {
                setActiveTab("posts");
                setEditingPost(null);
              }}
              className={`rounded-lg px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
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
              className={`rounded-lg px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                activeTab === "compose"
                  ? "bg-white text-[#0D2E26] shadow-sm"
                  : "text-[#4B635D] hover:text-[#0D2E26]"
              }`}
            >
              {editingPost ? "Edit Article" : "+ Compose"}
            </button>
          </nav>

          {/* Right: Live Blog Link & Logout */}
          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-[#0D2E26]/15 px-3.5 py-2 font-mono text-[11px] font-semibold text-[#0D2E26] hover:border-[#70BA28] hover:bg-[#70BA28]/10 transition-colors"
            >
              <span>View Public Blog</span>
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
          />
        )}
      </main>
    </div>
  );
}
