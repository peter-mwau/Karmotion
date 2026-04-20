import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Gauge, Zap, Crown, Gem, Users } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const EXPERIENCES = [
  {
    id: "performance",
    icon: Gauge,
    label: "Raw Performance",
    title: "Precision Engineering",
    description:
      "Every vehicle in our collection undergoes a rigorous multi-point mechanical calibration to ensure peak velocity and handling. Our engineers spend 200+ hours on each drivetrain, optimizing every component for instantaneous response and unrelenting power delivery.",
    stat: "0.2s Shift Speed",
    statDetail: "Dual-clutch engagement",
    longStat: "620 HP",
    longStatLabel: "Peak Power",
    color: "orange",
    features: [
      "Carbon ceramic brakes",
      "Adaptive suspension",
      "Launch control",
    ],
    testimonial:
      "The most responsive drivetrain I've ever experienced. — Chris Harris",
  },
  {
    id: "luxury",
    icon: Crown,
    label: "Premium Comfort",
    title: "Bespoke Interiors",
    description:
      "Experience hand-stitched leathers sourced from Alpine tanneries and rare timber accents from sustainable forests. Each cabin is tailored to your preferences, with over 50 customization options including ambient lighting schemes, embroidered headrests, and personalized sill plates.",
    stat: "Grade A+ Leather",
    statDetail: "Full-grain Italian",
    longStat: "50+",
    longStatLabel: "Customization Options",
    color: "amber",
    features: ["Massage seats", "Premium audio", "Four-zone climate"],
    testimonial:
      "It's not just a car; it's a mobile sanctuary. — Architectural Digest",
  },
  {
    id: "tech",
    icon: Zap,
    label: "Future Tech",
    title: "Seamless Integration",
    description:
      "Equipped with the latest in autonomous assistance and intuitive infotainment. Our proprietary AI learns your driving patterns, adjusting torque vectoring and suspension settings in real-time. The holographic HUD projects navigation, performance data, and media directly onto the windshield.",
    stat: "Level 3 Autonomy",
    statDetail: "Hands-free driving",
    longStat: "800+",
    longStatLabel: "Sensor Range (meters)",
    color: "blue",
    features: ["Over-the-air updates", "Biometric access", "AI co-pilot"],
    testimonial: "The future of automotive interfaces is here. — Wired",
  },
  {
    id: "heritage",
    icon: Gem,
    label: "Timeless Heritage",
    title: "Legacy Collection",
    description:
      "We honor automotive history by restoring and modernizing iconic classics. Each heritage model undergoes a 2,000-hour restoration process, blending original character with contemporary reliability and safety. Limited to 25 units per model year.",
    stat: "2,000 Hours",
    statDetail: "Per restoration",
    longStat: "25 Units",
    longStatLabel: "Annual production",
    color: "emerald",
    features: ["Original chassis", "Modern drivetrain", "Certified authentic"],
    testimonial: "A perfect marriage of past and future. — Top Gear",
  },
  {
    id: "exclusive",
    icon: Users,
    label: "Private Access",
    title: "Concierge Program",
    description:
      "Join an elite community of collectors with our white-glove concierge service. Enjoy priority access to limited editions, private viewing events at our hyper-secure vaults, and curated driving experiences on closed courses worldwide.",
    stat: "24/7 Support",
    statDetail: "Dedicated specialist",
    longStat: "12+",
    longStatLabel: "Global events yearly",
    color: "purple",
    features: ["Private viewings", "Track days", "Collector meetups"],
    testimonial: "The ultimate ownership experience. — Robb Report",
  },
];

