"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  normalizeText,
  validateNameOrLocation,
  type FormData,
  type FormErrors,
} from "../../lib/validation";
import { submitPhaseOne, saveToLocalStorage } from "../../lib/api";

type StepKey = "name" | "location";

type Step = {
  key: StepKey;
  title: string;
};

type Phase = "form" | "loading" | "confirm";

const STORAGE_KEY = "skinstric.phase1";

const initialFormData: FormData = {
  name: "",
  location: "",
};

export default function EnterPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const steps = useMemo<Step[]>(
    () => [
      { key: "name", title: "Introduce Yourself" },
      { key: "location", title: "Where are you from?" },
    ],
    [],
  );

  const [phase, setPhase] = useState<Phase>("form");
  const [stepIndex, setStepIndex] = useState(0);

  // Lazy init so we only touch localStorage in the browser
  const [formData, setFormData] = useState<FormData>(() => {
    if (typeof window === "undefined") return initialFormData;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return initialFormData;

      const parsed = JSON.parse(saved) as Partial<FormData>;
      return { ...initialFormData, ...parsed };
    } catch {
      return initialFormData;
    }
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const currentStep = steps[stepIndex];
  const currentKey = currentStep.key;
  const currentValue = formData[currentKey];
  const currentError = errors[currentKey];

  // Focus the input when step changes (only while on form phase)
  useEffect(() => {
    if (phase !== "form") return;
    inputRef.current?.focus();
  }, [phase, stepIndex]);

  const setValueForStep = useCallback((key: StepKey, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const validateStep = useCallback(
    (key: StepKey) => {
      const value = formData[key];
      const error = validateNameOrLocation(value);
      setErrors((prev) => ({ ...prev, [key]: error }));
      return !error;
    },
    [formData],
  );

  const handleBack = useCallback(() => {
    // If we're on confirm, go back to the last form step (like "edit before proceed")
    if (phase === "confirm") {
      setPhase("form");
      setStepIndex(steps.length - 1);
      return;
    }

    // If we're loading, ignore back (prevents weird mid-submit state)
    if (phase === "loading") return;

    // Normal form back behavior
    if (stepIndex === 0) {
      router.push("/");
      return;
    }

    setStepIndex((prev) => Math.max(0, prev - 1));
  }, [phase, router, stepIndex, steps.length]);

  const goToTesting = useCallback(() => {
    router.push("/testing");
  }, [router]);

  const handleNext = useCallback(async () => {
    // On confirm screen, "Next" means proceed
    if (phase === "confirm") {
      goToTesting();
      return;
    }

    // Ignore next while loading
    if (phase === "loading") return;

    const key = currentStep.key;

    if (!validateStep(key)) return;

    // Go to next step
    if (stepIndex < steps.length - 1) {
      setStepIndex((prev) => prev + 1);
      return;
    }

    // Final submit -> loading -> confirm (no auto-route)
    setIsLoading(true);
    setPhase("loading");

    const normalized: FormData = {
      name: normalizeText(formData.name),
      location: normalizeText(formData.location),
    };

    const result = await submitPhaseOne(normalized);

    if (result) {
      saveToLocalStorage(STORAGE_KEY, normalized);

      // Short delay so "Processing submission" is visible (matches exemplar feel)
      window.setTimeout(() => {
        setPhase("confirm");
        setIsLoading(false);
      }, 900);

      return;
    }

    // If submit failed, return to form and stop loading
    setPhase("form");
    setIsLoading(false);
  }, [
    currentStep.key,
    formData,
    goToTesting,
    phase,
    stepIndex,
    steps.length,
    validateStep,
  ]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (phase === "loading") return;

      if (e.key === "Enter") {
        e.preventDefault();
        void handleNext();
      }

      if (e.key === "Escape") {
        e.preventDefault();
        handleBack();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleBack, handleNext, phase]);

  return (
    <section className="enter">
      <div className="enter-frame">
        <div className="enter-rombus enter-rombus-1" />
        <div className="enter-rombus enter-rombus-2" />
        <div className="enter-rombus enter-rombus-3" />

        <p className="enter-kicker">TO START ANALYSIS</p>

        {/* -------- FORM -------- */}
        {phase === "form" ? (
          <div
            className="enter-step-card"
            role="group"
            aria-label={currentStep.title}
          >
            <p className="enter-click">CLICK TO TYPE</p>

            <input
              ref={inputRef}
              className="enter-input"
              value={currentValue}
              onChange={(e) => setValueForStep(currentKey, e.target.value)}
              placeholder={currentStep.title}
              aria-invalid={Boolean(currentError)}
              aria-describedby={currentError ? "enter-error" : undefined}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />

            {currentError ? (
              <p id="enter-error" className="enter-error">
                {currentError}
              </p>
            ) : null}

            <p className="enter-hint">
              Press <span className="enter-hint-key">Enter</span> to continue
            </p>

            <button
              type="button"
              className="enter-next"
              onClick={() => void handleNext()}
              disabled={isLoading}
              aria-label="Next"
            >
              <span className="enter-next-label">NEXT</span>
              <span className="enter-next-diamond" aria-hidden="true">
                <span className="enter-next-arrow" aria-hidden="true" />
              </span>
            </button>
          </div>
        ) : null}

        {/* -------- LOADING -------- */}
        {phase === "loading" ? (
          <div className="enter-step-card" role="status" aria-live="polite">
            <p className="enter-loading-text">Processing submission</p>
            <div className="enter-loading-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        ) : null}

        {/* -------- CONFIRM -------- */}
        {phase === "confirm" ? (
          <div className="enter-step-card" role="group" aria-label="Confirmation">
            <h2 className="enter-confirm-title">Thank you!</h2>
            <p className="enter-confirm-sub">Proceed for the next step</p>
          </div>
        ) : null}

        {/* Back control (always visible like exemplar) */}
        <button
          type="button"
          className="enter-back"
          onClick={handleBack}
          aria-label="Back"
        >
          <span className="enter-back-diamond" aria-hidden="true">
            <span className="enter-back-arrow" aria-hidden="true" />
          </span>
          <span className="enter-back-label">BACK</span>
        </button>

        {/* Proceed control (only on confirm screen) */}
        {phase === "confirm" ? (
          <button
            type="button"
            className="enter-proceed"
            onClick={goToTesting}
            aria-label="Proceed"
          >
            <span className="enter-proceed-label">PROCEED</span>
            <span className="enter-proceed-diamond" aria-hidden="true">
              <span className="enter-proceed-arrow" aria-hidden="true" />
            </span>
          </button>
        ) : null}
      </div>
    </section>
  );
}
