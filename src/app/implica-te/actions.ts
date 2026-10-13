"use server";

import { directii } from "@/data/directii";
import { site } from "@/data/site";
import { salveazaInscriere } from "@/lib/inscrieri";

export type ValoriFormular = {
  nume: string;
  varsta: string;
  sat: string;
  contact: string;
  interese: string[];
  mesaj: string;
};

export type StareFormular = {
  stare: "initial" | "eroare" | "trimis";
  mesaj?: string;
  erori?: Partial<Record<"nume" | "contact" | "acord", string>>;
  valori?: ValoriFormular;
  prenume?: string;
};

const text = (formData: FormData, cheie: string, max = 200) => String(formData.get(cheie) ?? "").trim().slice(0, max);

export async function trimiteInscriere(_prev: StareFormular, formData: FormData): Promise<StareFormular> {
  const idDirectii = new Set<string>(directii.map((d) => d.id));
  const valori: ValoriFormular = {
    nume: text(formData, "nume", 120),
    varsta: text(formData, "varsta", 3),
    sat: text(formData, "sat", 40),
    contact: text(formData, "contact", 120),
    interese: formData.getAll("interese").map(String).filter((x) => idDirectii.has(x)),
    mesaj: text(formData, "mesaj", 2000),
  };

  const erori: StareFormular["erori"] = {};
  if (!valori.nume) erori.nume = "Scrie-ne cum te cheamă.";
  if (!valori.contact) erori.contact = "Lasă-ne un număr de telefon sau contul de Instagram.";
  if (formData.get("acord") !== "da") erori.acord = "Bifează acordul ca să te putem contacta.";

  if (Object.keys(erori).length > 0) {
    return { stare: "eroare", mesaj: "Mai avem nevoie de câteva informații.", erori, valori };
  }

  const rezultat = await salveazaInscriere({
    ...valori,
    interese: valori.interese.map((id) => directii.find((d) => d.id === id)?.nume ?? id),
    trimisLa: new Date().toISOString(),
  });

  if (!rezultat.ok) {
    return {
      stare: "eroare",
      mesaj:
        rezultat.motiv === "neconfigurat"
          ? `Formularul nu e încă activ. Scrie-ne pe Instagram (@tineret.cupseni) sau pe Facebook (${site.nume}).`
          : "Nu am putut trimite formularul. Încearcă din nou peste câteva minute sau scrie-ne pe Instagram.",
      valori,
    };
  }

  return { stare: "trimis", prenume: valori.nume.split(/\s+/)[0] };
}
