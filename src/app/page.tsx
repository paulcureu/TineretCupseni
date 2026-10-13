import type { Metadata } from "next";
import Image from "next/image";
import { MobileCarousel } from "@/components/MobileCarousel";
import { PageShell } from "@/components/PageShell";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { BandaSate } from "@/components/BandaSate";
import { BandaDealuri } from "@/components/Peisaj";
import { SocialLinks } from "@/components/SocialLinks";
import { JsonLd } from "@/components/JsonLd";
import { VideoYouTube } from "@/components/VideoYouTube";
import { ArrowLink, SectionHeader, StatTile } from "@/components/ui";
import { activitati, activitatiDinLuna, getActivitate } from "@/data/activitati";
import { directii, getDirectie } from "@/data/directii";
import { echipa } from "@/data/echipa";
import { detaliiAlbum, evenimente } from "@/data/galerie";
import { site } from "@/data/site";
import { cuNumar, LUNI, pluralActivitati } from "@/lib/luni";
import { absolut, metadatePagina } from "@/lib/seo";

export const metadata: Metadata = metadatePagina({
  titlu: `${site.nume} · Satul European de Tineret 2027`,
  descriere: site.descriere,
  cale: "/",
});

// Cine suntem, pentru Google: organizația și site-ul.
const organizatie = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absolut("/#organizatie"),
  name: site.nume,
  alternateName: site.numeScurt,
  url: absolut("/"),
  logo: absolut("/brand/logo-512.png"),
  image: absolut("/foto/grup/grupul-de-initiativa.jpg"),
  description: site.descriere,
  slogan: site.slogan,
  email: site.email,
  sameAs: Object.values(site.social),
  address: { "@type": "PostalAddress", addressLocality: "Cupșeni", addressRegion: "Maramureș", addressCountry: "RO" },
  areaServed: site.sate.map((sat) => ({ "@type": "Place", name: `${sat}, comuna Cupșeni, Maramureș` })),
};

const siteWeb = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absolut("/#site"),
  url: absolut("/"),
  name: site.nume,
  alternateName: site.numeScurt,
  inLanguage: "ro-RO",
  publisher: { "@id": absolut("/#organizatie") },
};

// Câte un moment de reper pentru fiecare lună din 2027.
const repere = [
  "intalnirea-de-lansare",
  "ulita-copilariei",
  "mestesuguri-vii",
  "curs-de-prim-ajutor",
  "pe-doua-roti",
  "foc-de-tabara-legende-sub-stele",
  "serile-tinerilor",
  "noaptea-perseidelor",
  "gustul-generatiilor",
  "targul-de-toamna",
  "plantam-pentru-un-viitor",
  "targul-de-craciun",
];

