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

const portret = (nume: string, fisier: string, pozitie: string, rol?: string): Membru => ({
  nume,
  rol,
  foto: `/foto/echipa/${fisier}.jpg`,
  w: 900,
  h: 1600,
  pozitie,
});

export const echipa: Membru[] = [
  portret("Alexandra Onija", "alexandra-onija", "50% 30%", "Comunicare și social media"),
  portret("Alexandra Podină", "alexandra-podina", "50% 28%", "Secretariat și relația cu participanții"),
  portret("Andrea Buda", "andrea-buda", "50% 28%", "Sănătate și siguranță"),
  portret("Andreea Butcure", "andreea-butcure", "50% 26%", "Coordonatoarea echipei"),
  portret("Bogdan Filip", "bogdan-filip", "50% 28%", "Activități sportive"),
  portret("Cosmina Buda", "cosmina-buda", "50% 26%", "Logistică, tehnică și sunet"),
  portret("Ioana Bude", "ioana-bude", "50% 34%", "Ateliere culturale și educaționale"),
  portret("Ionuț Butcure", "ionut-butcure", "50% 38%", "Activități pentru tineri și ecologizare"),
  portret("Iulia Hereș", "iulia-heres", "50% 28%", "Tradiții, gastronomie și târguri"),
  { nume: "Rareș Cureu", rol: "Comunicare și social media", foto: "/foto/echipa/rares-cureu.jpg", w: 720, h: 1126, pozitie: "50% 62%" },
];
