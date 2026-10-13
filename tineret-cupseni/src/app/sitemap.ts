import type { MetadataRoute } from "next";
import { activitati } from "@/data/activitati";
import { albume } from "@/data/galerie";
import { navigatie, site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pagini = [...navigatie.map((n) => n.href), "/implica-te"];
  return [
    ...pagini.map((p) => ({ url: new URL(p, site.url).toString(), changeFrequency: "weekly" as const, priority: p === "/" ? 1 : 0.8 })),
    ...activitati.map((a) => ({ url: new URL(`/activitati/${a.slug}`, site.url).toString(), changeFrequency: "monthly" as const, priority: 0.6 })),
    ...albume.map((a) => ({ url: new URL(`/galerie/${a.slug}`, site.url).toString(), changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
