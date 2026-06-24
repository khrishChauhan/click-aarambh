import type { Metadata } from "next";
import AboutHero from "@/components/About/AboutHero";
import Mission from "@/components/About/Mission";
import Founders from "@/components/About/Founders";
import Pillars from "@/components/About/Pillars";
import AboutCTA from "@/components/About/AboutCTA";

export const metadata: Metadata = {
  title: "About | Click Aarambh — Growth Infrastructure Architects",
  description:
    "We design connected growth systems that help ambitious businesses scale with clarity, speed, and measurable results. Meet the architects behind the engine.",
};

export default function AboutPage() {
  return (
    <main className="noise bg-[#001715]" aria-label="About Page">
      {/* 1 — Hero */}
      <AboutHero />

      {/* 2 — Our Mission */}
      <Mission />

      {/* 3 — Meet The Team (Founder Showcase) */}
      <Founders />

      {/* 4 — Why Businesses Choose Click Aarambh */}
      <Pillars />

      {/* 5 — Final CTA */}
      <AboutCTA />
    </main>
  );
}
