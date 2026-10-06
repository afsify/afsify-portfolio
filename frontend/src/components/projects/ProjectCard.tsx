import Link from "next/link";
import { ArrowUpRight, BookOpen, MessageSquare, ShoppingBag, LayoutDashboard, GitBranch } from "lucide-react";
import type { Project } from "@/data/projects";
import { ExternalLink, TechStack } from "@/components/ui/primitives";

const projectIcons = { codisify: BookOpen, chateph: MessageSquare, afssian: ShoppingBag, taskent: LayoutDashboard, ekavio: GitBranch };
export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const Icon = projectIcons[project.slug as keyof typeof projectIcons] ?? GitBranch;
  return <article className={`project-card project-${project.slug}`}>
    <div className="project-card-top"><span className="project-symbol"><Icon size={27} strokeWidth={1.5} aria-hidden="true" /></span><span className="project-index">{String(index + 1).padStart(2, "0")}</span></div>
    <div className="project-meta"><span>{project.category}</span><span>{project.status}</span></div>
    <h3>{project.detail ? <Link href={`/projects/${project.slug}`}>{project.title}</Link> : project.title}</h3>
    <p>{project.summary}</p>
    {project.stack.length > 0 && <TechStack stack={project.stack} compact />}
    <div className="project-actions">{project.detail && <Link href={`/projects/${project.slug}`} className="text-link">Explore project <ArrowUpRight size={17} aria-hidden="true" /></Link>}<ExternalLink href={project.github}>GitHub</ExternalLink>{project.live && <ExternalLink href={project.live.url}>{project.live.label || "Live demo"}</ExternalLink>}</div>
  </article>;
}
