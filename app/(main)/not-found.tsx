import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container text-center">
      <h1>Seite nicht gefunden</h1>
      <p>
        Die gesuchte Seite existiert nicht. <Link href="/">Zurück zur Startseite</Link>
      </p>
    </div>
  );
}
