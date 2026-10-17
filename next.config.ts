import type { NextConfig } from "next";

// Când site-ul are un domeniu propriu (NEXT_PUBLIC_SITE_URL), adresa .vercel.app trimite
// vizitatorii și pe Google acolo, ca să existe o singură adresă în rezultatele căutării.
const domeniu = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const ADRESA_VERCEL = "tineret-cupseni.vercel.app";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    if (!domeniu || domeniu.includes(ADRESA_VERCEL)) return [];
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: ADRESA_VERCEL }],
        destination: `${domeniu}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
