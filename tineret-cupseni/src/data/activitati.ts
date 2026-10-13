import type { DirectieId } from "./directii";

// Cele 33 de activități din Anexa 3 – Calendarul de activități (2027).
// `luni` = lunile bifate în anexă (1 = ianuarie … 12 = decembrie).

export type Editie = {
  titlu: string;
  data: string;
  text: string;
  album: string;
  multumiri?: string;
};

export type Activitate = {
  nr: number;
  slug: string;
  directie: DirectieId;
  titlu: string;
  descriere: string;
  ce: string[];
  luni: number[];
  editii?: Editie[];
};

const TOT_ANUL = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const activitati: Activitate[] = [
  {
    nr: 1,
    slug: "intalnirea-de-lansare",
    directie: "s1",
    titlu: "Întâlnirea de lansare „Cupșeni – Sat European de Tineret 2027”",
    descriere: "Prezentarea programului și mobilizarea tinerilor din comună.",
    ce: ["Prezentarea programului „Cupșeni – Sat European de Tineret 2027”", "Mobilizarea tinerilor din toată comuna"],
    luni: [1],
  },
  {
    nr: 2,
    slug: "campania-4-sate-o-singura-comunitate",
    directie: "s1",
    titlu: "Campania „4 sate, o singură comunitate”",
    descriere: "Campanie permanentă de informare, promovare și mobilizare a tinerilor.",
    ce: ["Informare", "Promovare", "Mobilizarea tinerilor din Cupșeni, Costeni, Libotin și Ungureni"],
    luni: TOT_ANUL,
  },
  {
    nr: 3,
    slug: "serile-tinerilor",
    directie: "s5",
    titlu: "Serile tinerilor",
    descriere: "Seri de film, jocuri de masă, karaoke și seri muzicale.",
    ce: ["Seri de film", "Jocuri de masă", "Karaoke", "Seri muzicale"],
    luni: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    editii: [
      {
        titlu: "Prima seară de film",
        data: "28 septembrie 2026",
        text: "Ediția-pilot, găzduită de Theo Events, cu popcorn de la Brutăria Aur și videoproiectorul Primăriei Comunei Cupșeni. Ne bucurăm că ați fost alături de noi!",
        album: "seara-de-film",
        multumiri:
          "Ionelei Buda (Theo Events), care ne-a fost gazdă și ne-a ajutat cu popcornul · Brutăriei Aur (Victoria Gzd), pentru popcorn · Primăriei Comunei Cupșeni, pentru videoproiector și mașina de popcorn · domnului Constantin Laurențiu Dragomir, pentru sprijin și încurajare.",
      },
    ],
  },
  {
    nr: 4,
    slug: "clubul-de-carte-si-dialog",
    directie: "s2",
    titlu: "Clubul de carte și dialog",
    descriere: "Lectură, întâlniri tematice, discuții și recomandări de carte.",
    ce: ["Lectură", "Întâlniri tematice", "Discuții", "Recomandări de carte"],
    luni: [1, 2, 3, 4, 5, 10, 11, 12],
  },
  {
    nr: 5,
    slug: "ulita-copilariei",
    directie: "s5",
    titlu: "Ulița copilăriei — ediția de iarnă",
    descriere: "Săniuș, dat cu sacul, jocuri de iarnă și ceai cald.",
    ce: ["Săniuș", "Dat cu sacul", "Jocuri de iarnă", "Ceai cald"],
    luni: [1, 2],
  },
  {
    nr: 6,
    slug: "amenajam-impreuna-spatiile-noastre",
    directie: "s1",
    titlu: "Amenajăm împreună spațiile noastre",
    descriere: "Amenajarea spațiilor educaționale, ecologizare, reciclare și îngrijirea spațiilor verzi.",
    ce: ["Amenajarea spațiilor educaționale", "Ecologizare", "Reciclare și colectare selectivă", "Îngrijirea spațiilor verzi"],
    luni: [2, 9],
  },
  {
    nr: 7,
    slug: "mestesuguri-vii",
    directie: "s2",
    titlu: "Ateliere „Meșteșuguri vii”",
    descriere: "Sculptură, olărit, șezătoare, război de țesut și încondeierea ouălor.",
    ce: ["Sculptură", "Olărit", "Șezătoare", "Război de țesut", "Încondeierea ouălor"],
    luni: [3, 4, 5, 6, 7, 8, 9, 10, 11],
  },
  {
    nr: 8,
    slug: "curs-de-prim-ajutor",
    directie: "s3",
    titlu: "Curs de prim ajutor",
    descriere: "Noțiuni practice și cum reacționăm în situații de urgență.",
    ce: ["Noțiuni practice de prim ajutor", "Reacția în situații de urgență"],
    luni: [4],
  },
  {
    nr: 9,
    slug: "plantam-pentru-un-viitor",
    directie: "s7",
    titlu: "Plantăm pentru un viitor",
    descriere: "Plantăm arbori și ne asumăm îngrijirea lor.",
    ce: ["Plantare de arbori", "Tinerii se ocupă de întreținerea lor"],
    luni: [11],
  },
  {
    nr: 10,
    slug: "pe-doua-roti",
    directie: "s4",
    titlu: "Pe două roți prin comunitatea noastră",
    descriere: "Zi cu bicicletele: trasee și activități pe categorii de vârstă.",
    ce: ["Zi cu bicicletele", "Trasee prin comună", "Activități pe categorii de vârstă"],
    luni: [5],
  },
  {
    nr: 11,
    slug: "noaptea-perseidelor",
    directie: "s5",
    titlu: "Noaptea Perseidelor",
    descriere: "Observăm Perseidele cu telescopul digital: astronomie și activități educative.",
    ce: ["Observarea Perseidelor cu telescop digital", "Astronomie", "Activități educative"],
    luni: [8],
  },
  {
    nr: 12,
    slug: "vreau-un-viitor-aici",
    directie: "s3",
    titlu: "Atelier de antreprenoriat „Vreau un viitor aici”",
    descriere: "Antreprenori locali, idei de afaceri și oportunități în mediul rural.",
    ce: ["Întâlniri cu antreprenori locali", "Idei de afaceri", "Oportunități în mediul rural"],
    luni: [3, 6, 9, 12],
  },
  {
    nr: 13,
    slug: "donare-de-sange",
    directie: "s6",
    titlu: "Campanie de donare de sânge",
    descriere: "Informare, conștientizare și donare pentru participanții eligibili.",
    ce: ["Informare", "Conștientizare", "Donare pentru participanții eligibili"],
    luni: [11],
  },
  {
    nr: 14,
    slug: "meet-car",
    directie: "s5",
    titlu: "Meet Car — pasiunea pentru automobile și siguranță",
    descriere: "Întâlnire auto, expoziție și educație pentru siguranță rutieră și conduită responsabilă.",
    ce: ["Întâlnire auto", "Expoziție", "Educație pentru siguranță rutieră", "Conduită responsabilă"],
    luni: [2, 5, 7, 10],
  },
  {
    nr: 15,
    slug: "foc-de-tabara-legende-sub-stele",
    directie: "s5",
    titlu: "Foc de tabără — Legende sub stele",
    descriere: "Legende locale, povești ale satului, muzică folk și dialog între generații.",
    ce: [
      "Legende locale și povești ale satului",
      "Istoria locului",
      "Cântece și muzică folk",
      "Dezbateri între generații despre satul de ieri, de azi și de mâine",
    ],
    luni: [6],
  },
  {
    nr: 16,
    slug: "gustul-generatiilor",
    directie: "s2",
    titlu: "Gustul generațiilor",
    descriere: "Concurs gastronomic tineri vs. bătrâni, cu preparate locale și lucru în echipă.",
    ce: ["Concurs gastronomic tineri vs. bătrâni", "Preparate locale", "Lucru în echipă"],
    luni: [9],
  },
  {
    nr: 17,
    slug: "crossul-tinerilor",
    directie: "s4",
    titlu: "Cross-ul tinerilor",
    descriere: "Competiție sportivă pentru diferite categorii de vârstă.",
    ce: ["Competiție sportivă", "Categorii diferite de vârstă"],
    luni: [9],
  },
  {
    nr: 18,
    slug: "sarbatori-campenesti",
    directie: "s5",
    titlu: "Sărbători câmpenești — Armindeni și măsuriș",
    descriere: "Tinerii păstrează și promovează tradițiile satului.",
    ce: ["Armindeni", "Măsuriș", "Implicarea tinerilor în păstrarea și promovarea tradițiilor"],
    luni: [4, 5],
  },
  {
    nr: 19,
    slug: "atelier-de-leadership",
    directie: "s1",
    titlu: "Atelier de leadership și muncă în echipă",
    descriere: "Dedicat grupului de inițiativă, dar deschis tuturor.",
    ce: ["Leadership", "Muncă în echipă", "Dedicat grupului de inițiativă, dar nu numai"],
    luni: [4, 5],
  },
  {
    nr: 20,
    slug: "picnicul-gigant",
    directie: "s5",
    titlu: "Picnicul gigant al comunei",
    descriere: "Cel mai lung picnic din comună, cu preparate locale și toată comunitatea invitată.",
    ce: ["Pregătirea celui mai lung picnic", "Socializare", "Preparate locale", "Toată comunitatea e invitată"],
    luni: [8],
  },
  {
    nr: 21,
    slug: "banii-pe-intelesul-nostru",
    directie: "s3",
    titlu: "Educație financiară — „Banii pe înțelesul nostru”",
    descriere: "Buget personal, cheltuieli responsabile, nevoie vs. dorință, economisire și investiție.",
    ce: ["Buget personal", "Cheltuieli responsabile", "Diferența dintre nevoie și dorință", "Economisire și investiție", "Totul adaptat în funcție de vârstă"],
    luni: [1, 3, 5, 7, 9, 11],
  },
  {
    nr: 22,
    slug: "cupa-celor-4-sate",
    directie: "s4",
    titlu: "Cupa celor 4 sate — „Mai mult decât fotbal”",
    descriere: "Meciuri pe categorii de vârstă între satele comunei.",
    ce: ["Meciuri de fotbal între sate", "Categorii de vârstă"],
    luni: [8],
  },
  {
    nr: 23,
    slug: "management-de-proiect",
    directie: "s1",
    titlu: "Atelier de management de proiect",
    descriere: "Cum transformi o idee într-un proiect de succes: obiective, buget, calendar, rezultate și social media.",
    ce: ["Obiective, activități și responsabilități", "Buget și calendar", "Rezultate", "Social media"],
    luni: [8],
  },
  {
    nr: 24,
    slug: "ateliere-de-muzica",
    directie: "s3",
    titlu: "Ateliere de muzică",
    descriere: "Instrumente, cântece tradiționale și folk, muzică actuală.",
    ce: ["Instrumente", "Cântece tradiționale și folk", "Muzică actuală"],
    luni: TOT_ANUL,
  },
  {
    nr: 25,
    slug: "targul-de-toamna",
    directie: "s6",
    titlu: "Târgul de toamnă „Jucăriile de altădată”",
    descriere: "Jucării tradiționale, concurs de costume, meșteșuguri și produse locale.",
    ce: ["Jucării tradiționale", "Concurs de costume", "Meșteșuguri și produse locale"],
    luni: [10],
  },
  {
    nr: 26,
    slug: "drumetii-in-conexiune-cu-natura",
    directie: "s4",
    titlu: "Drumeții „În conexiune cu natura”",
    descriere: "Hiking, explorarea naturii și cunoașterea patrimoniului local.",
    ce: ["Hiking", "Explorarea naturii", "Cunoașterea patrimoniului local"],
    luni: [6],
  },
  {
    nr: 27,
    slug: "targul-de-craciun",
    directie: "s6",
    titlu: "Târgul de Crăciun",
    descriere: "Produse făcute la ateliere, colinde, gastronomie și activități pentru copii.",
    ce: ["Produse realizate la ateliere", "Colinde", "Gastronomie", "Activități pentru copii"],
    luni: [12],
  },
  {
    nr: 28,
    slug: "evaluarea-anului",
    directie: "s1",
    titlu: "Evaluarea anului și planul tinerilor pentru 2028",
    descriere: "Ce am realizat, ce continuăm, propuneri și consultarea tinerilor.",
    ce: ["Ce am realizat", "Ce continuăm", "Propuneri și consultarea tinerilor"],
    luni: [12],
  },
  {
    nr: 29,
    slug: "intalnirea-lunara",
    directie: "s1",
    titlu: "Întâlnirea lunară a grupului de inițiativă",
    descriere: "Ne vedem în fiecare lună ca să planificăm împreună.",
    ce: ["Planificarea activităților lunii"],
    luni: TOT_ANUL,
    editii: [
      {
        titlu: "Prima întâlnire a echipei",
        data: "Septembrie 2026",
        text: "Ne-am adunat prima dată ca echipă și am făcut primele fotografii ale grupului.",
        album: "prima-intalnire",
      },
    ],
  },
  {
    nr: 30,
    slug: "campanie-de-ecologizare",
    directie: "s7",
    titlu: "Campanie de ecologizare",
    descriere: "Curățenie și discuții despre sortare și reciclare.",
    ce: ["Ecologizare", "Discuții de conștientizare despre sortare și reciclare"],
    luni: [2, 10],
  },
  {
    nr: 31,
    slug: "public-speaking",
    directie: "s1",
    titlu: "Atelier de comunicare și public speaking",
    descriere: "Cum vorbești liber în fața unui public, mic sau mare.",
    ce: ["Comunicare", "Vorbitul în fața unui public mic, mediu sau mare"],
    luni: [2, 10],
  },
  {
    nr: 32,
    slug: "team-building",
    directie: "s1",
    titlu: "Team-building",
    descriere: "Activități de echipă pentru grupul de inițiativă.",
    ce: [],
    luni: [10],
  },
  {
    // În Anexa 3 nu are o schimbare asociată; a fost pusă la S1.
    nr: 33,
    slug: "de-la-participant-la-lider",
    directie: "s1",
    titlu: "De la participant la lider",
    descriere: "Tinerii care participă devin organizatorii activităților.",
    ce: [],
    luni: [10],
  },
];

export function getActivitate(slug: string): Activitate | undefined {
  return activitati.find((a) => a.slug === slug);
}

export function activitatiDinLuna(luna: number, lista: Activitate[] = activitati): Activitate[] {
  return lista.filter((a) => a.luni.includes(luna));
}
