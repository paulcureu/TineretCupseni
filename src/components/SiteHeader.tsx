import Link from "next/link";
import { Suspense } from "react";
import { navigatie, site } from "@/data/site";
import { Logo } from "./Logo";
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
        <Link href="/" className="brand" aria-label={`${site.numeScurt} — acasă`}>
          <Logo />
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
