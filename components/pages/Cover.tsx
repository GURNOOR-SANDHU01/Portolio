"use client";

import { useEffect, useRef, useState } from "react";
import { portfolio } from "@/data/portfolio";
import Tear from "@/components/Tear";

// Typewritten "archive" text for the document strips, built from the real data.
const archiveLines = [
  portfolio.about.intro,
  portfolio.about.description,
  ...portfolio.journey.milestones.map((m) => `${m.date} — ${m.title}. ${m.note}`),
];

export default function Cover() {
  const [photoMissing, setPhotoMissing] = useState(false);
  const photoRef = useRef<HTMLImageElement>(null);

  // The image can fail before hydration, when onError isn't attached yet.
  useEffect(() => {
    const img = photoRef.current;
    if (img?.complete && img.naturalWidth === 0) setPhotoMissing(true);
  }, []);

  return (
    <div className="cover">
      {/* ── Collage layers, back to front ── */}
      <figure className="cover__photo">
        <Tear className="tear--photo" seed={5} amp={1.2} points={[[5, 0], [95, 0, true], [100, 100], [0, 100, true]]}>
        {photoMissing ? (
          <div className="cover__silhouette" role="img" aria-label="Photo placeholder">
            <svg viewBox="0 0 200 260" aria-hidden>
              <circle cx="100" cy="86" r="50" />
              <path d="M6 260c0-66 42-110 94-110s94 44 94 110z" />
            </svg>
            <span>add public/images/gurnoor.jpg</span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={photoRef}
            src={portfolio.photo}
            alt={`Portrait of ${portfolio.name}`}
            onError={() => setPhotoMissing(true)}
          />
        )}
        </Tear>
      </figure>

      <Tear className="tear--archive" seed={3} points={[[47, 0], [71, 0, true], [100, 58], [100, 90, true]]}>
        <div className="archive-text archive-text--cover">
          {[...archiveLines, ...archiveLines].map((line, i) => (
            <p key={i}>{i % 3 === 1 ? <mark>{line}</mark> : line}</p>
          ))}
        </div>
      </Tear>

      <Tear className="tear--slate" seed={9} points={[[66, 0], [100, 0], [100, 63, true]]} />

      <Tear className="tear--oxblood" seed={21} points={[[0, 0], [27, 0, true], [0, 44]]}>
        <div className="record-scrawl">
          <p>Thapar Inst. — Patiala</p>
          <p>Dept. of Computer Sc.</p>
          <p>Student: G. Singh</p>
        </div>
      </Tear>

      <Tear className="tear--archive" seed={33} points={[[0, 46, true], [64, 100], [55, 100, true], [0, 57]]}>
        <div className="archive-text archive-text--strip">
          {archiveLines.slice(2).map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </Tear>

      <Tear className="tear--oxblood" seed={41} points={[[0, 58, true], [58, 100], [0, 100]]} />

      <Tear className="tear--navy" seed={57} points={[[100, 74], [100, 100], [78, 100, true]]} />

      {/* ── Type ── */}
      <div className="cover__laurel">
        <svg viewBox="0 0 120 60" aria-hidden>
          <path d="M30 56C10 46 6 26 14 6M90 56c20-10 24-30 16-50" />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <ellipse cx={8 + i * 3} cy={10 + i * 10} rx="7" ry="2.8" transform={`rotate(${-60 + i * 10} ${8 + i * 3} ${10 + i * 10})`} />
              <ellipse cx={112 - i * 3} cy={10 + i * 10} rx="7" ry="2.8" transform={`rotate(${60 - i * 10} ${112 - i * 3} ${10 + i * 10})`} />
            </g>
          ))}
        </svg>
        <p>
          Official Selection
          <br />
          Thapar Institute of Engineering
          <br />&amp; Technology · Computer Science
        </p>
      </div>

      <p className="cover__cast">
        <span>Starring</span>
        Curiosity
        <br />
        Code
        <br />
        Coffee
        <br />
        <small>and too many</small>
        <br />
        Side Projects
      </p>

      <div className="cover__title-block">
        <p className="cover__by">
          Featuring
          <br />
          <b>{portfolio.profession.toUpperCase()}</b>
          <br />
          <span>&amp;</span> <b>{portfolio.discipline.toUpperCase()}</b>
        </p>
        <h1 className="cover__name">{portfolio.name}</h1>
        <p className="cover__tagline">
          the story
          <br />
          so far.
        </p>
      </div>

      <div className="cover__billing">
        <p>
          A {portfolio.name} production · Written, directed &amp; deployed by {portfolio.name} ·
          Produced at Thapar Institute of Engineering &amp; Technology · Edited in VS Code · Score by
          mechanical keyboard · Shot on React, Node.js, Python &amp; PyTorch · Data by PostgreSQL,
          MongoDB &amp; Firebase · Visual effects by OpenCV &amp; YOLOv8
        </p>
        <p className="cover__marks">
          <span>THAPAR</span>
          <span>XEBIA</span>
          <span>BLUE STOCK</span>
          <span>GITHUB</span>
          <span>VERCEL</span>
        </p>
      </div>

      <p className="scroll-cue">scroll to turn the page ↓</p>
    </div>
  );
}
