import { portfolio } from "@/data/portfolio";

export default function RunningHead({ page, title }: { page: string; title: string }) {
  return (
    <header className="running-head">
      <span>{portfolio.name} — A Portfolio in Seven Pages</span>
      <span>
        Page {page} — {title}
      </span>
    </header>
  );
}
