"use server";

import { directii } from "@/data/directii";
import { site } from "@/data/site";
import { trimiteFormular } from "@/lib/email";

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
  // Capcană pentru roboți: câmpul „website” e ascuns oamenilor. Dacă e completat, nu trimitem nimic.
  if (text(formData, "website")) return { stare: "trimis", prenume: text(formData, "nume").split(/\s+/)[0] || "prietene" };

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
  if (!valori.contact) erori.contact = "Lasă-ne un număr de telefon, contul de Instagram sau o adresă de e-mail.";
  if (formData.get("acord") !== "da") erori.acord = "Bifează acordul ca să te putem contacta.";

  if (Object.keys(erori).length > 0) {
    return { stare: "eroare", mesaj: "Mai avem nevoie de câteva informații.", erori, valori };
  }

  const numeInterese = valori.interese.map((id) => directii.find((d) => d.id === id)?.nume ?? id);
  const rezultat = await trimiteFormular({
    formular: "Voluntar nou",
    subiect: valori.nume,
    raspunsLa: valori.contact,
    campuri: [
      { eticheta: "Nume", valoare: valori.nume },
      { eticheta: "Vârsta", valoare: valori.varsta },
      { eticheta: "Satul", valoare: valori.sat },
      { eticheta: "Telefon / Instagram / e-mail", valoare: valori.contact },
      { eticheta: "Ce îl interesează", valoare: numeInterese.join(", ") },
      { eticheta: "Mesaj", valoare: valori.mesaj },
      { eticheta: "Trimis la", valoare: new Date().toLocaleString("ro-RO", { timeZone: "Europe/Bucharest" }) },
    ],
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
