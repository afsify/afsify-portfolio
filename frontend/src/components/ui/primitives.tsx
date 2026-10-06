import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import type { ReactNode } from "react";
import { profile } from "@/data/profile";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`container ${className}`}>{children}</div>;
}
export function Eyebrow({ children, number }: { children: ReactNode; number?: string }) {
  return <p className="eyebrow">{number && <span className="section-number">{number}</span>}{children}</p>;
}
export function SectionHeading({ title, label, number, children }: { title: string; label: string; number?: string; children?: ReactNode }) {
  return <div className="section-heading"><div><Eyebrow number={number}>{label}</Eyebrow><h2>{title}</h2></div>{children}</div>;
}
export function PageHero({ label, title, description, children }: { label: string; title: string; description: string; children?: ReactNode }) {
  return <section className="page-hero"><Container><Eyebrow>{label}</Eyebrow><h1>{title}</h1><p className="lead">{description}</p>{children}</Container></section>;
}
export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return <Link href={href} className={`text-link ${className}`}>{children}<ArrowUpRight size={18} aria-hidden="true" /></Link>;
}
export function ExternalLink({ href, children, className = "text-link" }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>;
}
export function ResumeButton({ className = "button button-outline", format = "pdf" }: { className?: string; format?: "pdf" | "docx" }) {
  return <a className={className} href={profile.resume[format]} download>Download CV ({format.toUpperCase()}) <Download size={17} aria-hidden="true" /></a>;
}
export function TechStack({ stack, compact = false }: { stack: readonly string[]; compact?: boolean }) {
  const items = compact ? stack.slice(0, 4) : stack;
  return <ul className="tech-stack" aria-label="Technology stack">{items.map((item) => <li key={item}>{item}</li>)}{compact && stack.length > 4 && <li aria-label={`${stack.length - 4} more technologies`}>+{stack.length - 4}</li>}</ul>;
}
