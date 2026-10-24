import type { CSSProperties, ReactNode } from "react";

// A torn-paper layer, like the strips on a collage poster.
// `points` is a polygon in % of the parent box; a point flagged `true` makes the edge
// from it to the next point ragged. A second, slightly wider "fiber" layer in cream sits
// behind the face so the torn edges show the white paper core.

export type TearPoint = [x: number, y: number, torn?: boolean];

function random(seed: number) {
  let x = seed % 2147483647 || 1;
  return () => (x = (x * 16807) % 2147483647) / 2147483647;
}

// Midpoint displacement: big wobbles first, then finer fibrous jitter.
function raggedLine(a: [number, number], b: [number, number], rand: () => number, amp: number) {
  let pts = [a, b];
  let spread = amp;
  for (let depth = 0; depth < 6; depth++) {
    const next: [number, number][] = [pts[0]];
    for (let i = 0; i < pts.length - 1; i++) {
      const [px, py] = pts[i];
      const [qx, qy] = pts[i + 1];
      const len = Math.hypot(qx - px, qy - py) || 1;
      const offset = (rand() - 0.5) * 2 * spread;
      next.push([(px + qx) / 2 + (-(qy - py) / len) * offset, (py + qy) / 2 + ((qx - px) / len) * offset]);
      next.push(pts[i + 1]);
    }
    pts = next;
    spread *= 0.55;
  }
  return pts.slice(0, -1);
}

function clipPath(points: TearPoint[], seed: number, amp: number) {
  const rand = random(seed);
  const out: [number, number][] = [];
  points.forEach(([x, y, torn], i) => {
    const [nx, ny] = points[(i + 1) % points.length];
    if (torn) out.push(...raggedLine([x, y], [nx, ny], rand, amp));
    else out.push([x, y]);
  });
  return `polygon(${out.map(([x, y]) => `${x.toFixed(2)}% ${y.toFixed(2)}%`).join(",")})`;
}

export default function Tear({
  points,
  seed = 1,
  amp = 1.6,
  className = "",
  style,
  children,
}: {
  points: TearPoint[];
  seed?: number;
  amp?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div className={`tear ${className}`} style={style} aria-hidden={children ? undefined : true}>
      <div className="tear__fiber" style={{ clipPath: clipPath(points, seed + 97, amp * 1.35) }} />
      <div className="tear__face" style={{ clipPath: clipPath(points, seed, amp) }}>
        {children}
      </div>
    </div>
  );
}
