"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import WebsitesCarousel from "./WebsitesCarousel";
import WebAppsShowcase from "./WebAppsShowcase";

const REEL_LINKS = [
  "https://www.instagram.com/reel/Dac25Xkyz8j/?igsh=ZXo0ZTM0emMzOG95",
  "https://www.instagram.com/reel/DbijxwOygyC/?igsh=MWM1Z2dzaDNkem5kYg==",
  "https://www.instagram.com/reel/DbCT_UQJMhu/?igsh=ZnRwcTJmaTN5c3lp",
  "https://www.instagram.com/reel/Dap6kreCFY8/?igsh=eXRkMWQxdGp6a3Ri",
  "https://www.instagram.com/reel/DbQp5ywTcvm/?igsh=MXI2c256bGRnY2lreQ==",
  "https://www.instagram.com/reel/DaVa9HfTvRj/?igsh=MXAwbjE3d2RxbWhvMQ==",
  "https://www.instagram.com/reel/DbYIPFmzZtD/?igsh=cGFjZzU2MmJla281",
  "https://www.instagram.com/reel/Dbj-_MBR4y8/?igsh=MXJmMXdyZnM5NXI0Yg==",
  "https://www.instagram.com/reel/DblFc2yP8Fx/?igsh=MXcweDAzMzF4enp5ZQ==",
  "https://www.instagram.com/reel/DYwylHRlP7h/?igsh=bnNoNjViZXY1dDE5",
  "https://www.instagram.com/reel/DY8fboigCN1/?igsh=MXFpcncyNHIzMXVkaQ==",
];

function ReelCard({ link, index }: { link: string; index: number }) {
  const [data, setData] = useState<{imageUrl: string | null; title: string; description: string; likes: string | null}>({
    imageUrl: null,
    title: "",
    description: "",
    likes: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchThumbnail() {
      try {
        console.log(`[ReelCard] Fetching data for: ${link}`);
        const res = await fetch(`/api/ig-thumbnail?url=${encodeURIComponent(link)}`);
        if (res.ok) {
          const fetchedData = await res.json();
          if (isMounted) {
            setData({
              imageUrl: fetchedData.imageUrl || null,
              title: fetchedData.title || "Instagram Reel",
              description: fetchedData.description || "",
              likes: fetchedData.likes || null
            });
            console.log(`[ReelCard] Successfully fetched data for: ${link}`);
          }
        } else {
          console.error(`[ReelCard] Failed to fetch thumbnail for ${link}: ${res.status}`);
        }
      } catch (err) {
        console.error("[ReelCard] Error fetching thumbnail", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchThumbnail();
    return () => { isMounted = false; };
  }, [link]);

  const finalImage = data.imageUrl || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop";

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block rounded-2xl w-[280px] h-[500px] md:w-[316px] md:h-[560px] flex-shrink-0 group cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden bg-[#0a201d]/60 backdrop-blur-xl"
      style={{
         // Glass card highlights
         boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.4)"
      }}
    >
      {/* Thumbnail Image */}
      {loading ? (
        <div className="absolute inset-0 z-0 bg-[#061917] animate-pulse flex items-center justify-center">
           <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-[#82C21C] animate-spin" />
        </div>
      ) : (
        <img
          src={finalImage}
          alt={data.title || "Instagram Reel"}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 mix-blend-luminosity group-hover:mix-blend-normal"
        />
      )}
      
      {/* Gradient Overlay for bottom text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#061917]/95 via-[#061917]/30 to-transparent opacity-100 transition-opacity duration-500 z-10" />
      
      {/* Instagram Logo Top Right */}
      <div className="absolute top-5 right-5 z-20 text-white/90">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-md group-hover:scale-110 transition-transform duration-300">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      </div>

      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.3)] transform scale-90 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500 ease-[0.23,1,0.32,1] border border-white/20 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="ml-1 drop-shadow-sm">
            <polygon points="6 3 20 12 6 21 6 3"/>
          </svg>
        </div>
      </div>

      {/* Meta Info */}
      <div className="absolute bottom-6 left-6 right-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-[0.23,1,0.32,1] z-30">
        <div className="flex items-center gap-3 mb-3">
          {data.likes && (
            <div className="flex items-center gap-1.5 text-white/90 font-medium text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              <span>{data.likes}</span>
            </div>
          )}
          <span className="px-2 py-0.5 rounded-full bg-[#82C21C]/10 border border-[#82C21C]/30 text-[9px] font-bold tracking-wider uppercase text-[#82C21C] backdrop-blur-md">
            SHOWCASE
          </span>
        </div>
        <h3 className="text-white text-[1.1rem] font-bold leading-tight mb-1 drop-shadow-sm">
          {data.title}
        </h3>
        <p className="text-white/70 text-[13px] font-medium leading-snug line-clamp-2">
          {data.description}
        </p>
      </div>
    </a>
  );
}

export default function OurWork() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const scrollAmount = 340; // Card width (316px) + gap (24px)

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (!isHovered) {
      interval = setInterval(() => {
        if (carouselRef.current) {
          const originalScrollWidth = REEL_LINKS.length * scrollAmount;
          
          // Seamlessly snap back to the start instantly when we reach the end of the original array
          if (carouselRef.current.scrollLeft >= originalScrollWidth) {
            carouselRef.current.scrollLeft -= originalScrollWidth;
          }
          
          // Then smoothly slide to the next reel
          requestAnimationFrame(() => {
            carouselRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
          });
        }
      }, 3000); // 3 seconds auto-play
    }

    return () => clearInterval(interval);
  }, [isHovered]);

  const handlePrev = () => {
    if (carouselRef.current) {
      const originalScrollWidth = REEL_LINKS.length * scrollAmount;
      
      // If at the very beginning, snap to the cloned set first
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
      const originalScrollWidth = REEL_LINKS.length * scrollAmount;
      
      if (carouselRef.current.scrollLeft >= originalScrollWidth) {
        carouselRef.current.scrollLeft -= originalScrollWidth;
      }
      
      requestAnimationFrame(() => {
        carouselRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
    }
  };

  return (
    <section className="relative flex flex-col items-center py-20 bg-[#061917] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#82C21C]/[0.02] rounded-[100%] blur-[120px]" />
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
              <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight text-white mb-3 tracking-tight">
                Our Work
              </h2>
              <p className="text-white/50 text-[clamp(1rem,1.5vw,1.1rem)] max-w-md">
                A cinematic showcase of our premium video production projects, tailored for high-impact storytelling.
              </p>
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
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:border-[#82C21C]/50 hover:bg-[#82C21C]/10 transition-all duration-300 group"
              aria-label="Previous reel"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform duration-300"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:border-[#82C21C]/50 hover:bg-[#82C21C]/10 transition-all duration-300 group"
              aria-label="Next reel"
            >
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </motion.div>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="w-full overflow-x-auto no-scrollbar pb-8 -mx-6 px-6 md:mx-0 md:px-0"
          ref={carouselRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          <div className="flex gap-6 w-max items-center">
            {[...REEL_LINKS, ...REEL_LINKS].map((link, index) => (
              <ReelCard key={index} link={link} index={index} />
            ))}
          </div>
        </motion.div>
      </div>

      <WebsitesCarousel />
      <WebAppsShowcase />

      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
