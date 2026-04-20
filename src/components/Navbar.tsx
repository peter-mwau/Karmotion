import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const NAV_ITEMS = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = ({ scrollProgress }: { scrollProgress: number }) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when on desktop
  if (isMobile === false && isOpen) {
    setIsOpen(false);
  }

  const isScrolling = scrollProgress > 0.1;

  return (
    <motion.nav
      className="fixed right-0 top-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {isMobile ? (
        // Mobile: Compact icon bubble at right edge
        <div className="flex flex-col items-end gap-2 p-4">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background transition-colors hover:bg-foreground/90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Expandable menu dropd own */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-16 flex flex-col gap-2 rounded-lg bg-foreground/95 p-2 backdrop-blur-sm"
              >
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-background/10 rounded"
                  >
                    {item.label}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        // Desktop: Horizontal nav bar that appears on scroll
        <motion.div
          className="flex items-center gap-8 px-8 py-4"
          animate={{
            opacity: isScrolling ? 1 : 0,
            pointerEvents: isScrolling ? "auto" : "none",
          }}
          transition={{ duration: 0.3 }}
        >
          {NAV_ITEMS.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-muted-foreground"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};
