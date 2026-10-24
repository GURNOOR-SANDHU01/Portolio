"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { portfolio } from "@/data/portfolio";

// Opening scene, played before the cover. Every visual beat is a CSS animation keyed off
// `.intro.is-playing` (see the INTRO section of globals.css); the times below must match
// those delays. JS only starts the scene, fires the optional sound cues and ends it.
const DURATION = 15_000;
const FOOTSTEPS = [3.5, 3.95, 4.4, 4.85, 5.3, 5.75, 6.2];
const CREAK = 6.75;
const CLAP = 11.0;

function useFoley() {
  const ctxRef = useRef<AudioContext | null>(null);

  const enable = () => {
    ctxRef.current ??= new AudioContext();
    void ctxRef.current.resume();
  };

  const burst = (opts: { length: number; filter: BiquadFilterType; freq: number; gain: number; decay: number }) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * opts.length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = opts.filter;
    filter.frequency.value = opts.freq;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(opts.gain, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + opts.decay);
    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start();
  };

  return {
    enable,
    step: () => burst({ length: 0.15, filter: "lowpass", freq: 380, gain: 0.9, decay: 0.12 }),
    creak: () => burst({ length: 0.4, filter: "bandpass", freq: 260, gain: 0.35, decay: 0.35 }),
    clap: () => {
      burst({ length: 0.25, filter: "highpass", freq: 1200, gain: 1.2, decay: 0.09 });
      burst({ length: 0.2, filter: "lowpass", freq: 160, gain: 0.9, decay: 0.15 });
    },
  };
}

