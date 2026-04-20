import { motion } from "framer-motion";
import { ScrollFrameSequence } from "@/components/ScrollFrameSequence";
import { Navbar } from "@/components/Navbar";
import { ScrollSection } from "@/components/ScrollSection";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

const FRAME_COUNT = 603;
const framePath = (i: number) =>
  `/frames/frame_${String(i).padStart(4, "0")}.jpg`;

const SECTIONS = [
  {
    id: "hero",
    title: "Built before your eyes",
    subtitle: "V12 · Hand assembled",
  },
  {
    id: "engineered",
    title: "Engineered, end to end",
    description:
      "Every component crafted, every motion deliberate. Scroll to rebuild.",
  },
  {
    id: "features",
    title: "Crafted with precision",
    description:
      "Every frame, every interaction, optimized for performance and aesthetics.",
  },
  {
    id: "experience",
    title: "The experience",
    description:
      "Watch as your scroll brings the entire sequence to life. From assembly to completion, every frame syncs perfectly with your interaction.",
  },
];

const Index = () => {
  const scrollProgress = useScrollProgress();

  return (
    <main className="relative bg-black text-foreground">
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background via-background/50 to-background pointer-events-none" />

      {/* Navigation with scroll progress */}
      <Navbar scrollProgress={scrollProgress} />

      {/* ===== SECTION 1: SCROLL FRAME SEQUENCE ===== */}
      <ScrollFrameSequence
        frameCount={FRAME_COUNT}
        framePath={framePath}
        className="relative"
      />

      {/* Hero overlay on scroll sequence */}
      <div className="pointer-events-none fixed inset-0 z-10">
        <HeroSection scrollProgress={scrollProgress} />
      </div>

      {/* ===== SECTION 2: ENGINEERED ===== */}
      <ScrollSection
        id={SECTIONS[1].id}
        className="relative z-20 bg-background py-32"
      >
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-6 text-4xl font-semibold tracking-tight md:text-6xl">
            {SECTIONS[1].title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {SECTIONS[1].description}
          </p>
        </div>
      </ScrollSection>

      {/* ===== SECTION 3: FEATURES ===== */}
      <ScrollSection
        id={SECTIONS[2].id}
        className="relative z-20 bg-background/50 py-32 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-5xl">
              {SECTIONS[2].title}
            </h2>
            <p className="text-muted-foreground">{SECTIONS[2].description}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "603 Frames",
                description:
                  "Smooth, hand-assembled sequences capturing every detail",
              },
              {
                title: "Scroll Driven",
                description:
                  "Motion tied directly to scroll progress for perfect timing",
              },
              {
                title: "Responsive",
                description:
                  "Optimized for all screen sizes with adaptive layouts",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="rounded-lg border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm"
              >
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* ===== SECTION 4: EXPERIENCE ===== */}
      <ScrollSection
        id={SECTIONS[3].id}
        className="relative z-20 border-t border-foreground/10 bg-background py-32"
      >
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-6 text-3xl font-semibold tracking-tight md:text-5xl">
            {SECTIONS[3].title}
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            {SECTIONS[3].description}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg bg-foreground px-8 py-3 font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Learn More
          </motion.button>
        </div>
      </ScrollSection>

      {/* ===== SECTION 5: CTA ===== */}
      <ScrollSection
        id="cta"
        className="relative z-20 bg-background/80 py-32 backdrop-blur-sm border-t border-foreground/10"
      >
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-6 text-3xl font-semibold tracking-tight md:text-5xl">
            Ready to explore?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Start scrolling and experience the journey. Every frame tells a
            story.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg bg-foreground px-8 py-3 font-medium text-background"
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg border border-foreground px-8 py-3 font-medium text-foreground hover:bg-foreground/10"
            >
              Learn More
            </motion.button>
          </div>
        </div>
      </ScrollSection>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-20 bg-black border-t border-foreground/10 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Karmotion. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
};

const HeroSection = ({ scrollProgress }: { scrollProgress: number }) => {
  const titleOpacity = Math.max(0, 1 - scrollProgress * 2);
  const titleScale = Math.max(0.9, 1 - scrollProgress * 0.1);

  return (
    <div className="flex h-full w-full flex-col items-center justify-between py-16 text-center">
      <motion.div
        className="px-6"
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
        }}
      >
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {SECTIONS[0].subtitle}
        </p>
        <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
          {SECTIONS[0].title}
        </h1>
      </motion.div>

      <motion.div
        className="flex flex-col items-center gap-2 text-muted-foreground"
        animate={{
          opacity: Math.max(0, 1 - scrollProgress),
          y: scrollProgress * 20,
        }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="h-10 w-px bg-foreground/30" />
      </motion.div>
    </div>
  );
};

export default Index;
