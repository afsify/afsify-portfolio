import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { absoluteUrl } from "@/lib/metadata";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, host: profile.siteUrl, sitemap: absoluteUrl("/sitemap.xml") };
}
