import { portfolio } from "@/data/portfolio";
import RunningHead from "@/components/RunningHead";
import Tear from "@/components/Tear";

export default function Experience() {
  return (
    <div className="experience">
      <Tear className="tear--archive decor" seed={71} points={[[0, 78, true], [22, 100], [0, 100]]} />
      <Tear className="tear--oxblood decor" seed={73} points={[[86, 0], [100, 0], [100, 30, true]]} />
      <RunningHead page="03" title="Experience" />

      <h2 className="page-title page-title--center">
        In Production <em>what i actually built.</em>
      </h2>

      <div className="credits-roll">
        {portfolio.experience.map((job) => (
          <article key={job.company} className="production">
            <p className="production__studio">A {job.company} Production</p>
            <p className="production__starring">{portfolio.name} as</p>
            <h3 className="production__role">{job.role}</h3>
            <p className="production__period">{job.period}</p>
            <p className="production__logline">{job.description}</p>

            <p className="production__notes-label">Production notes</p>
            <ul className="production__notes">
              {job.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>

            <p className="production__shot-on">
              <span>Shot on</span> {job.tech.join(" · ")}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
