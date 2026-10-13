import Image from "next/image";

const LITERE = [..."CUPȘENI"];

/**
 * Logo-ul Tineret Cupșeni, ca în branding: simbolul (Șatra lui Pintea, soarele,
 * bradul și drumul), „Tineret” în Times New Roman și „CUPȘENI” în Poppins, spațiat.
 * Pe fundal închis, simbolul stă pe un disc deschis la culoare, ca să-și păstreze culorile.
 */
export function Logo({ marime = 52, faraText = false }: { marime?: number; faraText?: boolean }) {
  return (
    <span className="logo">
      <span className="logo__mark" style={{ width: marime, height: marime }}>
        <Image src="/brand/simbol.svg" alt="" width={302} height={292} unoptimized priority={false} />
      </span>
      {faraText ? null : (
        <span className="logo__text">
          <span className="logo__tineret">Tineret</span>
          <span className="logo__cupseni">
            <span className="visually-hidden">Cupșeni</span>
            {/* Literele sunt întinse pe toată lățimea lui „Tineret”, ca în logo. */}
            {LITERE.map((litera, i) => (
              <span key={i} aria-hidden="true">
                {litera}
              </span>
            ))}
          </span>
        </span>
      )}
    </span>
  );
}
