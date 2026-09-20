import Image from "next/image";
import { aboutProfileSizes } from "@/lib/image-sizes";
import { Container, Eyebrow, PageHero, SectionHeading, TextLink } from "@/components/ui/primitives";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { profile, principles, skillGroups } from "@/data/profile";
import { education } from "@/data/education";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("About", "The person behind afsify. Muhammed Afsal’s journey from Computer Engineering and Brototype to production frontend work at Bizforz and full-stack engineering.", "/about");
export default function About() {
  return <><PageHero label="A little about me" title="Curious about the whole system." description="I care about how software feels to use—and what makes it work underneath." /><section className="section light-section"><Container><div className="about-story"><div className="about-photo"><Image src="/images/profile/muhammed-afsal.webp" alt="Portrait of Muhammed Afsal" fill quality={90} sizes={aboutProfileSizes} /><span className="photo-label">Muhammed Afsal / afsify</span></div><div className="story-copy"><Eyebrow>Frontend craft. Full-stack perspective.</Eyebrow><h2>A developer, with the user’s world in mind.</h2>{profile.narrative.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<TextLink href="/experience">My professional experience</TextLink></div></div></Container></section>
    <section className="section"><Container><SectionHeading label="How I approach work" title="Good software starts with understanding." /><div className="principles-grid">{principles.map((principle, index) => <article key={principle.title}><span className="large-index">0{index + 1}</span><h3>{principle.title}</h3><p>{principle.text}</p></article>)}</div></Container></section>
    <section className="section light-section"><Container><SectionHeading label="Tools & focus" title="Across the stack." /><div className="skills-grid">{skillGroups.map((group) => <article key={group.title}><h3>{group.title}</h3><p>{group.description}</p><ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></article>)}</div><div className="education-block"><SectionHeading label="The foundations" title="Learning through building." /><div className="education-list">{education.map((item) => <article key={item.course}><span>{item.period}</span><div><h3>{item.course}</h3><p className="education-institution">{item.institution}</p><p>{item.description}</p></div></article>)}</div></div></Container></section><ContactCTA /></>;
}
