"use client";

import { motion } from "framer-motion";
import HeroScene from "./3d/HeroScene";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#080808] text-white">
      
      <HeroScene />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.08),transparent_32%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-20 md:px-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-white/40">
            Software Engineer
          </p>

          <h1 className="text-[clamp(4.5rem,10vw,9rem)] font-semibold leading-[0.82] tracking-[-0.08em]">
            Gurnoor
            <br />
            <span className="text-white/35">
              Singh.
            </span>
          </h1>

          <p className="mt-8 max-w-md text-base leading-7 text-white/55 md:text-lg">
            I build software at the intersection of
            engineering, data, analytics and
            generative AI.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#work"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-105"
            >
              View my work
            </a>

            <a
              href="#contact"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm text-white transition-colors hover:bg-white/10"
            >
              Contact me
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-center">
        <p className="mb-2 text-[9px] uppercase tracking-[0.35em] text-white/30">
          Scroll
        </p>

        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="text-white/50"
        >
          ↓
        </motion.div>
      </div>
    </section>
  );
}