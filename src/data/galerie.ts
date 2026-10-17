import { site } from "./site";

export type Foto = {
  src: string;
  alt: string;
  w: number;
  h: number;
};

export type Album = {
  slug: string;
  titlu: string;
  data?: string;
  loc?: string;
  /** Evenimentele apar și pe Acasă și în calendar, la „Am început deja”. */
  eveniment: boolean;
  descriere: string;
  coperta: Foto;
  foto: Foto[];
  activitate?: string;
  link?: { href: string; eticheta: string };
};

const vertical = (src: string, alt: string): Foto => ({ src, alt, w: 900, h: 1600 });
const orizontal = (src: string, alt: string): Foto => ({ src, alt, w: 1600, h: 900 });
const lat = (src: string, alt: string): Foto => ({ src, alt, w: 1440, h: 810 });
const inalt = (src: string, alt: string): Foto => ({ src, alt, w: 810, h: 1440 });

// Prima întâlnire a grupului de inițiativă — Pensiunea Țara Li Pintea, Cupșeni.
const fotoGrup: Foto[] = [
  { src: "/foto/grup/grupul-de-initiativa.jpg", alt: "Grupul de inițiativă în fața unei case tradiționale din lemn, la Pensiunea Țara Li Pintea", w: 2000, h: 1126 },
  { src: "/foto/grup/grup-01.jpg", alt: "Grupul de inițiativă în jurul mesei, sub costumele populare de pe perete", w: 975, h: 549 },
  { src: "/foto/grup/grup-02.jpg", alt: "Discuții la masă, în curtea pensiunii", w: 975, h: 549 },
  lat("/foto/grup/grup-03.jpg", "Planificăm împreună, la masa din curte"),
];

// Întâlnirea cu tinerii din comună — 20 septembrie 2026, Valea Pietrelor.
const fotoTineri: Foto[] = [
  lat("/foto/tineri/tineri-11.jpg", "Fotografia de grup cu tinerii de la întâlnire"),
  lat("/foto/tineri/tineri-01.jpg", "Tinerii pe Valea Pietrelor, între mesteceni"),
  vertical("/foto/intalnire/decapotabila-1.jpg", "Patru tinere în mașina decapotabilă, salutând"),
  lat("/foto/tineri/tineri-04.jpg", "Tinerii din comună adunați sub foișorul de lemn"),
  lat("/foto/tineri/tineri-02.jpg", "Fetele ridicând-o pe brațe pe o prietenă, între mesteceni"),
  lat("/foto/tineri/tineri-05.jpg", "Cinci tineri zâmbind în fața unei case de lemn"),
  inalt("/foto/tineri/tineri-03.jpg", "Trei tineri sub foișor, cu o foaie în mână"),
  lat("/foto/tineri/tineri-08.jpg", "Tineri la mese, sub foișorul de lemn"),
  orizontal("/foto/intalnire/decapotabila-3.jpg", "Mașina decapotabilă pe drumul din sat"),
  lat("/foto/tineri/tineri-07.jpg", "Tineri stând de vorbă la intrarea în foișor"),
  inalt("/foto/tineri/tineri-09.jpg", "Un tânăr zâmbind, lângă un perete de cărămidă"),
  lat("/foto/tineri/tineri-12.jpg", "Tinerii ascultând, sub foișorul de lemn"),
  inalt("/foto/tineri/tineri-06.jpg", "Un tânăr citind o foaie, sub foișor"),
  lat("/foto/tineri/tineri-10.jpg", "Patru prietene sprijinite de o masă"),
  vertical("/foto/intalnire/decapotabila-2.jpg", "Tinerele din mașina decapotabilă"),
  orizontal("/foto/intalnire/catel.jpg", "Cățelul care ne-a ținut companie"),
  vertical("/foto/intalnire/portret-01.jpg", "Tânăr în cămașă cu motive tradiționale"),
  vertical("/foto/intalnire/portret-05.jpg", "Tânăr în tricou bleumarin"),
];

const fotoPortrete: Foto[] = [
  vertical("/foto/echipa/alexandra-onija.jpg", "Alexandra Onija"),
  vertical("/foto/echipa/alexandra-podina.jpg", "Alexandra Podină"),
  vertical("/foto/echipa/andrea-buda.jpg", "Andrea Buda"),
  vertical("/foto/echipa/andreea-butcure.jpg", "Andreea Butcure"),
  vertical("/foto/echipa/bogdan-filip.jpg", "Bogdan Filip"),
  vertical("/foto/echipa/cosmina-buda.jpg", "Cosmina Buda"),
  vertical("/foto/echipa/ioana-bude.jpg", "Ioana Bude"),
  vertical("/foto/echipa/ionut-butcure.jpg", "Ionuț Butcure"),
  vertical("/foto/echipa/iulia-heres.jpg", "Iulia Hereș"),
  vertical("/foto/intalnire/portret-02b.jpg", "Andrea Buda, pe deal"),
  vertical("/foto/intalnire/portret-03b.jpg", "Ioana Bude, pe un deal însorit"),
  vertical("/foto/intalnire/portret-04b.jpg", "Ionuț Butcure, în iarba înaltă"),
  vertical("/foto/intalnire/portret-06b.jpg", "Alexandra Podină, în pădurea de mesteceni"),
  vertical("/foto/intalnire/portret-02c.jpg", "Andrea Buda, sub cerul albastru"),
  vertical("/foto/intalnire/portret-03c.jpg", "Ioana Bude, pe drumul dintre dealuri"),
];

