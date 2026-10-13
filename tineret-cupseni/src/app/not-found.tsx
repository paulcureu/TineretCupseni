import Link from "next/link";
import { Icon } from "@/components/Icon";

export default function NotFound() {
  return (
    <div className="container section not-found">
      <span className="eyebrow">Eroare 404</span>
      <h1 className="h1">Pagina asta s-a rătăcit pe ulițe.</h1>
      <p className="lead">Poate a fost mutată sau linkul are o greșeală. Încearcă de la pagina principală sau din calendar.</p>
      <div className="button-row">
        <Link href="/" className="btn btn--navy btn--lg">
          Acasă
        </Link>
        <Link href="/calendar" className="btn btn--outline btn--lg">
          Calendar 2027 <Icon name="sageata" />
        </Link>
      </div>
    </div>
  );
}
