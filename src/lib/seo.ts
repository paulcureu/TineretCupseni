import type { Metadata } from "next";
import { site } from "@/data/site";

// Metadate comune pentru SEO și pentru previzualizările de pe WhatsApp, Facebook etc.
// Imaginile de previzualizare vin din fișierele `opengraph-image.tsx` din fiecare rută.

/** Adresa completă a unei pagini sau a unui fișier de pe site. */
export function absolut(cale: string): string {
  return new URL(cale, site.url).toString();
}

type Pagina = {
  /** Titlul din tab; pe rețele se adaugă „· Tineret Cupșeni”. */
  titlu: string;
  descriere: string;
  /** Calea paginii, de ex. „/calendar”. Devine adresa canonică. */
  cale: string;
};

export function metadatePagina({ titlu, descriere, cale }: Pagina): Metadata {
  const titluSocial = cale === "/" ? titlu : `${titlu} · ${site.numeScurt}`;
  return {
    title: cale === "/" ? { absolute: titlu } : titlu,
    description: descriere,
    alternates: { canonical: cale },
    openGraph: {
      type: "website",
      locale: "ro_RO",
      siteName: site.nume,
      url: cale,
      title: titluSocial,
      description: descriere,
    },
    twitter: {
      card: "summary_large_image",
      title: titluSocial,
      description: descriere,
    },
  };
}

type Pas = { nume: string; cale: string };

/** Firul de navigare (Acasă › … › pagina), pentru rezultatele Google. */
export function firNavigare(pasi: Pas[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ nume: "Acasă", cale: "/" }, ...pasi].map((pas, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: pas.nume,
      item: absolut(pas.cale),
    })),
  };
}
