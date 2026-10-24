import { portfolio } from "@/data/portfolio";
import RunningHead from "@/components/RunningHead";
import Tear from "@/components/Tear";

export default function Journey() {
  const { journey, about } = portfolio;

  return (
    <div className="journey">
      <Tear className="tear--oxblood decor" seed={61} points={[[100, 62, true], [76, 100], [100, 100]]} />
      <Tear className="tear--slate decor" seed={67} points={[[0, 82, true], [16, 100], [0, 100]]} />
      <RunningHead page="02" title="The Journey" />

      <div className="journey__grid">
        <div>
          <h2 className="page-title">
            The Journey <em>how it started.</em>
          </h2>
          <p className="lede">{about.intro}</p>

          <article className="record-card">
            <p className="record-card__label">Student Record — Department of Computer Science</p>
            <dl>
              <dt>Institution</dt>
              <dd>{journey.institution}</dd>
              <dt>Location</dt>
              <dd>{journey.location}</dd>
              <dt>Programme</dt>
              <dd>{journey.degree}</dd>
              <dt>Period</dt>
              <dd>{journey.period}</dd>
            </dl>
            <span className="stamp">Enrolled</span>
          </article>
        </div>

        <ol className="timeline">
          {journey.milestones.map((m, i) => (
            <li key={i} className="timeline__item">
              <time>{m.date}</time>
              <div>
                <h3>{m.title}</h3>
                <p>{m.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
