import type { MetadataRoute } from "next";
import { coreRoutes } from "@/data/navigation";
import { detailedProjects } from "@/data/projects";
import { absoluteUrl } from "@/lib/metadata";
export default function sitemap(): MetadataRoute.Sitemap {
  return [...coreRoutes, ...detailedProjects.map((project) => `/projects/${project.slug}`)].map((route) => ({ url: absoluteUrl(route), priority: route === "/" ? 1 : 0.8 }));
}
