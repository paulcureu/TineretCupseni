/* eslint-disable @next/next/no-img-element -- next/og (Satori) desenează imaginile doar din <img>. */
import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { site } from "@/data/site";

// Imaginile care apar lângă link pe WhatsApp, Facebook, Messenger, LinkedIn, X etc.
// Sunt desenate cu fonturile și culorile din branding și salvate ca JPEG, ca să fie mici
// (WhatsApp nu afișează imagini prea mari). Se generează o singură dată, la build.

export const MARIME_OG = { width: 1200, height: 630 };
export const TIP_OG = "image/jpeg";

const CULORI = {
  navy: "#1A2E40",
  navyInchis: "#14243A",
  sun: "#E89D35",
  paper: "#F9F8F6",
  text: "#C9D3DE",
};

const radacina = process.cwd();

const [tinos, tinosBold, poppinsLight, poppinsSemiBold, poppinsBold, simbol] = await Promise.all([
  readFile(join(radacina, "assets/fonts/Tinos-Regular.ttf")),
  readFile(join(radacina, "assets/fonts/Tinos-Bold.ttf")),
  readFile(join(radacina, "assets/fonts/Poppins-Light.ttf")),
  readFile(join(radacina, "assets/fonts/Poppins-SemiBold.ttf")),
  readFile(join(radacina, "assets/fonts/Poppins-Bold.ttf")),
  readFile(join(radacina, "public/brand/simbol.svg")),
]);

const fonturi = [
  { name: "Tinos", data: tinos, weight: 400 as const, style: "normal" as const },
  { name: "Tinos", data: tinosBold, weight: 700 as const, style: "normal" as const },
  { name: "Poppins", data: poppinsLight, weight: 300 as const, style: "normal" as const },
  { name: "Poppins", data: poppinsSemiBold, weight: 600 as const, style: "normal" as const },
  { name: "Poppins", data: poppinsBold, weight: 700 as const, style: "normal" as const },
];

async function simbolPng(marime: number) {
  const png = await sharp(simbol, { density: 600 }).resize(marime, marime, { fit: "contain", background: "#00000000" }).png().toBuffer();
  return `data:image/png;base64,${png.toString("base64")}`;
}

/** Decupează fotografia pentru cadru. La pozele înalte (portrete) păstrează partea de sus, unde e fața. */
async function fotografie(cale: string, latime: number, inaltime: number) {
  const sursa = await readFile(join(radacina, "public", cale));
  const { width: w = latime, height: h = inaltime } = await sharp(sursa).metadata();
  const raport = latime / inaltime;
  let decupaj = { left: 0, top: 0, width: w, height: h };
  if (w / h > raport) {
    const lat = Math.round(h * raport);
    decupaj = { left: Math.round((w - lat) / 2), top: 0, width: lat, height: h };
  } else {
    const inalt = Math.round(w / raport);
    const sus = Math.min(Math.max(Math.round(h * 0.32 - inalt / 2), 0), h - inalt);
    decupaj = { left: 0, top: sus, width: w, height: inalt };
  }
  const jpg = await sharp(sursa).extract(decupaj).resize(latime, inaltime).jpeg({ quality: 90 }).toBuffer();
  return `data:image/jpeg;base64,${jpg.toString("base64")}`;
}

function marimeTitlu(text: string, cuFoto: boolean) {
  const n = text.length;
  if (cuFoto) return n <= 22 ? 68 : n <= 40 ? 58 : n <= 60 ? 50 : 44;
  return n <= 28 ? 80 : n <= 48 ? 68 : n <= 72 ? 58 : 50;
}

export type OptiuniOG = {
  /** Rândul mic, portocaliu, de deasupra titlului. */
  eticheta: string;
  titlu: string;
  /** Un al doilea rând al titlului, în portocaliu (de ex. „Cupșeni”). */
  titluEvidentiat?: string;
  subtitlu?: string;
  /** Fotografie din `public/` (de ex. „/foto/…jpg”), afișată în dreapta. Fără ea, în dreapta apare logo-ul mare. */
  foto?: string;
  /** Culoarea punctului de lângă etichetă (de ex. culoarea direcției). */
  accent?: string;
};

