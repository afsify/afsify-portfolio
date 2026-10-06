import { Container, TextLink } from "@/components/ui/primitives";
import { services } from "@/data/services";

export function WorkWithMe() {
  return <section className="section work-with-me" aria-labelledby="work-with-me-title"><Container>
    <div className="section-heading"><div><p className="eyebrow">Selected freelance projects</p><h2 id="work-with-me-title">Useful work. Clear scope.</h2></div><TextLink href="/contact#project-enquiries">Discuss a project</TextLink></div>
    <p className="work-intro">Alongside my frontend career, I take on selected web projects outside my employment commitments. A focused scope, practical outcomes and clear communication come first.</p>
    <div className="skills-grid">{services.map((service) => <article key={service.title}><h3>{service.title}</h3><p>{service.description}</p></article>)}</div>
  </Container></section>;
}
