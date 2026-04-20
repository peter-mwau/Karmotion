import { motion } from "framer-motion";
import { Cpu, Wind, Activity, ChevronRight } from "lucide-react";

// Mock data to replace the constant import for demonstration
const FEATURES = [
  {
    title: "Aerodynamics",
    description:
      "Active carbon-fibre splitters that adapt to downforce requirements in real-time.",
    icon: Wind,
    stat: "1.2kg Drag Reduc.",
  },
  {
    title: "Neural Drive",
    description:
      "AI-driven suspension that predicts road surfaces 500m before impact.",
    icon: Cpu,
    stat: "1ms Response",
  },
  {
    title: "Telemetry",
    description:
      "Live cloud-synced performance data streamed directly to your device.",
    icon: Activity,
    stat: "5G Connected",
  },
];

export const FeaturesSection = () => {
  return (
    <motion.div
      key="features-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // Reduced backdrop-blur to keep background visible
      className="relative flex h-full w-full flex-col items-center justify-center bg-black/10 backdrop-blur-[2px]"
    >
      {/* HUD-style Decorative Grid (Very Faint) */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 w-full">
        {/* Section Header: Left Aligned for "Technical Dossier" look */}
        <div className="mb-16 border-l-2 border-orange-500 pl-6">
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-[10px] uppercase tracking-[0.5em] text-orange-500 font-bold mb-2"
          >
            Engineering Specs // 02
          </motion.p>
          <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tighter text-white italic">
            Core{" "}
            <span className="text-transparent [-webkit-text-stroke:1px_white]">
              Innovations
            </span>
          </h2>
        </div>

        {/* Feature HUD Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              className="group relative overflow-hidden border border-white/10 bg-black/20 p-8 transition-all duration-300"
            >
              {/* Animated Corner Accent */}
              <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                <feature.icon size={16} className="text-orange-500" />
              </div>

              <div className="space-y-4">
                <span className="font-mono text-[9px] text-white/40 tracking-widest uppercase">
                  [ Module_0{i + 1} ]
                </span>

                <h3 className="text-xl font-bold tracking-tight text-white uppercase italic">
                  {feature.title}
                </h3>

                <p className="text-xs leading-relaxed text-white/50 min-h-[60px]">
                  {feature.description}
                </p>

                {/* Data Readout Style */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-orange-500">
                    {feature.stat}
                  </span>
                  <ChevronRight
                    size={14}
                    className="text-white/20 group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>

              {/* Progress-style line at bottom */}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-orange-500"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Technical Footer Detail */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex items-center gap-6 justify-center"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3].map((dot) => (
              <div
                key={dot}
                className="h-1.5 w-1.5 rounded-full bg-orange-500/40 animate-pulse"
              />
            ))}
          </div>
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/20">
            Real-time synchronization enabled // Standby for input
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
