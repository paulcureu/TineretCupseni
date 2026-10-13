import type { Metadata } from "next";
import { MobileCarousel } from "@/components/MobileCarousel";
import { PageShell } from "@/components/PageShell";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { SatraLuiPintea } from "@/components/Peisaj";
import { SectionHeader } from "@/components/ui";
import { activitati } from "@/data/activitati";
import { echipa } from "@/data/echipa";
import { sate } from "@/data/site";
import { metadatePagina } from "@/lib/seo";

export const metadata: Metadata = metadatePagina({
  titlu: "Despre noi",
  descriere: "Grupul de inițiativă al tinerilor din Cupșeni, Costeni, Libotin și Ungureni: povestea noastră, echipa și locul de unde venim.",
  cale: "/despre",
});

// Doar momentele noastre; etapele concursului nu apar pe site.
const drum = [
  { gata: true, data: "Pensiunea Țara lui Pintea", titlu: "Prima întâlnire a grupului de inițiativă", text: "Ne-am adunat prima dată ca grup de inițiativă, la Pensiunea Țara lui Pintea din Cupșeni." },
  { gata: true, data: "20 septembrie 2026", titlu: "Întâlnirea cu tinerii din comună", text: "Ne-am întâlnit cu tinerii din comună pe Valea Pietrelor." },
  { gata: true, data: "26 septembrie 2026", titlu: "Prima seară de film", text: "Ediția-pilot a Serilor tinerilor, la Theo Events, cu sprijinul autorităților locale." },
  { gata: false, data: "Ianuarie 2027", titlu: "Întâlnirea de lansare „Cupșeni – Sat European de Tineret 2027”", text: "Prezentăm programul și chemăm tinerii din toate cele patru sate să se alăture." },
  { gata: false, data: "Decembrie 2027", titlu: "Evaluarea anului și planul tinerilor pentru 2028", text: "Ce am realizat, ce continuăm și ce propun tinerii pentru anul următor." },
];

