import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Container, Eyebrow, ExternalLink, ResumeButton } from "@/components/ui/primitives";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Contact", "Contact Muhammed Afsal for Frontend / Full-Stack opportunities or selected freelance projects. Email, phone, WhatsApp, LinkedIn and GitHub.", "/contact");
export default function Contact() {
  return <>
    <section className="contact-hero"><Container>
      <Eyebrow>Let’s connect</Eyebrow><h1>Good conversations.<br /><span>Better possibilities.</span></h1>
      <p className="lead">For a Frontend / Full-Stack role, a freelance project, or an interesting engineering problem, I’d be glad to talk.</p>
      <a href={`mailto:${profile.email}`} className="contact-email"><span>{profile.email}</span><ArrowUpRight size={32} aria-hidden="true" /></a>
      <p className="email-caption"><Mail size={15} aria-hidden="true" />Email is the best place to start.</p>
      <div className="contact-intents">
        <article><Eyebrow>Hiring conversations</Eyebrow><h2>My next frontend role.</h2><p>Currently a Frontend Developer at Bizforz, open to stronger React, TypeScript and Full-Stack opportunities.</p><a href={profile.hiringEmail} className="text-link">Discuss a role <ArrowUpRight size={18} aria-hidden="true" /></a></article>
        <article id="project-enquiries"><Eyebrow>Freelance enquiries</Eyebrow><h2>A focused web project.</h2><p>Selected websites, frontend features and improvements, scoped outside my employment commitments. Share the outcome, timeline and existing setup.</p><a href={profile.projectEmail} className="text-link">Discuss a project <ArrowUpRight size={18} aria-hidden="true" /></a></article>
      </div>
    </Container></section>
    <section className="section light-section"><Container><div className="contact-grid">
      <div><Eyebrow>Direct contact</Eyebrow><h2>Find the work.<br />Meet the person.</h2><div className="contact-location"><MapPin size={19} aria-hidden="true" /><span>{profile.location}<small>{profile.timezone}</small></span></div><ResumeButton className="button button-dark" /></div>
      <div className="contact-socials">
        <article><div><h3>Phone</h3><p>{profile.phone.display}</p></div><a href={profile.phone.href} className="icon-button" aria-label={`Call Muhammed Afsal on ${profile.phone.display}`}><Phone size={20} aria-hidden="true" /></a></article>
        <article><div><h3>WhatsApp</h3><p>A short introduction or project enquiry.</p></div><ExternalLink href={profile.whatsapp} className="icon-button"><span className="sr-only">Message Muhammed Afsal on WhatsApp</span></ExternalLink></article>
        {profile.socials.filter((social) => social.label !== "Solo.to").map((social) => <article key={social.label}><div><h3>{social.label}</h3><p>{social.description}</p></div><ExternalLink href={social.href} className="icon-button"><span className="sr-only">Visit {social.label}</span></ExternalLink></article>)}
      </div>
    </div></Container></section>
  </>;
}
