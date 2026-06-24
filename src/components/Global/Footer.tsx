import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
];

const SERVICES = [
  "Software Development",
  "Digital Marketing",
  "Automation Systems",
  "Business Expansion",
];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#04110F] pt-24 pb-8 border-t border-white/5">
      
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
        className="pointer-events-none absolute -bottom-[20%] -right-[10%] h-[50vh] w-[50vh] rounded-full bg-[#9CDF3B] opacity-[0.03] blur-[100px]" 
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 pb-20">
          
          {/* Col 1: Brand (Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="inline-block outline-none group">
              <span className="font-extrabold tracking-[-0.03em] text-white text-xl transition-colors group-hover:text-white/90">
                Click Aarambh
              </span>
            </Link>
            <p className="max-w-[250px] font-mono text-[11px] uppercase tracking-[0.1em] text-white/40 leading-relaxed">
              Technology-Driven<br />Growth Partner
            </p>
          </div>

          {/* Col 2: Navigation (Span 2) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
              Navigation
            </h4>
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className="text-[14px] text-white/70 transition-colors hover:text-[#9CDF3B] w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Services (Span 3) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
              Services
            </h4>
            <ul className="flex flex-col gap-4">
              {SERVICES.map((service) => (
                <li key={service} className="text-[14px] text-white/70">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact (Span 3) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
              Get In Touch
            </h4>
            <div className="flex flex-col gap-4">
              <a 
                href="mailto:hello@clickaarambh.com" 
                className="text-[14px] text-white/70 transition-colors hover:text-white"
              >
                hello@clickaarambh.com
              </a>
              <p className="text-[14px] text-white/50 italic">
                Let&apos;s build systems that scale.
              </p>
              <Link 
                href="/contact"
                className="group mt-2 inline-flex items-center gap-2 w-fit"
              >
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#9CDF3B] transition-colors group-hover:text-white">
                  Start Your Growth Journey
                </span>
                <span className="text-[#9CDF3B] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white">
                  →
                </span>
              </Link>
            </div>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="font-mono text-[10px] tracking-[0.1em] text-white/30 uppercase">
            © 2026 Click Aarambh Ventures
          </p>
          <p className="font-mono text-[10px] tracking-[0.1em] text-[#9CDF3B]/70 uppercase">
            Technology. Growth. Systems.
          </p>
        </div>

      </div>
    </footer>
  );
}
