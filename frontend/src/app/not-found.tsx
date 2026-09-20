import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
export default function NotFound() {
  return <section className="not-found"><Container><Eyebrow>404 · A small detour</Eyebrow><h1>This page<br />is off the map.</h1><p>The link may have changed. There’s still plenty of work to explore.</p><Link href="/projects" className="button button-accent">Explore my projects <ArrowUpRight size={18} aria-hidden="true" /></Link><Link href="/" className="text-link">Back to home</Link></Container></section>;
}
