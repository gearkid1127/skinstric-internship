"use client";

// ROUTE: /testing/camera


import { useRouter } from "next/navigation";

export default function TestingPage() {
  const router = useRouter();

  return (
    <section className="testing">
      <div className="testing-frame">
        <p className="testing-kicker">TO START ANALYSIS</p>

        <div
          className="testing-options"
          role="group"
          aria-label="Testing options"
        >
          {/* Camera */}
          <button
            type="button"
            className="testing-choice"
            onClick={() => router.push("/testing/camera")}
            aria-label="Allow A.I. to scan your face"
          >
            <span className="testing-choice-frame" aria-hidden="true" />
            <span
              className="testing-choice-frame testing-choice-frame-inner"
              aria-hidden="true"
            />

            <span className="testing-choice-icon" aria-hidden="true">
              <span className="testing-icon-ring" />
            </span>

            <span className="testing-choice-label">
              <span className="testing-choice-label-top">ALLOW A.I.</span>
              <span className="testing-choice-label-bottom">
                TO SCAN YOUR FACE
              </span>
            </span>
          </button>

          {/* Gallery */}
          <button
            type="button"
            className="testing-choice"
            onClick={() => router.push("/testing/gallery")}
            aria-label="Allow A.I. access gallery"
          >
            <span className="testing-choice-frame" aria-hidden="true" />
            <span
              className="testing-choice-frame testing-choice-frame-inner"
              aria-hidden="true"
            />

            <span className="testing-choice-icon" aria-hidden="true">
              <span className="testing-icon-ring" />
            </span>

            <span className="testing-choice-label">
              <span className="testing-choice-label-top">ALLOW A.I.</span>
              <span className="testing-choice-label-bottom">
                ACCESS GALLERY
              </span>
            </span>
          </button>
        </div>

        <button
          type="button"
          className="testing-back"
          onClick={() => router.back()}
          aria-label="Back"
        >
          <span className="testing-back-diamond" aria-hidden="true" />
          <span className="testing-back-label">BACK</span>
        </button>
      </div>
    </section>
  );
}
