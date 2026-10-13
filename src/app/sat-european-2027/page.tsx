import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { SectionHeader, StatTile } from "@/components/ui";
import { VideoYouTube } from "@/components/VideoYouTube";
import { activitati } from "@/data/activitati";
import { directii } from "@/data/directii";
import { site } from "@/data/site";
import { formateazaLuni, pluralActivitati } from "@/lib/luni";
import { metadatePagina } from "@/lib/seo";

export const metadata: Metadata = metadatePagina({
  titlu: "Satul European de Tineret 2027",
  descriere: `Cupșeni este comună finalistă pentru titlul de Sat European de Tineret 2027. Ce înseamnă programul și ce aduce candidatura noastră: ${activitati.length} de activități, 4 sate, 7 schimbări.`,
  cale: "/sat-european-2027",
});

// Ce este programul, pe scurt (după europeanyouthvillage.eu). Fără etapele și datele concursului.
const principii: { titlu: string; text: string; icon: IconName }[] = [
  {
    titlu: "Tinerii conduc",
    text: "Tinerii din mediul rural nu sunt doar beneficiari, ci co-creatori, lideri și parteneri în deciziile comunității lor.",
    icon: "oameni",
  },
  {
    titlu: "Un an de activități",
    text: "Satul care primește titlul are 12 luni în care grupul de inițiativă pune în practică calendarul propus, împreună cu ceilalți tineri.",
    icon: "calendar",
  },
  {
    titlu: "Împreună cu comunitatea",
    text: "Autoritățile locale sunt parteneri, iar satul devine un loc în care tinerii se pot dezvolta și știu că vocea lor contează.",
    icon: "casa",
  },
];

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
                Satul European de Tineret este titlul acordat prin programul European Youth Village comunelor în care tinerii aduc
                schimbarea. Nu e un premiu pentru cea mai dezvoltată comună, ci o șansă de creștere pentru tineri și pentru comunitatea lor.
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

        <section className="container section section--tight stack-lg" aria-labelledby="film-titlu">
          <SectionHeader
            id="film-titlu"
            eyebrow="Filmul candidaturii"
            title="Candidatura noastră, în imagini"
            lead="Filmul candidaturii comunei Cupșeni la titlul de Sat European de Tineret 2027, cu echipa care stă în spatele ei."
          />
          <VideoYouTube {...site.videoCandidatura} />
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

        <section className="band band--sky" aria-labelledby="program-titlu">
          <div className="container section stack-lg">
            <SectionHeader
              id="program-titlu"
              eyebrow="Despre program"
              title="Ce înseamnă să fii Sat European de Tineret"
              lead="European Youth Village vrea ca satele din România și din Europa să devină locuri vii, conduse de tineri, în care participarea și ideile lor contează."
              action={
                <a href="https://europeanyouthvillage.eu/" className="btn btn--navy" target="_blank" rel="noopener noreferrer">
                  europeanyouthvillage.eu <Icon name="extern" size={18} />
                </a>
              }
            />
            <ul className="auto-grid auto-grid--260">
              {principii.map((p) => (
                <li key={p.titlu} className="way-card">
                  <span className="icon-tile icon-tile--sm" style={{ background: "#E5E9EE", color: "#1A2E40" }}>
                    <Icon name={p.icon} size={22} />
                  </span>
                  <strong>{p.titlu}</strong>
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="container section stack-lg" aria-labelledby="sustine-titlu">
          <SectionHeader id="sustine-titlu" eyebrow="Cum ne poți susține" title="Fiecare om din comună contează" />
          <ol className="auto-grid auto-grid--300">
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
          </ol>
        </section>
      </>
    </PageShell>
  );
}
