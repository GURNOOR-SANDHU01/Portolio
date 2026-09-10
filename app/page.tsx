"use client";

import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="bg-[#080808] text-white overflow-hidden">
      <Navbar />

      <Hero />

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="section-number">01</div>

        <div className="section-content">
          <p className="eyebrow">ABOUT ME</p>

          <h2 className="section-title">
            Engineering ideas
            <br />
            into <span>real products.</span>
          </h2>

          <div className="about-grid">
            <p className="large-text">{portfolio.about.intro}</p>

            <p className="muted-text">
              {portfolio.about.description}
            </p>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section">
        <div className="section-number">02</div>

        <div className="section-content">
          <p className="eyebrow">EXPERIENCE</p>

          <h2 className="section-title">
            Where I've
            <br />
            <span>worked.</span>
          </h2>

          <div className="experience-list">
            {portfolio.experience.map((job, index) => (
              <motion.article
                key={job.company}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="experience-card"
              >
                <div className="experience-top">
                  <div>
                    <p className="company">{job.company}</p>
                    <h3>{job.role}</h3>
                  </div>

                  <span>{job.period}</span>
                </div>

                <p className="muted-text experience-description">
                  {job.description}
                </p>

                <ul>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="work" className="section">
        <div className="section-number">03</div>

        <div className="section-content">
          <p className="eyebrow">SELECTED WORK</p>

          <h2 className="section-title">
            Things I've
            <br />
            <span>built.</span>
          </h2>

          <div className="projects-grid">
            {portfolio.projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="project-card"
              >
                <div className="project-header">
                  <span>{project.number}</span>
                  <span>{project.metric}</span>
                </div>

                <div>
                  <h3>{project.title}</h3>

                  <p>{project.description}</p>
                </div>

                <div className="tech-list">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

                <div className="project-arrow">↗</div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section">
        <div className="section-number">04</div>

        <div className="section-content">
          <p className="eyebrow">SKILLS</p>

          <h2 className="section-title">
            My technical
            <br />
            <span>toolbox.</span>
          </h2>

          <div className="skills-grid">
            {Object.entries(portfolio.skills).map(
              ([category, skills], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="skill-group"
                >
                  <p>{category.replace("_", " ")}</p>

                  <div>
                    {skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <p className="eyebrow">05 — CONTACT</p>

        <h2>
          Let's build
          <br />
          something <span>great.</span>
        </h2>

        <p className="contact-description">
          Have an opportunity, project or interesting problem?
          <br />
          I'd love to hear about it.
        </p>

        <a
          href={`mailto:${portfolio.contact.email}`}
          className="contact-email"
        >
          {portfolio.contact.email}
        </a>

        <div className="socials">
          <a
            href={portfolio.contact.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>

          <a
            href={portfolio.contact.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>

          <a href={`tel:${portfolio.contact.phone}`}>
            Phone ↗
          </a>
        </div>

        <footer>
          © {new Date().getFullYear()} Gurnoor Singh
        </footer>
      </section>
    </main>
  );
}