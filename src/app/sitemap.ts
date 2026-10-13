import type { MetadataRoute } from "next";
import { activitati } from "@/data/activitati";
import { albume } from "@/data/galerie";
import { navigatie } from "@/data/site";
import { absolut } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pagini = [...navigatie.map((n) => n.href), "/implica-te"];
  return [
    ...pagini.map((p) => ({
      url: absolut(p),
      changeFrequency: "weekly" as const,
      priority: p === "/" ? 1 : 0.8,
      images: p === "/" ? [absolut("/foto/grup/prima-intalnire-apus.jpg")] : undefined,
    })),
    ...activitati.map((a) => ({ url: absolut(`/activitati/${a.slug}`), changeFrequency: "monthly" as const, priority: 0.6 })),
    ...albume.map((a) => ({
      url: absolut(`/galerie/${a.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.5,
      images: a.foto.map((f) => absolut(f.src)),
    })),
  ];
}
