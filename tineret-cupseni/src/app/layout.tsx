import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/data/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
});

const body = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nume} — Satul European de Tineret 2027`,
    template: `%s · ${site.numeScurt}`,
  },
  description: site.descriere,
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: site.nume,
  },
};

export const viewport: Viewport = {
  themeColor: "#14213D",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ro" className={`${display.variable} ${body.variable}`} data-scroll-behavior="smooth">
      <body>
        <a href="#continut" className="skip-link">
          Sari la conținut
        </a>
        <SiteHeader />
        <main id="continut">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
