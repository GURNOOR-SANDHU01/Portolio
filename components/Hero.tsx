"use client";

import { motion } from "framer-motion";
import HeroScene from "@/components/3d/HeroScene";

export default function Hero() {
  return (
    <section
      id="me"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <HeroScene />

      <div className="relative z-10 w-full px-[7vw]">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="max-w-3xl"
        >
          <p className="eyebrow">
            SOFTWARE ENGINEER · DATA · AI
          </p>

          <h1 className="hero-title">
            Gurnoor
            <br />
            <span>Singh.</span>
          </h1>

          <p className="hero-description">
            I build software at the intersection
            of engineering, data, analytics and
            generative AI.
          </p>

          <div className="hero-buttons">
            <a href="#work">
              View my work ↗
            </a>

            <a href="#contact">
              Let's talk →
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-[7vw] z-10 text-xs text-neutral-600">
        SCROLL TO EXPLORE ↓
      </div>
    </section>
  );
}