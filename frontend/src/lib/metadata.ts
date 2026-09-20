import type { Metadata } from "next";
import { profile } from "@/data/profile";

export function absoluteUrl(path: string) { return new URL(path, profile.siteUrl).toString(); }
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const socialTitle = `${title} | ${profile.name}`;
  const image = { url: absoluteUrl("/images/brand/social-preview.png"), width: 1200, height: 630, alt: "Muhammed Afsal — Frontend Developer at Bizforz and Full Stack Web Developer" };
  return {
    title, description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: { type: "website", locale: "en_IN", siteName: "afsify — Muhammed Afsal", url: absoluteUrl(path), title: socialTitle, description, images: [image] },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: [image] },
  };
}
