import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { CalendarDinUrl, CalendarExplorer } from "@/components/CalendarExplorer";
import { Icon } from "@/components/Icon";
import { activitati } from "@/data/activitati";
import { directii } from "@/data/directii";
import { detaliiAlbum, evenimente } from "@/data/galerie";
import { metadatePagina } from "@/lib/seo";

export const metadata: Metadata = metadatePagina({
  titlu: "Calendarul activităților 2027",
  descriere: `Toate cele ${activitati.length} de activități din 2027, lună de lună: ateliere, sport, tradiții, seri de film și multe altele în comuna Cupșeni.`,
  cale: "/calendar",
});

export default function CalendarPage() {
  return (
    <PageShell>
      <>
        <section className="page-hero" aria-labelledby="cal-titlu">
          <div className="container page-hero__inner">
            <div className="stack">
              <span className="eyebrow text-sun">Satul European de Tineret 2027</span>
              <h1 id="cal-titlu" className="display display--md">
                Calendarul activităților 2027
              </h1>
              <p className="hero__lead">
                {activitati.length} de activități, 12 luni, 4 sate. Alege o lună sau o direcție și vezi ce se întâmplă în comună.
              </p>
            </div>
            <div className="mini-stats">
              <div>
                <strong>{activitati.length}</strong>
                <span>activități</span>
              </div>
              <div>
                <strong>12</strong>
                <span>luni</span>
              </div>
              <div>
                <strong>{directii.length}</strong>
                <span>direcții</span>
              </div>
            </div>
          </div>
        </section>
        <div className="pattern-strip" aria-hidden="true" />

        <div className="container section section--tight stack-lg">
          <section className="past-strip" aria-label="Activități care au avut loc">
            <span className="past-strip__label">Am început deja</span>
            {evenimente.map((album) => (
              <Link key={album.slug} href={`/galerie/${album.slug}`} className="past-strip__item" transitionTypes={["nav-forward"]}>
                <Image src={album.coperta.src} alt="" width={album.coperta.w} height={album.coperta.h} sizes="56px" />
                <span>
                  <strong>{album.titlu}</strong>
                  <small>{detaliiAlbum(album)}</small>
                </span>
              </Link>
            ))}
          </section>

          <Suspense fallback={<CalendarExplorer />}>
            <CalendarDinUrl />
          </Suspense>

          <section className="cta-panel" aria-labelledby="ajuta-titlu">
            <div className="stack">
              <h2 id="ajuta-titlu" className="h3">
                Vrei să ajuți la una dintre activități?
              </h2>
              <p>Spune-ne ce te interesează și te anunțăm când avem nevoie de tine. Poți să propui și o activitate nouă pentru satul tău.</p>
            </div>
            <Link href="/implica-te" className="btn btn--white btn--lg">
              Devino voluntar <Icon name="sageata" />
            </Link>
          </section>
        </div>
      </>
    </PageShell>
  );
}
