import { portfolio, type Project } from "@/data/portfolio";
import RunningHead from "@/components/RunningHead";
import Tear from "@/components/Tear";
import Poster from "@/components/Poster";

export default function Filmography({ onOpen }: { onOpen: (project: Project) => void }) {
  return (
    <div className="filmography">
      <Tear className="tear--oxblood decor" seed={79} points={[[100, 66, true], [86, 100], [100, 100]]} />
      <Tear className="tear--slate decor" seed={83} points={[[0, 84, true], [30, 100], [0, 100]]} />
      <RunningHead page="04" title="Filmography" />

      <h2 className="page-title">
        Filmography <em>now showing.</em>
      </h2>
      <p className="filmography__hint">select a poster for the full case study</p>

      <ul className="poster-wall">
        {portfolio.projects.map((project, i) => (
          <li key={project.number}>
            <button
              type="button"
              className="poster-button"
              onClick={() => onOpen(project)}
              aria-label={`Open case study: ${project.title}`}
              style={{ ["--tilt" as string]: `${[-2, 1.5, -1, 2][i % 4]}deg` }}
            >
              <Poster project={project} />
            </button>
          </li>
        ))}
      </ul>

      <p className="also-screening">
        <span>Also screening</span>
        {portfolio.moreProjects.map((p) => (
          <b key={p.title} title={p.description}>
            {p.title} <small>({p.metric})</small>
          </b>
        ))}
      </p>
    </div>
  );
}
