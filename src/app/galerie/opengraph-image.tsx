import { imagineOG, MARIME_OG, TIP_OG } from "@/lib/og";

export const alt = "Galeria foto Tineret Cupșeni";
export const size = MARIME_OG;
export const contentType = TIP_OG;

export default function Image() {
  return imagineOG({
    eticheta: "Galerie foto",
    titlu: "Momente din comună",
    subtitlu: "Prima întâlnire, tinerii din comună și seara de film",
    foto: "/foto/film/seara-014.jpg",
  });
}
