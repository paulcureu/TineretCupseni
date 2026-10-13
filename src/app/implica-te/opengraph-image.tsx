import { imagineOG, MARIME_OG, TIP_OG } from "@/lib/og";

export const alt = "Implică-te alături de Tineret Cupșeni";
export const size = MARIME_OG;
export const contentType = TIP_OG;

export default function Image() {
  return imagineOG({
    eticheta: "Implică-te",
    titlu: "Fă parte din",
    titluEvidentiat: "echipa noastră",
    subtitlu: "Voluntar, idei de activități sau partener",
  });
}
