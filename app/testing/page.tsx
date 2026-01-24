"use client";

import { useRouter } from "next/navigation";

export default function TestingPage() {
  const router = useRouter();

  return (
    <section className="testing">
      <div className="testing-card">
        <h1 className="testing-title">To start analysis</h1>
        <p className="testing-subtitle">Choose one option to continue.</p>

        <div className="testing-options">
          <button
            className="testing-option"
            onClick={() => router.push("/testing/camera")}
          >
            Allow A.I. to scan your face
          </button>

          <button
            className="testing-option"
            onClick={() => router.push("/testing/gallery")}
          >
            Allow A.I. access gallery
          </button>
        </div>

        <div className="enter-actions">
          <button
            type="button"
            className="button button-secondary"
            onClick={() => router.push("/enter")}
          >
            Back
          </button>
        </div>
      </div>
    </section>
  );
}
