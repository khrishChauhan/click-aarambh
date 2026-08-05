import Hero from "@/components/Hero/Hero";
import Marquee from "@/components/Home/Marquee";
import OurWork from "@/components/OurWork/OurWork";
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
      <Marquee />
      <OurWork />

      {/* Act 2: Ecosystem Overview */}
      {/* TODO: Hidden for now, re-enable later
      <BentoGrid />
      */}

      {/* Act 3: Mid-page conversion — early intent capture */}
      {/* TODO: Hidden for now, re-enable later
      <MidPageCTA />
      */}

      {/* Act 4: Philosophy — Tools vs Systems */}
      {/* TODO: Hidden for now, re-enable later
      <StickyNarrative />
      */}

      {/* Act 5: The Paradigm Shift — emotional transformation story */}
      <ParadigmShift />

      {/* Act 6: Proof of Architecture */}
      {/* TODO: Hidden for now, re-enable later
      <ImpactStories />
      */}

      {/* Act 7: Capabilities — GSAP horizontal scroll */}
      {/* TODO: Hidden for now, re-enable later
      <CoreCapabilities />
      */}

      {/* TODO: Hidden for now, re-enable later
      <Footer />
      */}
    </main>
  );
}
