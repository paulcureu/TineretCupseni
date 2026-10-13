"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import { directieNavigare, esteActiv } from "@/lib/navigare";
import { Icon, type IconName } from "../Icon";
import { useMenu } from "./MenuProvider";

const ELEMENTE: { href: string; eticheta: string; icon: IconName }[] = [
  { href: "/", eticheta: "Acasă", icon: "casa" },
  { href: "/calendar", eticheta: "Calendar", icon: "calendar" },
  { href: "/galerie", eticheta: "Galerie", icon: "poza" },
  { href: "/implica-te", eticheta: "Implică-te", icon: "inima" },
];

/** Bara de navigare de jos, doar pe telefon — la îndemâna degetului mare. */
export function MobileDock() {
  const pathname = usePathname();
  const { deschis, comuta, inchide } = useMenu();
  const [tastaturaDeschisa, setTastaturaDeschisa] = useState(false);

  // Cât timp scrii într-un formular, bara se retrage ca să nu acopere câmpurile.
  useEffect(() => {
    const esteCamp = (el: EventTarget | null) => el instanceof HTMLElement && el.matches("input:not([type=checkbox]):not([type=radio]), textarea, select");
    const laFocus = (e: FocusEvent) => setTastaturaDeschisa(esteCamp(e.target));
    const laBlur = () => setTastaturaDeschisa(false);
    document.addEventListener("focusin", laFocus);
    document.addEventListener("focusout", laBlur);
    return () => {
      document.removeEventListener("focusin", laFocus);
      document.removeEventListener("focusout", laBlur);
    };
  }, []);

  const indexActiv = ELEMENTE.findIndex((el) => esteActiv(pathname, el.href));
  // Paginile care nu au buton propriu (Despre, Satul European) sunt sub „Meniu”.
  const pozitie = deschis || indexActiv === -1 ? ELEMENTE.length : indexActiv;

  return (
    <nav className="dock" aria-label="Navigare rapidă" data-hidden={tastaturaDeschisa} style={{ viewTransitionName: "site-dock" }}>
      <div className="dock__inner" style={{ "--activ": pozitie } as CSSProperties}>
        <span className="dock__indicator" aria-hidden="true" />
        {ELEMENTE.map((el, i) => (
          <Link
            key={el.href}
            href={el.href}
            className="dock__item"
            data-activ={!deschis && i === indexActiv}
            aria-current={i === indexActiv ? "page" : undefined}
            transitionTypes={directieNavigare(pathname, el.href)}
            onClick={() => deschis && inchide({ faraFocus: true })}
          >
            <Icon name={el.icon} size={22} />
            <span>{el.eticheta}</span>
          </Link>
        ))}
        <button
          type="button"
          className="dock__item"
          data-activ={pozitie === ELEMENTE.length}
          aria-expanded={deschis}
          aria-controls="meniu-principal"
          onClick={(e) => comuta(e.currentTarget)}
        >
          <Icon name={deschis ? "inchide" : "meniu"} size={22} />
          <span>Meniu</span>
        </button>
      </div>
    </nav>
  );
}
