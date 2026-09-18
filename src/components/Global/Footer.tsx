import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  // TODO: Re-enable Work page in the future
  // { label: "Work", href: "/work" },
];

const SERVICES = [
  "Software Development",
  "Digital Marketing",
  "Automation Systems",
  "Business Growth Expansion",
];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#F4F7F5] pt-24 pb-8 border-t border-[#0D2E26]/10">
      
      {/* Background Architectural Elements */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Soft corner glow anchored to bottom right */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[20%] -right-[10%] h-[50vh] w-[50vh] rounded-full bg-[#70BA28] opacity-[0.03] blur-[100px]" 
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-2 gap-y-12 gap-x-8 lg:grid-cols-12 lg:gap-8 pb-20">
          
          {/* Col 1: Brand (Span 4) */}
          <div className="col-span-2 lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="inline-block outline-none group" aria-label="Click Aarambh Ventures Home">
              <Image 
                src="/images/click-aarambh-logo.png" 
                alt="Click Aarambh Ventures Logo" 
                width={240} 
                height={80} 
                className="h-10 md:h-12 w-auto object-contain transition-opacity duration-300 group-hover:opacity-90" 
              />
            </Link>
            <p className="max-w-[250px] font-mono text-[11px] uppercase tracking-[0.1em] text-[#4B635D] leading-relaxed">
              Technology-Driven<br />Growth Partner
            </p>
          </div>

          {/* Col 2: Navigation (Span 2) */}
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#2E4D45]">
              Navigation
            </h4>
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className="text-[14px] text-[#0D2E26]/70 transition-colors hover:text-[#70BA28] w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Services (Span 3) */}
          <div className="col-span-1 lg:col-span-3 flex flex-col gap-6">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#2E4D45]">
              Services
            </h4>
            <ul className="flex flex-col gap-4">
              {SERVICES.map((service) => (
                <li key={service} className="text-[14px] text-[#0D2E26]/70">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact (Span 3) */}
          <div className="col-span-2 lg:col-span-3 flex flex-col gap-6">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#2E4D45]">
              Get In Touch
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2.5">
                <a 
                  href="mailto:support@clickaarambh.com" 
                  className="group inline-flex items-center gap-2.5 text-[14px] text-[#0D2E26]/75 transition-colors hover:text-[#70BA28] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#70BA28] rounded-sm w-fit"
                  aria-label="Email support@clickaarambh.com"
                >
                  <svg 
                    className="w-4 h-4 text-[#70BA28] shrink-0 transition-transform duration-200 group-hover:scale-110" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>support@clickaarambh.com</span>
                </a>

                {/* Primary Contact */}
                <a 
                  href="tel:+919142030877" 
                  className="group inline-flex items-center gap-2.5 text-[14px] text-[#0D2E26]/75 transition-colors hover:text-[#70BA28] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#70BA28] rounded-sm w-fit"
                  aria-label="Call primary contact: +91 91420 30877"
                >
                  <svg 
                    className="w-4 h-4 text-[#70BA28] shrink-0 transition-transform duration-200 group-hover:scale-110" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-mono text-[13px] tracking-tight tabular-nums">+91 91420 30877</span>
                </a>

                {/* Secondary Contact */}
                <a 
                  href="tel:+917033556133" 
                  className="group inline-flex items-center gap-2.5 text-[14px] text-[#0D2E26]/75 transition-colors hover:text-[#70BA28] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#70BA28] rounded-sm w-fit"
                  aria-label="Call secondary contact: +91 70335 56133"
                >
                  <svg 
                    className="w-4 h-4 text-[#70BA28] shrink-0 transition-transform duration-200 group-hover:scale-110" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-mono text-[13px] tracking-tight tabular-nums">+91 70335 56133</span>
                </a>
              </div>

              <p className="text-[13px] text-[#4B635D] italic pt-1">
                Let&apos;s build systems that scale.
              </p>
              <Link 
                href="/contact"
                className="group mt-1 inline-flex items-center gap-2 w-fit"
              >
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#70BA28] transition-colors group-hover:text-[#0D2E26]">
                  Start Your Growth Journey
                </span>
                <span className="text-[#70BA28] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#0D2E26]">
                  →
                </span>
              </Link>
            </div>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#0D2E26]/10 pt-8 md:flex-row">
          <p className="font-mono text-[10px] tracking-[0.1em] text-[#2E4D45] uppercase">
            © 2026 Click Aarambh Ventures
          </p>
          <p className="font-mono text-[10px] tracking-[0.1em] text-[#2E4D45] uppercase">
            Technology. Growth. Systems.
          </p>
        </div>

      </div>
    </footer>
  );
}
