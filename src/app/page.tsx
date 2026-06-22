import Hero from "@/components/Hero/Hero";
import { BentoGrid } from "@/components/GrowthEcosystem/BentoGrid";
import { MidPageCTA } from "@/components/MicroConversions/MidPageCTA";
import { CoreCapabilities } from "@/components/CoreCapabilities/CoreCapabilities";
import { StickyNarrative } from "@/components/Storytelling/StickyNarrative";
import { ImpactStories } from "@/components/Credibility/ImpactStories";
import { ParadigmShift } from "@/components/Credibility/ParadigmShift";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {
  return (
    <main className="bg-[#061917]">
      {/* Act 1: Hook */}
      <Hero />

      {/* Act 2: Ecosystem Overview */}
      <BentoGrid />

      {/* Act 3: Mid-page conversion — early intent capture */}
      <MidPageCTA />

      {/* Act 4: Philosophy — Tools vs Systems */}
      <StickyNarrative />

      {/* Act 5: The Paradigm Shift — emotional transformation story */}
      <ParadigmShift />

      {/* Act 6: Proof of Architecture */}
      <ImpactStories />

      {/* Act 7: Capabilities — GSAP horizontal scroll */}
      <CoreCapabilities />

      <Footer />
    </main>
  );
}
