import type { Metadata } from "next";
import { MobileCarousel } from "@/components/MobileCarousel";
import { PageShell } from "@/components/PageShell";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Icon } from "@/components/Icon";
import { ActivityCard, DirectieChip, PageSkeleton } from "@/components/ui";
import { activitati, getActivitate } from "@/data/activitati";
import { getDirectie } from "@/data/directii";
import { getAlbum } from "@/data/galerie";
import { site } from "@/data/site";
import { AN_PROGRAM, cuNumar, formateazaLuni, LUNI_ABREVIATE } from "@/lib/luni";
import { JsonLd } from "@/components/JsonLd";
import { firNavigare, metadatePagina } from "@/lib/seo";

export function generateStaticParams() {
  return activitati.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: PageProps<"/activitati/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const a = getActivitate(slug);
  if (!a) return {};
  return metadatePagina({
    titlu: a.titlu,
    descriere: `${a.descriere} ${formateazaLuni(a.luni)}, comuna Cupșeni.`,
    cale: `/activitati/${a.slug}`,
  });
}

export default function ActivitatePage(props: PageProps<"/activitati/[slug]">) {
  return (
    <PageShell>
      <Suspense fallback={<PageSkeleton />}>
        <Activitate params={props.params} />
      </Suspense>
    </PageShell>
  );
}

async function Activitate({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getActivitate(slug);
  if (!a) notFound();

  const directie = getDirectie(a.directie);
  const editie = a.editii?.[0];
  const album = editie ? getAlbum(editie.album) : undefined;
  const inrudite = activitati.filter((x) => x.directie === a.directie && x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        date={firNavigare([
          { nume: `Calendar ${AN_PROGRAM}`, cale: "/calendar" },
          { nume: a.titlu, cale: `/activitati/${a.slug}` },
        ])}
      />
      <div className="container section section--tight stack-lg">
        <nav aria-label="Ești aici" className="breadcrumb">
          <Link href="/calendar" transitionTypes={["nav-back"]}>
            Calendar {AN_PROGRAM}
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={`/calendar?directie=${directie.id}`} transitionTypes={["nav-back"]}>
            {directie.nume}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{a.titlu}</span>
        </nav>

        <div className="split split--top">
          <div className="split__main stack">
            <div className="chip-row">
              <DirectieChip directie={directie} />
              <span className="chip chip--neutral">
                Activitatea #{String(a.nr).padStart(2, "0")} din {activitati.length}
              </span>
            </div>
            <h1 className="display display--md display--ink">{a.titlu}</h1>
            <p className="lead">{a.descriere}</p>
            <dl className="info-grid">
              <div>
                <dt>Când</dt>
                <dd>{formateazaLuni(a.luni)}</dd>
              </div>
              <div>
                <dt>Direcția</dt>
                <dd>
                  {directie.cod} · {directie.nume}
                </dd>
              </div>
              <div className="info-grid__wide">
                <dt>Data exactă și locul</dt>
                <dd>Le anunțăm pe Facebook și Instagram înainte de fiecare activitate.</dd>
              </div>
            </dl>
            <div className="button-row">
              <Link href="/implica-te" className="btn btn--sun btn--lg">
                Vreau să ajut <Icon name="sageata" />
              </Link>
              <a href={site.social.instagram} className="btn btn--outline btn--lg" target="_blank" rel="noopener noreferrer">
                <Icon name="instagram" /> Urmărește anunțurile
              </a>
            </div>
          </div>

          <div className="split__side">
            {album ? (
              <div className="collage">
                {album.foto.slice(0, 3).map((f, i) => (
                  <Image key={f.src} src={f.src} alt={f.alt} width={f.w} height={f.h} sizes={i === 0 ? "(max-width: 900px) 60vw, 320px" : "(max-width: 900px) 40vw, 220px"} loading={i === 0 ? "eager" : "lazy"} />
                ))}
              </div>
            ) : (
              <div className="activity-art" style={{ background: directie.culori.fundal, color: directie.culori.text }}>
                <Icon name={directie.icon} size={120} strokeWidth={1.4} />
                <span>{directie.nume}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="band band--navy" aria-labelledby="luni-titlu">
        <div className="container section section--tight stack">
          <div className="calendar__heading">
            <h2 id="luni-titlu" className="h3">
              {a.luni.length === 12 ? "În fiecare lună din 2027" : a.luni.length === 1 ? "O singură dată în 2027" : `${a.luni.length} luni în 2027`}
            </h2>
            <span className="muted-on-dark">{formateazaLuni(a.luni)}</span>
          </div>
          <ol className="months-strip">
            {LUNI_ABREVIATE.map((abr, i) => (
              <li key={abr} data-activ={a.luni.includes(i + 1) || undefined}>
                {abr}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {a.ce.length > 0 ? (
        <section className="container section" aria-labelledby="ce-titlu">
          <div className="split split--top">
            <div className="split__main stack">
              <span className="eyebrow">Ce facem</span>
              <h2 id="ce-titlu" className="h2">
                Pe scurt
              </h2>
            </div>
            <ul className="check-list split__side">
              {a.ce.map((item) => (
                <li key={item}>
                  <span className="check-list__icon" style={{ background: directie.culori.fundal, color: directie.culori.text }}>
                    <Icon name="bifa" size={18} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {editie && album ? (
        <section className="band band--white" aria-labelledby="editie-titlu">
          <div className="container section stack-lg">
            <div className="section-header">
              <div className="section-header__text">
                <span className="eyebrow">Am început deja · {editie.data}</span>
                <h2 id="editie-titlu" className="h2">
                  {editie.titlu}
                </h2>
                <p className="lead">{editie.text}</p>
              </div>
              <div className="section-header__action">
                <Link href={`/galerie/${album.slug}`} className="btn btn--navy" transitionTypes={["nav-forward"]}>
                  Albumul complet · {cuNumar(album.foto.length, "fotografie", "fotografii")} <Icon name="sageata" size={18} />
                </Link>
              </div>
            </div>
            <div className="photo-row">
              {album.foto.slice(3, 9).map((f) => (
                <Image key={f.src} src={f.src} alt={f.alt} width={f.w} height={f.h} sizes="(max-width: 600px) 50vw, 200px" />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {inrudite.length > 0 ? (
        <section className="container section" aria-labelledby="inrudite-titlu">
          <div className="section-header">
            <div className="section-header__text">
              <h2 id="inrudite-titlu" className="h2">
                Tot din „{directie.nume}”
              </h2>
            </div>
            <div className="section-header__action">
              <Link href="/calendar" className="arrow-link" transitionTypes={["nav-back"]}>
                Înapoi la calendar <Icon name="sageata" size={18} />
              </Link>
            </div>
          </div>
          <MobileCarousel className="auto-grid auto-grid--300" label="Activități înrudite" latime="86%">
            {inrudite.map((x) => (
              <li key={x.slug}>
                <ActivityCard activitate={x} />
              </li>
            ))}
          </MobileCarousel>
        </section>
      ) : null}
    </>
  );
}
