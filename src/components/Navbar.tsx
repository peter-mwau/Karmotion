import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Menu,
  X,
  LayoutDashboard,
  Info,
  PlugZap,
  Phone,
  Hexagon,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const NAV_ITEMS = [
  { label: "Home", href: "#", icon: LayoutDashboard },
  { label: "About", href: "#about", icon: Info },
  { label: "Features", href: "#features", icon: PlugZap },
  { label: "Contact", href: "#contact", icon: Phone },
];

export const Navbar = ({ scrollProgress }: { scrollProgress: number }) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  // Determine active item based on scroll progress (rough mapping)
  const activeIndex = Math.min(
    Math.floor(scrollProgress * NAV_ITEMS.length),
    NAV_ITEMS.length - 1,
  );
  const activeItem = NAV_ITEMS[activeIndex].label;

  return (
    <div className="fixed inset-y-0 right-0 z-100 flex items-start justify-end px-3 py-4 pointer-events-none md:left-0 md:right-auto md:items-center md:px-6 md:py-0">
      <LayoutGroup>
        <motion.nav
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={`pointer-events-auto relative flex flex-col items-center border border-white/5 bg-black/20 backdrop-blur-md ${isMobile ? "w-18 rounded-4xl p-3" : "gap-8 rounded-full p-4"}`}
        >
          {/* Top Brand Hex */}
          <div className={`${isMobile ? "mb-3" : "mb-4"} text-orange-500`}>
            <Hexagon
              size={isMobile ? 18 : 20}
              fill="currentColor"
              fillOpacity={0.2}
              strokeWidth={1.5}
            />
          </div>

          {isMobile ? (
            <div className="flex w-full flex-col items-center gap-3">
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close navigation" : "Open navigation"}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10"
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="flex w-full flex-col items-center gap-3 pb-2"
                  >
                    {NAV_ITEMS.map((item) => {
                      const isActive = activeItem === item.label;
                      const Icon = item.icon;

                      return (
                        <motion.a
                          key={item.label}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          whileTap={{ scale: 0.96 }}
                          className="relative flex h-11 w-11 items-center justify-center rounded-full transition-colors"
                        >
                          <motion.div
                            layoutId={
                              isActive ? "nav-pill-mobile-active" : undefined
                            }
                            className={`absolute inset-0 rounded-full ${isActive ? "bg-orange-500" : "bg-white/10"}`}
                          />
                          <Icon
                            size={17}
                            className={`relative z-10 ${isActive ? "text-black" : "text-white/45"}`}
                            strokeWidth={1.5}
                          />
                        </motion.a>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Desktop Vertical Items */
            <div className="flex flex-col gap-6">
              {NAV_ITEMS.map((item) => {
                const isActive = activeItem === item.label;
                const Icon = item.icon;

                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onMouseEnter={() => setHovered(item.label)}
                    onMouseLeave={() => setHovered(null)}
                    className="relative flex h-12 w-12 items-center justify-center rounded-full transition-colors"
                  >
                    {/* Active/Hover Background Pill */}
                    {(isActive || hovered === item.label) && (
                      <motion.div
                        layoutId="nav-pill"
                        className={`absolute inset-0 rounded-full ${isActive ? "bg-orange-500" : "bg-white/10"}`}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}

                    <Icon
                      size={18}
                      className={`relative z-10 transition-colors duration-300 ${isActive ? "text-black" : "text-white/40"}`}
                      strokeWidth={1.5}
                    />

                    {/* Tooltip Label */}
                    <AnimatePresence>
                      {hovered === item.label && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 20 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="absolute left-full ml-4 whitespace-nowrap rounded-sm bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-black"
                        >
                          {item.label}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.a>
                );
              })}
            </div>
          )}

          {/* Vertical Progress Line */}
          <div
            className={`relative overflow-hidden bg-white/10 ${isMobile ? "mt-3 h-20 w-px" : "mt-4 h-24 w-px"}`}
          >
            <motion.div
              className="absolute top-0 w-full bg-orange-500"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>
        </motion.nav>
      </LayoutGroup>
    </div>
  );
};
