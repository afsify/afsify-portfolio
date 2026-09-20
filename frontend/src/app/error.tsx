"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <section className="not-found"><div className="container"><p className="eyebrow">Something went wrong</p><h1>Let’s try that again.</h1><p>This page couldn’t load. You can retry or head back home.</p><div className="button-row"><button className="button button-accent" onClick={reset} type="button">Try again</button><Link href="/" className="button button-outline">Back to home</Link></div></div></section>;
}
