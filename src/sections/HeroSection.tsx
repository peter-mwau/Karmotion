import { motion } from "framer-motion";
import { OVERLAY_SECTIONS } from "./constants";

export const HeroSection = ({ progress }: { progress: number }) => {
  const titleOpacity = Math.max(0, 1 - progress * 2);
  const titleScale = Math.max(0.9, 1 - progress * 0.1);

  return (
    <motion.div
      key="hero-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex h-full w-full flex-col items-center justify-between py-16 text-center"
    >
      <motion.div
        className="px-6"
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
        }}
      >
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {OVERLAY_SECTIONS[0].subtitle}
        </p>
        <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
          {OVERLAY_SECTIONS[0].title}
        </h1>
      </motion.div>

      <motion.div
        className="flex flex-col items-center gap-2 text-muted-foreground"
        animate={{
          opacity: Math.max(0, 1 - progress),
          y: progress * 20,
        }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="h-10 w-px bg-foreground/30" />
      </motion.div>
    </motion.div>
  );
};
