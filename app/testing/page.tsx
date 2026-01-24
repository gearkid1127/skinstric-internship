"use client";

// ROUTE: /testing


import { useRouter } from "next/navigation";

export default function TestingPage() {
  const router = useRouter();

  return (
    <section className="testing">
      <div className="testing-frame">
        <p className="testing-kicker">TO START ANALYSIS</p>

        <div className="testing-center">
          <h1 className="testing-title">To start analysis</h1>
          <p className="testing-subtitle">Choose one option to continue.</p>

          <div className="testing-options" role="list">
  <button
    type="button"
    className="testing-choice"
    onClick={() => router.push("/testing/camera")}
  >
    <span className="testing-choice-frame" aria-hidden="true" />
    <span
      className="testing-choice-frame testing-choice-frame-inner"
      aria-hidden="true"
    />

    <span className="testing-choice-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="34" height="34">
        <path
          d="M9 6l1.2-2h3.6L15 6h3a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h3zm3 12a4 4 0 100-8 4 4 0 000 8z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </span>

    <span className="testing-choice-label">
      <span className="testing-choice-label-top">ALLOW A.I.</span>
      <span className="testing-choice-label-bottom">TO SCAN YOUR FACE</span>
    </span>
  </button>

  <button
    type="button"
    className="testing-choice"
    onClick={() => router.push("/testing/gallery")}
  >
    <span className="testing-choice-frame" aria-hidden="true" />
    <span
      className="testing-choice-frame testing-choice-frame-inner"
      aria-hidden="true"
    />

    <span className="testing-choice-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="34" height="34">
        <path
          d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm4 9l2-2 3 3 2-2 3 3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="9" cy="9" r="1.2" fill="currentColor" />
      </svg>
    </span>

    <span className="testing-choice-label">
      <span className="testing-choice-label-top">ALLOW A.I.</span>
      <span className="testing-choice-label-bottom">ACCESS GALLERY</span>
    </span>
  </button>
</div>
        </div>
      </div>
    </section>
  );
}
