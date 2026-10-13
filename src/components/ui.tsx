import Link from "next/link";
import type { ReactNode } from "react";
import type { Activitate } from "@/data/activitati";
import { getDirectie, type Directie } from "@/data/directii";
import { formateazaLuni } from "@/lib/luni";
import { Icon } from "./Icon";

export function SectionHeader({
  id,
  eyebrow,
  title,
  lead,
  action,
  as: Heading = "h2",
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <div className="section-header">
      <div className="section-header__text">
        <span className="eyebrow">{eyebrow}</span>
        <Heading id={id} className={Heading === "h1" ? "h1" : "h2"}>
          {title}
        </Heading>
        {lead ? <p className="lead">{lead}</p> : null}
      </div>
      {action ? <div className="section-header__action">{action}</div> : null}
    </div>
  );
}

export function ArrowLink({ href, children, className = "arrow-link" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={className}>
      {children}
      <Icon name="sageata" size={18} />
    </Link>
  );
}

export function DirectieChip({ directie, mic = false }: { directie: Directie; mic?: boolean }) {
  return (
    <span
      className={mic ? "chip chip--sm" : "chip"}
      style={{ background: directie.culori.fundal, color: directie.culori.text }}
    >
      <span className="chip__dot" style={{ background: directie.culori.punct }} aria-hidden="true" />
      {directie.nume}
    </span>
  );
}

export function ActivityCard({ activitate }: { activitate: Activitate }) {
  const directie = getDirectie(activitate.directie);
  return (
    <article className="activity-card">
      <div className="activity-card__top">
        <DirectieChip directie={directie} mic />
        <span className="activity-card__nr">#{String(activitate.nr).padStart(2, "0")}</span>
      </div>
      <h3 className="activity-card__title">
        <Link href={`/activitati/${activitate.slug}`} className="stretched-link">
          {activitate.titlu}
        </Link>
      </h3>
      <p className="activity-card__desc">{activitate.descriere}</p>
      <div className="activity-card__footer">
        <span className="activity-card__when">
          <Icon name="calendar" size={16} />
          {formateazaLuni(activitate.luni)}
        </span>
        <span className="activity-card__more" aria-hidden="true">
          Detalii <Icon name="sageata" size={16} />
        </span>
      </div>
    </article>
  );
}

/** Schelet afișat cât timp se încarcă o pagină care depinde de URL. */
export function PageSkeleton() {
  return (
    <div className="container section section--tight skeleton" aria-busy="true" aria-live="polite">
      <span className="visually-hidden">Se încarcă…</span>
      <div className="skeleton__line skeleton__line--short" />
      <div className="skeleton__line skeleton__line--title" />
      <div className="skeleton__line" />
      <div className="skeleton__block" />
    </div>
  );
}

export function StatTile({ numar, children }: { numar: number; children: ReactNode }) {
  return (
    <div className="stat-tile">
      <span className="stat-tile__nr">{numar}</span>
      <span className="stat-tile__label">{children}</span>
    </div>
  );
}
