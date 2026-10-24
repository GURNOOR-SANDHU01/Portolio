# Gurnoor Singh — Portfolio

A portfolio told as a film in seven pages. It opens on a short "director's chair" scene, then
turns page by page through a torn-paper, vintage-film-poster collage.

| Page | What's on it |
| --- | --- |
| Opening scene | Empty set → someone takes the director's chair → slate clap → ROLL · CAMERA · ACTION. |
| 01 — Cover | Portrait, name and billing block, styled like a collage film poster |
| 02 — The Journey | Thapar, education and milestones as an archive file |
| 03 — Experience | Internships as movie credits with typed production notes |
| 04 — Filmography | One poster per project; click a poster for its case study |
| 05 — Behind the Scenes | Skills as a film crew list |
| 06 — Beyond the Code | The person behind the work |
| 07 — The End | What's next: email, GitHub, LinkedIn, resume |

On desktop each scroll turns one page in 3D. On phones, and when the system asks for reduced
motion, the pages stack normally and the opening scene is skipped.

## Tech

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript
- Plain CSS — no UI framework, no animation library
- Fonts via `next/font`: Archivo, Courier Prime, Libre Caslon Text, Oswald
- Torn paper edges are generated clip-paths (`components/Tear.tsx`); the intro's sound effects
  are synthesized with the Web Audio API, so there are no media files

## Run it locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm run start      # serve the build
npm run typecheck  # TypeScript only
```

## Editing content

All text lives in **`data/portfolio.ts`** — experience, projects and their case studies, skills,
journey milestones and contact links. Anything still marked `TBD` is a placeholder.

| Asset | Path |
| --- | --- |
| Portrait (cover + opening scene) | `public/images/gurnoor.jpg` |
| Resume (downloaded from page 07) | `public/resume.pdf` |

## Project structure

```
app/
  layout.tsx          fonts and metadata
  page.tsx            renders the book
  globals.css         all styles — tokens, pages, flip mode, intro timeline
components/
  Book.tsx            page stack, scroll-driven page flip, page nav, case-study modal
  Intro.tsx           opening scene and its sound cues
  Tear.tsx            torn-paper layer
  Poster.tsx          project poster
  CaseStudy.tsx       project detail view
  RunningHead.tsx     header on each page
  pages/              one component per page
data/
  portfolio.ts        all content
```

## Deploying

Any host that runs Next.js works. On [Vercel](https://vercel.com/new), import the repository
and deploy with the default settings.
