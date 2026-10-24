import type { Project } from "@/data/portfolio";
import Tear, { type TearPoint } from "@/components/Tear";

// Each film gets its own palette and tear angle so the wall reads like a row of different posters.
const looks: { bg: string; strip: string; ink: string; tear: TearPoint[] }[] = [
  { bg: "#3a3e43", strip: "tear--archive", ink: "#ece4d2", tear: [[0, 20, true], [100, 52], [100, 70, true], [0, 38]] },
  { bg: "#6e1d1a", strip: "tear--archive", ink: "#ece4d2", tear: [[0, 46, true], [100, 18], [100, 36, true], [0, 64]] },
  { bg: "#26324a", strip: "tear--archive", ink: "#ece4d2", tear: [[0, 14, true], [100, 40], [100, 60, true], [0, 32]] },
  { bg: "#d8c7a1", strip: "tear--oxblood", ink: "#1b1612", tear: [[0, 32, true], [100, 14], [100, 32, true], [0, 50]] },
];

export default function Poster({ project, large = false }: { project: Project; large?: boolean }) {
  const look = looks[(Number(project.number) - 1) % looks.length];

  return (
    <div
      className={`poster ${large ? "poster--large" : ""}`}
      style={{ ["--poster-bg" as string]: look.bg, ["--poster-ink" as string]: look.ink }}
    >
      <Tear className={look.strip} seed={Number(project.number) * 13} amp={2.4} points={look.tear}>
        <div className="archive-text archive-text--poster">
          {[0, 1, 2].map((i) => (
            <p key={i}>
              {project.description} <mark>{project.metric}.</mark> {project.tech.join(", ")}.
            </p>
          ))}
        </div>
      </Tear>

      <p className="poster__quote">
        ★★★★ <span>“{project.metric}”</span>
      </p>
      <span className="poster__number" aria-hidden>
        {project.number}
      </span>

      <div className="poster__title-block">
        <p className="poster__genre">{project.genre}</p>
        <h3 className="poster__title">{project.title}</h3>
        <p className="poster__tagline">{project.tagline}</p>
      </div>
      <p className="poster__billing">
        A Gurnoor Singh picture · Starring {project.tech.join(" · ")} · {project.year}
      </p>
    </div>
  );
}