export const ExperienceSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax for background effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const bgX = useTransform(springX, [-300, 300], [50, -50]);
  const bgY = useTransform(springY, [-200, 200], [30, -30]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left - rect.width / 2) / 4;
        const y = (e.clientY - rect.top - rect.height / 2) / 4;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const active = EXPERIENCES[activeIndex];
  const Icon = active.icon;

  return (
    <motion.div
      ref={containerRef}
      key="experience-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-black/10 backdrop-blur-[2px]"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ x: bgX, y: bgY }}
      >
        <div
          className={`absolute top-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-${active.color}-500/20 blur-3xl`}
        />
        <div
          className={`absolute bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-${active.color}-500/10 blur-3xl`}
        />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.5em] text-orange-500">
            The Karmotion Standard
          </p>
          <h2 className="font-serif text-6xl font-bold tracking-tighter text-white md:text-8xl">
            Beyond the{" "}
            <span className="relative inline-block">
              Drive
              <motion.span
                className="absolute -bottom-3 left-0 h-px w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/50">
            Discover a new paradigm of automotive excellence where performance,
            luxury, and innovation converge.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid gap-16 lg:grid-cols-[1fr_480px]">
          {/* LEFT: Dynamic Content Display */}
          <div className="space-y-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                {/* Icon and Label */}
                <div className="flex items-center gap-4">
                  <div className={`rounded-full bg-${active.color}-500/20 p-3`}>
                    <Icon className={`h-8 w-8 text-${active.color}-500`} />
                  </div>
                  <div>
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-white/40">
                      {active.label}
                    </p>
                    <h3 className="font-serif text-4xl font-bold text-white md:text-5xl">
                      {active.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-lg leading-relaxed text-white/70">
                  {active.description}
                </p>

                {/* Key Stats Grid */}
                <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
                  <div>
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-orange-500">
                      Signature Spec
                    </p>
                    <p className="mt-2 font-serif text-3xl font-bold text-white">
                      {active.stat}
                    </p>
                    <p className="text-sm text-white/40">{active.statDetail}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-orange-500">
                      Key Metric
                    </p>
                    <p className="mt-2 font-serif text-3xl font-bold text-white">
                      {active.longStat}
                    </p>
                    <p className="text-sm text-white/40">
                      {active.longStatLabel}
                    </p>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-white/40">
                    Signature Features
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {active.features.map((feature, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-sm"
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-2xl border-l-4 border-orange-500 bg-white/5 p-6 backdrop-blur-sm"
                >
                  <p className="italic text-white/60">"{active.testimonial}"</p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: Interactive Experience Selector */}
          <div className="flex flex-col gap-3">
            {EXPERIENCES.map((item, idx) => {
              const ItemIcon = item.icon;
              const isActive = activeIndex === idx;
              const isHovered = hoveredIndex === idx;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  onHoverStart={() => setHoveredIndex(idx)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ${
                    isActive
                      ? `bg-gradient-to-r from-${item.color}-500/20 to-transparent shadow-lg shadow-${item.color}-500/10`
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {/* Animated border */}
                  {isActive && (
                    <motion.div
                      layoutId="active-border"
                      className={`absolute inset-0 rounded-2xl border-2 border-${item.color}-500`}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  <div className="relative p-6 text-left">
                    <div className="flex items-center gap-4">
                      <div
                        className={`rounded-full p-2 transition-all duration-300 ${
                          isActive
                            ? `bg-${item.color}-500/30`
                            : "bg-white/10 group-hover:bg-white/20"
                        }`}
                      >
                        <ItemIcon
                          className={`h-5 w-5 transition-colors ${
                            isActive
                              ? `text-${item.color}-500`
                              : "text-white/60"
                          }`}
                        />
                      </div>
                      <div>
                        <p
                          className={`text-[10px] font-bold uppercase tracking-wider ${
                            isActive
                              ? `text-${item.color}-500`
                              : "text-white/40"
                          }`}
                        >
                          {item.label}
                        </p>
                        <p
                          className={`font-serif text-xl font-bold transition-colors ${
                            isActive
                              ? "text-white"
                              : "text-white/80 group-hover:text-white"
                          }`}
                        >
                          {item.title}
                        </p>
                      </div>
                    </div>

                    {/* Expand on hover */}
                    <AnimatePresence>
                      {isHovered && !isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 overflow-hidden"
                        >
                          <p className="text-sm text-white/50">
                            {item.description.split(" ").slice(0, 12).join(" ")}
                            ...
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-orange-500" />
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.4em] text-white/30">
              System Status: Operational
            </span>
          </div>

          <div className="flex gap-6">
            {["Specs", "Heritage", "Inquiry", "Configurator"].map((item) => (
              <motion.span
                key={item}
                whileHover={{ color: "#fff" }}
                className="cursor-pointer font-mono text-[9px] font-bold uppercase tracking-[0.4em] text-white/30 transition-colors hover:text-white"
              >
                {item}
              </motion.span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-6 w-6 rounded-full border border-white/20 bg-gradient-to-br from-white/10 to-transparent"
                />
              ))}
            </div>
            <span className="font-mono text-[9px] text-white/30">
              +12.4k members
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
