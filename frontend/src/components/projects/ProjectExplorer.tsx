"use client";
import { useState } from "react";
import { projects, projectCategories } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { FeaturedProject } from "./FeaturedProject";

export function ProjectExplorer() {
  const [category, setCategory] = useState<(typeof projectCategories)[number]>("All work");
  const filtered = projects.filter((project) => category === "All work" || project.category === category);
  return <><div className="project-filter" role="group" aria-label="Filter projects by category">{projectCategories.map((item) => <button key={item} type="button" aria-pressed={category === item} aria-controls="project-results" onClick={() => setCategory(item)}>{item}</button>)}</div><p className="results-count" role="status">{filtered.length} {filtered.length === 1 ? "project" : "projects"}{category !== "All work" ? ` · ${category}` : " · A selection of independent work"}</p><div id="project-results">{filtered.some((project) => project.flagship) && <FeaturedProject />}<div className="project-grid">{filtered.filter((project) => !project.flagship).map((project) => <ProjectCard key={project.slug} project={project} index={projects.indexOf(project)} />)}</div></div></>;
}
