import { imagineOG, MARIME_OG, TIP_OG } from "@/lib/og";

export const alt = "Tinerii din comuna Cupșeni, pe Valea Pietrelor";
export const size = MARIME_OG;
export const contentType = TIP_OG;

export default function Image() {
  return imagineOG({
    eticheta: "Despre noi",
    titlu: "Tinerii din Cupșeni, Costeni, Libotin și Ungureni",
    subtitlu: "Povestea grupului de inițiativă",
    foto: "/foto/tineri/tineri-11.jpg",
  });
}
