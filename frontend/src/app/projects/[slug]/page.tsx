import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { detailedProjects, getProject } from "@/data/projects";
import { Container, ExternalLink, Eyebrow, TechStack } from "@/components/ui/primitives";
import { Architecture } from "@/components/projects/Architecture";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return detailedProjects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? pageMetadata(project.title, project.summary, `/projects/${project.slug}`) : { title: "Project not found", robots: { index: false, follow: false } };
}
export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.detail) notFound();
  const nextProject = detailedProjects[(detailedProjects.indexOf(project) + 1) % detailedProjects.length];
  return <><section className={`project-hero project-hero-${project.slug}`}><Container><Link href="/projects" className="breadcrumb"><ArrowLeft size={16} aria-hidden="true" />All projects</Link><div className="project-detail-top"><Eyebrow>{project.flagship ? "Flagship / Engineering case study" : `${project.category} / Project notes`}</Eyebrow><span className="project-status"><span className="status-dot" />{project.status}</span></div><h1>{project.title}<span>.</span></h1><p className="detail-subtitle">{project.subtitle}</p><p className="lead">{project.detail.intro}</p><div className="button-row"><ExternalLink href={project.github} className="button button-accent">View on GitHub</ExternalLink>{project.live && <ExternalLink href={project.live.url} className="button button-outline">Live demo</ExternalLink>}</div><div className="project-facts"><div><span>Role</span><p>{project.detail.role}</p></div><div><span>Category</span><p>{project.category}</p></div><div><span>Status</span><p>{project.status}</p></div></div></Container></section>
    {project.flagship && <section className="architecture-section light-section"><Container><div className="architecture-intro"><Eyebrow>Under the surface</Eyebrow><h2>Clear boundaries.<br />Connected operations.</h2><p>A React/Vite client, an Express/TypeScript API and distinct responsibilities for each data store.</p></div><Architecture /></Container></section>}
    <section className="section light-section"><Container><div className="case-study"><aside className="case-sidebar"><Eyebrow>Built with</Eyebrow><TechStack stack={project.stack} /><div className="case-source"><p>Explore the implementation and project documentation.</p><ExternalLink href={project.github}>Source repository</ExternalLink></div></aside><div className="case-content">{project.detail.sections.map((section, index) => <section key={section.title}><span className="case-index">{String(index + 1).padStart(2, "0")}</span><div><h2>{section.title}</h2><p>{section.body}</p>{section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}</div></section>)}</div></div><Link href={`/projects/${nextProject.slug}`} className="next-project"><span><span className="eyebrow">Next project</span><strong>{nextProject.title}</strong></span><ArrowUpRight size={38} strokeWidth={1.4} aria-hidden="true" /></Link></Container></section><ContactCTA /></>;
}
