// Unde ajung înscrierile de voluntari.
//
// Setați variabila de mediu INSCRIERI_WEBHOOK_URL cu adresa unui webhook care
// primește JSON prin POST (ex. un Google Apps Script care scrie într-un Google Sheet,
// un scenariu Make/Zapier sau un serviciu de formulare). Fără ea:
// - în dezvoltare, înscrierea e afișată în terminal;
// - în producție, formularul le cere oamenilor să vă scrie pe rețelele sociale.

export type Inscriere = {
  nume: string;
  varsta: string;
  sat: string;
  contact: string;
  interese: string[];
  mesaj: string;
  trimisLa: string;
};

export type RezultatSalvare = { ok: true } | { ok: false; motiv: "neconfigurat" | "eroare" };

export async function salveazaInscriere(inscriere: Inscriere): Promise<RezultatSalvare> {
  const webhook = process.env.INSCRIERI_WEBHOOK_URL;

  if (!webhook) {
    if (process.env.NODE_ENV === "development") {
      console.info("[înscriere voluntar — doar în dezvoltare]", inscriere);
      return { ok: true };
    }
    return { ok: false, motiv: "neconfigurat" };
  }

  try {
    const raspuns = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inscriere),
    });
    return raspuns.ok ? { ok: true } : { ok: false, motiv: "eroare" };
  } catch {
    return { ok: false, motiv: "eroare" };
  }
}
