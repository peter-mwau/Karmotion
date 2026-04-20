import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect } from "react";

export const HeroSection = ({ progress }: { progress: number }) => {
  const [hoverState, setHoverState] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const progressMotion = useMotionValue(progress);

  // Premium spring physics
  const springConfig = { damping: 25, stiffness: 120, mass: 1.2 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // 3D perspective effects
  const rotateX = useTransform(springY, [-150, 150], [8, -8]);
  const rotateY = useTransform(springX, [-150, 150], [-8, 8]);
  const rotateZ = useTransform(springX, [-150, 150], [2, -2]);

  // Parallax layers
  const bgX = useTransform(springX, [-200, 200], [30, -30]);
  const bgY = useTransform(springY, [-200, 200], [20, -20]);
  const accentX = useTransform(springX, [-200, 200], [-50, 50]);
  const accentY = useTransform(springY, [-200, 200], [-30, 30]);

  // Progress-based animations
  const titleOpacity = useTransform(progressMotion, [0, 0.25], [1, 0]);
  const titleScale = useTransform(progressMotion, [0, 0.25], [1, 0.9]);
  const blurIntensity = useTransform(progressMotion, [0, 0.25], [0, 12]);
  const yOffset = useTransform(progressMotion, [0, 0.25], [0, -100]);
  const subtitleOpacity = useTransform(progressMotion, [0, 0.15], [1, 0]);
  const scrollIndicatorOpacity = useTransform(
    progressMotion,
    [0, 0.15],
    [1, 0],
  );
  const scrollIndicatorYOffset = useTransform(
    progressMotion,
    [0, 0.15],
    [0, -20],
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 300;
      const y = (e.clientY / window.innerHeight - 0.5) * 200;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    progressMotion.set(progress);
  }, [progress, progressMotion]);

  // Split Karmotion into KAR + MOTION for styling
  const titleParts = {
    first: "KAR",
    second: "MOTION",
  };

  return (
    <motion.div
      className="fixed inset-0 z-20 flex flex-col items-center justify-center overflow-hidden bg-black/10 backdrop-blur-[2px]"
      style={{
        opacity: titleOpacity,
        filter: useTransform(blurIntensity, (v) => `blur(${v}px)`),
      }}
    >
      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: bgX, y: bgY }}
      >
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-orange-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />
      </motion.div>

      {/* Animated Grid Lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hero-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="white"
                strokeWidth="0.3"
              />
              <circle cx="0" cy="0" r="1" fill="white" fillOpacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Ambient Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-px rounded-full bg-white/20"
            initial={{
              x: `${(i * 17) % 100}%`,
              y: `${(i * 23) % 100}%`,
            }}
            animate={{
              y: [0, -20 - (i % 5) * 10, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + (i % 4) * 0.75,
              repeat: Infinity,
              delay: (i % 10) * 0.35,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          rotateZ,
          scale: titleScale,
          y: yOffset,
        }}
        className="relative z-10 flex flex-col items-center transform-gpu"
      >
        {/* Pre-title Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-white/60">
              Limited Edition // Series 01
            </span>
            <div className="h-3 w-px bg-white/20" />
            <span className="font-mono text-[9px] font-bold text-orange-500">
              Launching 2025
            </span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="relative flex flex-col items-center overflow-visible"
          onMouseEnter={() => setHoverState(true)}
          onMouseLeave={() => setHoverState(false)}
        >
          {/* Glow effect behind title */}
          <motion.div
            className="absolute inset-0 blur-3xl"
            animate={{
              opacity: hoverState ? 0.3 : 0.1,
              scale: hoverState ? 1.2 : 1,
            }}
            transition={{ duration: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-transparent to-orange-500" />
          </motion.div>

          <div className="relative overflow-hidden">
            <motion.span
              initial={{ y: "100%", rotateX: -45 }}
              animate={{ y: 0, rotateX: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="block font-serif text-7xl font-black italic leading-[0.9] tracking-tighter text-white md:text-8xl lg:text-[10rem] xl:text-[12rem]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {titleParts.first}
            </motion.span>
          </div>

          <div className="relative overflow-hidden mt-[-0.1em]">
            <motion.span
              initial={{ y: "100%", rotateX: -45 }}
              animate={{ y: 0, rotateX: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="block font-serif text-7xl font-black italic leading-[0.9] tracking-tighter md:text-8xl lg:text-[10rem] xl:text-[12rem]"
            >
              <span className="bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent">
                {titleParts.second}
              </span>
            </motion.span>
          </div>
        </motion.h1>

        {/* Tagline with character animation */}
        <motion.div
          style={{ opacity: subtitleOpacity }}
          className="mt-8 text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/50"
          >
            Curating the world's most significant driving machines
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mx-auto mt-4 h-px w-12 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-4 font-mono text-[8px] tracking-[0.4em] text-white/30"
          >
            VELOCITY & VISION // EST. 2024
          </motion.p>
        </motion.div>

        {/* Interactive CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden rounded-full border border-white/20 bg-white/5 px-8 py-3 backdrop-blur-sm"
          >
            <span className="relative z-10 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              Explore Collection
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Animated Accent Lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: accentX, y: accentY }}
      >
        <div className="absolute left-12 top-1/4 hidden h-32 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent lg:block" />
        <div className="absolute right-12 top-1/4 hidden h-32 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent lg:block" />
        <div className="absolute bottom-1/4 left-1/2 hidden h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent lg:block" />
      </motion.div>

      {/* Scroll Indicator with Progress */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        animate={{
          opacity: scrollIndicatorOpacity,
          y: scrollIndicatorYOffset,
        }}
      >
        <div className="relative h-12 w-px overflow-hidden bg-white/10">
          <motion.div
            className="absolute top-0 h-3 w-px bg-orange-500"
            animate={{ top: ["0%", "100%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
        <span className="font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-white/40">
          DISCOVER
        </span>
      </motion.div>

      {/* Corner Accents */}
      <div className="absolute left-6 top-6 h-12 w-12">
        <motion.div
          className="absolute left-0 top-0 h-px w-8 bg-gradient-to-r from-white/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5 }}
        />
        <motion.div
          className="absolute left-0 top-0 h-8 w-px bg-gradient-to-b from-white/50 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.5 }}
        />
      </div>

      <div className="absolute right-6 top-6 h-12 w-12">
        <motion.div
          className="absolute right-0 top-0 h-px w-8 bg-gradient-to-l from-white/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6 }}
        />
        <motion.div
          className="absolute right-0 top-0 h-8 w-px bg-gradient-to-b from-white/50 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.6 }}
        />
      </div>

      {/* Status Bar at Bottom Left */}
      <motion.div
        className="absolute bottom-6 left-6 hidden lg:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.4, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div className="h-1 w-1 rounded-full bg-emerald-500" />
            <div className="h-1 w-1 rounded-full bg-emerald-500/50" />
            <div className="h-1 w-1 rounded-full bg-emerald-500/20" />
          </div>
          <span className="font-mono text-[8px] uppercase tracking-wider text-white/40">
            All Systems Operational
          </span>
        </div>
      </motion.div>

      {/* Version / ID at Bottom Right */}
      <motion.div
        className="absolute bottom-6 right-6 hidden lg:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 0.4, x: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <span className="font-mono text-[8px] uppercase tracking-wider text-white/40">
          KRMNT-X // 001
        </span>
      </motion.div>
    </motion.div>
  );
};
