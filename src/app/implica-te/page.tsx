import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Icon, type IconName } from "@/components/Icon";
import { SocialLinks } from "@/components/SocialLinks";
import { SectionHeader } from "@/components/ui";
import { VolunteerForm } from "@/components/VolunteerForm";
import { activitati } from "@/data/activitati";
import { parteneri, site } from "@/data/site";
import { metadatePagina } from "@/lib/seo";

export const metadata: Metadata = metadatePagina({
  titlu: "Implică-te",
  descriere: "Devino voluntar, intră în grupul de inițiativă, propune o activitate sau sprijină-ne ca partener. Tinerii din comuna Cupșeni.",
  cale: "/implica-te",
});

const moduri: { titlu: string; text: string; icon: IconName; fundal: string; culoare: string }[] = [
  { titlu: "Voluntar la evenimente", text: "Montăm, primim oaspeții, facem poze, strângem după.", icon: "inima", fundal: "#E3EFE5", culoare: "#1E3F1A" },
  { titlu: "Grupul de inițiativă", text: "Vino la întâlnirea lunară și decide cu noi ce facem.", icon: "oameni", fundal: "#E1E7F2", culoare: "#1A2E40" },
  { titlu: "Propune o activitate", text: "Ai o idee pentru satul tău? Te ajutăm s-o transformi în proiect.", icon: "bec", fundal: "#FDEBD0", culoare: "#7A4300" },
  { titlu: "Partener sau sponsor", text: "Un spațiu, produse locale, echipament sau sprijin pentru o seară.", icon: "casa", fundal: "#F5E3E3", culoare: "#7E2122" },
];

export default function ImplicaPage() {
  return (
    <PageShell>
      <>
        <section className="band band--green" aria-labelledby="impl-titlu">
          <div className="container section section--tight stack-lg">
            <div className="section-header section-header--split">
              <div className="section-header__text">
                <span className="eyebrow eyebrow--on-green">Implică-te</span>
                <h1 id="impl-titlu" className="display display--md">
                  Toată munca din spate e făcută de voluntari.
                </h1>
              </div>
              <p className="lead lead--on-green section-header__aside">
                Ai o oră liberă, o idee sau o pasiune? În 2027 avem {activitati.length} de activități și e loc pentru oricine vrea să ajute.
              </p>
            </div>
            <ul className="auto-grid auto-grid--240">
              {moduri.map((m) => (
                <li key={m.titlu} className="way-card">
                  <span className="icon-tile icon-tile--sm" style={{ background: m.fundal, color: m.culoare }}>
                    <Icon name={m.icon} size={22} />
                  </span>
                  <strong>{m.titlu}</strong>
                  <span>{m.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="container section form-layout" aria-labelledby="formular-titlu">
          <div className="form-card">
            <VolunteerForm />
          </div>
          <aside className="form-aside stack">
            <h2 className="h3">Ce urmează</h2>
            <ol className="steps">
              <li>Primim răspunsul tău și îl citește cineva din echipă.</li>
              <li>Te invităm la următoarea întâlnire lunară a grupului.</li>
              <li>Te anunțăm din timp despre activitățile alese de tine.</li>
            </ol>
            <div className="contact-card">
              <strong>Preferi să ne scrii direct?</strong>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">
                <Icon name="instagram" /> @tineret.cupseni
              </a>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">
                <Icon name="facebook" /> {site.nume}
              </a>
              <span>
                <Icon name="mail" /> {site.email}
              </span>
            </div>
          </aside>
        </section>

        <section className="band band--white" aria-labelledby="parteneri-titlu">
          <div className="container section stack-lg">
            <SectionHeader id="parteneri-titlu" eyebrow="Parteneri" title="Mulțumim celor care ne-au ajutat deja" />
            <ul className="auto-grid auto-grid--250">
              {parteneri.map((p) => (
                <li key={p.nume} className="partner-card">
                  <strong>{p.nume}</strong>
                  <span>{p.contributie}</span>
                </li>
              ))}
              <li className="partner-card partner-card--sun">
                <strong>Locul tău e aici</strong>
                <span>Vrei să susții o activitate din 2027? Scrie-ne la {site.email} sau pe Instagram.</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="container section stack-lg" aria-labelledby="social-titlu">
          <SectionHeader id="social-titlu" eyebrow="Ne găsești și aici" title="Urmărește ce pregătim" />
          <SocialLinks varianta="carduri" />
        </section>
      </>
    </PageShell>
  );
}
