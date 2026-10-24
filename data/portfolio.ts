// Anything marked "TBD" is a placeholder — replace it with the real detail.

export const portfolio = {
  name: "Gurnoor Singh",
  profession: "Software Engineer",
  discipline: "Computer Science",
  // Drop your photo at public/images/gurnoor.jpg (the cover falls back to a silhouette until then).
  photo: "/images/gurnoor.jpg",

  about: {
    intro:
      "I'm Gurnoor Singh, a Software Engineer focused on building scalable software at the intersection of engineering, data, analytics, and Generative AI.",
    description:
      "I enjoy turning complex problems into practical products — from full-stack web applications and REST APIs to computer vision systems and AI-powered platforms.",
  },

  journey: {
    institution: "Thapar Institute of Engineering & Technology",
    location: "Patiala, Punjab",
    degree: "B.E. — Computer Science",
    period: "TBD — May 2027 (expected)", // TBD: start year
    milestones: [
      {
        date: "TBD",
        title: "Enrolled at Thapar",
        note: "Started the B.E. in Computer Science — DSA, OOP, DBMS, operating systems and networks.",
      },
      {
        date: "TBD",
        title: "First things built",
        note: "Moved from coursework to shipping: React front-ends, REST APIs and small tools.",
      },
      {
        date: "TBD",
        title: "Into computer vision & AI",
        note: "PyTorch, OpenCV and YOLOv8 — real-time recognition systems and Generative AI apps.",
      },
      {
        date: "Nov 2025",
        title: "Blue Stock FinTech",
        note: "First industry internship — full-stack features, REST APIs and PostgreSQL/MongoDB data models.",
      },
      {
        date: "Jun 2026",
        title: "Xebia",
        note: "Full Stack Developer Intern on an enterprise Learning Management System.",
      },
    ],
  },

  experience: [
    {
      company: "Xebia",
      role: "Full Stack Developer Intern",
      period: "Jun 2026 — Present",
      description:
        "Building enterprise Learning Management System modules using React.js, JavaScript, Tailwind CSS and Vite.",
      tech: ["React.js", "JavaScript", "Tailwind CSS", "Vite", "Git"],
      points: [
        "Implemented role-based access control across 3 user tiers: admins, instructors and learners.",
        "Built 25+ reusable frontend components to improve consistency and maintainability.",
        "Reduced duplicate frontend code by approximately 35% through reusable component architecture.",
        "Collaborated in an Agile development environment using Git, GitHub and pull requests.",
      ],
    },

    {
      company: "Blue Stock FinTech",
      role: "Software Development Engineer Intern",
      period: "Nov 2025 — Dec 2025",
      description:
        "Built full-stack web application features across frontend and backend services.",
      tech: ["React.js", "Node.js", "Express.js", "PostgreSQL", "MongoDB"],
      points: [
        "Developed and maintained full-stack web application features using React.js, Node.js, and Express.js across frontend and backend services.",
        "Built and integrated RESTful APIs to enable reliable communication between frontend applications, backend services, and database systems.",
        "Designed and managed relational and NoSQL data models using PostgreSQL and MongoDB, implementing database schemas, queries, and efficient data retrieval workflows.",
        "Optimized backend API endpoints and database queries to improve application performance, data retrieval efficiency, and overall user experience.",
      ],
    },
  ],

  // Featured on the FILMOGRAPHY page. caseStudy fields feed the click-through detail view.
  projects: [
    {
      number: "01",
      title: "MeetAI",
      tagline: "Every meeting, already summarized.",
      genre: "AI Meeting Intelligence",
      year: "TBD",
      description:
        "An AI-powered meeting intelligence platform that centralizes meeting management and automates post-meeting workflows.",
      tech: ["React.js", "Node.js", "Express.js", "FastAPI", "PostgreSQL", "MongoDB"],
      metric: "Audio → action items",
      caseStudy: {
        problem:
          "Meetings are scattered across tools, and the work after them — notes, summaries, action items, follow-ups — is done by hand.",
        approach:
          "One platform to manage meetings, with AI services that turn meeting audio into transcripts and structured insights automatically.",
        built: [
          "React.js and Node.js platform that centralizes meeting management",
          "RESTful APIs in Node.js, Express.js and FastAPI for meeting creation, participant management, meeting metadata, and communication between the app and AI services",
          "AI processing workflows for transcription, contextual summarization, key discussion points, action items and follow-up insights from meeting audio",
          "PostgreSQL and MongoDB data models for users, meetings, participants, transcripts and generated insights, with role-based access control",
        ],
        outcome:
          "Post-meeting workflows automated end to end — from raw audio to transcripts, summaries, action items and follow-ups.",
      },
      links: { github: "", live: "" },
    },

    {
      number: "02",
      title: "NutriSnap",
      tagline: "Point a camera at your plate. Get the nutrition.",
      genre: "Computer Vision · GenAI",
      year: "TBD",
      description:
        "An AI-powered food recognition and nutrition analysis application that identifies food and provides nutritional insights using computer vision and Generative AI.",
      tech: ["React.js", "Python", "FastAPI", "Firebase", "Gemini API"],
      metric: "90%+ accuracy",
      caseStudy: {
        problem: "Logging meals by hand is slow and inaccurate, so most people stop doing it.",
        approach:
          "Recognise the food from a photo with computer vision, then use Generative AI to turn the result into readable nutritional insight.",
        built: [
          "React.js front-end for capture and results",
          "FastAPI service wrapping the recognition pipeline",
          "Gemini API for nutrition analysis and explanations",
          "Firebase for auth and storage",
        ],
        outcome: "90%+ food recognition accuracy.",
      },
      links: { github: "", live: "" },
    },

    {
      number: "03",
      title: "Focus Flight",
      tagline: "Take off. Distractions stay on the ground.",
      genre: "Productivity",
      year: "TBD",
      description:
        "A productivity-focused Chrome extension that blocks distractions and provides customizable focus timers with persistent local state.",
      tech: ["JavaScript", "React.js", "Chrome Extensions API"],
      metric: "50% simulated reduction",
      caseStudy: {
        problem: "Distracting sites are one tab away during deep work.",
        approach:
          "A browser extension that blocks distractions for the length of a focus session, with timers that survive restarts.",
        built: [
          "Chrome Extensions API for site blocking",
          "React.js popup with customizable focus timers",
          "Persistent local state across browser sessions",
        ],
        outcome: "50% reduction in distractions in simulated sessions.",
      },
      links: { github: "", live: "" },
    },

    {
      number: "04",
      title: "AI Placement System",
      tagline: "The right candidate, matched by AI.",
      genre: "Full Stack · AI Recruitment",
      year: "TBD",
      description:
        "A full-stack recruitment platform for students, recruiters and administrators, with an AI-powered Applicant Tracking System for resume parsing and candidate-job matching.",
      tech: ["React.js", "Node.js", "FastAPI", "Python", "PostgreSQL"],
      metric: "20+ APIs",
      caseStudy: {
        problem:
          "Placement drives juggle students, recruiters and administrators, and matching hundreds of resumes to job openings by hand is slow.",
        approach:
          "One platform for the whole placement workflow, with an AI-powered ATS that parses resumes and matches candidates to jobs automatically.",
        built: [
          "Full-stack recruitment platform for students, recruiters and administrators, with placement management and application tracking workflows",
          "AI-powered Applicant Tracking System (ATS) for automated resume parsing and candidate-job matching",
          "Secured RESTful API endpoints in Node.js and FastAPI connecting the frontend, backend services and PostgreSQL",
          "JWT-based authentication, authorization and role-based access control to secure recruitment data across user roles",
        ],
        outcome: "Automated resume parsing and candidate-job matching, increasing matching efficiency.",
      },
      links: { github: "", live: "" },
    },
  ],

  // Other work, listed as "also screening" under the posters.
  moreProjects: [
    {
      title: "Automatic License Plate Recognition",
      description:
        "A real-time license plate recognition system using YOLOv8, PyTorch and OpenCV for automated detection and recognition.",
      tech: ["Python", "YOLOv8", "PyTorch", "OpenCV", "Computer Vision"],
      metric: "~30 FPS",
    },
  ],

  skills: {
    languages: ["C++", "Python", "JavaScript", "TypeScript", "SQL"],

    frontend: [
      "React.js",
      "Tailwind CSS",
      "Vite",
      "Responsive Design",
    ],

    backend: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "REST APIs",
      "JWT / Authentication",
    ],

    databases: [
      "MongoDB",
      "PostgreSQL",
      "Firebase",
      "Oracle SQL",
    ],

    ai: [
      "PyTorch",
      "OpenCV",
      "Pandas",
      "Matplotlib",
      "Computer Vision",
      "Generative AI",
    ],

    tools: [
      "Git",
      "GitHub",
      "Docker",
      "Vercel",
      "CI/CD",
      "Agile / Scrum",
    ],

    core: [
      "Data Structures & Algorithms",
      "OOP",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
      "AI",
    ],
  },

  beyond: {
    intro:
      "Outside the editor I'm still mostly curious — about how things work, and how to make them feel simpler for the people using them.",
    approach: [
      "Build first, then read the docs that make it better.",
      "Small, shippable pieces over big unfinished ones.",
      "If a user has to think about it, it isn't done yet.",
    ],
    interests: ["TBD", "TBD", "TBD"], // e.g. films, football, photography
  },

  contact: {
    email: "noorsandhu803@gmail.com",
    phone: "+91 7814205303",
    linkedin: "https://linkedin.com/in/gurnoor-sandhu-743898286",
    github: "https://github.com/noorsandhu803",
    resume: "/resume.pdf", // public/resume.pdf
  },
};
export type Project = (typeof portfolio.projects)[number];
