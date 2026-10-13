"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { navigatie } from "@/data/site";
import { Icon } from "./Icon";
import { esteActiv } from "./NavLinks";

export function MobileMenu() {
  const pathname = usePathname();
  const [deschis, setDeschis] = useState(false);
  const [pathDeschidere, setPathDeschidere] = useState(pathname);
  const panouId = useId();

  // Meniul se închide singur când se schimbă pagina.
  if (deschis && pathDeschidere !== pathname) {
    setDeschis(false);
  }

  useEffect(() => {
    if (!deschis) return;
    const laTasta = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDeschis(false);
    };
    window.addEventListener("keydown", laTasta);
    return () => window.removeEventListener("keydown", laTasta);
  }, [deschis]);

  return (
    <div className="mobile-menu">
      <button
        type="button"
        className="mobile-menu__toggle"
        aria-expanded={deschis}
        aria-controls={panouId}
        aria-label={deschis ? "Închide meniul" : "Deschide meniul"}
        onClick={() => {
          setPathDeschidere(pathname);
          setDeschis((d) => !d);
        }}
      >
        <Icon name={deschis ? "inchide" : "meniu"} size={22} />
      </button>
      <nav id={panouId} aria-label="Navigare principală" className="mobile-menu__panel" hidden={!deschis}>
        <ul>
          {navigatie.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="mobile-menu__link"
                aria-current={esteActiv(pathname, item.href) ? "page" : undefined}
                onClick={() => setDeschis(false)}
              >
                {item.eticheta}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/implica-te" className="btn btn--sun btn--block" onClick={() => setDeschis(false)}>
          Implică-te
        </Link>
      </nav>
    </div>
  );
}
