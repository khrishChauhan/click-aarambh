"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const WEB_APPS = [
  {
    title: "ClickRM Dashboard",
    image: "/webapps/webapp-1.png",
    link: "https://click-aarambh-crm.vercel.app/dashboard"
  },
  {
    title: "Virtual CGO",
    image: "/webapps/webapp-2.jpg",
    link: "https://virtualcgo.vercel.app/"
  },
  {
    title: "ClinicOS Management",
    image: "/webapps/webapp-3.png",
    link: "https://clinicos-pink.vercel.app/"
  }
];

function WebAppCard({ app }: { app: typeof WEB_APPS[0] }) {
  return (
    <a
      href={app.link}
      target="_blank"
      rel="noopener noreferrer"
      className="webapp-card relative block rounded-2xl flex-none shrink-0 group cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden bg-[#0a201d]/60 backdrop-blur-xl w-[calc(min(100vw,1400px)-48px)] md:w-[calc((min(100vw,1400px)-72px)/2)] lg:w-full aspect-[4/3]"
      style={{
         // Glass card highlights
         boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.4)"
      }}
    >
      <img
        src={app.image}
        alt={app.title}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal"
      />
      
      {/* Gradient Overlay for bottom text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#061917]/95 via-[#061917]/20 to-transparent opacity-100 transition-opacity duration-500 z-10" />

      {/* Hover Overlay Button */}
      <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="px-6 py-3 rounded-full bg-[#82C21C]/90 backdrop-blur-md flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-[0.23,1,0.32,1] shadow-[0_0_30px_rgba(130,194,28,0.4)] text-[#061917] font-bold">
          <span>Visit Web App</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
      </div>

      {/* Meta Info */}
      <div className="absolute bottom-6 left-6 right-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-[0.23,1,0.32,1] z-30">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-2 py-0.5 rounded-full bg-[#82C21C]/10 border border-[#82C21C]/30 text-[9px] font-bold tracking-wider uppercase text-[#82C21C] backdrop-blur-md">
            WEB APP
          </span>
        </div>
        <h3 className="text-white text-[1.2rem] font-bold leading-tight mb-1 drop-shadow-sm">
          {app.title}
        </h3>
      </div>
    </a>
  );
}

export default function WebAppsShowcase() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll logic only applies to mobile/tablet where it's scrollable
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    // Simple check to see if we're on mobile/tablet (if scrollWidth > clientWidth, we need scrolling)
    const isScrollable = window.innerWidth < 1024; // Tailwind lg breakpoint

    if (!isHovered && isScrollable) {
      interval = setInterval(() => {
        if (carouselRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
          // If we reach the end, snap to start
          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            // Scroll by one card roughly (using clientWidth / 2 for estimate)
            carouselRef.current.scrollBy({ left: clientWidth * 0.8, behavior: "smooth" });
          }
        }
      }, 4000);
    }

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="container relative z-10 w-full max-w-[1400px] mx-auto px-6 mt-32">
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
              Web Apps
            </h2>
            <p className="text-white/50 text-[clamp(1rem,1.5vw,1.1rem)] max-w-md">
              Complex logic meets beautiful design. Custom platforms engineered for scale and performance.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Grid for Desktop, Carousel for Mobile */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        className="w-full overflow-x-auto no-scrollbar pb-8 -mx-6 px-6 md:mx-0 md:px-0"
        ref={carouselRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <div className="flex lg:grid lg:grid-cols-3 gap-6 w-max lg:w-full items-center">
          {WEB_APPS.map((app, index) => (
            <WebAppCard key={index} app={app} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
