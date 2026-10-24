"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/data/portfolio";
import Poster from "@/components/Poster";

export default function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.documentElement.classList.add("is-locked");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("is-locked");
      opener?.focus({ preventScroll: true });
    };
  }, [onClose]);

  const { caseStudy, links } = project;

  return (
    <div className="case-study" role="dialog" aria-modal="true" aria-label={project.title} onClick={onClose}>
      <article className="case-study__sheet" onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} type="button" className="case-study__close" onClick={onClose}>
          Close ✕
        </button>

        <div className="case-study__poster">
          <Poster project={project} large />
        </div>

        <div className="case-study__body">
          <p className="case-study__reel">Case file · Reel {project.number}</p>
          <h2>{project.title}</h2>
          <p className="lede">{project.description}</p>

          <dl className="case-study__notes">
            <dt>The problem</dt>
            <dd>{caseStudy.problem}</dd>
            <dt>The approach</dt>
            <dd>{caseStudy.approach}</dd>
            <dt>What I built</dt>
            <dd>
              <ul>
                {caseStudy.built.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
            <dt>The outcome</dt>
            <dd>{caseStudy.outcome}</dd>
            <dt>Stack</dt>
            <dd>{project.tech.join(" · ")}</dd>
          </dl>

          {(links.github || links.live) && (
            <p className="case-study__links">
              {links.github && (
                <a href={links.github} target="_blank" rel="noreferrer">
                  Source →
                </a>
              )}
              {links.live && (
                <a href={links.live} target="_blank" rel="noreferrer">
                  Watch it live →
                </a>
              )}
            </p>
          )}
        </div>
      </article>
    </div>
  );
}
