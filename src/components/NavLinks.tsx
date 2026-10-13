"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigatie } from "@/data/site";
import { directieNavigare, esteActiv } from "@/lib/navigare";

export function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="site-nav__list">
      {navigatie.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="site-nav__link"
            aria-current={esteActiv(pathname, item.href) ? "page" : undefined}
            transitionTypes={directieNavigare(pathname, item.href)}
          >
            {item.eticheta}
          </Link>
        </li>
      ))}
    </ul>
  );
}
