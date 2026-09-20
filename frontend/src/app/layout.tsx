import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { profile } from "@/data/profile";
import { ThemeObserver } from "@/components/layout/ThemeToggle";
import { themeColors, themeInitScript } from "@/lib/theme";
import "./globals.css";

const manrope = localFont({ src: "./fonts/manrope-latin.woff2", variable: "--font-manrope", display: "swap", weight: "200 800" });
export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: "Muhammed Afsal — Frontend Developer & Full Stack Web Developer", template: "%s | Muhammed Afsal" },
  description: profile.summary,
  applicationName: "afsify", authors: [{ name: profile.name, url: profile.siteUrl }],
};
export const viewport: Viewport = {
  width: "device-width", initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: themeColors.dark },
    { media: "(prefers-color-scheme: light)", color: themeColors.light },
  ],
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const person = { "@context": "https://schema.org", "@type": "Person", name: profile.name, alternateName: profile.brand, url: profile.siteUrl, image: `${profile.siteUrl}/images/profile/muhammed-afsal.webp`, jobTitle: "Frontend Developer", worksFor: { "@type": "Organization", name: "Bizforz" }, homeLocation: { "@type": "Place", name: profile.location }, sameAs: profile.socials.map((link) => link.href) };
  return <html lang="en" className={manrope.variable} suppressHydrationWarning><head><script id="afsify-theme-init" dangerouslySetInnerHTML={{ __html: themeInitScript }} /></head><body><ThemeObserver /><a className="skip-link" href="#main-content">Skip to content</a><Navbar /><main id="main-content" tabIndex={-1}>{children}</main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} /></body></html>;
}
