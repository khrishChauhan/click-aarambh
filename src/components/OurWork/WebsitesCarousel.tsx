"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const WEBSITES = [
  {
    title: "Advance Speech & Hearing",
    image: "/websites/website-1.jpg",
    link: "https://www.advancespeechandhearingcentre.com/"
  },
  {
    title: "Vimochana",
    image: "/websites/website-2.jpg",
    link: "https://vimochana.co.in/"
  },
  {
    title: "One Point Architecture",
    image: "/websites/website-3.jpg",
    link: "https://www.onepointarchitecture.com/"
  },
  {
    title: "KDS Heart Hospital",
    image: "/websites/website-4.jpg",
    link: "https://kdshealthcare.com/"
  },
  {
    title: "Astro Bibhash Mishra",
    image: "/websites/website-5.jpg",
    link: "https://www.astrobibhashmishra.com/"
  },
  {
    title: "Vada Consultancy",
    image: "/websites/website-6.jpg",
    link: "https://vadacounsultancy.com/"
  },
  {
    title: "Begusarai Multispeciality Hospital",
    image: "/websites/website-7.jpg",
    link: "https://www.begusaraimultihospital.com/?v=1"
  },
  {
    title: "Embroidery Roomz",
    image: "/websites/website-8.jpg",
    link: "https://embroideryroomz.com/"
  },
  {
    title: "Agaon Construction",
    image: "/websites/website-9.jpg",
    link: "https://www.agaonconstruction.com/"
  },
  {
    title: "Rashtrahit 28 Marketing",
    image: "/websites/website-10.jpg",
    link: "https://www.rashtrahit28marketing.com/"
  }
];

function WebsiteCard({ website }: { website: typeof WEBSITES[0] }) {
  return (
    <a
      href={website.link}
      target="_blank"
      rel="noopener noreferrer"
      className="website-card relative block rounded-2xl flex-none shrink-0 group cursor-pointer border border-[#0D2E26]/10 overflow-hidden bg-white w-[calc(min(100vw,1400px)-48px)] md:w-[calc((min(100vw,1400px)-72px)/2)] lg:w-[calc((min(100vw,1400px)-96px)/3)] aspect-[4/3] transition-all duration-500 hover:scale-[1.02]"
      style={{
         boxShadow: "0 4px 20px -2px rgba(13, 46, 38, 0.05), 0 2px 6px -1px rgba(13, 46, 38, 0.03)"
      }}
    >
      {/* Thumbnail Image */}
      <img
        src={website.image}
        alt={website.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Gradient Overlay for bottom text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/30 to-transparent opacity-100 transition-opacity duration-500 z-10" />
      
      {/* Button Overlay on Hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none">
        <div className="px-6 py-3 rounded-full bg-[#0D2E26]/10 backdrop-blur-md shadow-[0_10px_30px_-10px_rgba(13,46,38,0.08),0_4px_6px_-2px_rgba(13,46,38,0.04)] border border-[#0D2E26]/20 text-[#0D2E26] font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[0.23,1,0.32,1]">
          Visit Website
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
        </div>
      </div>

      {/* Meta Info */}
      <div className="absolute bottom-6 left-6 right-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-[0.23,1,0.32,1] z-30">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-2 py-0.5 rounded-full bg-[#70BA28]/10 border border-[#70BA28]/30 text-[9px] font-bold tracking-wider uppercase text-[#70BA28] backdrop-blur-md">
            WEB DESIGN
          </span>
        </div>
        <h3 className="text-[#0D2E26] text-[1.2rem] font-bold leading-tight mb-1 drop-shadow-sm">
          {website.title}
        </h3>
      </div>
    </a>
  );
}

export default function WebsitesCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const getScrollAmount = () => {
    if (!carouselRef.current) return 0;
    const card = carouselRef.current.querySelector('.website-card') as HTMLElement;
    // exact width + 24px gap
    return card ? card.getBoundingClientRect().width + 24 : 0; 
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (!isHovered) {
      interval = setInterval(() => {
        if (carouselRef.current) {
          const scrollAmount = getScrollAmount();
          if (scrollAmount === 0) return;
          
          const originalScrollWidth = WEBSITES.length * scrollAmount;
          
          // Seamless snap
          if (carouselRef.current.scrollLeft >= originalScrollWidth - 5) {
            carouselRef.current.scrollLeft -= originalScrollWidth;
          }
          
          requestAnimationFrame(() => {
            carouselRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
          });
        }
      }, 3500); // 3.5 seconds auto-play
    }

    return () => clearInterval(interval);
  }, [isHovered]);

  const handlePrev = () => {
    if (carouselRef.current) {
      const scrollAmount = getScrollAmount();
      const originalScrollWidth = WEBSITES.length * scrollAmount;
      
      if (carouselRef.current.scrollLeft <= 5) {
        carouselRef.current.scrollLeft += originalScrollWidth;
      }
      
      requestAnimationFrame(() => {
        carouselRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      });
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      const scrollAmount = getScrollAmount();
      const originalScrollWidth = WEBSITES.length * scrollAmount;
      
      if (carouselRef.current.scrollLeft >= originalScrollWidth - 5) {
        carouselRef.current.scrollLeft -= originalScrollWidth;
      }
      
      requestAnimationFrame(() => {
        carouselRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
    }
  };

  return (
    <div className="container relative z-10 w-full max-w-[1400px] mx-auto px-6 mt-16 md:mt-32">
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
              Websites
            </h2>
            <p className="text-[#4B635D] text-[clamp(1rem,1.5vw,1.1rem)] max-w-md">
              High-performance, beautifully crafted web experiences built to convert and captivate.
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
            className="w-12 h-12 rounded-full border border-[#0D2E26]/10 bg-[#0D2E26]/5 backdrop-blur-md flex items-center justify-center text-[#0D2E26]/70 hover:text-[#0D2E26] hover:border-[#70BA28]/50 hover:bg-[#70BA28]/10 transition-all duration-300 group"
            aria-label="Previous website"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform duration-300"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-[#0D2E26]/10 bg-[#0D2E26]/5 backdrop-blur-md flex items-center justify-center text-[#0D2E26]/70 hover:text-[#0D2E26] hover:border-[#70BA28]/50 hover:bg-[#70BA28]/10 transition-all duration-300 group"
            aria-label="Next website"
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
        className="w-[calc(100%+3rem)] -mx-6 overflow-x-auto no-scrollbar pb-8 md:w-full md:mx-0"
        ref={carouselRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <div className="flex gap-6 w-max items-center px-6 md:px-0 after:content-[''] after:w-px md:after:hidden">
          {[...WEBSITES, ...WEBSITES, ...WEBSITES].map((website, index) => (
            <WebsiteCard key={index} website={website} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
