import { albume, detaliiAlbum, getAlbum } from "@/data/galerie";
import { imagineOG, MARIME_OG, TIP_OG } from "@/lib/og";

export const alt = "Album foto Tineret Cupșeni";
export const size = MARIME_OG;
export const contentType = TIP_OG;

export function generateStaticParams() {
  return albume.map((a) => ({ album: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ album: string }> }) {
  const { album: slug } = await params;
  const album = getAlbum(slug);
  if (!album) {
    return imagineOG({ eticheta: "Galerie foto", titlu: "Momente din comună" });
  }
  return imagineOG({
    eticheta: "Galerie foto",
    titlu: album.titlu,
    subtitlu: detaliiAlbum(album) || album.descriere,
    foto: album.coperta.src,
  });
}