export default function DesprePage() {
  return (
    <PageShell>
      <>
        <section className="container section section--tight stack-lg" aria-labelledby="despre-titlu">
          <div className="section-header section-header--split">
            <div className="section-header__text">
              <span className="eyebrow">Despre noi</span>
              <h1 id="despre-titlu" className="display display--md display--ink">
                Suntem tinerii din cele patru sate ale comunei Cupșeni.
              </h1>
            </div>
            <p className="lead section-header__aside">
              Un grup de inițiativă care vrea ca în Cupșeni, Costeni, Libotin și Ungureni să fie mereu ceva de făcut, de învățat și de
              sărbătorit, împreună.
            </p>
          </div>
          <figure className="wide-photo">
            <Image src="/foto/tineri/tineri-11.jpg" alt="Fotografia de grup cu tinerii de la întâlnirea pe Valea Pietrelor" width={1440} height={810} sizes="(max-width: 1248px) 100vw, 1200px" loading="eager" />
            <figcaption>Întâlnirea cu tinerii din comună · Valea Pietrelor</figcaption>
          </figure>
        </section>

        <section className="container section split split--top" aria-labelledby="poveste-titlu">
          <div className="split__main stack">
            <span className="eyebrow">Povestea noastră</span>
            <h2 id="poveste-titlu" className="h2">
              De la o întâlnire la un an întreg de activități
            </h2>
          </div>
          <div className="split__side prose">
            <p>
              Ne-am strâns prima dată ca grup de inițiativă la Pensiunea Țara lui Pintea din Cupșeni. Pe 20 septembrie ne-am întâlnit cu
              tinerii din comună pe Valea Pietrelor, iar pe 26 septembrie am organizat prima seară de film, cu copii și părinți în sală.
            </p>
            <p>
              Cu candidatura pentru Satul European de Tineret 2027 am ajuns în finală. Planul nostru: {activitati.length} de activități în 12
              luni, gândite pentru toate cele patru sate.
            </p>
            <p className="muted">[Completați: cine a avut ideea, câți tineri sunt în grup, ce vă leagă de comună.]</p>
          </div>
        </section>

        <section className="band band--sky" aria-labelledby="sate-titlu">
          <div className="container section stack-lg">
            <SectionHeader
              id="sate-titlu"
              eyebrow="„4 sate, o singură comunitate”"
              title="Patru sate, aceeași echipă"
              lead="Prin campania permanentă „4 sate, o singură comunitate” informăm, promovăm și aducem împreună tinerii din toată comuna, pe tot parcursul lui 2027."
            />
            <ol className="auto-grid auto-grid--250">
              {sate.map((s, i) => (
                <li key={s.nume} className={i === 0 ? "village-card village-card--main" : "village-card"}>
                  <span className="village-card__nr">
                    {String(i + 1).padStart(2, "0")}
                    {s.eticheta ? ` · ${s.eticheta}` : ""}
                  </span>
                  <span className="village-card__name">{s.nume}</span>
                  <span className="village-card__text">{s.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="container section stack-lg" aria-labelledby="echipa-titlu">
          <SectionHeader
            id="echipa-titlu"
            eyebrow="Grupul de inițiativă"
            title="Echipa"
            lead="Ne vedem în fiecare lună ca să planificăm activitățile împreună, iar oricine din comună poate veni la întâlnire."
          />
          <MobileCarousel className="auto-grid auto-grid--260" label="Echipa" latime="74%">
            {echipa.map((m) => (
              <li key={m.foto}>
                <figure className="team-card">
                  <Image src={m.foto} alt={`Portret: ${m.nume}`} width={m.w} height={m.h} sizes="(max-width: 600px) 74vw, 280px" style={{ objectPosition: m.pozitie }} />
                  <figcaption>
                    <strong>{m.nume}</strong>
                    <span>{[m.rol, m.sat].filter(Boolean).join(" · ") || "Grupul de inițiativă"}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
            <li>
              <Link href="/implica-te" className="join-card">
                <span className="join-card__icon">
                  <Icon name="plus" size={26} />
                </span>
                <span className="stack-sm">
                  <strong>Locul tău e aici.</strong>
                  <span>Grupul de inițiativă e deschis oricărui tânăr din comună.</span>
                  <span className="arrow-link">
                    Alătură-te <Icon name="sageata" size={18} />
                  </span>
                </span>
              </Link>
            </li>
          </MobileCarousel>
        </section>

        <section className="band band--white" aria-labelledby="drum-titlu">
          <div className="container section split split--top">
            <div className="split__main stack">
              <span className="eyebrow">Drumul nostru</span>
              <h2 id="drum-titlu" className="h2">
                Până acum și de aici înainte
              </h2>
            </div>
            <ol className="timeline split__side">
              {drum.map((pas) => (
                <li key={pas.titlu} className={pas.gata ? "timeline__item timeline__item--done" : "timeline__item"}>
                  <span className="timeline__meta">
                    {pas.data} · {pas.gata ? "Realizat" : "Urmează"}
                  </span>
                  <strong className="timeline__title">{pas.titlu}</strong>
                  <span className="timeline__text">{pas.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="band band--navy band--clip" aria-labelledby="loc-titlu">
          <div className="container section section--flush-bottom split split--bottom">
            <div className="split__main stack section--pad-bottom">
              <span className="eyebrow text-sun">Locul nostru</span>
              <h2 id="loc-titlu" className="h2">
                Ocrotiți de Șatra lui Pintea
              </h2>
              <p className="lead lead--on-dark">
                Deasupra comunei veghează Șatra lui Pintea, stâncile legate de legenda haiducului Pintea Viteazul. De aici vine și sigla
                noastră: muntele, soarele care răsare, bradul și drumul care leagă satele.
              </p>
              <p className="lead lead--on-dark">
                Vrem să ducem mai departe poveștile locului: la focul de tabără „Legende sub stele”, la șezători și la sărbătorile câmpenești.
              </p>
            </div>
            <div className="split__side">
              <SatraLuiPintea />
            </div>
          </div>
        </section>
      </>
    </PageShell>
  );
}
