import type { Metadata } from "next";
import AboutHero from "@/components/About/AboutHero";

export const metadata: Metadata = {
  title: "About | Click Aarambh — Growth Infrastructure Architects",
  description:
    "We design connected growth systems that help ambitious businesses scale with clarity, speed, and measurable results. Meet the architects behind the engine.",
};

export default function AboutPage() {
  return (
    <main className="noise" aria-label="About Page">
      <AboutHero />

      {/* Remaining sections will be implemented in subsequent phases:
          - Mission (kinetic scroll typography)
          - Meet The Team (founder showcase)
          - Why Choose Us (sticky stacking cards)
          - Final CTA
      */}
    </main>
  );
}
