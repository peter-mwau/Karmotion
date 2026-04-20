import { motion } from "framer-motion";
import { OVERLAY_SECTIONS } from "./constants";

export const EngineeredSection = () => {
  return (
    <motion.div
      key="engineered-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex h-full w-full flex-col items-center justify-center py-16 text-center"
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-6 text-4xl font-semibold tracking-tight md:text-6xl">
          {OVERLAY_SECTIONS[1].title}
        </h2>
        <p className="text-lg text-muted-foreground">
          {OVERLAY_SECTIONS[1].description}
        </p>
      </div>
    </motion.div>
  );
};
