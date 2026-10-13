import { activitati } from "@/data/activitati";
import { imagineOG, MARIME_OG, TIP_OG } from "@/lib/og";

export const alt = "Calendarul activităților Tineret Cupșeni în 2027";
export const size = MARIME_OG;
export const contentType = TIP_OG;

export default function Image() {
  return imagineOG({
    eticheta: "Calendar 2027",
    titlu: `${activitati.length} de activități,`,
    titluEvidentiat: "lună de lună",
    subtitlu: "Ateliere, sport, tradiții, seri de film și Festivalul Tinerilor",
  });
}
