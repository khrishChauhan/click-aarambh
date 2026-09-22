"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import WebsitesCarousel from "./WebsitesCarousel";
import WebAppsShowcase from "./WebAppsShowcase";
import WorkBlogSection from "./WorkBlogSection";

export interface CarouselReel {
  id: string;
  url: string;
  title: string;
  thumbnail?: string | null;
  description?: string;
  likes?: string | null;
}

const INITIAL_REELS: CarouselReel[] = [
  {
    id: "reel-Dac25Xkyz8j",
    url: "https://www.instagram.com/reel/Dac25Xkyz8j/?igsh=ZXo0ZTM0emMzOG95",
    title: "Creative Storytelling Showcase",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "reel-DbijxwOygyC",
    url: "https://www.instagram.com/reel/DbijxwOygyC/?igsh=MWM1Z2dzaDNkem5kYg==",
    title: "Brand Identity Film",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "reel-DbCT_UQJMhu",
    url: "https://www.instagram.com/reel/DbCT_UQJMhu/?igsh=ZnRwcTJmaTN5c3lp",
    title: "Performance Commercial Shoot",
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "reel-Dap6kreCFY8",
    url: "https://www.instagram.com/reel/Dap6kreCFY8/?igsh=eXRkMWQxdGp6a3Ri",
    title: "Cinematic Visuals Reel",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "reel-DbQp5ywTcvm",
    url: "https://www.instagram.com/reel/DbQp5ywTcvm/?igsh=MXI2c256bGRnY2lreQ==",
    title: "High Impact Brand Spot",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "reel-DaVa9HfTvRj",
    url: "https://www.instagram.com/reel/DaVa9HfTvRj/?igsh=MXAwbjE3d2RxbWhvMQ==",
    title: "Venture Scale Vignette",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "reel-DblFc2yP8Fx",
    url: "https://www.instagram.com/reel/DblFc2yP8Fx/?igsh=MXcweDAzMzF4enp5ZQ==",
    title: "Studio Creative Reel",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "reel-DYwylHRlP7h",
    url: "https://www.instagram.com/reel/DYwylHRlP7h/?igsh=bnNoNjViZXY1dDE5",
    title: "Digital Growth Narrative",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "reel-DY8fboigCN1",
    url: "https://www.instagram.com/reel/DY8fboigCN1/?igsh=MXFpcncyNHIzMXVkaQ==",
    title: "Visual Identity System",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "reel-DczpolWRmZE",
    url: "https://www.instagram.com/reel/DczpolWRmZE/?stkn=MWJ6bGdjdWEweWphYw==",
    title: "Production Craft Showcase",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "reel-DdOdpdJxQDE",
    url: "https://www.instagram.com/reel/DdOdpdJxQDE/?stkn=ZnVlZTluenZnOXln",
    title: "Dynamic Motion Story",
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "reel-DcKgv2tzVut",
    url: "https://www.instagram.com/reel/DcKgv2tzVut/?stkn=NnB2cHhva2drdHU1",
    title: "Architectural Creative Spot",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "reel-Dc05Uaxz7BJ",
    url: "https://www.instagram.com/reel/Dc05Uaxz7BJ/?stkn=c3Rscml3djUxcWEw",
    title: "Performance Reel Edition",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600",
  },
];

const igCache = new Map<string, { imageUrl: string | null; title: string; description: string; likes: string | null }>();

