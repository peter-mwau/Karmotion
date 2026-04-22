import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Phone,
  Sparkles,
  Globe,
  ChevronRight,
} from "lucide-react";
import { FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

const FOOTER_LINKS = [
  { label: "Instagram", href: "#", icon: FaInstagram },
  { label: "YouTube", href: "#", icon: FaYoutube },
  { label: "Twitter", href: "#", icon: FaTwitter },
  { label: "Contact", href: "mailto:hello@karmotion.com", icon: Mail },
];

const QUICK_LINKS = [
  { label: "Collections", href: "#" },
  { label: "Configurator", href: "#" },
  { label: "Heritage", href: "#" },
  { label: "Events", href: "#" },
  { label: "Ownership", href: "#" },
  { label: "Press", href: "#" },
];

const SERVICES = [
  { label: "Bespoke Commissioning", href: "#" },
  { label: "Concierge Program", href: "#" },
  { label: "Track Experiences", href: "#" },
  { label: "Private Viewings", href: "#" },
];

const LEGACY_STATS = [
  { label: "Years of Excellence", value: "2024", suffix: "Est." },
  { label: "Global Clients", value: "1.2k", suffix: "+" },
  { label: "Collection Models", value: "24", suffix: "" },
  { label: "Awards", value: "18", suffix: "" },
];

export const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      key="footer-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="pointer-events-auto relative flex h-full w-full items-end"
    >
      {/* Premium Gradient Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      </div>

      {/* Animated Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-8 pt-24 md:pb-10 md:pt-32">
        {/* Main Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          {/* Top Section with Brand and CTA */}
          <div className="mb-16 flex flex-col justify-between gap-8 border-b border-white/10 pb-12 md:flex-row md:items-end">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-orange-500" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.5em] text-orange-500">
                  Karmotion // Infinite Drive
                </span>
              </div>
              <h2 className="max-w-2xl font-serif text-4xl font-bold italic tracking-tighter text-white md:text-5xl lg:text-6xl">
                Built for the road,
                <br />
                <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  curated for the obsessed.
                </span>
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-white/50 md:text-base">
                Private viewings, bespoke commissioning, and curated ownership
                support for drivers who want the experience to feel as precise
                as the machine.
              </p>
            </div>

            {/* Newsletter / CTA */}
            <div className="md:text-right">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-orange-500/20 transition-all hover:shadow-orange-500/40"
              >
                <Sparkles size={14} />
                <span>Request Access</span>
                <ChevronRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </motion.button>
              <p className="mt-3 font-mono text-[8px] uppercase tracking-wider text-white/30">
                Priority access for collectors
              </p>
            </div>
          </div>

          {/* Links Grid */}
          <div className="mb-16 grid gap-12 md:grid-cols-4">
            {/* Brand Column */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold italic text-white">
                Karmotion
              </h3>
              <p className="text-xs leading-relaxed text-white/40">
                Curating the world's most significant driving machines since
                2024.
              </p>
              <div className="flex gap-3">
                {FOOTER_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="rounded-full border border-white/10 bg-white/5 p-2 text-white/50 transition-colors hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-500"
                    >
                      <Icon size={14} />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500">
                Explore
              </h4>
              <ul className="space-y-2">
                {QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
                    >
                      <ArrowUpRight
                        size={10}
                        className="opacity-0 transition-all group-hover:opacity-100"
                      />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500">
                Services
              </h4>
              <ul className="space-y-2">
                {SERVICES.map((service) => (
                  <li key={service.label}>
                    <a
                      href={service.href}
                      className="group flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
                    >
                      <ChevronRight
                        size={10}
                        className="opacity-0 transition-all group-hover:opacity-100"
                      />
                      {service.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Stats */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white/60">
                  <Mail size={12} className="text-orange-500" />
                  <a
                    href="mailto:hello@karmotion.com"
                    className="font-mono text-[10px] uppercase tracking-[0.2em] hover:text-orange-500"
                  >
                    hello@karmotion.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Phone size={12} className="text-orange-500" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                    +1 (888) 527-6684
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Globe size={12} className="text-orange-500" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                    Global HQ — Monaco
                  </span>
                </div>
              </div>

              {/* Legacy Stats */}
              <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
                {LEGACY_STATS.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-mono text-lg font-bold text-white">
                      {stat.value}
                      <span className="text-xs text-orange-500">
                        {stat.suffix}
                      </span>
                    </p>
                    <p className="text-[9px] uppercase tracking-wider text-white/30">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row"
        >
          {/* Left Side */}
          <div className="flex flex-wrap items-center gap-4 text-center md:text-left">
            <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/30">
              © {currentYear} Karmotion. All rights reserved.
            </span>
            <div className="flex gap-3">
              <a
                href="#"
                className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/30 hover:text-white/60"
              >
                Privacy
              </a>
              <span className="text-white/20">|</span>
              <a
                href="#"
                className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/30 hover:text-white/60"
              >
                Terms
              </a>
              <span className="text-white/20">|</span>
              <a
                href="#"
                className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/30 hover:text-white/60"
              >
                Cookies
              </a>
            </div>
          </div>

          {/* Right Side - Developed By */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
          >
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/40">
              Developed by
            </span>
            <motion.a
              href="https://studio44.is-a.dev"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ color: "#f97316" }}
              className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-white/80 transition-colors"
            >
              Studio 44
            </motion.a>
            <ArrowUpRight size={10} className="text-white/40" />
          </motion.div>
        </motion.div>

        {/* Bottom Decorative Line */}
        <div className="mt-8 flex justify-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
        </div>
      </div>
    </motion.footer>
  );
};
