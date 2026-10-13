import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AlbumGrid } from "@/components/AlbumGrid";
import { Icon } from "@/components/Icon";
import { PageSkeleton } from "@/components/ui";
import { getActivitate } from "@/data/activitati";
import { albume, getAlbum } from "@/data/galerie";
import { cuNumar } from "@/lib/luni";

export function generateStaticParams() {
  return albume.map((a) => ({ album: a.slug }));
}

export async function generateMetadata(props: PageProps<"/galerie/[album]">): Promise<Metadata> {
  const { album: slug } = await props.params;
  const album = getAlbum(slug);
  if (!album) return {};
  return {
    title: `${album.titlu} — Galerie`,
    description: album.descriere,
    openGraph: { images: [{ url: album.coperta.src, width: album.coperta.w, height: album.coperta.h, alt: album.coperta.alt }] },
  };
}

export default function AlbumPage(props: PageProps<"/galerie/[album]">) {
  return (
    <PageShell>
      <Suspense fallback={<PageSkeleton />}>
        <Album params={props.params} />
      </Suspense>
    </PageShell>
  );
}

async function Album({ params }: { params: Promise<{ album: string }> }) {
  const { album: slug } = await params;
  const album = getAlbum(slug);
  if (!album) notFound();
  const activitate = album.activitate ? getActivitate(album.activitate) : undefined;

  return (
    <div className="container section section--tight stack-lg">
      <nav aria-label="Ești aici" className="breadcrumb">
        <Link href="/galerie" transitionTypes={["nav-back"]}>
          Galerie
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{album.titlu}</span>
      </nav>
      <div className="section-header">
        <div className="section-header__text">
          <span className="eyebrow">
            {album.data} · {cuNumar(album.foto.length, "fotografie", "fotografii")}
          </span>
          <h1 className="h1">{album.titlu}</h1>
          <p className="lead">{album.descriere}</p>
        </div>
        <div className="section-header__action button-row">
          {activitate ? (
            <Link href={`/activitati/${activitate.slug}`} className="btn btn--outline">
              Despre activitate
            </Link>
          ) : null}
          {album.link ? (
            <a href={album.link.href} className="btn btn--navy" target="_blank" rel="noopener noreferrer">
              {album.link.eticheta} <Icon name="extern" size={18} />
            </a>
          ) : null}
        </div>
      </div>
      <AlbumGrid foto={album.foto} titlu={album.titlu} />
    </div>
  );
}
