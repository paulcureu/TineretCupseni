// Ordinea secțiunilor, folosită ca tranzițiile să alunece în direcția corectă:
// spre dreapta în meniu = înainte, spre stânga = înapoi.
const ORDINE = ["/", "/despre", "/calendar", "/galerie", "/sat-european-2027", "/implica-te"];

/** Secțiunea din meniu căreia îi aparține o adresă (ex. /activitati/x → /calendar). */
export function sectiune(pathname: string): string {
  if (pathname.startsWith("/activitati")) return "/calendar";
  return ORDINE.findLast((href) => href !== "/" && (pathname === href || pathname.startsWith(`${href}/`))) ?? "/";
}

export function esteActiv(pathname: string, href: string): boolean {
  return sectiune(pathname) === href;
}

/** Tipul de tranziție pentru o navigare din meniu. */
export function directieNavigare(pathname: string, href: string): string[] {
  const deLa = ORDINE.indexOf(sectiune(pathname));
  const spre = ORDINE.indexOf(href);
  if (deLa === spre) return pathname === href ? [] : ["nav-back"];
  return [spre > deLa ? "nav-forward" : "nav-back"];
}
