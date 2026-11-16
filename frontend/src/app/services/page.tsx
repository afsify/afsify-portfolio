import { Container, PageHero, SectionHeading, TextLink } from "@/components/ui/primitives";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Freelance React, Next.js & website development", "Scoped business websites, React/Next.js features and web maintenance by Muhammed Afsal TP in Kerala, India. Discuss requirements, delivery and handover.", "/services");
const steps = [
  ["Discovery", "Understand the users, existing setup and the outcome you need."],
  ["Proposal", "Agree the deliverables, boundaries, price and schedule before implementation."],
  ["Development", "Build in reviewable steps and share progress against the agreed scope."],
  ["Quality checks", "Check key workflows, responsive behavior and accessibility together."],
  ["Handover", "Deliver the source, deployment notes and agreed support arrangements."],
];
export default function Services() {
  return <><PageHero label="Work with me" title="A clear scope. A useful result." description="Selected freelance web projects, alongside my frontend role at Bizforz. Based in Calicut, Kerala; available for remote collaboration." />
    <section className="section light-section"><Container><SectionHeading label="Services" title="What can we build?" /><div className="service-details">{services.map((service) => <article id={service.slug} key={service.slug}><h3>{service.title}</h3><p className="lead">{service.description}</p><div className="service-columns"><div><h4>Typical deliverables</h4><ul>{service.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h4>What I’ll need</h4><p>{service.requirements}</p><h4>Scope boundaries</h4><p>{service.boundaries}</p></div></div><TextLink href="/contact#enquiry">Discuss this service</TextLink></article>)}</div></Container></section>
    <section className="section"><Container><SectionHeading label="The process" title="From the first conversation to handover." /><ol className="service-process">{steps.map(([title, text]) => <li key={title}><h3>{title}</h3><p>{text}</p></li>)}</ol></Container></section>
    <section className="section light-section"><Container><SectionHeading label="Relevant work" title="Proof, with the context attached." /><div className="skills-grid"><article><h3>Independent full-stack work</h3><p>EkaVio demonstrates my React, Express and PostgreSQL work. It is in active development and staging, not approved for real customer data.</p><TextLink href="/projects/ekavio">Explore EkaVio</TextLink></article><article><h3>Professional website delivery</h3><p>Le’valor, Home at Paris and Bizforz websites were delivered through my employer, Bizforz. These are employment projects, not freelance client engagements.</p><TextLink href="/projects/levalor">View employer work</TextLink></article><article><h3>Start with your requirements</h3><p>Share your goal, existing URL, required pages or features, and preferred timing. Budget is optional; pricing and timelines follow an agreed scope.</p><TextLink href="/contact#enquiry">Discuss a project</TextLink></article></div></Container></section></>;
}
