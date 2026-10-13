import { activitati } from "@/data/activitati";
import { imagineOG, MARIME_OG, TIP_OG } from "@/lib/og";

export const alt = "Tineret Cupșeni: grupul de inițiativă al tinerilor din comuna Cupșeni, la apus";
export const size = MARIME_OG;
export const contentType = TIP_OG;

export default function Image() {
  return imagineOG({
    eticheta: "Sat European de Tineret 2027",
    titlu: "Tinerii din comuna",
    titluEvidentiat: "Cupșeni",
    subtitlu: `Finaliști · 4 sate, o singură comunitate · ${activitati.length} de activități în 2027`,
    foto: "/foto/grup/prima-intalnire-apus.jpg",
  });
}
