import Image from "next/image";
import Link from "next/link";
import { navigatie, parteneri, site } from "@/data/site";
import { Emblem } from "./Emblem";
import { SocialLinks } from "./SocialLinks";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="pattern-strip" aria-hidden="true" />
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <div className="site-footer__name">
            <Emblem id="subsol" size={60} />
            <span>{site.nume}</span>
          </div>
          <p>
            Grupul de inițiativă al tinerilor din {site.sate.slice(0, -1).join(", ")} și {site.sate.at(-1)} — Țara
            Lăpușului, județul Maramureș.
          </p>
          <SocialLinks varianta="iconite" />
        </div>
        <nav aria-label="Navigare în subsol" className="site-footer__nav">
          <span className="site-footer__label">Site</span>
          {navigatie.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.eticheta}
            </Link>
          ))}
          <Link href="/implica-te">Implică-te</Link>
        </nav>
        <div className="site-footer__program">
          <span className="site-footer__label">Finaliști în programul</span>
          <div className="logo-card">
            <Image src="/sigle/satul-european-de-tineret.png" alt="Satul European de Tineret" width={1572} height={585} className="logo-card__satul" />
            <Image src="/sigle/gen-european-youth-village.png" alt="GEN. European Youth Village" width={1020} height={285} className="logo-card__gen" />
          </div>
          <span className="site-footer__label">Cu sprijinul</span>
          <p className="site-footer__parteneri">{parteneri.map((p) => p.nume).join(" · ")}</p>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <span>© 2026 {site.nume} · Ocrotiți de Șatra lui Pintea</span>
        <span>{site.locatie}</span>
      </div>
    </footer>
  );
}
