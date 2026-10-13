import { activitati, getActivitate } from "@/data/activitati";
import { getDirectie } from "@/data/directii";
import { getAlbum } from "@/data/galerie";
import { formateazaLuni } from "@/lib/luni";
import { imagineOG, MARIME_OG, TIP_OG } from "@/lib/og";

export const alt = "Activitate din calendarul Tineret Cupșeni 2027";
export const size = MARIME_OG;
export const contentType = TIP_OG;

export function generateStaticParams() {
  return activitati.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getActivitate(slug);
  if (!a) {
    return imagineOG({ eticheta: "Calendar 2027", titlu: "Activitățile tinerilor din Cupșeni" });
  }
  const directie = getDirectie(a.directie);
  // Dacă activitatea a avut deja o ediție cu poze, folosim coperta albumului.
  const album = a.editii?.map((e) => getAlbum(e.album)).find(Boolean);
  return imagineOG({
    eticheta: `Calendar 2027 · ${directie.nume}`,
    titlu: a.titlu,
    subtitlu: formateazaLuni(a.luni),
    accent: directie.culori.punct,
    foto: album?.coperta.src,
  });
}
