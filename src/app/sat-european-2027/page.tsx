import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { SectionHeader, StatTile } from "@/components/ui";
import { activitati } from "@/data/activitati";
import { directii } from "@/data/directii";
import { site } from "@/data/site";
import { formateazaLuni, pluralActivitati } from "@/lib/luni";

export const metadata: Metadata = {
  title: "Satul European de Tineret 2027",
  description: `Cupșeni este finalist pentru titlul de Sat European de Tineret 2027. Candidatura noastră: ${activitati.length} de activități, 12 luni, 4 sate, 7 schimbări.`,
};

const etape = [
  { nr: "01", titlu: "Candidatura depusă", data: "[Data]", stare: "gata" },
  { nr: "02", titlu: "Finaliști", data: "[Data anunțului]", stare: "gata" },
  { nr: "03", titlu: "[Etapa finală / jurizarea]", data: "[Perioada]", stare: "acum" },
  { nr: "04", titlu: "Lansarea programului în comună", data: "Ianuarie 2027", stare: "urmeaza" },
  { nr: "05", titlu: "Evaluarea anului și planul pentru 2028", data: "Decembrie 2027", stare: "urmeaza" },
] as const;

const eticheteStare = { gata: "Realizat", acum: "Acum", urmeaza: "Urmează" } as const;

export default function SatEuropeanPage() {
  return (
    <PageShell>
      <>
        <section className="page-hero" aria-labelledby="eyv-titlu">
          <div className="container page-hero__inner page-hero__inner--center">
            <div className="stack page-hero__main">
              <span className="badge-sun">
                <Icon name="trofeu" size={20} /> Finaliști
              </span>
              <h1 id="eyv-titlu" className="display display--md">
                Cupșeni – Sat European de Tineret 2027
              </h1>
              <p className="hero__lead">
                Comuna noastră a intrat în finala programului Satul European de Tineret. Am propus un an întreg în care tinerii din cele patru
                sate învață, construiesc și sărbătoresc împreună.
              </p>
              <p className="hero__lead hero__lead--soft">
                [1–2 propoziții despre program: cine îl organizează, ce primește satul câștigător, când se anunță rezultatul.]
              </p>
            </div>
            <div className="logo-card logo-card--large">
              <Image src="/sigle/satul-european-de-tineret.png" alt="Satul European de Tineret" width={1572} height={585} loading="eager" />
              <hr />
              <Image src="/sigle/gen-european-youth-village.png" alt="GEN. European Youth Village" width={1020} height={285} className="logo-card__gen" />
            </div>
          </div>
        </section>
        <div className="pattern-strip" aria-hidden="true" />

        <section className="container stats" aria-label="Candidatura în cifre">
          <StatTile numar={activitati.length}>activități planificate</StatTile>
          <StatTile numar={12}>luni, din ianuarie până în decembrie</StatTile>
          <StatTile numar={site.sate.length}>sate implicate</StatTile>
          <StatTile numar={directii.length}>schimbări pe care le urmărim</StatTile>
        </section>

        <section className="container section stack-lg" aria-labelledby="schimbari-titlu">
          <SectionHeader
            id="schimbari-titlu"
            eyebrow="Candidatura noastră"
            title="Șapte schimbări pentru comuna noastră"
            lead="Fiecare activitate din calendar susține una dintre schimbări. Deschide o schimbare ca să vezi activitățile ei."
          />
          <div className="accordion">
            {directii.map((d, i) => {
              const lista = activitati.filter((a) => a.directie === d.id);
              return (
                <details key={d.id} className="accordion__item" open={i === 0} style={{ ["--accent-directie" as string]: d.culori.punct }}>
                  <summary className="accordion__summary">
                    <span className="icon-tile" style={{ background: d.culori.fundal, color: d.culori.text }}>
                      <Icon name={d.icon} size={26} />
                    </span>
                    <span className="accordion__title">
                      <span className="accordion__meta">
                        {d.cod} · {pluralActivitati(lista.length)}
                      </span>
                      <span className="accordion__name">{d.nume}</span>
                    </span>
                    <span className="accordion__chevron" aria-hidden="true">
                      <Icon name="jos" size={20} />
                    </span>
                  </summary>
                  <div className="accordion__body">
                    <p className="muted">{d.formulare}</p>
                    <ul className="auto-grid auto-grid--260 accordion__list">
                      {lista.map((a) => (
                        <li key={a.slug}>
                          <Link href={`/activitati/${a.slug}`} className="mini-activity" style={{ background: d.culori.palid }} transitionTypes={["nav-forward"]}>
                            <span className="chip__dot" style={{ background: d.culori.punct }} aria-hidden="true" />
                            <span>
                              <strong>{a.titlu}</strong>
                              <small>{formateazaLuni(a.luni)}</small>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              );
            })}
          </div>
        </section>

        <section className="band band--sky" aria-labelledby="etape-titlu">
          <div className="container section stack-lg">
            <SectionHeader id="etape-titlu" eyebrow="Etapele" title="Unde suntem acum" />
            <ol className="auto-grid auto-grid--200">
              {etape.map((e) => (
                <li key={e.nr} className={`step-card step-card--${e.stare}`}>
                  <span className="step-card__top">
                    <span className="step-card__nr">{e.nr}</span>
                    <span className="step-card__pill">{eticheteStare[e.stare]}</span>
                  </span>
                  <strong>{e.titlu}</strong>
                  <span className="step-card__date">{e.data}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="container section stack-lg" aria-labelledby="sustine-titlu">
          <SectionHeader id="sustine-titlu" eyebrow="Cum ne poți susține" title="Fiecare om din comună contează" />
          <ol className="auto-grid auto-grid--250">
            <li>
              <Link href="/calendar" className="support-card">
                <span className="support-card__nr">1</span>
                <strong>Vino la activități</strong>
                <span>Toate datele sunt în calendarul 2027.</span>
              </Link>
            </li>
            <li>
              <a href={site.social.instagram} className="support-card" target="_blank" rel="noopener noreferrer">
                <span className="support-card__nr">2</span>
                <strong>Distribuie ce postăm</strong>
                <span>Pe Facebook, Instagram și TikTok — @tineret.cupseni.</span>
              </a>
            </li>
            <li>
              <Link href="/implica-te" className="support-card">
                <span className="support-card__nr">3</span>
                <strong>Devino voluntar sau partener</strong>
                <span>Cu timp, idei, un spațiu sau produse locale.</span>
              </Link>
            </li>
            <li>
              <div className="support-card support-card--todo">
                <span className="support-card__nr">4</span>
                <strong>[Votează Cupșeni]</strong>
                <span>[Doar dacă programul are vot public: linkul de vot și data-limită.]</span>
              </div>
            </li>
          </ol>
        </section>
      </>
    </PageShell>
  );
}