export default function Intro({ onDone }: { onDone: () => void }) {
  const [playing, setPlaying] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const soundRef = useRef(false);
  const foley = useFoley();
  const foleyRef = useRef(foley);
  foleyRef.current = foley;

  const finish = useCallback(() => {
    setLeaving(true);
    window.setTimeout(onDone, 450);
  }, [onDone]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onDone();
      return;
    }

    document.documentElement.classList.add("is-locked");
    window.scrollTo(0, 0);
    setPlaying(true);

    const cue = (seconds: number, play: () => void) =>
      window.setTimeout(() => soundRef.current && play(), seconds * 1000);
    const timers = [
      ...FOOTSTEPS.map((t) => cue(t, () => foleyRef.current.step())),
      cue(CREAK, () => foleyRef.current.creak()),
      cue(CLAP, () => foleyRef.current.clap()),
      window.setTimeout(onDone, DURATION),
    ];

    const onKey = (e: KeyboardEvent) => {
      if (["Escape", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        finish();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("is-locked");
    };
  }, [onDone, finish]);

  const toggleSound = () => {
    if (!soundOn) foley.enable();
    soundRef.current = !soundOn;
    setSoundOn(!soundOn);
  };

  return (
    <div
      className={`intro ${playing ? "is-playing" : ""} ${leaving ? "is-leaving" : ""}`}
      role="dialog"
      aria-label="Opening scene"
    >
      <div className="intro__camera">
        <svg className="intro__set" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <defs>
            <radialGradient id="intro-haze" cx="50%" cy="48%" r="50%">
              <stop offset="0" stopColor="#4a3a2b" />
              <stop offset="0.55" stopColor="#1d1712" />
              <stop offset="1" stopColor="#0a0908" />
            </radialGradient>
            <linearGradient id="intro-beam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff3d6" stopOpacity="0.32" />
              <stop offset="1" stopColor="#fff3d6" stopOpacity="0.04" />
            </linearGradient>
            <radialGradient id="intro-pool" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#f6e2b8" stopOpacity="0.55" />
              <stop offset="1" stopColor="#f6e2b8" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Stage, lit by the spotlight */}
          <g className="intro__lit">
            <rect width="1600" height="900" fill="url(#intro-haze)" />
            <rect y="700" width="1600" height="200" fill="#120f0c" />
            <line x1="0" y1="700" x2="1600" y2="700" stroke="#2c241c" strokeWidth="2" />
            <ellipse cx="800" cy="735" rx="380" ry="60" fill="url(#intro-pool)" />
            <polygon className="intro__beam" points="740,0 860,0 1180,740 420,740" fill="url(#intro-beam)" />

            {/* Light stand, left */}
            <g fill="#0b0a09">
              <rect x="186" y="300" width="8" height="410" />
              <path d="M150 712 L190 640 L230 712 Z" />
              <rect x="150" y="262" width="80" height="52" rx="6" transform="rotate(14 190 288)" />
            </g>

            {/* Road cases with stencils */}
            <g className="intro__props">
              <rect x="250" y="590" width="250" height="112" rx="6" fill="#1a1613" stroke="#3b3128" strokeWidth="3" />
              <rect x="250" y="590" width="250" height="18" fill="#2a231d" />
              <text x="375" y="648" className="intro__stencil">THAPAR INSTITUTE</text>
              <text x="375" y="678" className="intro__stencil intro__stencil--small">PATIALA · CASE 07</text>

              <rect x="1110" y="560" width="230" height="142" rx="6" fill="#1a1613" stroke="#3b3128" strokeWidth="3" />
              <rect x="1110" y="560" width="230" height="18" fill="#2a231d" />
              <text x="1225" y="620" className="intro__stencil intro__stencil--small">PRODUCTION</text>
              <text x="1225" y="652" className="intro__stencil">{portfolio.name.toUpperCase()}</text>

              {/* Floor tape mark */}
              <g transform="translate(980 760) rotate(-4)">
                <rect x="-92" y="-18" width="184" height="36" fill="#d9c27a" opacity="0.85" />
                <text x="0" y="7" className="intro__tape">SCENE 01 · TAKE 01</text>
              </g>
            </g>
          </g>

          {/* Seated, from behind: appears above and through the chair back once he sits */}
          <g className="intro__seated" fill="#050404">
            <rect x="706" y="440" width="188" height="170" rx="40" />
            <rect x="782" y="410" width="36" height="40" />
            <circle cx="800" cy="404" r="38" />
            <path d="M748 404 C742 352 768 316 800 312 C832 316 858 352 852 404 C836 394 764 394 748 404 Z" />
            <g fill="none" stroke="#1a1612" strokeWidth="3" strokeLinecap="round">
              <path d="M756 372 C780 356 822 356 846 374" />
              <path d="M752 390 C778 374 824 374 849 391" />
              <path d="M766 344 C786 334 816 334 836 346" />
            </g>
          </g>

          {/* Director's chair, seen from behind */}
          <g className="intro__chair">
            <g stroke="#2a1f17" strokeWidth="12" strokeLinecap="round">
              <line x1="722" y1="612" x2="878" y2="722" />
              <line x1="878" y1="612" x2="722" y2="722" />
            </g>
            <g fill="#3a2a1d">
              <rect x="712" y="462" width="12" height="262" rx="4" />
              <rect x="876" y="462" width="12" height="262" rx="4" />
              <rect x="700" y="570" width="200" height="10" rx="4" />
              <rect x="706" y="600" width="188" height="14" rx="4" />
            </g>
            <rect x="706" y="478" width="188" height="64" fill="#15110e" stroke="#3a2a1d" strokeWidth="3" />
            <text x="800" y="520" className="intro__chair-name">{portfolio.name.toUpperCase()}</text>
          </g>

          {/* Walking in, side-on */}
          <g className="intro__walker" fill="#050404">
            <g className="intro__bob">
              <g className="intro__limb intro__limb--back-leg">
                <rect x="-15" y="-235" width="30" height="230" rx="14" />
                <ellipse cx="12" cy="-4" rx="26" ry="9" />
              </g>
              <g className="intro__limb intro__limb--back-arm">
                <rect x="-11" y="-380" width="22" height="150" rx="11" />
              </g>
              <rect x="-36" y="-390" width="72" height="170" rx="26" />
              <rect x="-10" y="-412" width="20" height="28" />
              <circle cx="4" cy="-424" r="29" />
              <path d="M-30 -428 C-36 -470 -8 -492 18 -486 C40 -480 46 -456 36 -436 C20 -446 -10 -440 -30 -428 Z" />
              <path d="M26 -410 C42 -396 36 -380 20 -380 Z" />
              <g className="intro__limb intro__limb--front-leg">
                <rect x="-15" y="-235" width="30" height="230" rx="14" />
                <ellipse cx="12" cy="-4" rx="26" ry="9" />
              </g>
              <g className="intro__limb intro__limb--front-arm">
                <rect x="-11" y="-380" width="22" height="150" rx="11" />
              </g>
            </g>
          </g>
        </svg>
      </div>

      {/* The reveal: he turns to camera */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="intro__portrait" src={portfolio.photo} alt="" />

      <div className="intro__slate" aria-hidden>
        <div className="intro__clapper">
          <span />
        </div>
        <div className="intro__board">
          <p>
            <b>Production</b> {portfolio.name}
          </p>
          <p>
            <b>Project</b> Portfolio
          </p>
          <p>
            <b>Scene</b> 01 <b>Take</b> 01
          </p>
        </div>
      </div>
      <div className="intro__flash" aria-hidden />

      <div className="intro__blackout" aria-hidden>
        <p className="intro__word intro__word--roll">Roll</p>
        <p className="intro__word intro__word--camera">Camera</p>
        <p className="intro__word intro__word--action">Action.</p>
      </div>

      <div className="intro__controls">
        <button type="button" onClick={toggleSound} aria-pressed={soundOn}>
          Sound: {soundOn ? "on" : "off"}
        </button>
        <button type="button" onClick={finish}>
          Skip intro →
        </button>
      </div>
    </div>
  );
}
