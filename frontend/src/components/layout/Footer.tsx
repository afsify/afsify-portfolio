import Image from "next/image";
import Link from "next/link";
import { profile } from "@/data/profile";
import { Container, ExternalLink } from "@/components/ui/primitives";

export function Footer() {
  return <footer className="site-footer"><Container>
    <div className="footer-main"><div><Link href="/" className="wordmark" aria-label="afsify — home">afsify<span>.</span></Link><p className="footer-name">{profile.name}</p><p className="muted">Frontend Developer / Full Stack Web Developer</p><p className="muted">Calicut, Kerala</p></div>
      <div className="footer-connect"><p className="eyebrow">Good things start with a conversation.</p><a href={`mailto:${profile.email}`} className="footer-email">{profile.email}</a><div className="social-links">{profile.socials.map((link) => <ExternalLink key={link.label} href={link.href}>{link.label}</ExternalLink>)}</div></div>
    </div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} {profile.name}</p><div className="footer-signature"><Image src="/images/brand/afs-mark.webp" width={25} height={25} alt="" /><span>Built with care. Always evolving.</span></div><a href="#main-content" className="back-top">Back to top ↑</a></div>
  </Container></footer>;
}
