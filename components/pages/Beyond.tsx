import { portfolio } from "@/data/portfolio";
import RunningHead from "@/components/RunningHead";
import Tear from "@/components/Tear";

export default function Beyond() {
  const { beyond, about } = portfolio;

  return (
    <div className="beyond">
      <Tear className="tear--navy decor" seed={101} points={[[100, 56, true], [74, 100], [100, 100]]} />
      <Tear className="tear--oxblood decor" seed={103} points={[[0, 74, true], [26, 100], [0, 100]]} />
      <RunningHead page="06" title="Beyond the Code" />

      <div className="beyond__grid">
        <div>
          <h2 className="page-title">
            Beyond the Code <em>off the record.</em>
          </h2>
          <p className="beyond__intro">{beyond.intro}</p>
          <p className="lede">{about.description}</p>
        </div>

        <div>
          <p className="beyond__label">Director&apos;s notes</p>
          <ol className="directors-notes">
            {beyond.approach.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ol>

          <p className="beyond__label">Off set</p>
          <ul className="tickets">
            {beyond.interests.map((interest, i) => (
              <li key={i} className="ticket">
                <span className="ticket__admit">Admit one</span>
                <span className="ticket__name">{interest}</span>
                <span className="ticket__no">No. {String(i + 1).padStart(3, "0")}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
