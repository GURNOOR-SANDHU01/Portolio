import { portfolio } from "@/data/portfolio";
import Tear from "@/components/Tear";

export default function TheEnd() {
  const { contact } = portfolio;
  const links = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "GitHub", value: contact.github.replace("https://", ""), href: contact.github },
    { label: "LinkedIn", value: contact.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\//, ""), href: contact.linkedin },
    { label: "Resume", value: "Download PDF", href: contact.resume },
  ];

  return (
    <div className="the-end">
      <Tear className="tear--oxblood decor" seed={107} points={[[100, 90, true], [82, 100], [100, 100]]} />
      <span className="cue-mark" aria-hidden />

      <h2 className="the-end__question">
        What&apos;s
        <br />
        Next?
      </h2>

      <ul className="the-end__links">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              {...(link.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
              {...(link.label === "Resume" ? { download: "Gurnoor-Singh-Resume.pdf" } : {})}
            >
              <span>{link.label}</span>
              <b>{link.value}</b>
              <i aria-hidden>→</i>
            </a>
          </li>
        ))}
      </ul>

      <p className="the-end__fin">
        THE END <span>— for now.</span>
      </p>
    </div>
  );
}
