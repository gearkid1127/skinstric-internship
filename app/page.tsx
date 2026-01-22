import Link from "next/link";

export default function HomePage() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Sophisticated skincare</h1>
        <p className="hero-subtitle">Powered by A.I. skin analysis</p>

        <Link href="/enter" className="hero-button">
          Enter experience
        </Link>
      </div>
    </section>
  );
}
