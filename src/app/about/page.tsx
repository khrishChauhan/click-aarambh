import type { Metadata } from "next";
import AboutHero from "@/components/About/AboutHero";
import Founders from "@/components/About/Founders";
import Pillars from "@/components/About/Pillars";
import AboutCTA from "@/components/About/AboutCTA";

export const metadata: Metadata = {
  title: "About | Click Aarambh Ventures — Growth Infrastructure Architects",
  description:
    "We design connected growth systems that help ambitious businesses scale with clarity, speed, and measurable results. Meet the architects behind the engine.",
};

export default function AboutPage() {
  return (
    <main className="noise bg-[#F8FAF8]" aria-label="About Page">
      {/* 1 — Hero */}
      <AboutHero />

      {/* 3 — Meet The Team (Founder Showcase) */}
      <Founders />

      {/* 4 — Why Businesses Choose Click Aarambh Ventures */}
      <Pillars />

      {/* 5 — Final CTA */}
      <AboutCTA />
    </main>
  );
}
