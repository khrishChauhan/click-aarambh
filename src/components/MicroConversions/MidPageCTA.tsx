export const MidPageCTA = () => {
  return (
    <section 
      className="py-24 bg-white border-y border-[#0D2E26]/10 flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
      aria-labelledby="audit-heading"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#70BA28]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-2xl">
        <h2 id="audit-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-[#0D2E26] mb-6">
          Experiencing scaling friction?
        </h2>
        <p className="text-lg text-[#0D2E26]/70 mb-10 leading-relaxed">
          Don't wait for systems to break. Let our architects review your software stack and customer acquisition models to identify the bottlenecks holding you back.
        </p>
        <button 
          className="px-8 py-4 text-sm font-semibold tracking-wide text-[#0D2E26] bg-transparent border border-[#82C21C] rounded hover:bg-[#70BA28] hover:text-[#061917] focus:outline-none focus:ring-2 focus:ring-[#82C21C] focus:ring-offset-2 focus:ring-offset-[#082220] uppercase"
          style={{ transition: "background-color 0.2s ease, color 0.2s ease" }}
        >
          Book a Free Growth Audit
        </button>
      </div>
    </section>
  );
};
