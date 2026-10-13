import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { SectionHeader } from "@/components/ui";
import { albume } from "@/data/galerie";
import { site } from "@/data/site";
import { cuNumar } from "@/lib/luni";

export const metadata: Metadata = {
  title: "Galerie",
  description: "Fotografii de la activitățile tinerilor din comuna Cupșeni: prima întâlnire a echipei și prima seară de film.",
};

export default function GaleriePage() {
  return (
    <PageShell>
      <div className="container section stack-lg">
        <SectionHeader
          as="h1"
          eyebrow="Galerie"
          title="Momente din comună"
          lead={
            <>
              Fiecare activitate primește un album. Ai poze de la noi? Trimite-ni-le pe{" "}
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>{" "}
              sau{" "}
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
              .
            </>
          }
        />
        <ul className="album-list">
          {albume.map((album) => (
            <li key={album.slug}>
              <Link href={`/galerie/${album.slug}`} className="album-card" transitionTypes={["nav-forward"]}>
                <div className="album-card__cover">
                  <Image src={album.coperta.src} alt={album.coperta.alt} width={album.coperta.w} height={album.coperta.h} sizes="(max-width: 900px) 100vw, 580px" />
                </div>
                <div className="album-card__thumbs" aria-hidden="true">
                  {album.foto.slice(1, 5).map((f) => (
                    <Image key={f.src} src={f.src} alt="" width={f.w} height={f.h} sizes="140px" />
                  ))}
                </div>
                <div className="album-card__body">
                  <span className="album-card__meta">
                    {album.data} · {cuNumar(album.foto.length, "fotografie", "fotografii")}
                  </span>
                  <h2 className="h3">{album.titlu}</h2>
                  <p>{album.descriere}</p>
                  <span className="arrow-link">
                    Deschide albumul <Icon name="sageata" size={18} />
                  </span>
                </div>
              </Link>
            </li>
          ))}
          <li>
            <div className="album-card album-card--soon">
              <span className="icon-tile icon-tile--lg">
                <Icon name="poza" size={30} strokeWidth={1.8} />
              </span>
              <div className="album-card__body">
                <span className="album-card__meta">Ianuarie 2027 · în curând</span>
                <h2 className="h3">Ulița copilăriei — ediția de iarnă</h2>
                <p>Vino la săniuș și la jocurile de iarnă, iar pozele apar aici după eveniment.</p>
                <Link href="/activitati/ulita-copilariei" className="arrow-link">
                  Despre activitate <Icon name="sageata" size={18} />
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </PageShell>
  );
}