function ReelCard({ reel }: { reel: CarouselReel }) {
  const [data, setData] = useState<{
    imageUrl: string | null;
    title: string;
    description: string;
    likes: string | null;
  }>(() => {
    if (reel.thumbnail) {
      return {
        imageUrl: reel.thumbnail,
        title: reel.title || "Instagram Reel",
        description: reel.description || "Watch this reel on Instagram.",
        likes: reel.likes || null,
      };
    }
    return igCache.get(reel.url) || {
      imageUrl: null,
      title: reel.title || "Instagram Reel",
      description: reel.description || "",
      likes: reel.likes || null,
    };
  });

  const [loading, setLoading] = useState(() => !reel.thumbnail && !igCache.has(reel.url));

  useEffect(() => {
    if (reel.thumbnail) {
      setData({
        imageUrl: reel.thumbnail,
        title: reel.title || "Instagram Reel",
        description: reel.description || "Watch this reel on Instagram.",
        likes: reel.likes || null,
      });
      setLoading(false);
      return;
    }

    if (igCache.has(reel.url)) {
      setData(igCache.get(reel.url)!);
      setLoading(false);
      return;
    }

    let isMounted = true;
    async function fetchThumbnail() {
      try {
        const res = await fetch(`/api/ig-thumbnail?url=${encodeURIComponent(reel.url)}`);
        if (res.ok) {
          const fetchedData = await res.json();
          const parsed = {
            imageUrl: fetchedData.imageUrl || null,
            title: fetchedData.title || reel.title || "Instagram Reel",
            description: fetchedData.description || "Watch this reel on Instagram.",
            likes: fetchedData.likes || null,
          };
          igCache.set(reel.url, parsed);
          if (isMounted) {
            setData(parsed);
          }
        }
      } catch (err) {
        console.error("[ReelCard] Error fetching thumbnail", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchThumbnail();
    return () => {
      isMounted = false;
    };
  }, [reel]);

  const finalImage =
    data.imageUrl && !data.imageUrl.startsWith("data:image")
      ? data.imageUrl
      : "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop";

  return (
    <a
      href={reel.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block rounded-2xl w-[280px] h-[500px] md:w-[316px] md:h-[560px] flex-shrink-0 group cursor-pointer border border-[#0D2E26]/10 overflow-hidden bg-white transition-all duration-500 hover:scale-[1.02]"
      style={{
        boxShadow: "0 4px 20px -2px rgba(13, 46, 38, 0.05), 0 2px 6px -1px rgba(13, 46, 38, 0.03)",
      }}
    >
      {/* Thumbnail Image */}
      {loading ? (
        <div className="absolute inset-0 z-0 bg-white animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#0D2E26]/10 border-t-[#70BA28] animate-spin" />
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={finalImage}
          alt={data.title || "Instagram Reel"}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}

      {/* Gradient Overlay for bottom text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/30 to-transparent opacity-100 transition-opacity duration-500 z-10" />

      {/* Instagram Logo Top Right */}
      <div className="absolute top-5 right-5 z-20 text-[#0D2E26]/90">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-md group-hover:scale-110 transition-transform duration-300"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      </div>

      {/* Meta Info */}
      <div className="absolute bottom-6 left-6 right-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-[0.23,1,0.32,1] z-30">
        <div className="flex items-center gap-3 mb-3">
          {data.likes && (
            <div className="flex items-center gap-1.5 text-[#0D2E26]/90 font-medium text-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              <span>{data.likes}</span>
            </div>
          )}
          <span className="px-2 py-0.5 rounded-full bg-[#70BA28]/10 border border-[#70BA28]/30 text-[9px] font-bold tracking-wider uppercase text-[#70BA28] backdrop-blur-md">
            SHOWCASE
          </span>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-[#0D2E26] text-[1.1rem] font-bold leading-tight drop-shadow-sm line-clamp-1">
            {data.title}
          </h3>
          <div className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#0D2E26]"
            >
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          </div>
        </div>
        <p className="text-[#0D2E26]/70 text-[13px] font-medium leading-snug line-clamp-2 mt-1">
          {data.description}
        </p>
      </div>
    </a>
  );
}

export default function OurWork() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [reels, setReels] = useState<CarouselReel[]>(INITIAL_REELS);

  // Load dynamic reels from API
  useEffect(() => {
    fetch("/api/reels", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: CarouselReel[] | null) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setReels(data);
        }
      })
      .catch((err) => console.error("[OurWork] Failed to fetch reels:", err));
  }, []);

  const scrollAmount = 340; // Card width (316px) + gap (24px)
  const displayReels = reels.length > 0 ? reels : INITIAL_REELS;

  // Duplicate list to support infinite loop seamlessly
  const carouselList =
    displayReels.length < 5
      ? [...displayReels, ...displayReels, ...displayReels, ...displayReels]
      : [...displayReels, ...displayReels];

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isHovered && displayReels.length > 0) {
      interval = setInterval(() => {
        if (carouselRef.current) {
          const originalScrollWidth = displayReels.length * scrollAmount;

          // Seamlessly snap back to the start when reaching the end of original items
          if (carouselRef.current.scrollLeft >= originalScrollWidth) {
            carouselRef.current.scrollLeft -= originalScrollWidth;
          }

          requestAnimationFrame(() => {
            carouselRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
          });
        }
      }, 3000); // 3 seconds auto-play
    }

    return () => clearInterval(interval);
  }, [isHovered, displayReels.length]);

  const handlePrev = () => {
    if (carouselRef.current) {
      const originalScrollWidth = displayReels.length * scrollAmount;

      if (carouselRef.current.scrollLeft <= 0) {
        carouselRef.current.scrollLeft += originalScrollWidth;
      }

      requestAnimationFrame(() => {
        carouselRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      });
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      const originalScrollWidth = displayReels.length * scrollAmount;

      if (carouselRef.current.scrollLeft >= originalScrollWidth) {
        carouselRef.current.scrollLeft -= originalScrollWidth;
      }

      requestAnimationFrame(() => {
        carouselRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
    }
  };

  return (
    <section id="work" className="relative flex flex-col items-center py-12 md:py-20 bg-white overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#70BA28]/[0.02] rounded-[100%] blur-[120px]" />
      </div>

      <div className="container relative z-10 w-full max-w-[1400px] mx-auto px-6">
        {/* Header Section */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight text-[#0D2E26] mb-3 tracking-tight">
                Our Work
              </h2>
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="hidden md:flex gap-4"
          >
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-[#0D2E26]/10 bg-[#0D2E26]/5 backdrop-blur-md flex items-center justify-center text-[#0D2E26]/70 hover:text-[#0D2E26] hover:border-[#70BA28]/50 hover:bg-[#70BA28]/10 transition-all duration-300 group"
              aria-label="Previous reel"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:-translate-x-1 transition-transform duration-300"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-[#0D2E26]/10 bg-[#0D2E26]/5 backdrop-blur-md flex items-center justify-center text-[#0D2E26]/70 hover:text-[#0D2E26] hover:border-[#70BA28]/50 hover:bg-[#70BA28]/10 transition-all duration-300 group"
              aria-label="Next reel"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </motion.div>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="w-[calc(100%+3rem)] -mx-6 overflow-x-auto no-scrollbar pb-8 md:w-full md:mx-0"
          ref={carouselRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          <div className="flex gap-6 w-max items-center px-6 md:px-0 after:content-[''] after:w-px md:after:hidden">
            {carouselList.map((reel, index) => (
              <ReelCard key={`${reel.id}-${index}`} reel={reel} />
            ))}
          </div>
        </motion.div>
      </div>

      <WebsitesCarousel />
      <WebAppsShowcase />
      <WorkBlogSection />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />
    </section>
  );
}
