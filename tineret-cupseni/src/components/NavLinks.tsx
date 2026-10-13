"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigatie } from "@/data/site";

export function esteActiv(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/calendar" && pathname.startsWith("/activitati")) return true;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="site-nav__list">
      {navigatie.map((item) => {
        const activ = esteActiv(pathname, item.href);
        return (
          <li key={item.href}>
            <Link href={item.href} className="site-nav__link" aria-current={activ ? "page" : undefined}>
              {item.eticheta}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
