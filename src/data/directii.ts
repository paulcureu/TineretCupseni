import type { IconName } from "@/components/Icon";

// Cele 7 schimbări (S1–S7) din Anexa 3. Codurile vin din anexă;
// numele scurte sunt alese pentru site. `formulare` descrie schimbarea pe baza activităților
// din anexă; se poate înlocui cu formularea oficială din Fișa 3 a candidaturii.

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
    formulare: "Tinerii din cele patru sate învață să conducă: se întâlnesc lunar ca grup de inițiativă, trec prin ateliere de leadership, management de proiect și comunicare și ajung de la participanți la organizatori.",
    icon: "oameni",
    culori: { fundal: "#E1E7F2", text: "#1A2E40", punct: "#1A2E40", palid: "#F1F4F9" },
  },
  {
    id: "s2",
    cod: "S2",
    nume: "Tradiții & cultură",
    formulare: "Tradițiile Țării Lăpușului merg mai departe prin tineri: ateliere de meșteșuguri, rețete transmise între generații și clubul de carte și dialog.",
    icon: "motiv",
    culori: { fundal: "#F8E3DA", text: "#8A3A1C", punct: "#C2532A", palid: "#FCF3EF" },
  },
  {
    id: "s3",
    cod: "S3",
    nume: "Abilități pentru viață",
    formulare: "Tinerii capătă abilități de care au nevoie în viață: prim ajutor, educație financiară, antreprenoriat și muzică.",
    icon: "bec",
    culori: { fundal: "#FDEBD0", text: "#7A4300", punct: "#E08A1E", palid: "#FEF7EC" },
  },
  {
    id: "s4",
    cod: "S4",
    nume: "Sport & natură",
    formulare: "Tinerii fac mișcare împreună și descoperă natura din jurul comunei: cros, ture pe două roți, drumeții și Cupa celor 4 sate la fotbal.",
    icon: "munte",
    culori: { fundal: "#E3EFE5", text: "#1E3F1A", punct: "#2D5A27", palid: "#F1F7F2" },
  },
  {
    id: "s5",
    cod: "S5",
    nume: "Timp liber împreună",
    formulare: "Tinerii au, lună de lună, prilejuri să-și petreacă timpul liber împreună: seri de film și jocuri, foc de tabără, sărbători câmpenești, picnicul comunei și Noaptea Perseidelor.",
    icon: "stea",
    culori: { fundal: "#ECE5F6", text: "#4B2A7B", punct: "#6B45A8", palid: "#F6F2FB" },
  },
  {
    id: "s6",
    cod: "S6",
    nume: "Solidaritate & târguri",
    formulare: "Tinerii se implică pentru ceilalți: campanii de donare de sânge și târgurile de toamnă și de Crăciun ale comunei.",
    icon: "inima",
    culori: { fundal: "#F5E3E3", text: "#7E2122", punct: "#9E2A2B", palid: "#FBF1F1" },
  },
  {
    id: "s7",
    cod: "S7",
    nume: "Mediu",
    formulare: "Tinerii au grijă de natura din comună: plantări și campanii de ecologizare.",
    icon: "frunza",
    culori: { fundal: "#DDF0EE", text: "#165A55", punct: "#24877F", palid: "#EFF8F7" },
  },
];

export function getDirectie(id: DirectieId): Directie {
  const d = directii.find((x) => x.id === id);
  if (!d) throw new Error(`Direcție necunoscută: ${id}`);
  return d;
}
