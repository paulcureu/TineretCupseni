import { site } from "@/data/site";
import { Icon } from "./Icon";

const retele = [
  { nume: "Facebook", detaliu: "Tinerii din comuna Cupșeni", href: site.social.facebook, icon: "facebook" },
  { nume: "Instagram", detaliu: "@tineret.cupseni", href: site.social.instagram, icon: "instagram" },
  { nume: "TikTok", detaliu: "@tineret.cupseni", href: site.social.tiktok, icon: "tiktok" },
] as const;

export function SocialLinks({ varianta }: { varianta: "iconite" | "carduri" }) {
  if (varianta === "iconite") {
    return (
      <ul className="social-icons">
        {retele.map((r) => (
          <li key={r.nume}>
            <a href={r.href} aria-label={r.nume} target="_blank" rel="noopener noreferrer">
              <Icon name={r.icon} size={20} />
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="social-cards">
      {retele.map((r) => (
        <li key={r.nume}>
          <a href={r.href} className="social-card" target="_blank" rel="noopener noreferrer">
            <span className="social-card__icon">
              <Icon name={r.icon} size={22} />
            </span>
            <span className="social-card__text">
              <span className="social-card__name">{r.nume}</span>
              <span className="social-card__detail">{r.detaliu}</span>
            </span>
            <Icon name="extern" size={20} className="social-card__arrow" />
          </a>
        </li>
      ))}
    </ul>
  );
}