export default function AcasaPage() {
  return (
    <PageShell>
      <>
        <JsonLd date={[organizatie, siteWeb]} />
        <section className="hero" aria-labelledby="hero-titlu">
          <div className="container hero__inner">
            <div className="hero__text">
              <span className="badge-outline">
                <Icon name="trofeu" size={20} className="text-sun" />
                Finaliști · Satul European de Tineret 2027
              </span>
              <h1 id="hero-titlu" className="display">
                Tinerii din comuna <span className="text-sun">Cupșeni</span>
              </h1>
              <p className="hero__lead">
                Patru sate, o singură comunitate. În 2027 aducem acasă {activitati.length} de activități: de la ateliere
                meșteșugărești, activități sportive și seri de film, la Festivalul Tinerilor.
              </p>
              <div className="button-row">
                <Link href="/calendar" className="btn btn--sun btn--lg">
                  Vezi calendarul 2027 <Icon name="sageata" />
                </Link>
                <Link href="/implica-te" className="btn btn--outline-light btn--lg">
                  Vreau să mă implic
                </Link>
              </div>
              <p className="hero__villages">
                <Icon name="pin" size={18} />
                <strong>{site.sate.join(" · ")}</strong>
                <span className="hero__villages-sep" aria-hidden="true" />
                <span>Țara Lăpușului, Maramureș</span>
              </p>
            </div>
            <div className="hero__media hero__media--grup">
              <div className="hero__sun" aria-hidden="true" />
              <div className="hero__ring" aria-hidden="true" />
              <Image
                src="/foto/grup/grupul-de-initiativa.jpg"
                alt="Grupul de inițiativă în fața unei case tradiționale din lemn, la Pensiunea Țara lui Pintea"
                width={2000}
                height={1126}
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 900px) 90vw, 580px"
                className="hero__photo hero__photo--grup"
              />
              <div className="hero__sticker">
                <span className="hero__sticker-icon">
                  <Icon name="oameni" size={22} />
                </span>
                <span>
                  <strong>Grupul de inițiativă</strong>
                  <small>Pensiunea Țara lui Pintea</small>
                </span>
              </div>
            </div>
          </div>
          <BandaDealuri />
        </section>
        <BandaSate />

        <section className="container stats" aria-label="Programul în cifre">
          <StatTile numar={activitati.length}>activități în 2027</StatTile>
          <StatTile numar={12}>luni de program</StatTile>
          <StatTile numar={site.sate.length}>sate, o singură comunitate</StatTile>
          <StatTile numar={directii.length}>direcții de schimbare</StatTile>
        </section>

        <section className="section container stack-lg" aria-labelledby="video-titlu">
          <SectionHeader
            id="video-titlu"
            eyebrow="Candidatura în imagini"
            title="Echipa și proiectul, în filmul candidaturii"
            lead="Filmul cu care comuna Cupșeni a candidat la titlul de Sat European de Tineret 2027, alături de grupul nostru de inițiativă."
          />
          <VideoYouTube {...site.videoCandidatura} />
        </section>

        <section className="section container stack-lg" aria-labelledby="an-titlu">
          <SectionHeader
            id="an-titlu"
            eyebrow="Calendarul 2027"
            title="Un an întreg, lună de lună"
            lead="În fiecare lună se întâmplă ceva în comună. Iată câte un moment de reper pentru fiecare lună. Restul le găsești în calendar."
            action={
              <Link href="/calendar" className="btn btn--navy">
                Toate cele {activitati.length} de activități <Icon name="sageata" size={18} />
              </Link>
            }
          />
          <MobileCarousel as="ol" className="month-grid" label="Câte un moment de reper pentru fiecare lună" latime="62%">
            {repere.map((slug, i) => {
              const a = getActivitate(slug)!;
              const d = getDirectie(a.directie);
              return (
                <li key={slug}>
                  <Link href={`/calendar?luna=${i + 1}`} className="month-tile">
                    <span className="month-tile__head">
                      <span className="month-tile__name">{LUNI[i]}</span>
                      <span className="month-tile__count">{pluralActivitati(activitatiDinLuna(i + 1).length)}</span>
                    </span>
                    <span className="month-tile__title">{a.titlu}</span>
                    <span className="chip chip--sm month-tile__chip" style={{ background: d.culori.fundal, color: d.culori.text }}>
                      {d.nume}
                    </span>
                  </Link>
                </li>
              );
            })}
          </MobileCarousel>
        </section>

        <section className="band band--sky" aria-labelledby="inceput-titlu">
          <div className="section container stack-lg">
            <SectionHeader id="inceput-titlu" eyebrow="Toamna lui 2026" title="Am început deja" />
            <div className="story-grid">
              {evenimente.map((album) => (
                <Link key={album.slug} href={`/galerie/${album.slug}`} className="story-card" transitionTypes={["nav-forward"]}>
                  <div className="story-card__photos">
                    {album.foto.slice(0, 3).map((f, i) => (
                      <Image key={f.src} src={f.src} alt={f.alt} width={f.w} height={f.h} sizes={i === 0 ? "(max-width: 900px) 60vw, 300px" : "(max-width: 900px) 30vw, 150px"} />
                    ))}
                  </div>
                  <div className="story-card__body">
                    <span className="story-card__date">{detaliiAlbum(album)}</span>
                    <h3 className="h3">{album.titlu}</h3>
                    <p>{album.descriere}</p>
                    <span className="arrow-link">
                      Vezi albumul · {cuNumar(album.foto.length, "fotografie", "fotografii")} <Icon name="sageata" size={18} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section container stack-lg" aria-labelledby="directii-titlu">
          <SectionHeader
            id="directii-titlu"
            eyebrow="Ce vrem să schimbăm"
            title="Șapte direcții, o singură comunitate"
            lead="Fiecare activitate din calendar susține una dintre schimbările pe care ni le-am propus pentru comuna noastră."
          />
          <MobileCarousel className="auto-grid auto-grid--260" label="Cele șapte direcții" latime="80%">
            {directii.map((d) => {
              const lista = activitati.filter((a) => a.directie === d.id);
              return (
                <li key={d.id}>
                  <Link href={`/calendar?directie=${d.id}`} className="direction-card">
                    <span className="direction-card__top">
                      <span className="icon-tile" style={{ background: d.culori.fundal, color: d.culori.text }}>
                        <Icon name={d.icon} size={24} />
                      </span>
                      <span className="direction-card__count">{pluralActivitati(lista.length)}</span>
                    </span>
                    <span className="direction-card__name">{d.nume}</span>
                    <span className="direction-card__examples">
                      {lista
                        .slice(0, 3)
                        .map((a) => a.titlu.split(/: | „/)[0])
                        .join(" · ")}
                    </span>
                  </Link>
                </li>
              );
            })}
            <li>
              <Link href="/sat-european-2027" className="direction-card direction-card--navy">
                <span className="direction-card__name">De ce le-am ales și cum se leagă între ele</span>
                <span className="arrow-link text-sun">
                  Despre candidatura noastră <Icon name="sageata" size={18} />
                </span>
              </Link>
            </li>
          </MobileCarousel>
        </section>

        <section className="band band--white" aria-labelledby="echipa-titlu">
          <div className="section container stack-lg">
            <SectionHeader
              id="echipa-titlu"
              eyebrow="Grupul de inițiativă"
              title="Oamenii din spatele activităților"
              action={<ArrowLink href="/despre">Cunoaște echipa</ArrowLink>}
            />
            <MobileCarousel className="auto-grid auto-grid--200" label="Echipa" latime="56%">
              {echipa.map((m) => (
                <li key={m.foto}>
                  <figure className="team-mini">
                    <Image src={m.foto} alt={`Portret: ${m.nume}`} width={m.w} height={m.h} sizes="(max-width: 600px) 56vw, 230px" style={{ objectPosition: m.pozitie }} />
                    <figcaption>
                      <strong>{m.nume}</strong>
                      {m.rol ? <span>{m.rol}</span> : null}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </MobileCarousel>
          </div>
        </section>

        <section className="band band--navy" aria-labelledby="eyv-titlu">
          <div className="section container split">
            <div className="split__main stack">
              <span className="eyebrow text-sun">Satul European de Tineret 2027</span>
              <h2 id="eyv-titlu" className="h2">
                Comuna Cupșeni: finalistă pentru titlul de Sat European de Tineret
              </h2>
              <p className="lead lead--on-dark">
                Am propus un an cu {activitati.length} de activități pentru tinerii din cele patru sate ale comunei. Acum
                construim, pas cu pas, comunitatea în care vrem să rămânem.
              </p>
              <div>
                <Link href="/sat-european-2027" className="btn btn--sun btn--lg">
                  Află despre program <Icon name="sageata" />
                </Link>
              </div>
            </div>
            <div className="split__side logo-card logo-card--large">
              <Image src="/sigle/satul-european-de-tineret.png" alt="Satul European de Tineret" width={1572} height={585} />
              <hr />
              <Image src="/sigle/gen-european-youth-village.png" alt="GEN. European Youth Village" width={1020} height={285} className="logo-card__gen" />
            </div>
          </div>
        </section>

        <section className="section container stack-lg" aria-labelledby="galerie-titlu">
          <SectionHeader id="galerie-titlu" eyebrow="Galerie" title="Momente din comună" action={<ArrowLink href="/galerie">Toate albumele</ArrowLink>} />
          <MobileCarousel className="mosaic" label="Fotografii din comună" latime="78%">
            <li>
              <Image src="/foto/film/seara-014.jpg" alt="Publicul așezat în sală, la seara de film" width={1600} height={900} sizes="(max-width: 900px) 100vw, 600px" />
            </li>
            <li>
              <Image src="/foto/intalnire/portret-03b.jpg" alt="Ioana Bude, pe un deal însorit" width={900} height={1600} sizes="(max-width: 900px) 50vw, 300px" />
            </li>
            <li>
              <Image src="/foto/film/seara-039.jpg" alt="O tânără zâmbind la seara de film" width={900} height={1600} sizes="(max-width: 900px) 50vw, 300px" />
            </li>
            <li>
              <Image src="/foto/intalnire/portret-06b.jpg" alt="Alexandra Podina, în pădurea de mesteceni" width={900} height={1600} sizes="(max-width: 900px) 50vw, 300px" />
            </li>
          </MobileCarousel>
        </section>

        <section className="band band--green" aria-labelledby="implica-titlu">
          <div className="section container stack-lg">
            <SectionHeader
              id="implica-titlu"
              eyebrow="Implică-te"
              title="Toată munca din spate e făcută de voluntari."
              lead="Vino să dai o mână de ajutor la următorul eveniment sau propune tu o activitate pentru satul tău."
              action={
                <Link href="/implica-te" className="btn btn--white btn--lg">
                  Devino voluntar <Icon name="sageata" />
                </Link>
              }
            />
            <SocialLinks varianta="carduri" />
          </div>
        </section>
      </>
    </PageShell>
  );
}
