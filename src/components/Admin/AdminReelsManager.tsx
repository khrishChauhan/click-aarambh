"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ReelItem {
  id: string;
  url: string;
  title?: string;
  thumbnail?: string | null;
  description?: string;
  likes?: string | null;
  dateAdded: string;
}

interface AdminReelsManagerProps {
  onShowToast: (msg: string) => void;
}

const igCache = new Map<string, { imageUrl: string | null; title: string; description: string; likes: string | null }>();

function isRealMedia(url?: string | null): boolean {
  if (!url) return false;
  if (url.startsWith("data:image")) return false;
  if (url.includes("unsplash.com")) return false;
  return true;
}

function AdminReelCard({
  reel,
  onDelete,
  isDeleting,
}: {
  reel: ReelItem;
  onDelete: () => void;
  isDeleting: boolean;
}) {
  const [data, setData] = useState<{
    imageUrl: string | null;
    title: string;
    description: string;
    likes: string | null;
  }>(() => {
    const cached = igCache.get(reel.url);
    if (cached) return cached;
    if (isRealMedia(reel.thumbnail)) {
      return {
        imageUrl: reel.thumbnail!,
        title: reel.title || "Instagram Reel",
        description: reel.description || "",
        likes: reel.likes || null,
      };
    }
    return {
      imageUrl: null,
      title: reel.title || "Instagram Reel",
      description: reel.description || "",
      likes: reel.likes || null,
    };
  });

  const [loading, setLoading] = useState(() => {
    if (igCache.has(reel.url)) return false;
    if (isRealMedia(reel.thumbnail)) return false;
    return true;
  });

  useEffect(() => {
    if (igCache.has(reel.url)) {
      setData(igCache.get(reel.url)!);
      setLoading(false);
      return;
    }

    if (isRealMedia(reel.thumbnail)) {
      const initial = {
        imageUrl: reel.thumbnail!,
        title: reel.title || "Instagram Reel",
        description: reel.description || "",
        likes: reel.likes || null,
      };
      igCache.set(reel.url, initial);
      setData(initial);
      setLoading(false);
      return;
    }

    let isMounted = true;
    fetch(`/api/ig-thumbnail?url=${encodeURIComponent(reel.url)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched && isMounted) {
          const parsed = {
            imageUrl: isRealMedia(fetched.imageUrl) ? fetched.imageUrl : null,
            title: fetched.title || reel.title || "Instagram Reel",
            description: fetched.description || "",
            likes: fetched.likes || null,
          };
          igCache.set(reel.url, parsed);
          setData(parsed);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [reel]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#0D2E26]/10 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#0D2E26]/20"
    >
      {/* Thumbnail Media Box */}
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-[#0D2E26] max-h-[300px]">
        {loading ? (
          <div className="absolute inset-0 z-0 bg-[#0D2E26]/90 flex flex-col items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-white/20 border-t-[#70BA28] animate-spin" />
            <span className="font-mono text-[9px] text-white/60 uppercase tracking-wider">Fetching…</span>
          </div>
        ) : data.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.imageUrl}
            alt={data.title || "Instagram Reel"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-[#0D2E26] to-[#081C17] flex flex-col items-center justify-center p-4 text-center">
            <div className="p-3 rounded-full bg-white/10 text-white mb-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </div>
            <span className="text-white text-[11px] font-bold line-clamp-2">{data.title || "Instagram Reel"}</span>
          </div>
        )}

        {/* Instagram badge overlay */}
        <div className="absolute top-3 right-3 rounded-full bg-black/60 backdrop-blur-md p-1.5 text-white">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </div>

        {/* Likes badge if present */}
        {data.likes && (
          <div className="absolute bottom-3 left-3 rounded-full bg-black/60 backdrop-blur-md px-2 py-0.5 font-mono text-[10px] text-white flex items-center gap-1">
            <svg className="h-3 w-3 fill-red-500 stroke-none" viewBox="0 0 24 24">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <span>{data.likes}</span>
          </div>
        )}
      </div>

      {/* Metadata Content */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h4 className="font-bold text-sm text-[#0D2E26] line-clamp-1 mb-1">
            {data.title || "Instagram Reel"}
          </h4>
          {data.description && (
            <p className="text-[#2E4D45] text-xs leading-relaxed line-clamp-2 mb-2 font-normal">
              {data.description}
            </p>
          )}
          <p className="font-mono text-[10px] text-[#4B635D] mb-3">
            Added: {reel.dateAdded}
          </p>
        </div>

        {/* Action Links & Delete */}
        <div className="pt-3 border-t border-[#0D2E26]/10 flex items-center justify-between gap-2">
          <a
            href={reel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-[#0D2E26] hover:text-[#70BA28] transition-colors"
          >
            <span>View on IG</span>
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="rounded-lg border border-red-200 px-2.5 py-1 font-mono text-[11px] font-semibold text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors disabled:opacity-50"
          >
            {isDeleting ? "Removing…" : "Remove"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function AdminReelsManager({ onShowToast }: AdminReelsManagerProps) {
  const [reels, setReels] = useState<ReelItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputUrl, setInputUrl] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // ── Load reels from API ──────────────────────────────────────────────────
  const fetchReels = useCallback(async () => {
    try {
      const res = await fetch("/api/reels", { cache: "no-store" });
      if (res.ok) {
        const data = (await res.json()) as ReelItem[];
        setReels(data);
      }
    } catch (err) {
      console.error("Failed to load reels", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReels();
  }, [fetchReels]);

  // ── Add new reel ─────────────────────────────────────────────────────────
  const handleAddReel = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedUrl = inputUrl.trim();
    if (!trimmedUrl) {
      setErrorMessage("Please enter an Instagram Reel URL.");
      return;
    }

    if (!/instagram\.com\/(?:reel|p)\//i.test(trimmedUrl)) {
      setErrorMessage("Please enter a valid Instagram Reel URL (e.g. https://www.instagram.com/reel/...)");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/reels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: trimmedUrl,
          title: customTitle.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to add reel");
      }

      setInputUrl("");
      setCustomTitle("");
      await fetchReels();
      onShowToast("Reel added to homepage carousel successfully! 🎬");
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to fetch thumbnail or save reel.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Remove reel ──────────────────────────────────────────────────────────
  const handleDeleteReel = async (id: string, title?: string) => {
    const display = title || "this reel";
    if (!window.confirm(`Are you sure you want to remove ${display} from the homepage carousel?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/reels/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      await fetchReels();
      onShowToast("Reel removed from homepage carousel.");
    } catch {
      onShowToast("Error: Failed to delete reel.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-10">
      {/* ── Add Reel Form Card ── */}
      <div className="rounded-3xl border border-[#0D2E26]/10 bg-white p-6 sm:p-8 md:p-10 shadow-[0_4px_24px_-4px_rgba(13,46,38,0.06)]">
        <div className="mb-6 pb-6 border-b border-[#0D2E26]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#70BA28] mb-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#70BA28]" />
              <span>Homepage Video Showcase</span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#0D2E26] tracking-tight">
              Add New Instagram Reel
            </h2>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-[#70BA28]/10 border border-[#70BA28]/30 px-3 py-1 font-mono text-xs font-bold text-[#0D2E26]">
            <span>Carousel Active: {reels.length} Reels</span>
          </div>
        </div>

        <form onSubmit={handleAddReel} className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <label
                htmlFor="reel-url-input"
                className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#0D2E26] mb-2"
              >
                Instagram Reel URL <span className="text-red-500">*</span>
              </label>
              <input
                id="reel-url-input"
                type="url"
                required
                value={inputUrl}
                onChange={(e) => {
                  setInputUrl(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="https://www.instagram.com/reel/DczpolWRmZE/..."
                className="w-full rounded-xl border border-[#0D2E26]/15 bg-[#F8FAF8] px-4 py-3.5 font-mono text-xs text-[#0D2E26] placeholder-[#4B635D]/60 outline-none transition-all focus:border-[#70BA28] focus:bg-white focus:ring-2 focus:ring-[#70BA28]/20"
              />
            </div>

            <div>
              <label
                htmlFor="reel-title-input"
                className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#0D2E26] mb-2"
              >
                Display Title (Optional)
              </label>
              <input
                id="reel-title-input"
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="e.g. Brand Commercial Showcase"
                className="w-full rounded-xl border border-[#0D2E26]/15 bg-[#F8FAF8] px-4 py-3.5 font-mono text-xs text-[#0D2E26] placeholder-[#4B635D]/60 outline-none transition-all focus:border-[#70BA28] focus:bg-white focus:ring-2 focus:ring-[#70BA28]/20"
              />
            </div>
          </div>

          {errorMessage && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-xs text-red-600 flex items-center gap-1.5"
            >
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{errorMessage}</span>
            </motion.p>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <p className="font-mono text-[11px] text-[#4B635D]">
              ✨ Preview thumbnail, caption, and likes are automatically fetched via our scraper pipeline.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#70BA28] px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-[#0D2E26] shadow-sm transition-all hover:bg-[#62A422] hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed outline-none focus-visible:ring-2 focus-visible:ring-[#70BA28] shrink-0"
            >
              {isSubmitting ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#0D2E26]/30 border-t-[#0D2E26]" />
                  <span>Fetching &amp; Adding…</span>
                </>
              ) : (
                <>
                  <span>+ Add to Homepage Carousel</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ── Active Reels Catalog ── */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#0D2E26]/10">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#70BA28]" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#2E4D45]">
              Active Homepage Reels ({reels.length})
            </h3>
          </div>
          <span className="font-mono text-xs text-[#4B635D]">
            Autoplay Interval: 3s · Infinite loop
          </span>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0D2E26]/20 border-t-[#70BA28]" />
          </div>
        ) : reels.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#0D2E26]/20 bg-white p-12 text-center">
            <p className="font-mono text-sm text-[#4B635D] mb-2">No reels in the carousel yet.</p>
            <p className="font-mono text-xs text-[#4B635D]/70">Paste an Instagram link above to add your first reel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {reels.map((reel) => (
                <AdminReelCard
                  key={reel.id}
                  reel={reel}
                  onDelete={() => handleDeleteReel(reel.id, reel.title)}
                  isDeleting={deletingId === reel.id}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
