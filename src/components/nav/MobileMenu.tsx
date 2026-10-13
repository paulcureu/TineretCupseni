"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { navigatie, site } from "@/data/site";
import { CU_MISCARE, gsap, useGSAP } from "@/lib/gsap";
import { directieNavigare, esteActiv } from "@/lib/navigare";
import { Logo } from "../Logo";
import { Icon } from "../Icon";
import { SocialLinks } from "../SocialLinks";
import { useMenu } from "./MenuProvider";

const LINKURI = [...navigatie, { href: "/implica-te", eticheta: "Implică-te" }];

/** Meniul pe tot ecranul (telefon și tabletă), deschis din antet sau din bara de jos. */
export function MobileMenu() {
  const pathname = usePathname();
  const { deschis, origine, inchide } = useMenu();
  const foaie = useRef<HTMLDivElement>(null);
  const primaDeschidere = useRef(true);

  useGSAP(
    () => {
      const el = foaie.current;
      if (!el) return;
      if (primaDeschidere.current && !deschis) return;
      primaDeschidere.current = false;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = origine?.x ?? w - 40;
      const y = origine?.y ?? 40;
      const raza = Math.hypot(Math.max(x, w - x), Math.max(y, h - y));
      const mm = gsap.matchMedia();

      // Vizibil imediat, ca focusul să poată intra în meniu înainte de animație.
      if (deschis) gsap.set(el, { visibility: "visible" });

      mm.add(CU_MISCARE, () => {
        if (deschis) {
          gsap
            .timeline()
            .fromTo(el, { clipPath: `circle(0px at ${x}px ${y}px)` }, { clipPath: `circle(${raza}px at ${x}px ${y}px)`, duration: 0.6, ease: "power3.inOut" })
            .from(".menu-sheet__item", { y: 40, opacity: 0, duration: 0.55, stagger: 0.05, ease: "power3.out" }, 0.18)
            .from(".menu-sheet__foot > *", { y: 20, opacity: 0, duration: 0.45, stagger: 0.06, ease: "power3.out" }, 0.35)
            .set(el, { clipPath: "none" });
        } else {
          gsap
            .timeline()
            .to(el, { clipPath: `circle(0px at ${x}px ${y}px)`, duration: 0.42, ease: "power3.inOut" })
            .set(el, { visibility: "hidden", clipPath: "none" });
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, { visibility: deschis ? "visible" : "hidden", clipPath: "none" });
      });

      if (deschis) {
        el.querySelector<HTMLElement>(".menu-sheet__close")?.focus({ preventScroll: true });
      }
    },
    { dependencies: [deschis], scope: foaie },
  );

  return (
    <div
      ref={foaie}
      id="meniu-principal"
      className="menu-sheet"
      role="dialog"
      aria-modal="true"
      aria-label="Meniu"
      aria-hidden={!deschis}
      inert={!deschis}
    >
      <div className="menu-sheet__top">
        <Link href="/" className="brand" onClick={() => inchide({ faraFocus: true })} transitionTypes={directieNavigare(pathname, "/")}>
          <Logo marime={46} />
        </Link>
        <button type="button" className="menu-sheet__close" onClick={() => inchide()} aria-label="Închide meniul">
          <Icon name="inchide" size={22} />
        </button>
      </div>

      <nav aria-label="Navigare principală" className="menu-sheet__nav">
        <ol>
          {LINKURI.map((item, i) => {
            const activ = esteActiv(pathname, item.href);
            return (
              <li key={item.href} className="menu-sheet__item">
                <Link
                  href={item.href}
                  className="menu-sheet__link"
                  aria-current={activ ? "page" : undefined}
                  transitionTypes={directieNavigare(pathname, item.href)}
                  onClick={() => inchide({ faraFocus: true })}
                >
                  <span className="menu-sheet__nr">{String(i + 1).padStart(2, "0")}</span>
                  <span className="menu-sheet__label">{item.eticheta}</span>
                  <Icon name="sageata" size={22} className="menu-sheet__arrow" />
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="menu-sheet__foot">
        <SocialLinks varianta="iconite" />
        <p>
          {site.sate.join(" · ")}
          <br />
          Țara Lăpușului, Maramureș
        </p>
      </div>
      <div className="pattern-strip" aria-hidden="true" />
    </div>
  );
}
