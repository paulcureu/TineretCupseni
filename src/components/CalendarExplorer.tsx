"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { activitati } from "@/data/activitati";
import { directii, getDirectie, type DirectieId } from "@/data/directii";
import { AN_PROGRAM, LUNI, LUNI_ABREVIATE, pluralActivitati } from "@/lib/luni";
import { Icon } from "./Icon";
import { ActivityCard } from "./ui";

type Vedere = "luna" | "an";
type FiltruDirectie = DirectieId | "toate";

type Stare = { vedere: Vedere; luna: number; directie: FiltruDirectie };

const STARE_IMPLICITA: Stare = { vedere: "luna", luna: 1, directie: "toate" };

function citesteDinUrl(params: URLSearchParams): Stare {
  const luna = Number(params.get("luna"));
  const directie = params.get("directie");
  const vedere = params.get("vedere");
  return {
    vedere: vedere === "an" ? "an" : "luna",
    luna: Number.isInteger(luna) && luna >= 1 && luna <= 12 ? luna : 1,
    directie: directii.some((d) => d.id === directie) ? (directie as DirectieId) : "toate",
  };
}

function scrieInUrl(s: Stare) {
  const p = new URLSearchParams();
  if (s.vedere === "an") p.set("vedere", "an");
  else p.set("luna", String(s.luna));
  if (s.directie !== "toate") p.set("directie", s.directie);
  window.history.replaceState(null, "", `?${p.toString()}`);
}

/** Citește luna și direcția din URL (ex. /calendar?luna=8&directie=s5). */
export function CalendarDinUrl() {
  const params = useSearchParams();
  return <CalendarExplorer initial={citesteDinUrl(new URLSearchParams(params.toString()))} />;
}

export function CalendarExplorer({ initial = STARE_IMPLICITA }: { initial?: Stare }) {
  const [stare, setStare] = useState<Stare>(initial);
  const { vedere, luna, directie } = stare;

  const actualizeaza = (schimbare: Partial<Stare>) => {
    const noua = { ...stare, ...schimbare };
    setStare(noua);
    scrieInUrl(noua);
  };

  const filtrate = directie === "toate" ? activitati : activitati.filter((a) => a.directie === directie);
  const dinLuna = filtrate.filter((a) => a.luni.includes(luna));

  return (
    <div className="calendar">
      <section className="calendar__filters" aria-label="Filtre">
        <div className="calendar__filters-row">
          <div className="segmented" role="group" aria-label="Mod de afișare">
            <button type="button" aria-pressed={vedere === "luna"} onClick={() => actualizeaza({ vedere: "luna" })}>
              <Icon name="calendar" size={18} /> Lună cu lună
            </button>
            <button type="button" aria-pressed={vedere === "an"} onClick={() => actualizeaza({ vedere: "an" })}>
              <Icon name="lista" size={18} /> Tot anul
            </button>
          </div>
          <p className="calendar__summary" aria-live="polite">
            {vedere === "luna"
              ? `${pluralActivitati(dinLuna.length)} în ${LUNI[luna - 1].toLowerCase()}`
              : `${pluralActivitati(filtrate.length)} în ${AN_PROGRAM}`}
          </p>
        </div>

        <div className="chip-row" role="group" aria-label="Filtrează după direcție">
          <button
            type="button"
            className="filter-chip"
            aria-pressed={directie === "toate"}
            onClick={() => actualizeaza({ directie: "toate" })}
          >
            <span className="chip__dot" style={{ background: "#8391A7" }} aria-hidden="true" />
            Toate direcțiile <span className="filter-chip__count">{activitati.length}</span>
          </button>
          {directii.map((d) => (
            <button
              key={d.id}
              type="button"
              className="filter-chip"
              aria-pressed={directie === d.id}
              onClick={() => actualizeaza({ directie: d.id })}
            >
              <span className="chip__dot" style={{ background: d.culori.punct }} aria-hidden="true" />
              {d.nume}
              <span className="filter-chip__count">{activitati.filter((a) => a.directie === d.id).length}</span>
            </button>
          ))}
        </div>

        {vedere === "luna" ? (
          <div className="month-picker" role="group" aria-label="Alege luna">
            {LUNI_ABREVIATE.map((abr, i) => {
              const n = filtrate.filter((a) => a.luni.includes(i + 1)).length;
              return (
                <button
                  key={abr}
                  type="button"
                  aria-pressed={luna === i + 1}
                  aria-label={`${LUNI[i]}: ${pluralActivitati(n)}`}
                  onClick={() => actualizeaza({ luna: i + 1 })}
                >
                  <span className="month-picker__abbr">{abr}</span>
                  <span className="month-picker__count">{n}</span>
                </button>
              );
            })}
          </div>
        ) : null}
      </section>

      {vedere === "luna" ? (
        <section aria-labelledby="luna-titlu" className="stack">
          <div className="calendar__heading">
            <h2 id="luna-titlu" className="h2">
              {LUNI[luna - 1]} {AN_PROGRAM}
            </h2>
            <span className="muted">{pluralActivitati(dinLuna.length)} în această lună</span>
          </div>
          {dinLuna.length > 0 ? (
            <ul className="auto-grid auto-grid--300">
              {dinLuna.map((a) => (
                <li key={a.slug}>
                  <ActivityCard activitate={a} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-state">Nicio activitate din această direcție în luna aleasă. Încearcă altă lună.</p>
          )}
        </section>
      ) : (
        <section aria-labelledby="an-titlu" className="stack">
          <h2 id="an-titlu" className="h2">
            Tot anul {AN_PROGRAM}
          </h2>
          <div className="year-table__scroll">
            <table className="year-table">
              <caption className="visually-hidden">
                Lunile în care are loc fiecare activitate din {AN_PROGRAM}
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="year-table__nr">
                    Nr.
                  </th>
                  <th scope="col" className="year-table__title">
                    Activitatea
                  </th>
                  {LUNI_ABREVIATE.map((abr, i) => (
                    <th key={abr} scope="col">
                      <button type="button" onClick={() => actualizeaza({ vedere: "luna", luna: i + 1 })} aria-label={`Vezi ${LUNI[i]}`}>
                        {abr}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtrate.map((a) => {
                  const d = getDirectie(a.directie);
                  return (
                    <tr key={a.slug}>
                      <td className="year-table__nr">{String(a.nr).padStart(2, "0")}</td>
                      <th scope="row" className="year-table__title">
                        <Link href={`/activitati/${a.slug}`}>
                          <span className="chip__dot" style={{ background: d.culori.punct }} aria-hidden="true" />
                          {a.titlu}
                        </Link>
                      </th>
                      {LUNI.map((numeLuna, i) => {
                        const activ = a.luni.includes(i + 1);
                        return (
                          <td key={numeLuna}>
                            <span
                              className="year-table__cell"
                              style={activ ? { background: d.culori.punct } : undefined}
                              title={activ ? `${numeLuna} ${AN_PROGRAM}` : undefined}
                            />
                            {activ ? <span className="visually-hidden">{numeLuna}</span> : null}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="muted small">
            Celulele colorate arată lunile în care are loc fiecare activitate. Apasă pe o lună din antet ca să vezi detaliile ei.
          </p>
        </section>
      )}
    </div>
  );
}
