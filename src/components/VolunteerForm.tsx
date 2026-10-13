"use client";

import { useActionState, useEffect, useRef } from "react";
import { trimiteInscriere, type StareFormular } from "@/app/implica-te/actions";
import { directii } from "@/data/directii";
import { site } from "@/data/site";
import { Icon } from "./Icon";

const STARE_INITIALA: StareFormular = { stare: "initial", valori: { nume: "", varsta: "", sat: "", contact: "", interese: ["s5"], mesaj: "" } };

export function VolunteerForm() {
  const [stare, actiune, seTrimite] = useActionState(trimiteInscriere, STARE_INITIALA);
  const mesajRef = useRef<HTMLDivElement>(null);
  const v = stare.valori ?? STARE_INITIALA.valori!;

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

      {stare.stare === "eroare" ? (
        <div className="form-alert" role="alert" tabIndex={-1} ref={mesajRef}>
          {stare.mesaj}
        </div>
      ) : null}

      <div className="form__row">
        <div className="field field--grow">
          <label htmlFor="nume">Nume și prenume *</label>
          <input id="nume" name="nume" type="text" autoComplete="name" defaultValue={v.nume} aria-invalid={!!stare.erori?.nume} aria-describedby={stare.erori?.nume ? "nume-eroare" : undefined} />
          {stare.erori?.nume ? <span id="nume-eroare" className="field__error">{stare.erori.nume}</span> : null}
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
          <label htmlFor="contact">Telefon sau Instagram *</label>
          <input id="contact" name="contact" type="text" placeholder="07xx xxx xxx sau @utilizator" defaultValue={v.contact} aria-invalid={!!stare.erori?.contact} aria-describedby={stare.erori?.contact ? "contact-eroare" : undefined} />
          {stare.erori?.contact ? <span id="contact-eroare" className="field__error">{stare.erori.contact}</span> : null}
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
          <input type="checkbox" name="acord" value="da" aria-invalid={!!stare.erori?.acord} aria-describedby={stare.erori?.acord ? "acord-eroare" : undefined} />
          <span>Sunt de acord să fiu contactat(ă) de echipa {site.numeScurt}. Dacă am sub 16 ani, un părinte știe și este de acord. *</span>
        </label>
        {stare.erori?.acord ? <span id="acord-eroare" className="field__error">{stare.erori.acord}</span> : null}
      </div>

      <div>
        <button type="submit" className="btn btn--green btn--lg" disabled={seTrimite}>
          {seTrimite ? "Se trimite…" : "Trimite"} <Icon name="sageata" />
        </button>
      </div>
    </form>
  );
}
