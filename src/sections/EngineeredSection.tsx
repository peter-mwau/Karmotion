import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const ENGINEERING_DATA = {
  title: "Precision Engineered",
  subtitle: "Mechanical Integrity // Tier 01",
  tagline: "Where mathematics meets momentum",
  description:
    "Beyond the surface lies a masterclass in mechanical harmony. Our chassis architecture is refined through thousands of hours of simulated velocity and real-world stress testing. Every component is toleranced to within 5 microns, ensuring zero-compromise performance delivery.",

  stats: [
    {
      label: "Rigidity",
      value: "45,000",
      unit: "Nm/deg",
      detail: "Torsional stiffness",
    },
    {
      label: "Power-to-Weight",
      value: "1.2",
      unit: "hp/kg",
      detail: "Class leading",
    },
    { label: "Aero Load", value: "1,850", unit: "kg", detail: "@ 200mph" },
    {
      label: "Response Time",
      value: "0.08",
      unit: "sec",
      detail: "Throttle to torque",
    },
  ],

  specs: [
    { name: "Chassis", value: "Carbon Monocoque", status: "Active" },
    {
      name: "Suspension",
      value: "Pushrod w/ Adaptive Dampers",
      status: "Calibrated",
    },
    {
      name: "Aerodynamics",
      value: "Active Front Splitter + Rear Wing",
      status: "Deployed",
    },
    { name: "Powertrain", value: "Mid-engine V8 Hybrid", status: "Nominal" },
  ],

  metrics: [
    { label: "Downforce", value: "1,200", unit: "kg", trend: "+12%" },
    { label: "Drag Coefficient", value: "0.32", unit: "Cd", trend: "-8%" },
    { label: "Lateral G", value: "2.1", unit: "g", trend: "+15%" },
  ],
};

export const EngineeredSection = () => {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse-following line effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  const lineX = useTransform(springX, (x) => x - 1);
  const lineY = useTransform(springY, (y) => y - 40);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      key="engineered-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-black/10 backdrop-blur-[5px]"
    >
      {/* Mouse-following crosshair line */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-px w-8 bg-orange-500/50 lg:block"
        style={{ x: lineX, y: lineY, rotate: 45 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-8 w-px bg-orange-500/50 lg:block"
        style={{ x: lineX, y: lineY, rotate: 45 }}
      />

      {/* Technical grid overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated scanning line */}
      <motion.div
        className="absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"
        animate={{
          top: ["0%", "100%", "0%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20">
        {/* Header Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-orange-500" />
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.5em] text-orange-500">
              {ENGINEERING_DATA.subtitle}
            </p>
            <div className="h-px w-8 bg-orange-500" />
          </div>

          <h2 className="font-serif text-6xl font-black italic tracking-tighter text-white md:text-8xl lg:text-9xl">
            {ENGINEERING_DATA.title.split(" ").map((word, i) => (
              <span
                key={i}
                className={`inline-block ${
                  i % 2 === 1
                    ? "bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent [-webkit-text-stroke:0px]"
                    : ""
                }`}
              >
                {word}{" "}
              </span>
            ))}
          </h2>

          <p className="mt-6 font-mono text-sm uppercase tracking-wider text-white/40">
            {ENGINEERING_DATA.tagline}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-20 grid grid-cols-2 gap-8 border-y border-white/10 py-12 md:grid-cols-4"
        >
          {ENGINEERING_DATA.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              onHoverStart={() => setHoveredStat(idx)}
              onHoverEnd={() => setHoveredStat(null)}
              className="relative text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.p
                className="font-mono text-3xl font-bold text-white md:text-4xl"
                animate={{
                  scale: hoveredStat === idx ? 1.1 : 1,
                  color: hoveredStat === idx ? "#f97316" : "#ffffff",
                }}
              >
                {stat.value}
                <span className="ml-1 text-sm text-white/40">{stat.unit}</span>
              </motion.p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-white/50">
                {stat.label}
              </p>
              <p className="text-[10px] text-white/30">{stat.detail}</p>

              {/* Animated underline */}
              {hoveredStat === idx && (
                <motion.div
                  layoutId="stat-underline"
                  className="absolute -bottom-3 left-0 right-0 h-px bg-orange-500"
                  transition={{ type: "spring", stiffness: 300 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Specs & Metrics Grid */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Technical Specifications */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-orange-500" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-orange-500">
                Core Architecture
              </h3>
            </div>

            <div className="space-y-4">
              {ENGINEERING_DATA.specs.map((spec, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex items-center justify-between border-b border-white/10 pb-3"
                >
                  <span className="font-mono text-sm text-white/60">
                    {spec.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-white">
                      {spec.value}
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-mono text-white/40">
                        {spec.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-orange-500" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-orange-500">
                Live Telemetry
              </h3>
            </div>

            <div className="space-y-6">
              {ENGINEERING_DATA.metrics.map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between text-sm">
                    <span className="font-mono text-white/60">
                      {metric.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-white">
                        {metric.value}
                        {metric.unit}
                      </span>
                      <span className="text-xs text-emerald-400">
                        {metric.trend}
                      </span>
                    </div>
                  </div>
                  <div className="relative h-px w-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(idx + 1) * 33}%` }}
                      transition={{ delay: 0.8, duration: 1 }}
                      className="absolute left-0 top-0 h-px bg-gradient-to-r from-orange-500 to-transparent"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Technical Callouts (Floating annotations) */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 0.6, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute left-4 top-1/4 hidden space-y-2 lg:block"
          >
            <div className="space-y-1">
              <p className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                Structural Integrity
              </p>
              <p className="font-mono text-xs font-bold text-orange-500">
                99.97%
              </p>
              <div className="h-16 w-px bg-gradient-to-b from-orange-500 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 0.6, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="absolute right-4 top-1/3 hidden space-y-2 text-right lg:block"
          >
            <div className="space-y-1">
              <p className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                Thermal Efficiency
              </p>
              <p className="font-mono text-xs font-bold text-orange-500">
                94.2%
              </p>
              <div className="ml-auto h-16 w-px bg-gradient-to-t from-orange-500 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-32 left-1/2 hidden -translate-x-1/2 space-y-2 lg:block"
          >
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-orange-500" />
              <p className="font-mono text-[8px] uppercase tracking-wider text-white/40">
                Active Aerodynamics: Engaged
              </p>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-orange-500" />
            </div>
          </motion.div>
        </div>

        {/* Bottom Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-6 text-[8px] font-mono uppercase tracking-wider text-white/30"
        >
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-emerald-500" />
            <span>Systems Nominal</span>
          </div>
          <div className="h-3 w-px bg-white/20" />
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-orange-500" />
            <span>Data Feed: Live</span>
          </div>
          <div className="h-3 w-px bg-white/20" />
          <div className="flex items-center gap-2">
            <span className="animate-pulse">●</span>
            <span>Telemetry Recording</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
