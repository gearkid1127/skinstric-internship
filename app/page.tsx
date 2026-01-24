import Link from "next/link";

export default function HomePage() {
  return (
    <section className="hero">
      <div className="hero-frame">
        {/* dotted frame */}
        <div className="frame-square frame-left" aria-hidden="true" />
        <div className="frame-square frame-right" aria-hidden="true" />

        {/* side controls (these are what your CSS hover animation targets) */}
        <Link className="hero-side hero-side-left" href="#">
          <span className="hero-diamond" aria-hidden="true">
            <span className="hero-diamond-arrow hero-diamond-arrow-left" />
          </span>
          <span className="hero-side-label">Discover A.I.</span>
        </Link>

        <Link className="hero-side hero-side-right" href="/testing">
          <span className="hero-side-label">Take test</span>
          <span className="hero-diamond" aria-hidden="true">
            <span className="hero-diamond-arrow hero-diamond-arrow-right" />
          </span>
        </Link>

        {/* center content */}
        <div className="hero-content">
          <h1 className="hero-title">
            Sophisticated<br />skincare
          </h1>

          <p className="hero-description">
            SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALISED
            ROUTINE TAILORED TO WHAT YOUR SKIN NEEDS.
          </p>

          <Link className="hero-button" href="/enter">
            Enter experience
          </Link>
        </div>

        {/* bottom-left copy */}
        <div className="hero-bottom-left">
          <p className="hero-bottom-text">
            Skinstric developed an A.I. that creates a highly-personalised
            routine tailored to what your skin needs.
          </p>
        </div>
      </div>
    </section>
  );
}
