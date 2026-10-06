import { Container, PageHero } from "@/components/ui/primitives";
import { ProjectExplorer } from "@/components/projects/ProjectExplorer";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Projects", "Explore EkaVio, Codisify Devlearn, Chateph Messenger, Afssian E-Commerce and Taskent Dashboard by Muhammed Afsal.", "/projects");
export default function Projects() {
  return <><PageHero label={`Selected projects / ${String(projects.length).padStart(2, "0")}`} title="Ideas, carried into code." description="Independent work across business operations, learning, realtime communication and commerce. Each project explores a different part of the stack." /><section className="section light-section projects-section"><Container><h2 className="sr-only">Project collection</h2><ProjectExplorer /></Container></section><ContactCTA /></>;
}
