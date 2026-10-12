import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { flagshipProject } from "@/data/projects";
import { Architecture } from "@/components/projects/Architecture";
import { ExternalLink, TechStack } from "@/components/ui/primitives";

export function FeaturedProject() {
  return <article className="featured-project"><div className="featured-content"><div className="featured-label"><span>Flagship project</span><span><i className="status-dot" />{flagshipProject.status}</span></div><h3>{flagshipProject.title}<span>↗</span></h3><p className="featured-subtitle">{flagshipProject.subtitle}</p><p className="featured-description">{flagshipProject.summary}</p><TechStack stack={["React", "TypeScript", "Node.js", "PostgreSQL", "Socket.IO"]} /><div className="featured-actions"><Link href="/projects/ekavio" className="button button-accent">Inside the build <ArrowUpRight size={18} aria-hidden="true" /></Link>{flagshipProject.github && <ExternalLink href={flagshipProject.github}>View source</ExternalLink>}{flagshipProject.live && <ExternalLink href={flagshipProject.live.url}>{flagshipProject.live.label || "Live demo"}</ExternalLink>}</div></div><Architecture compact /></article>;
}
