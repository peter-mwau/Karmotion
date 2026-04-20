import { motion } from "framer-motion";
import { OVERLAY_SECTIONS } from "./constants";

export const FeaturesSection = () => {
  const section = OVERLAY_SECTIONS[2];

  return (
    <motion.div
      key="features-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex h-full w-full flex-col items-center justify-center py-16 text-center pointer-events-auto"
    >
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-5xl">
          {section.title}
        </h2>
        <p className="mb-12 text-muted-foreground">{section.description}</p>

        <div className="grid gap-8 md:grid-cols-3">
          {section.features?.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
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
    </motion.div>
  );
};
