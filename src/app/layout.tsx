import type { Metadata, Viewport } from "next";
import { Poppins, Tinos } from "next/font/google";
import { Suspense } from "react";
import { MenuProvider } from "@/components/nav/MenuProvider";
import { MobileDock } from "@/components/nav/MobileDock";
import { MobileMenu } from "@/components/nav/MobileMenu";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/data/site";
import "./globals.css";

// Branding: titluri în Times New Roman, subtitluri în Poppins SemiBold, text în Poppins Light.
// Tinos are aceleași dimensiuni ca Times New Roman și e folosit doar unde Times lipsește (ex. Android).
const titluri = Tinos({
  variable: "--font-tinos",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  preload: false,
});

const text = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nume} — Satul European de Tineret 2027`,
    template: `%s · ${site.numeScurt}`,
  },
  description: site.descriere,
  applicationName: site.numeScurt,
  keywords: [
    "Tineret Cupșeni",
    "comuna Cupșeni",
    "Costeni",
    "Libotin",
    "Ungureni",
    "Țara Lăpușului",
    "Maramureș",
    "Sat European de Tineret 2027",
    "European Youth Village",
    "activități pentru tineri",
    "voluntariat",
  ],
  authors: [{ name: site.nume, url: site.url }],
  creator: site.autor.nume,
  publisher: site.nume,
  category: "community",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: site.nume,
  },
  appleWebApp: {
    title: site.numeScurt,
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#1A2E40",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ro" className={`${titluri.variable} ${text.variable}`} data-scroll-behavior="smooth">
      <body>
        <MenuProvider>
          <a href="#continut" className="skip-link">
            Sari la conținut
          </a>
          <SiteHeader />
          <main id="continut">{children}</main>
          <SiteFooter />
          <Suspense fallback={null}>
            <MobileMenu />
          </Suspense>
          <Suspense fallback={null}>
            <MobileDock />
          </Suspense>
        </MenuProvider>
      </body>
    </html>
  );
}
