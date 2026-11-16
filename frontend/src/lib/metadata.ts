import type { Metadata } from "next";
import { profile } from "@/data/profile";

export function absoluteUrl(path: string) { return new URL(path, profile.siteUrl).toString(); }
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const socialTitle = `${title} | ${profile.name}`;
  const image = { url: absoluteUrl("/images/brand/social-preview.png"), width: 1200, height: 630, alt: "Muhammed Afsal TP — Full Stack Web Developer; professional Frontend Developer at Bizforz" };
  return {
    // The root layout template only applies to child segments, not the home page.
    title: path === "/" ? { absolute: socialTitle } : title, description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: { type: "website", locale: "en_IN", siteName: "afsify — Muhammed Afsal TP", url: absoluteUrl(path), title: socialTitle, description, images: [image] },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: [image] },
  };
}
