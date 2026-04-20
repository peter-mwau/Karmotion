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
    <div className="fixed inset-y-0 left-0 z-[100] flex items-center px-6 pointer-events-none">
      <LayoutGroup>
        <motion.nav
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="pointer-events-auto relative flex flex-col items-center gap-8 rounded-full border border-white/5 bg-black/20 p-4 backdrop-blur-md"
        >
          {/* Top Brand Hex */}
          <div className="mb-4 text-orange-500">
            <Hexagon
              size={20}
              fill="currentColor"
              fillOpacity={0.2}
              strokeWidth={1.5}
            />
          </div>

          {isMobile ? (
            /* Mobile Trigger */
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
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
          <div className="mt-4 h-24 w-[1px] bg-white/10 relative overflow-hidden">
            <motion.div
              className="absolute top-0 w-full bg-orange-500"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>
        </motion.nav>
      </LayoutGroup>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed inset-0 z-[-1] flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setIsOpen(false)}
                className="py-6 font-serif text-4xl font-black italic uppercase tracking-tighter text-white"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
