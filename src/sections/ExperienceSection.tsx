import { motion } from "framer-motion";
import { OVERLAY_SECTIONS } from "./constants";

export const ExperienceSection = () => {
  return (
    <motion.div
      key="experience-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex h-full w-full flex-col items-center justify-center py-16 text-center pointer-events-auto"
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-6 text-3xl font-semibold tracking-tight md:text-5xl">
          {OVERLAY_SECTIONS[3].title}
        </h2>
        <p className="mb-8 text-lg text-muted-foreground">
          {OVERLAY_SECTIONS[3].description}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-lg bg-foreground px-8 py-3 font-medium text-background transition-colors hover:bg-foreground/90"
        >
          Learn More
        </motion.button>
      </div>
    </motion.div>
  );
};