export async function imagineOG(optiuni: OptiuniOG): Promise<Response> {
  const jpeg = await deseneaza(optiuni);
  return new Response(jpeg, { headers: { "Content-Type": TIP_OG } });
}

async function deseneaza({ eticheta, titlu, titluEvidentiat, subtitlu, foto, accent = CULORI.sun }: OptiuniOG): Promise<Uint8Array<ArrayBuffer>> {
  "use cache";
  cacheLife("max");

  const cuFoto = Boolean(foto);
  const [logoMic, vizual] = await Promise.all([
    simbolPng(120),
    foto ? fotografie(foto, 500, 375) : simbolPng(400),
  ]);
  const marime = marimeTitlu(titluEvidentiat ? `${titlu} ${titluEvidentiat}` : titlu, cuFoto);

  const imagine = new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: CULORI.navy, fontFamily: "Poppins" }}>
        <div style={{ display: "flex", flex: 1, padding: "56px 72px 0", gap: 48, position: "relative" }}>
          {/* Soarele din logo, în colțul din dreapta-sus. */}
          <div
            style={{
              position: "absolute",
              top: cuFoto ? 22 : -150,
              right: cuFoto ? 40 : -110,
              width: cuFoto ? 230 : 560,
              height: cuFoto ? 230 : 560,
              borderRadius: 999,
              background: CULORI.sun,
              opacity: cuFoto ? 1 : 0.95,
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, color: CULORI.sun, fontSize: 22, fontWeight: 600, letterSpacing: 2.5, textTransform: "uppercase" }}>
              <div style={{ width: 14, height: 14, borderRadius: 999, background: accent, border: `2px solid ${CULORI.sun}` }} />
              {eticheta}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 22,
                fontFamily: "Tinos",
                fontWeight: 700,
                fontSize: marime,
                lineHeight: 1.06,
                color: "#FFFFFF",
              }}
            >
              <span>{titlu}</span>
              {titluEvidentiat ? <span style={{ color: CULORI.sun }}>{titluEvidentiat}</span> : null}
            </div>
            {subtitlu ? (
              <div style={{ display: "flex", marginTop: 26, fontSize: 27, fontWeight: 300, lineHeight: 1.35, color: CULORI.text }}>{subtitlu}</div>
            ) : null}
          </div>

          {cuFoto ? (
            <div style={{ display: "flex", alignItems: "center", paddingTop: 30 }}>
              <img
                src={vizual}
                width={500}
                height={375}
                alt=""
                style={{ borderRadius: 28, border: "8px solid #FFFFFF", boxShadow: "0 24px 50px rgba(0,0,0,0.35)" }}
              />
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 340 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 320,
                  height: 320,
                  borderRadius: 999,
                  background: CULORI.paper,
                  boxShadow: "0 24px 50px rgba(0,0,0,0.3)",
                }}
              >
                <img src={vizual} width={250} height={250} alt="" />
              </div>
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 72px", height: 128 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 72, height: 72, borderRadius: 999, background: CULORI.paper }}>
              <img src={logoMic} width={56} height={56} alt="" />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: "Tinos", fontWeight: 400, fontSize: 38, lineHeight: 1, color: "#FFFFFF" }}>Tineret</span>
              {/* Ca în logo: literele din „CUPȘENI” se întind pe toată lățimea lui „Tineret”. */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 18, color: CULORI.sun }}>
                {[..."CUPȘENI"].map((litera, i) => (
                  <span key={i}>{litera}</span>
                ))}
              </div>
            </div>
          </div>
          <span style={{ fontSize: 22, fontWeight: 300, color: CULORI.text }}>{new URL(site.url).host}</span>
        </div>
        <div style={{ display: "flex", height: 12, background: CULORI.sun }} />
      </div>
    ),
    { ...MARIME_OG, fonts: fonturi },
  );

  const png = Buffer.from(await imagine.arrayBuffer());
  const jpeg = await sharp(png).jpeg({ quality: 84, progressive: true, mozjpeg: true }).toBuffer();
  return new Uint8Array(jpeg);
}
