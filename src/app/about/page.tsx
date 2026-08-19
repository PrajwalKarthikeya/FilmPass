import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { StorySection } from "@/components/about/StorySection";
import { PhilosophyGrid } from "@/components/about/PhilosophyGrid";
import { HowItWorksTimeline } from "@/components/about/HowItWorksTimeline";
import { FeatureGrid } from "@/components/about/FeatureGrid";
import { TechnologyGrid } from "@/components/about/TechnologyGrid";
import { DesignPhilosophy } from "@/components/about/DesignPhilosophy";
import { OpenSourceCard } from "@/components/about/OpenSourceCard";
import { FAQAccordion } from "@/components/about/FAQAccordion";
import { RoadmapTimeline } from "@/components/about/RoadmapTimeline";
import { ContactSection } from "@/components/about/ContactSection";
import { TMDBAttribution } from "@/components/about/TMDBAttribution";

export const metadata = {
  title: 'About | FilmPass',
  description: 'The story and philosophy behind FilmPass.',
};

export default function AboutPage() {
  return (
    <main className="flex-1 w-full min-h-screen bg-[#050505] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      <div className="flex-1 w-full pt-24">
        
        {/* Intro */}
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <AboutHero />
        </div>
        
        {/* Editorial Story */}
        <StorySection />
        <PhilosophyGrid />
        
        {/* Mechanics & Features */}
        <HowItWorksTimeline />
        <FeatureGrid />

        {/* Tech & Design */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <TechnologyGrid />
        <DesignPhilosophy />

        {/* Community & Future */}
        <OpenSourceCard />
        <RoadmapTimeline />
        <FAQAccordion />
        <ContactSection />

        {/* Legal */}
        <TMDBAttribution />

      </div>
      
      <Footer />
    </main>
  );
}
