"use client";

export const Footer = () => {
  return (
    <footer
      className="relative bg-white border-t border-white/[0.05] py-14 noise overflow-hidden"
      aria-label="Footer"
    >
      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#70BA28]/20 to-transparent" />

      <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* Brand */}
        <div>
          <a
            href="#"
            className="text-xl font-bold tracking-tight text-[#0D2E26] focus-visible:ring-2 focus-visible:ring-[#70BA28] rounded"
            aria-label="Click Aarambh Ventures Home"
          >
            Click <span className="text-[#70BA28]">Aarambh</span>
          </a>
          <p className="text-sm text-[#2E4D45] mt-3 leading-relaxed max-w-xs">
            Engineered for measurable growth. Not a tool. A system.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#2E4D45] mb-1">Navigate</span>
          {["Approach", "Capabilities", "Impact"].map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-[#4B635D] hover:text-[#0D2E26] transition-colors focus-visible:ring-2 focus-visible:ring-[#70BA28] rounded"
              style={{ transition: "color 0.2s ease" }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-start md:items-end gap-4">
          <button
            className="px-6 py-3 text-sm font-bold uppercase tracking-wider bg-[#70BA28] text-[#061917] rounded-lg focus-visible:ring-2 focus-visible:ring-[#70BA28] focus-visible:ring-offset-2 focus-visible:ring-offset-[#061917]"
            style={{ transition: "background-color 0.2s ease, box-shadow 0.2s ease" }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 30px rgba(112,186,40,0.4)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
          >
            Book Growth Audit
          </button>
          <p className="text-xs text-[#2E4D45]">
            © {new Date().getFullYear()} Click Aarambh Ventures
          </p>
        </div>
      </div>
    </footer>
  );
};
