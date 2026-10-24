"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/data/portfolio";
import Cover from "@/components/pages/Cover";
import Journey from "@/components/pages/Journey";
import Experience from "@/components/pages/Experience";
import Filmography from "@/components/pages/Filmography";
import BehindTheScenes from "@/components/pages/BehindTheScenes";
import Beyond from "@/components/pages/Beyond";
import TheEnd from "@/components/pages/TheEnd";
import CaseStudy from "@/components/CaseStudy";
import Intro from "@/components/Intro";

// Must match the flip media query in globals.css.
const FLIP_QUERY = "(min-width: 821px) and (prefers-reduced-motion: no-preference)";

const titles = [
  "Cover",
  "The Journey",
  "Experience",
  "Filmography",
  "Behind the Scenes",
  "Beyond the Code",
  "The End",
];

export default function Book() {
  const pageRefs = useRef<(HTMLElement | null)[]>([]);
  const [current, setCurrent] = useState(0);
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(FLIP_QUERY);
    let frame = 0;

    // Flip mode: scrolling through page i's segment (one viewport tall) turns page i
    // from 0° to -180° around its left edge, uncovering page i + 1 underneath.
    const update = () => {
      frame = 0;
      const pages = pageRefs.current;

      if (!media.matches) {
        pages.forEach((page) => {
          page?.style.removeProperty("--t");
          page?.style.removeProperty("--under");
          page?.removeAttribute("inert");
        });
        const mid = window.scrollY + window.innerHeight / 2;
        const index = pages.findLastIndex((page) => page && page.offsetTop <= mid);
        setCurrent(Math.max(0, index));
        return;
      }

      const progress = window.scrollY / window.innerHeight;
      const turned = pages.map((_, i) => Math.min(1, Math.max(0, progress - i)));

      pages.forEach((page, i) => {
        if (!page) return;
        const t = turned[i];
        const revealed = i === 0 ? 1 : turned[i - 1];
        page.style.setProperty("--t", t.toFixed(4));
        page.style.setProperty("--under", revealed.toFixed(4));
        page.toggleAttribute("inert", t > 0.5 || revealed < 0.5);
      });
      setCurrent(Math.min(pages.length - 1, Math.round(progress)));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    media.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      media.removeEventListener("change", schedule);
    };
  }, []);

  const goTo = (i: number) => {
    if (window.matchMedia(FLIP_QUERY).matches) {
      window.scrollTo({ top: i * window.innerHeight, behavior: "smooth" });
    } else {
      pageRefs.current[i]?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const closeProject = useCallback(() => setOpenProject(null), []);
  const endIntro = useCallback(() => setIntroDone(true), []);

  const pages = [
    <Cover key="cover" />,
    <Journey key="journey" />,
    <Experience key="experience" />,
    <Filmography key="filmography" onOpen={setOpenProject} />,
    <BehindTheScenes key="bts" />,
    <Beyond key="beyond" />,
    <TheEnd key="end" />,
  ];

  return (
    <main className="book">
      <div className="stage">
        {pages.map((content, i) => (
          <section
            key={i}
            ref={(el) => {
              pageRefs.current[i] = el;
            }}
            className={`page page--${i + 1}`}
            style={{ ["--z" as string]: pages.length - i }}
            aria-label={`Page ${i + 1}: ${titles[i]}`}
          >
            {content}
            <span className="folio" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
          </section>
        ))}
      </div>

      {/* Scroll track for flip mode: one snap point per page. Hidden in stacked mode. */}
      <div className="track" aria-hidden>
        {pages.map((_, i) => (
          <div key={i} />
        ))}
      </div>

      <nav className="page-nav" aria-label="Pages">
        {titles.map((title, i) => (
          <button
            key={title}
            type="button"
            onClick={() => goTo(i)}
            aria-current={current === i ? "page" : undefined}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            <em>{title}</em>
          </button>
        ))}
      </nav>

      <div className="grain" aria-hidden />

      {openProject && <CaseStudy project={openProject} onClose={closeProject} />}

      {!introDone && <Intro onDone={endIntro} />}
    </main>
  );
}
