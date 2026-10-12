import { Container, Eyebrow, ExternalLink, ResumeButton, TextLink } from "@/components/ui/primitives";
import { profile } from "@/data/profile";
import { resume } from "@/data/resume";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { detailedProjects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Resume", "Read Muhammed Afsal’s professional overview or download the current CV in PDF or DOCX: React, TypeScript, Bizforz frontend experience and full-stack projects.", "/resume");
export default function Resume() {
  return <section className="resume-page light-section"><Container>
    <div className="resume-toolbar"><div><Eyebrow>The professional overview</Eyebrow><p>Read here, or take a copy with you.</p></div><div><div className="resume-downloads"><ResumeButton className="button button-dark" /><ResumeButton format="docx" className="text-link" /></div><span className="download-note">Current CV · PDF for reading · DOCX for an editable copy</span></div></div>
    <article className="resume-paper">
      <header className="resume-header"><h1>{profile.name}</h1><p>{profile.headline} <span>/</span> {profile.secondaryRole}</p><div><span>{profile.location}</span><a href={profile.phone.href}>{profile.phone.display}</a><a href={`mailto:${profile.email}`}>{profile.email}</a>{profile.socials.slice(0, 2).map((social) => <a key={social.label} href={social.href}>{social.label}</a>)}<a href={profile.siteUrl}>{new URL(profile.siteUrl).hostname}</a></div></header>
      <section><h2>Professional summary</h2><p>{profile.summary}</p><p>{resume.strengths}</p></section>
      <section><h2>Professional experience</h2><div className="resume-row"><h3>{experience.company} — {experience.role}</h3><span>{experience.period}</span></div><p className="resume-location">{experience.location}</p><ul>{experience.contributions.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section><h2>Selected projects</h2>{detailedProjects.filter((project) => project.ownership === "independent").map((project) => <div className="resume-project" key={project.slug}><h3>{project.title} — {project.subtitle}</h3>{project.flagship ? <><ul>{resume.flagshipPoints.map((point) => <li key={point}>{point}</li>)}</ul><p>Active development / staging · Not approved for real customer data.</p></> : <p>{project.summary}</p>}<div className="resume-project-links"><TextLink href={`/projects/${project.slug}`}>Project details<span className="sr-only"> — {project.title}</span></TextLink>{project.live && <ExternalLink href={project.live.url}>{project.live.label || "Live demo"}<span className="sr-only"> — {project.title}</span></ExternalLink>}{project.github && <ExternalLink href={project.github}>GitHub<span className="sr-only"> — {project.title}</span></ExternalLink>}</div></div>)}</section>
      <section><h2>Technical skills</h2>{resume.skills.map((group) => <p key={group.title}><strong>{group.title}:</strong> {group.items}</p>)}</section>
      <section><h2>Education</h2>{education.map((item) => <div className="resume-education" key={item.course}><div className="resume-row"><h3>{item.course}</h3><span>{item.period}</span></div><p>{item.institution}</p></div>)}</section>
    </article>
  </Container></section>;
}
