import { navigation } from "./navigation";
import { projects } from "./projects";
import { services } from "./services";
import { profile, skillGroups } from "./profile";
import type { SearchEntry } from "../lib/search";

export const searchIndex: SearchEntry[] = [
  ...navigation.map((item): SearchEntry => ({ title: item.label, href: item.href, group: "Navigate", keywords: item.href === "/contact" ? "hire hiring role enquiry" : item.href === "/services" ? "freelance hire" : item.label })),
  { title: "Technical skills", href: "/about#skills", group: "Navigate", keywords: `full stack backend ${skillGroups.flatMap((group) => group.skills).join(" ")}` },
  ...projects.map((project): SearchEntry => ({ title: project.title, href: project.detail ? `/projects/${project.slug}` : `/projects#${project.slug}`, group: "Projects", keywords: `${project.subtitle} ${project.summary} ${project.stack.join(" ")} ${project.ownership} full stack` })),
  ...services.map((service): SearchEntry => ({ title: service.title, href: `/services#${service.slug}`, group: "Services", keywords: `freelance hire ${service.description}` })),
  { title: "View Resume", href: "/resume", group: "Actions", keywords: "cv pdf download qualifications experience" },
  { title: "Discuss a Project", href: "/contact#enquiry", group: "Actions", keywords: "freelance hire enquiry contact" },
  { title: "Email", href: `mailto:${profile.email}`, group: "Actions", keywords: "contact hiring role" },
  { title: "WhatsApp", href: profile.whatsapp, group: "Actions", keywords: "message contact" },
  ...profile.socials.slice(0, 2).map((social): SearchEntry => ({ title: social.label, href: social.href, group: "Actions", keywords: social.description })),
];
