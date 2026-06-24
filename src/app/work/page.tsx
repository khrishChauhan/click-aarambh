import { Metadata } from "next";
import WorkHero from "@/components/Work/WorkHero";
import FeaturedCaseStudy from "@/components/Work/FeaturedCaseStudy";
import ProcessTimeline from "@/components/Work/ProcessTimeline";
import ImpactMetrics from "@/components/Work/ImpactMetrics";
import WorkGrid from "@/components/Work/WorkGrid";
import IndustryWall from "@/components/Work/IndustryWall";
import WorkCTA from "@/components/Work/WorkCTA";

export const metadata: Metadata = {
  title: "Work | Click Aarambh",
  description: "Systems that yield outcomes. Explore our enterprise architecture, deployment scale, and quantifiable ROI.",
};

export default function WorkPage() {
  return (
    <main className="noise bg-[#04110F]" aria-label="Work Page">
      {/* 1 — Hero */}
      <WorkHero />

      {/* 2 — Featured Case Study */}
      <FeaturedCaseStudy />

      {/* 3 — Process Timeline */}
      <ProcessTimeline />

      {/* 4 — Impact Metrics */}
      <ImpactMetrics />

      {/* 5 — Additional Work Grid */}
      <WorkGrid />

      {/* 6 — Industries Wall */}
      <IndustryWall />

      {/* 7 — Final CTA */}
      <WorkCTA />
    </main>
  );
}