const fotoFilm: Foto[] = [
  orizontal("/foto/film/seara-014.jpg", "Publicul așezat în sală, înainte de film"),
  vertical("/foto/film/seara-001.jpg", "O fetiță cu popcorn, pe rândul din față"),
  vertical("/foto/film/seara-003.jpg", "O fetiță cu popcorn, așteptând filmul"),
  vertical("/foto/film/fb-4.jpg", "Copii și părinți urmărind filmul"),
  vertical("/foto/film/seara-007.jpg", "Un băiețel privind spre cameră"),
  orizontal("/foto/film/seara-009.jpg", "Publicul la seara de film"),
  vertical("/foto/film/seara-012.jpg", "Un băiat cu punga de popcorn"),
  vertical("/foto/film/fb-2.jpg", "Copii pe scaune, cu popcorn"),
  vertical("/foto/film/seara-008.jpg", "O fetiță mică pe scaun"),
  vertical("/foto/film/seara-017.jpg", "Un copil mic în lumina albastră"),
  vertical("/foto/film/seara-019.jpg", "O fetiță în lumina roz a sălii"),
  vertical("/foto/film/seara-022.jpg", "Un băiețel întins pe podea, zâmbind"),
  vertical("/foto/film/fb-3.jpg", "O fetiță cu o pungă de popcorn"),
  vertical("/foto/film/seara-026.jpg", "Publicul urmărind filmul"),
  vertical("/foto/film/seara-028.jpg", "Spectatori în lumina violet"),
  orizontal("/foto/film/seara-034.jpg", "Un grup de tineri pe canapea"),
  vertical("/foto/film/seara-032.jpg", "Copii în spatele sălii"),
  orizontal("/foto/film/seara-042.jpg", "Sala de la Theo Events"),
  vertical("/foto/film/seara-039.jpg", "O tânără zâmbind la seara de film"),
  orizontal("/foto/film/seara-045.jpg", "Un tânăr în sală"),
  orizontal("/foto/film/seara-046.jpg", "Un grup de tinere în lumina colorată"),
  vertical("/foto/film/fb-1.jpg", "O fetiță zâmbind în lumina roz"),
  orizontal("/foto/film/seara-051.jpg", "Prietene la seara de film"),
  orizontal("/foto/film/seara-054.jpg", "Tinerii, la finalul serii"),
  vertical("/foto/film/seara-065.jpg", "Doi prieteni la seara de film"),
  orizontal("/foto/film/seara-069.jpg", "Două prietene"),
  vertical("/foto/film/seara-072.jpg", "Un tânăr zâmbind"),
  vertical("/foto/film/seara-076.jpg", "Un tânăr cu părul cârlionțat"),
  vertical("/foto/film/seara-078.jpg", "Un tânăr în jachetă deschisă la culoare"),
  vertical("/foto/film/fb-5.jpg", "Un băiețel întins pe podea, în lumina roșie"),
  vertical("/foto/film/seara-080.jpg", "Doi tineri la seara de film"),
  vertical("/foto/film/seara-084.jpg", "Doi tineri, ea în tricou cu dungi"),
  vertical("/foto/film/seara-086.jpg", "Doi prieteni făcând poze"),
  vertical("/foto/film/seara-091.jpg", "Un participant în vestă, în sală"),
  lat("/foto/film/seara-extra-1.jpg", "Patru prietene la seara de film"),
  inalt("/foto/film/seara-extra-2.jpg", "Doi tineri la seara de film"),
  lat("/foto/film/seara-extra-3.jpg", "Tinere la seara de film, în sală"),
];

// În ordine cronologică.
export const albume: Album[] = [
  {
    slug: "grupul-de-initiativa",
    titlu: "Prima întâlnire a grupului de inițiativă",
    loc: "Pensiunea Țara Li Pintea, Cupșeni",
    eveniment: true,
    descriere: "Prima noastră întâlnire ca grup de inițiativă, la Pensiunea Țara Li Pintea din Cupșeni.",
    coperta: fotoGrup[0],
    foto: fotoGrup,
    activitate: "intalnirea-lunara",
  },
  {
    slug: "intalnirea-cu-tinerii",
    titlu: "Întâlnirea cu tinerii din comună",
    data: "20 septembrie 2026",
    loc: "Valea Pietrelor",
    eveniment: true,
    descriere: "Prima întâlnire cu tinerii din comună, pe Valea Pietrelor.",
    coperta: fotoTineri[0],
    foto: fotoTineri,
    activitate: "campania-4-sate-o-singura-comunitate",
  },
  {
    slug: "seara-de-film",
    titlu: "Prima seară de film",
    data: "26 septembrie 2026",
    loc: "Theo Events",
    eveniment: true,
    descriere: "Ediția-pilot a Serilor tinerilor, la Theo Events, cu sprijinul autorităților locale.",
    coperta: fotoFilm[0],
    foto: fotoFilm,
    activitate: "serile-tinerilor",
    link: { href: site.postareSearaDeFilm, eticheta: "Postarea de pe Facebook" },
  },
  {
    slug: "portretele-echipei",
    titlu: "Portretele echipei",
    eveniment: false,
    descriere: "Grupul de inițiativă, fotografiat între mestecenii din comună.",
    coperta: fotoPortrete[0],
    foto: fotoPortrete,
  },
];

export const evenimente = albume.filter((a) => a.eveniment);

/** „20 septembrie 2026 · Valea Pietrelor” */
export function detaliiAlbum(album: Album): string {
  return [album.data, album.loc].filter(Boolean).join(" · ");
}

export function getAlbum(slug: string): Album | undefined {
  return albume.find((a) => a.slug === slug);
}
