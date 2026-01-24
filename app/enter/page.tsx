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
  placeholder: string; // this is the big input text on the real site
};

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
      { key: "name", placeholder: "Introduce Yourself" },
      { key: "location", placeholder: "Where are you from?" },
    ],
    [],
  );

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

  // Focus the input when step changes
  useEffect(() => {
    inputRef.current?.focus();
  }, [stepIndex]);

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
    if (stepIndex === 0) {
      router.push("/");
      return;
    }
    setStepIndex((prev) => Math.max(0, prev - 1));
  }, [router, stepIndex]);

  const handleNext = useCallback(async () => {
    const key = currentStep.key;

    if (!validateStep(key)) return;

    // go to next step
    if (stepIndex < steps.length - 1) {
      setStepIndex((prev) => prev + 1);
      return;
    }

    // final submit
    setIsLoading(true);

    const normalized: FormData = {
      name: normalizeText(formData.name),
      location: normalizeText(formData.location),
    };

    const result = await submitPhaseOne(normalized);

    if (result) {
      saveToLocalStorage(STORAGE_KEY, normalized);
      router.push("/testing");
    }

    setIsLoading(false);
  }, [currentStep.key, formData, router, stepIndex, steps, validateStep]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
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
  }, [handleBack, handleNext]);

  return (
    <section className="enter">
      <div className="enter-frame">
        {/* rotating dotted frames */}
        <div className="enter-rombus enter-rombus-1" aria-hidden="true" />
        <div className="enter-rombus enter-rombus-2" aria-hidden="true" />
        <div className="enter-rombus enter-rombus-3" aria-hidden="true" />

        <p className="enter-kicker">TO START ANALYSIS</p>

        <div className="enter-step-card" role="group" aria-label="Enter details">
          <p className="enter-click">CLICK TO TYPE</p>

          {/* The real site: THIS input is the big “question” */}
          <input
            ref={inputRef}
            className="enter-input"
            value={currentValue}
            placeholder={currentStep.placeholder}
            onChange={(e) => setValueForStep(currentKey, e.target.value)}
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

          {/* keep for accessibility, but we’ll visually hide it in CSS */}
          <button
            type="button"
            className="enter-next"
            onClick={() => void handleNext()}
            disabled={isLoading}
            aria-label="Next"
          >
            Next
          </button>
        </div>

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
      </div>
    </section>
  );
}
