import { portfolio } from "@/data/portfolio";
import RunningHead from "@/components/RunningHead";
import Tear from "@/components/Tear";

// Skill groups recast as film-crew departments.
const departments: { role: string; dept: string; key: keyof typeof portfolio.skills }[] = [
  { role: "Dialogue", dept: "Languages", key: "languages" },
  { role: "Set Design", dept: "Frontend", key: "frontend" },
  { role: "Rigging", dept: "Backend", key: "backend" },
  { role: "Archives", dept: "Databases", key: "databases" },
  { role: "Visual Effects", dept: "AI & ML", key: "ai" },
  { role: "Crew & Equipment", dept: "Tools", key: "tools" },
  { role: "Screenplay", dept: "CS Fundamentals", key: "core" },
];

export default function BehindTheScenes() {
  return (
    <div className="bts">
      <Tear className="tear--archive decor" seed={89} points={[[100, 70, true], [82, 100], [100, 100]]} />
      <Tear className="tear--oxblood decor" seed={97} points={[[0, 0], [10, 0, true], [0, 36]]} />
      <RunningHead page="05" title="Behind the Scenes" />

      <h2 className="page-title page-title--center">
        Behind the Scenes <em>the full crew.</em>
      </h2>
      <p className="bts__sub">in order of appearance</p>

      <div className="crew">
        {departments.map(({ role, dept, key }) => (
          <section key={key} className="crew__dept">
            <h3>
              {role}
              <small>{dept}</small>
            </h3>
            <ul>
              {portfolio.skills[key].map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
