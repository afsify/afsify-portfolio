import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
export function ContactCTA() {
  return <section className="contact-cta"><Container><div><Eyebrow>Have something in mind?</Eyebrow><h2>Let’s build something<br /><span>that works.</span></h2></div><Link href="/contact" className="cta-circle" aria-label="Let’s talk — contact Muhammed Afsal"><ArrowUpRight size={46} strokeWidth={1.3} aria-hidden="true" /><span>Let’s talk</span></Link></Container></section>;
}
