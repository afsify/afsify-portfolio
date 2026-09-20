"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { ThemeToggle } from "./ThemeToggle";

function MobileMenu({ onClose, active }: { onClose: () => void; active: (href: string) => boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      previous?.focus({ preventScroll: true });
    };
  }, []);
  function containFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("a[href],button")).filter((node) => node.getClientRects().length > 0);
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }
  return <dialog id="mobile-navigation" ref={dialogRef} className="mobile-menu" aria-label="Navigation menu" onKeyDown={containFocus} onCancel={(event) => { event.preventDefault(); onClose(); }}>
    <div className="mobile-menu-top"><span className="wordmark">afsify<span>.</span></span><button type="button" className="icon-button" aria-label="Close menu" onClick={onClose}><X size={24} /></button></div>
    <p className="eyebrow">Take a look around</p>
    <nav aria-label="Mobile navigation">{navigation.map((item, index) => <Link key={item.href} href={item.href} aria-current={active(item.href) ? "page" : undefined} onClick={onClose}><span className="menu-number">0{index + 1}</span>{item.label}<ArrowUpRight size={22} aria-hidden="true" /></Link>)}</nav>
    <div className="mobile-theme-control"><ThemeToggle expanded /></div>
    <Link href="/resume" className="button button-accent" onClick={onClose}>View resume <ArrowUpRight size={18} aria-hidden="true" /></Link>
    <a href={`mailto:${profile.email}`} className="mobile-email">{profile.email}</a>
    <p className="muted">{profile.location}</p>
  </dialog>;
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px)");
    const resize = () => { if (media.matches) setOpen(false); };
    media.addEventListener("change", resize);
    return () => media.removeEventListener("change", resize);
  }, []);
  return <header className="site-header"><div className="container nav-inner">
    <Link href="/" className="wordmark" aria-label="afsify — home">afsify<span>.</span></Link>
    <nav className="desktop-nav" aria-label="Main navigation">{navigation.map((item) => <Link key={item.href} href={item.href} aria-current={active(item.href) ? "page" : undefined}>{item.label}</Link>)}</nav>
    <div className="nav-actions"><ThemeToggle /><Link href="/resume" className="nav-resume">Resume <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
    <button type="button" className="icon-button menu-trigger" aria-label="Open menu" aria-expanded={open} aria-controls={open ? "mobile-navigation" : undefined} aria-haspopup="dialog" onClick={() => setOpen(true)}><Menu size={23} /></button>
  </div>{open && <MobileMenu onClose={() => setOpen(false)} active={active} />}</header>;
}
