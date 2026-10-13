import type { MetadataRoute } from "next";
import { absolut } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absolut("/sitemap.xml"),
  };
}
