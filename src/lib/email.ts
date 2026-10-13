import "server-only";
import { Resend } from "resend";

// Trimiterea formularelor de pe site pe e-mail, prin Resend.
//
// Variabile de mediu (local în .env.local, pe Vercel în Settings → Environment Variables):
// - RESEND_API_KEY            cheia API Resend
// - FORMULARE_EMAIL_DESTINATAR  adresa care primește formularele (se pot pune mai multe, separate prin virgulă)
// - FORMULARE_EMAIL_EXPEDITOR   expeditorul; cu „onboarding@resend.dev” Resend trimite doar către
//                               adresa contului. După ce verificați un domeniu în Resend, folosiți
//                               ceva de forma „Tineret Cupșeni <formulare@domeniul-vostru.ro>”.

export type CampEmail = { eticheta: string; valoare: string };

export type MesajFormular = {
  formular: string;
  subiect: string;
  campuri: CampEmail[];
  /** Adresă la care se poate răspunde direct din e-mail (dacă persoana a lăsat una). */
  raspunsLa?: string;
};

export type RezultatTrimitere = { ok: true } | { ok: false; motiv: "neconfigurat" | "eroare" };

const escape = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const ADRESA_EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

export function esteEmail(text: string): boolean {
  return ADRESA_EMAIL.test(text.trim());
}

function html({ formular, subiect, campuri }: MesajFormular): string {
  const randuri = campuri
    .map(
      (c) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #E3E5E8;color:#4E5B69;font-size:14px;width:34%;vertical-align:top">${escape(c.eticheta)}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #E3E5E8;color:#1A2E40;font-size:15px;white-space:pre-wrap">${escape(c.valoare || "(necompletat)")}</td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="ro">
  <body style="margin:0;padding:24px;background:#F9F8F6;font-family:Arial,Helvetica,sans-serif">
    <table role="presentation" width="100%" style="max-width:620px;margin:0 auto;background:#FFFFFF;border:1px solid #E3E5E8;border-radius:16px;overflow:hidden;border-collapse:separate">
      <tr><td style="background:#1A2E40;padding:20px 24px;color:#FFFFFF">
        <div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#E89D35;font-weight:bold">${escape(formular)}</div>
        <div style="font-size:20px;font-weight:bold;margin-top:6px">${escape(subiect)}</div>
      </td></tr>
      <tr><td><table role="presentation" width="100%" style="border-collapse:collapse">${randuri}</table></td></tr>
      <tr><td style="padding:16px 24px;color:#8794A3;font-size:12px">Trimis automat de pe site-ul Tineret Cupșeni.</td></tr>
    </table>
  </body>
</html>`;
}

function text({ formular, subiect, campuri }: MesajFormular): string {
  return [`${formular}: ${subiect}`, "", ...campuri.map((c) => `${c.eticheta}: ${c.valoare || "(necompletat)"}`)].join("\n");
}

/** Trimite conținutul unui formular pe e-mail. Folosit de toate formularele site-ului. */
export async function trimiteFormular(mesaj: MesajFormular): Promise<RezultatTrimitere> {
  const cheie = process.env.RESEND_API_KEY;
  const destinatari = (process.env.FORMULARE_EMAIL_DESTINATAR ?? "")
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);
  const expeditor = process.env.FORMULARE_EMAIL_EXPEDITOR || "Tineret Cupșeni <onboarding@resend.dev>";

  if (!cheie || destinatari.length === 0) {
    if (process.env.NODE_ENV === "development") {
      console.info(`[${mesaj.formular}: Resend neconfigurat, doar în dezvoltare]`, text(mesaj));
      return { ok: true };
    }
    return { ok: false, motiv: "neconfigurat" };
  }

  try {
    const resend = new Resend(cheie);
    const { error } = await resend.emails.send({
      from: expeditor,
      to: destinatari,
      subject: `${mesaj.formular}: ${mesaj.subiect}`,
      html: html(mesaj),
      text: text(mesaj),
      replyTo: mesaj.raspunsLa && esteEmail(mesaj.raspunsLa) ? mesaj.raspunsLa : undefined,
    });
    if (error) {
      console.error(`[${mesaj.formular}] Resend a refuzat trimiterea:`, error.name, error.message);
      return { ok: false, motiv: "eroare" };
    }
    return { ok: true };
  } catch (e) {
    console.error(`[${mesaj.formular}] Trimiterea prin Resend a eșuat:`, e);
    return { ok: false, motiv: "eroare" };
  }
}
