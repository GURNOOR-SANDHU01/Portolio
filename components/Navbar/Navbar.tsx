"use client";

import { motion } from "framer-motion";

const links = [
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Work", "#work"],
  ["Skills", "#skills"],
  ["Contact", "#contact"],
];

export default function Navbar() {
  return (
    <nav className="fixed left-1/2 top-5 z-50 flex w-[calc(100%-32px)] max-w-6xl -translate-x-1/2 items-center justify-between rounded-full border border-white/10 bg-black/50 px-5 py-3 backdrop-blur-xl">
      <a href="#" className="text-lg font-semibold tracking-tight">
        GS<span className="text-white/40">.</span>
      </a>

      <div className="hidden items-center gap-7 md:flex">
        {links.map(([label, href]) => (
          <motion.a
            key={label}
            href={href}
            whileHover={{ y: -2 }}
            className="text-sm text-white/50 transition-colors hover:text-white"
          >
            {label}
          </motion.a>
        ))}
      </div>

      <a
  href="#contact"
  className="nav-talk"
>
  Let's talk
</a>
    </nav>
  );
}