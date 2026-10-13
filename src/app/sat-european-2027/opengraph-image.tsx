import { imagineOG, MARIME_OG, TIP_OG } from "@/lib/og";

export const alt = "Cupșeni, comună finalistă pentru titlul de Sat European de Tineret 2027";
export const size = MARIME_OG;
export const contentType = TIP_OG;

export default function Image() {
  return imagineOG({
    eticheta: "European Youth Village",
    titlu: "Satul European",
    titluEvidentiat: "de Tineret 2027",
    subtitlu: "Cupșeni este comună finalistă",
  });
}
