import Image from "next/image";
import Link from "next/link";
import { navigatie, parteneri, site } from "@/data/site";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="pattern-strip" aria-hidden="true" />
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <div className="site-footer__name">
            <Logo marime={64} />
          </div>
          <p>
            {site.numeScurt} este grupul de inițiativă al tinerilor din {site.sate.slice(0, -1).join(", ")} și {site.sate.at(-1)}, din
            Țara Lăpușului, județul Maramureș.
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
      <div className="container site-footer__anpc" aria-label="Protecția consumatorilor">
        <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="nofollow noopener noreferrer">
          <Image src="/anpc/anpc-sal.svg" alt="ANPC: Soluționarea alternativă a litigiilor" width={250} height={62} unoptimized />
        </a>
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="nofollow noopener noreferrer">
          <Image src="/anpc/anpc-sol.svg" alt="Soluționarea online a litigiilor" width={250} height={62} unoptimized />
        </a>
      </div>
      <div className="container site-footer__bottom">
        <span>© 2026 {site.nume} · Ocrotiți de Șatra lui Pintea</span>
        <span>{site.locatie}</span>
        <span className="site-footer__autor" lang="en">
          Made with <span role="img" aria-label="love">❤️</span> by{" "}
          <a href={site.autor.instagram} target="_blank" rel="noopener noreferrer">
            {site.autor.nume}
          </a>
        </span>
      </div>
    </footer>
  );
}
