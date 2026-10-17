import type { IconName } from "@/components/Icon";

// Cele 7 schimbări (S1–S7) din Anexa 3. Codurile vin din anexă;
// numele scurte sunt alese pentru site. `formulare` vine din Fișa 3 a formularului de
// candidatură (schimbarea dorită), potrivită pe direcțiile din Anexa 3.

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
    formulare: "Ne dorim un grup de tineri unit, activ și bine organizat, care se întâlnește constant și transformă ideile de pe foaie în realitate. Un grup stabil, care să nu se oprească după finalul proiectului, ci să atragă generații noi de tineri și să devină o voce în dezvoltarea comunității.",
    icon: "oameni",
    culori: { fundal: "#E1E7F2", text: "#1A2E40", punct: "#1A2E40", palid: "#F1F4F9" },
  },
  {
    id: "s2",
    cod: "S2",
    nume: "Tradiții & cultură",
    formulare: "Vrem să facem cultura locală mai prezentă în viața tinerilor, prin activități în care aceștia să învețe direct de la oamenii din cele patru sate: sculptură, olărit, cusut, țesut la război, șezătoare sau încondeierea ouălor.",
    icon: "motiv",
    culori: { fundal: "#F8E3DA", text: "#8A3A1C", punct: "#C2532A", palid: "#FCF3EF" },
  },
  {
    id: "s3",
    cod: "S3",
    nume: "Abilități pentru viață",
    formulare: "Ne dorim o generație de tineri informați, responsabili din punct de vedere financiar și motivați să își construiască un viitor activ în propria comunitate, pregătiți să acționeze corect în situații de urgență și deschiși către genuri muzicale noi.",
    icon: "bec",
    culori: { fundal: "#FDEBD0", text: "#7A4300", punct: "#E08A1E", palid: "#FEF7EC" },
  },
  {
    id: "s4",
    cod: "S4",
    nume: "Sport & natură",
    formulare: "Ne dorim o comunitate rurală activă, în care sportul să devină o rutină accesibilă și atractivă pentru tinerii din toate cele 4 sate, fără ca aceștia să fie nevoiți să se deplaseze la oraș.",
    icon: "munte",
    culori: { fundal: "#E3EFE5", text: "#1E3F1A", punct: "#2D5A27", palid: "#F1F7F2" },
  },
  {
    id: "s5",
    cod: "S5",
    nume: "Timp liber împreună",
    formulare: "Ne dorim ca tinerii din comunitate să aibă opțiuni diverse și atractive de petrecere a timpului liber, să se reconecteze la identitatea și tradițiile locale și să devină cetățeni activi, implicați în viața satului.",
    icon: "stea",
    culori: { fundal: "#ECE5F6", text: "#4B2A7B", punct: "#6B45A8", palid: "#F6F2FB" },
  },
  {
    id: "s6",
    cod: "S6",
    nume: "Solidaritate & târguri",
    formulare: "Vrem să trecem de la ideea că fiecare își vede doar de propriile probleme la sentimentul că, atunci când ne unim, putem face lucruri frumoase și importante pentru cei din jur.",
    icon: "inima",
    culori: { fundal: "#F5E3E3", text: "#7E2122", punct: "#9E2A2B", palid: "#FBF1F1" },
  },
  {
    id: "s7",
    cod: "S7",
    nume: "Mediu",
    formulare: "Ne dorim o comunitate mai curată, responsabilă și educată din punct de vedere ecologic, în care tinerii devin veriga principală a schimbării și „ambasadori ai mediului” în propriile familii.",
    icon: "frunza",
    culori: { fundal: "#DDF0EE", text: "#165A55", punct: "#24877F", palid: "#EFF8F7" },
  },
];

export function getDirectie(id: DirectieId): Directie {
  const d = directii.find((x) => x.id === id);
  if (!d) throw new Error(`Direcție necunoscută: ${id}`);
  return d;
}
