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
  data: string;
  descriere: string;
  coperta: Foto;
  foto: Foto[];
  activitate?: string;
  link?: { href: string; eticheta: string };
};

const vertical = (src: string, alt: string): Foto => ({ src, alt, w: 900, h: 1600 });
const orizontal = (src: string, alt: string): Foto => ({ src, alt, w: 1600, h: 900 });

const fotoIntalnire: Foto[] = [
  vertical("/foto/intalnire/decapotabila-1.jpg", "Patru tinere în mașina decapotabilă, salutând"),
  orizontal("/foto/intalnire/decapotabila-3.jpg", "Mașina decapotabilă pe drumul din sat"),
  vertical("/foto/intalnire/portret-01.jpg", "Membru al echipei, în cămașă cu motive tradiționale"),
  vertical("/foto/intalnire/portret-02.jpg", "Andreea Buda"),
  vertical("/foto/intalnire/portret-03.jpg", "Ioana Bude, în rochie roșie"),
  orizontal("/foto/intalnire/catel.jpg", "Cățelul care ne-a ținut companie"),
  vertical("/foto/intalnire/portret-04.jpg", "Ionuț Butcure, în pădure"),
  vertical("/foto/intalnire/portret-05.jpg", "Membru al echipei, în tricou bleumarin"),
  vertical("/foto/intalnire/portret-06.jpg", "Alexandra Podina, între mesteceni"),
  vertical("/foto/intalnire/decapotabila-2.jpg", "Echipa în mașina decapotabilă"),
  vertical("/foto/intalnire/portret-01b.jpg", "Membru al echipei, în aer liber"),
  vertical("/foto/intalnire/portret-02b.jpg", "Andreea Buda, pe deal"),
  vertical("/foto/intalnire/portret-03b.jpg", "Ioana Bude, pe un deal însorit"),
  vertical("/foto/intalnire/portret-04b.jpg", "Ionuț Butcure, în iarba înaltă"),
  vertical("/foto/intalnire/portret-02c.jpg", "Andreea Buda, sub cerul albastru"),
  vertical("/foto/intalnire/portret-03c.jpg", "Ioana Bude, pe drumul dintre dealuri"),
  vertical("/foto/intalnire/portret-05b.jpg", "Membru al echipei, la marginea pădurii"),
  vertical("/foto/intalnire/portret-06b.jpg", "Alexandra Podina, în pădurea de mesteceni"),
  vertical("/foto/echipa/alexandra-onija.jpg", "Alexandra Onija"),
  vertical("/foto/echipa/andrea-butcure.jpg", "Andrea Butcure, între mesteceni"),
  vertical("/foto/echipa/bogdan-filip.jpg", "Bogdan Filip"),
  vertical("/foto/echipa/cosmina-buda.jpg", "Cosmina Buda"),
  vertical("/foto/echipa/iulia-heres.jpg", "Iulia Heres, între mesteceni"),
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
  orizontal("/foto/film/seara-044.jpg", "O tânără zâmbind spre cameră"),
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
];

export const albume: Album[] = [
  {
    slug: "seara-de-film",
    titlu: "Prima seară de film",
    data: "28 septembrie 2026",
    descriere: "Ediția-pilot a Serilor tinerilor, găzduită de Theo Events, cu popcorn pentru toată lumea.",
    coperta: fotoFilm[0],
    foto: fotoFilm,
    activitate: "serile-tinerilor",
    link: { href: site.postareSearaDeFilm, eticheta: "Postarea de pe Facebook" },
  },
  {
    slug: "prima-intalnire",
    titlu: "Prima întâlnire a echipei",
    data: "Septembrie 2026",
    descriere: "Ne-am adunat prima dată ca echipă și am făcut primele fotografii ale grupului.",
    coperta: fotoIntalnire[0],
    foto: fotoIntalnire,
    activitate: "intalnirea-lunara",
  },
];

export function getAlbum(slug: string): Album | undefined {
  return albume.find((a) => a.slug === slug);
}
