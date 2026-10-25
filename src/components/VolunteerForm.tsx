"use client";

import { useActionState, useEffect, useRef } from "react";
import { trimiteInscriere, type StareFormular } from "@/app/implica-te/actions";
import { directii } from "@/data/directii";
import { site } from "@/data/site";
import { Icon } from "./Icon";

const STARE_INITIALA: StareFormular = { stare: "initial", valori: { nume: "", varsta: "", sat: "", contact: "", interese: ["s5"], mesaj: "" } };

// Numele câmpurilor, pentru rezumatul erorilor (fiecare rând duce la câmpul lui).
const ETICHETE: Record<"nume" | "contact" | "acord", string> = { nume: "Nume și prenume", contact: "Date de contact", acord: "Acordul" };

/** Mesaj de eroare sub câmp: pictogramă + text, nu doar culoare. */
function EroareCamp({ id, children }: { id: string; children: string }) {
  return (
    <span id={id} className="field__error">
      <Icon name="atentie" size={16} />
      {children}
    </span>
  );
}

export function VolunteerForm() {
  const [stare, actiune, seTrimite] = useActionState(trimiteInscriere, STARE_INITIALA);
  const mesajRef = useRef<HTMLDivElement>(null);
  const v = stare.valori ?? STARE_INITIALA.valori!;
  const erori = Object.entries(stare.erori ?? {}) as [keyof typeof ETICHETE, string][];

  useEffect(() => {
    if (stare.stare !== "initial") mesajRef.current?.focus();
  }, [stare]);

  if (stare.stare === "trimis") {
    return (
      <div className="form-success" role="status" tabIndex={-1} ref={mesajRef}>
        <span className="form-success__icon">
          <Icon name="bifa" size={30} strokeWidth={2.4} />
        </span>
        <h2 className="h3">Mulțumim, {stare.prenume}!</h2>
        <p>Ți-am primit mesajul. Te contactăm înainte de activitățile care te interesează.</p>
      </div>
    );
  }

  return (
    <form action={actiune} className="form" noValidate>
      <div className="stack-sm">
        <h2 id="formular-titlu" className="h3">
          Vreau să fiu voluntar
        </h2>
        <p className="muted">Durează un minut. Câmpurile cu * sunt obligatorii.</p>
      </div>

      {/* Capcană pentru roboți: ascunsă vizual și pentru cititoarele de ecran. */}
      <div className="visually-hidden" aria-hidden="true">
        <label htmlFor="website">Nu completa acest câmp</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {stare.stare === "eroare" ? (
        <div className="form-alert" role="alert" tabIndex={-1} ref={mesajRef}>
          <span className="form-alert__title">
            <Icon name="atentie" size={20} />
            {stare.mesaj}
          </span>
          {erori.length > 0 ? (
            <ul>
              {erori.map(([camp, text]) => (
                <li key={camp}>
                  <a href={`#${camp}`}>{ETICHETE[camp]}</a>: {text}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <div className="form__row">
        <div className="field field--grow">
          <label htmlFor="nume">Nume și prenume *</label>
          <input id="nume" name="nume" type="text" autoComplete="name" defaultValue={v.nume} aria-required="true" aria-invalid={!!stare.erori?.nume} aria-describedby={stare.erori?.nume ? "nume-eroare" : undefined} />
          {stare.erori?.nume ? <EroareCamp id="nume-eroare">{stare.erori.nume}</EroareCamp> : null}
        </div>
        <div className="field field--small">
          <label htmlFor="varsta">Vârsta</label>
          <input id="varsta" name="varsta" type="number" inputMode="numeric" min={10} max={99} defaultValue={v.varsta} />
        </div>
      </div>

      <div className="form__row">
        <div className="field">
          <label htmlFor="sat">Satul</label>
          <select id="sat" name="sat" defaultValue={v.sat}>
            <option value="">Alege satul</option>
            {site.sate.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
            <option value="Din altă parte">Din altă parte</option>
          </select>
        </div>
        <div className="field field--grow">
          <label htmlFor="contact">Telefon, Instagram sau e-mail *</label>
          <input
            id="contact"
            name="contact"
            type="text"
            autoComplete="on"
            defaultValue={v.contact}
            aria-required="true"
            aria-invalid={!!stare.erori?.contact}
            aria-describedby={["contact-ajutor", stare.erori?.contact ? "contact-eroare" : null].filter(Boolean).join(" ")}
          />
          <span id="contact-ajutor" className="field__hint">
            Oricare dintre ele, cum îți e mai ușor: 07xx xxx xxx, @utilizator sau o adresă de e-mail.
          </span>
          {stare.erori?.contact ? <EroareCamp id="contact-eroare">{stare.erori.contact}</EroareCamp> : null}
        </div>
      </div>

      <fieldset className="field">
        <legend>Ce te interesează?</legend>
        <div className="check-chips">
          {directii.map((d) => (
            <label key={d.id} className="check-chip" style={{ ["--chip-bg" as string]: d.culori.fundal, ["--chip-fg" as string]: d.culori.text }}>
              <input type="checkbox" name="interese" value={d.id} defaultChecked={v.interese.includes(d.id)} />
              {d.nume}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="mesaj">Mesaj sau idee</label>
        <textarea id="mesaj" name="mesaj" rows={4} placeholder="Ex.: Știu să cânt la chitară și aș vrea să ajut la Serile tinerilor." defaultValue={v.mesaj} />
      </div>

      <div className="field">
        <label className="consent">
          <input id="acord" type="checkbox" name="acord" value="da" aria-required="true" aria-invalid={!!stare.erori?.acord} aria-describedby={stare.erori?.acord ? "acord-eroare" : undefined} />
          <span>Sunt de acord să fiu contactat(ă) de echipa {site.numeScurt}. Dacă am sub 16 ani, un părinte știe și este de acord. *</span>
        </label>
        {stare.erori?.acord ? <EroareCamp id="acord-eroare">{stare.erori.acord}</EroareCamp> : null}
      </div>

      <div>
        <button type="submit" className="btn btn--green btn--lg" disabled={seTrimite}>
          {seTrimite ? "Se trimite…" : "Trimite"} <Icon name="sageata" />
        </button>
      </div>
    </form>
  );
}
