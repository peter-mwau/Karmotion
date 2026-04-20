import { motion } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ScrollSectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  delay?: number;
}

export const ScrollSection = ({
  id,
  className = "",
  children,
  delay = 0,
}: ScrollSectionProps) => {
  const ref = useRef(null);

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: "easeOut",
      }}
      viewport={{
        once: true,
        margin: "-100px",
        amount: 0.3,
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};
