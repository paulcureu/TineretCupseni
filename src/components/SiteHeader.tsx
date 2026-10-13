import Link from "next/link";
import { Suspense } from "react";
import { navigatie, site } from "@/data/site";
import { Emblem } from "./Emblem";
import { MenuToggle } from "./nav/MenuToggle";
import { ScrollHeader } from "./nav/ScrollHeader";
import { NavLinks } from "./NavLinks";

function NavLinksFaraStare() {
  return (
    <ul className="site-nav__list">
      {navigatie.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="site-nav__link">
            {item.eticheta}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SiteHeader() {
  return (
    <ScrollHeader>
      <div className="container site-header__inner">
        <Link href="/" className="brand">
          <Emblem id="antet" />
          <span className="brand__text">
            <span className="brand__name">{site.numeScurt}</span>
            <span className="brand__tagline">{site.slogan}</span>
          </span>
        </Link>
        <nav aria-label="Navigare principală" className="site-nav">
          <Suspense fallback={<NavLinksFaraStare />}>
            <NavLinks />
          </Suspense>
          <Link href="/implica-te" className="btn btn--sun btn--sm">
            Implică-te
          </Link>
        </nav>
        <MenuToggle />
      </div>
    </ScrollHeader>
  );
}
