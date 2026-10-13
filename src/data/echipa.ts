// Grupul de inițiativă. Portretele sunt din ședința foto a echipei
// (Rareș, de la prima seară de film). `rol` și `sat` sunt opționale:
// completați-le și apar automat pe pagina „Despre noi”.

export type Membru = {
  nume: string;
  rol?: string;
  sat?: string;
  foto: string;
  w: number;
  h: number;
  pozitie: string;
};

const portret = (nume: string, fisier: string, pozitie: string): Membru => ({
  nume,
  foto: `/foto/echipa/${fisier}.jpg`,
  w: 900,
  h: 1600,
  pozitie,
});

export const echipa: Membru[] = [
  portret("Alexandra Onija", "alexandra-onija", "50% 30%"),
  portret("Alexandra Podina", "alexandra-podina", "50% 28%"),
  portret("Andrea Butcure", "andrea-butcure", "50% 26%"),
  portret("Andreea Buda", "andreea-buda", "50% 28%"),
  portret("Bogdan Filip", "bogdan-filip", "50% 28%"),
  portret("Cosmina Buda", "cosmina-buda", "50% 26%"),
  portret("Ioana Bude", "ioana-bude", "50% 34%"),
  portret("Ionuț Butcure", "ionut-butcure", "50% 38%"),
  portret("Iulia Heres", "iulia-heres", "50% 28%"),
  { nume: "Rareș Cureu", foto: "/foto/echipa/rares-cureu.jpg", w: 720, h: 1126, pozitie: "50% 62%" },
];
