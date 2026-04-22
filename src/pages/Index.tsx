import { AnimatePresence } from "framer-motion";
import { ScrollFrameSequence } from "@/components/ScrollFrameSequence";
import { Navbar } from "@/components/Navbar";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import {
  HeroSection,
  EngineeredSection,
  FeaturesSection,
  ExperienceSection,
  FooterSection,
} from "@/sections";

const FRAME_COUNT = 603;
const framePath = (i: number) =>
  `/frames/frame_${String(i).padStart(4, "0")}.jpg`;

const Index = () => {
  const scrollProgress = useScrollProgress();

  return (
    <main className="relative bg-black text-foreground">
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10 bg-linear-to-b from-background via-background/50 to-background pointer-events-none" />

      {/* Navigation with scroll progress */}
      <Navbar scrollProgress={scrollProgress} />

      {/* ===== SCROLL FRAME SEQUENCE (Main scrollable container) ===== */}
      <ScrollFrameSequence
        frameCount={FRAME_COUNT}
        framePath={framePath}
        className="relative"
      />

      {/* ===== OVERLAY SECTIONS (Render on top of frames) ===== */}
      <div className="pointer-events-none fixed inset-0 z-10">
        <AnimatePresence mode="wait">
          {scrollProgress < 0.25 && (
            <HeroSection key="hero" progress={scrollProgress} />
          )}
          {scrollProgress >= 0.25 && scrollProgress < 0.5 && (
            <EngineeredSection key="engineered" />
          )}
          {scrollProgress >= 0.5 && scrollProgress < 0.75 && (
            <FeaturesSection key="features" />
          )}
          {scrollProgress >= 0.75 && scrollProgress < 0.9 && (
            <ExperienceSection key="experience" />
          )}
          {scrollProgress >= 0.9 && <FooterSection key="footer" />}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Index;
