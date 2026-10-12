import { Container, SectionHeading, TextLink } from "@/components/ui/primitives";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { professionalProjects, projects } from "@/data/projects";

export function ProfessionalWebsites() {
  return <section className="section professional-websites" aria-label="Professional Websites"><Container>
    <SectionHeading label="Professional Websites" title="From requirements to launch."><TextLink href="/experience">My professional experience</TextLink></SectionHeading>
    <p className="work-intro">Primary hands-on development of business websites through Bizforz Solutions Pvt Ltd—from client discussions and content coordination to responsive implementation, launch assistance and ongoing updates. These are employment-delivered projects, not freelance contracts.</p>
    <div className="project-grid professional-grid">{professionalProjects.map((project) => <ProjectCard key={project.slug} project={project} index={projects.indexOf(project)} />)}</div>
  </Container></section>;
}
