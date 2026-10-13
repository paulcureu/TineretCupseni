import type { IconName } from "@/components/Icon";

// Cele 7 schimbări (S1–S7) din Anexa 3. Codurile vin din anexă;
// numele scurte sunt alese pentru site și pot fi înlocuite cu formularea
// din Fișa 3 a candidaturii (câmpul `formulare`).

export type DirectieId = "s1" | "s2" | "s3" | "s4" | "s5" | "s6" | "s7";

export type Directie = {
  id: DirectieId;
  cod: string;
  nume: string;
  formulare: string;
  icon: IconName;
  culori: { fundal: string; text: string; punct: string; palid: string };
};

export const directii: Directie[] = [
  {
    id: "s1",
    cod: "S1",
    nume: "Leadership & implicare",
    formulare: "[Formularea schimbării S1 din Fișa 3.]",
    icon: "oameni",
    culori: { fundal: "#E1E7F2", text: "#14213D", punct: "#14213D", palid: "#F1F4F9" },
  },
  {
    id: "s2",
    cod: "S2",
    nume: "Tradiții & cultură",
    formulare: "[Formularea schimbării S2 din Fișa 3.]",
    icon: "motiv",
    culori: { fundal: "#F8E3DA", text: "#8A3A1C", punct: "#C2532A", palid: "#FCF3EF" },
  },
  {
    id: "s3",
    cod: "S3",
    nume: "Abilități pentru viață",
    formulare: "[Formularea schimbării S3 din Fișa 3.]",
    icon: "bec",
    culori: { fundal: "#FDEBD0", text: "#7A4300", punct: "#E08A1E", palid: "#FEF7EC" },
  },
  {
    id: "s4",
    cod: "S4",
    nume: "Sport & natură",
    formulare: "[Formularea schimbării S4 din Fișa 3.]",
    icon: "munte",
    culori: { fundal: "#E3EFE5", text: "#1F4D29", punct: "#2F6B3A", palid: "#F1F7F2" },
  },
  {
    id: "s5",
    cod: "S5",
    nume: "Timp liber împreună",
    formulare: "[Formularea schimbării S5 din Fișa 3.]",
    icon: "stea",
    culori: { fundal: "#ECE5F6", text: "#4B2A7B", punct: "#6B45A8", palid: "#F6F2FB" },
  },
  {
    id: "s6",
    cod: "S6",
    nume: "Solidaritate & târguri",
    formulare: "[Formularea schimbării S6 din Fișa 3.]",
    icon: "inima",
    culori: { fundal: "#F9E1E8", text: "#8A1F45", punct: "#C23A68", palid: "#FDF2F5" },
  },
  {
    id: "s7",
    cod: "S7",
    nume: "Mediu",
    formulare: "[Formularea schimbării S7 din Fișa 3.]",
    icon: "frunza",
    culori: { fundal: "#DDF0EE", text: "#165A55", punct: "#24877F", palid: "#EFF8F7" },
  },
];

export function getDirectie(id: DirectieId): Directie {
  const d = directii.find((x) => x.id === id);
  if (!d) throw new Error(`Direcție necunoscută: ${id}`);
  return d;
}
