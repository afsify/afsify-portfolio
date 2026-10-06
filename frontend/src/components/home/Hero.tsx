import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { Container, ExternalLink, ResumeButton } from "@/components/ui/primitives";
import { heroProfileSizes } from "@/lib/image-sizes";

export function Hero() {
  return <section className="hero"><Container>
    <div className="hero-topline"><p><span className="status-dot" />Frontend Developer @ Bizforz</p><span>Portfolio / afsify</span></div>
    <div className="hero-grid"><div className="hero-copy"><h1>Muhammed<br /><span>Afsal.</span><span className="hero-arrow" aria-hidden="true">↗</span></h1><p className="hero-role">{profile.headline}</p><p className="hero-description">{profile.introduction}</p><p className="availability"><span className="status-dot" />{profile.availability}</p><div className="button-row"><Link href="/projects" className="button button-accent">View my work <ArrowUpRight size={18} aria-hidden="true" /></Link><ResumeButton /></div></div>
    <div className="hero-portrait"><div className="portrait-frame"><Image src="/images/profile/muhammed-afsal.webp" alt="Muhammed Afsal, Frontend Developer and Full Stack Web Developer" fill preload quality={90} sizes={heroProfileSizes} /><span className="portrait-corner" aria-hidden="true">+</span></div><div className="portrait-caption"><span><MapPin size={14} aria-hidden="true" />Calicut, Kerala</span><span>India / IST</span></div><div className="portrait-note"><span className="note-mark" aria-hidden="true">↳</span><p>Frontend craft.<br />Full-stack perspective.</p></div></div></div>
    <div className="hero-bottom"><a href="#selected-work" className="scroll-cue"><ArrowDown size={16} aria-hidden="true" />A little further, a lot more.</a><div className="social-links">{profile.socials.slice(0, 2).map((link) => <ExternalLink key={link.label} href={link.href}>{link.label}</ExternalLink>)}</div></div>
  </Container></section>;
}
