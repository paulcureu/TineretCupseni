// Informațiile generale ale site-ului. Textele între paranteze drepte [ ]
// sunt de completat înainte de lansare.

export const site = {
  nume: "Tinerii din comuna Cupșeni",
  numeScurt: "Tineret Cupșeni",
  slogan: "4 sate, o singură comunitate",
  // Numele după care ne caută oamenii pe Google (pentru datele structurate ale site-ului).
  alteNume: ["Tinerii din Cupșeni", "Tineret Cupseni"],
  titluAcasa: "Tineret Cupșeni · Tinerii din comuna Cupșeni, Maramureș",
  descriere:
    "Tineret Cupșeni: tinerii din comuna Cupșeni, Maramureș (Cupșeni, Costeni, Libotin, Ungureni). Finaliști Sat European de Tineret 2027, cu 33 de activități.",
  // Adresa publică. Se poate schimba din NEXT_PUBLIC_SITE_URL (de ex. după ce aveți un domeniu .ro).
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://tineret-cupseni.vercel.app",
  email: "tineret.cupseni@gmail.com",
  locatie: "Comuna Cupșeni, județul Maramureș",
  sate: ["Cupșeni", "Costeni", "Libotin", "Ungureni"],
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61594397014801",
    instagram: "https://www.instagram.com/tineret.cupseni/",
    tiktok: "https://www.tiktok.com/@tineret.cupseni",
  },
  videoCandidatura: {
    id: "-F3EMpz0a_A",
    titlu: "Candidatura comunei Cupșeni, jud. Maramureș | Sat European de Tineret 2027",
    autor: "Grigorescu Dan",
    coperta: "/foto/video-candidatura.jpg",
  },
  autor: {
    nume: "Paul Cureu",
    instagram: "https://www.instagram.com/paulcureu/",
  },
  postareSearaDeFilm:
    "https://www.facebook.com/permalink.php?story_fbid=pfbid0SW7y7QXVSpZnYMr9xw1tTSSHKJkz5aK4FGdUy9sjfs5KDhRqyiPQEsRNNzSSNTYml&id=61594397014801",
} as const;

export const navigatie = [
  { href: "/", eticheta: "Acasă" },
  { href: "/despre", eticheta: "Despre noi" },
  { href: "/calendar", eticheta: "Calendar 2027" },
  { href: "/galerie", eticheta: "Galerie" },
  { href: "/sat-european-2027", eticheta: "Satul European 2027" },
] as const;

export const parteneri: { nume: string; contributie?: string }[] = [
  {
    nume: "Theo Events",
    contributie: "Ne-a fost gazdă la prima seară de film și ne-a ajutat cu popcornul.",
  },
  {
    nume: "Brutăria Aur",
    contributie: "Popcorn pentru toată sala, la prima seară de film.",
  },
  {
    nume: "Primăria Comunei Cupșeni",
    contributie: "Ne-a împrumutat videoproiectorul și mașina de popcorn.",
  },
  { nume: "Podina Resort" },
  {
    nume: "Pensiunea Țara Li Pintea",
    contributie: "Ne-a găzduit la prima întâlnire a grupului de inițiativă.",
  },
];

export const sate = [
  { nume: "Cupșeni", eticheta: "reședința comunei", text: "[O frază despre sat: un loc, un om, o tradiție.]" },
  { nume: "Costeni", eticheta: "", text: "[O frază despre sat: un loc, un om, o tradiție.]" },
  { nume: "Libotin", eticheta: "", text: "[O frază despre sat: un loc, un om, o tradiție.]" },
  { nume: "Ungureni", eticheta: "", text: "[O frază despre sat: un loc, un om, o tradiție.]" },
] as const;
