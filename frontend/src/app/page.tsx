import { Hero } from "@/components/home/Hero";
import { ExperiencePreview } from "@/components/home/ExperiencePreview";
import { FeaturedProject } from "@/components/projects/FeaturedProject";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Recognition } from "@/components/sections/Recognition";
import { WorkWithMe } from "@/components/sections/WorkWithMe";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Container, SectionHeading, TextLink } from "@/components/ui/primitives";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Frontend Developer & Full Stack Web Developer", "Muhammed Afsal — Frontend Developer at Bizforz, based in Calicut. Explore production experience, full-stack projects and the engineering behind EkaVio.", "/");
export default function Home() {
  return <><Hero /><section id="selected-work" className="section light-section"><Container><SectionHeading title="Thought through. Built out." label="Selected work" number="01"><TextLink href="/projects">All projects <span className="link-count">{String(projects.length).padStart(2, "0")}</span></TextLink></SectionHeading><FeaturedProject /><div className="project-grid home-projects">{projects.slice(1, 3).map((project, index) => <ProjectCard key={project.slug} project={project} index={index + 1} />)}</div></Container></section><ExperiencePreview /><Recognition preview /><WorkWithMe /><ContactCTA /></>;
}
