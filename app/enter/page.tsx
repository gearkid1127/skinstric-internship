"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  validateNameOrLocation,
  normalizeText,
  type FormData,
  type FormErrors,
  type TouchedFields,
} from "../../lib/validation";
import { submitPhaseOne, saveToLocalStorage } from "../../lib/api";

export default function EnterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    location: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    name: false,
    location: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Prefill form data from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("skinstric.phase1");
      if (saved) {
        const parsedData = JSON.parse(saved);
        if (parsedData && typeof parsedData.name === "string" && typeof parsedData.location === "string") {
          setFormData({
            name: parsedData.name,
            location: parsedData.location,
          });
        }
      }
    } catch (error) {
      // Silently ignore parsing errors
      console.error("Failed to parse localStorage data:", error);
    }
  }, []);

  const validateField = (field: keyof FormData, value: string) => {
    const error = validateNameOrLocation(value);
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
    return !error;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Validate in real-time if field has been touched or submit attempted
    if (touched[field] || submitAttempted) {
      validateField(field, value);
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
    validateField(field, formData[field]);
  };

  const isFormValid = !errors.name && !errors.location;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    // Validate all fields
    const nameValid = validateField("name", formData.name);
    const locationValid = validateField("location", formData.location);

    if (!nameValid || !locationValid || isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const normalizedData = {
        name: normalizeText(formData.name),
        location: normalizeText(formData.location),
      };

      const result = await submitPhaseOne(normalizedData);

      if (result) {
        saveToLocalStorage("skinstric.phase1", normalizedData);
        router.push("/testing");
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const shouldShowError = (field: keyof FormData) => {
    return (touched[field] || submitAttempted) && errors[field];
  };

  const isButtonDisabled = !isFormValid || isLoading;

  return (
    <section className="enter">
      <div className="enter-card">
        <header className="enter-header">
          <h1 className="enter-title">Let’s get started</h1>
          <p className="enter-subtitle">
            Enter your name and location to begin.
          </p>
        </header>

        <form className="enter-form" onSubmit={handleSubmit}>
          <label className="field">
            <span className="field-label">Name</span>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              className={`field-input ${shouldShowError("name") ? "error" : ""}`}
              disabled={isLoading}
            />
            {shouldShowError("name") && (
              <span className="field-error">{errors.name}</span>
            )}
          </label>

          <label className="field">
            <span className="field-label">Location</span>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              onBlur={() => handleBlur("location")}
              className={`field-input ${shouldShowError("location") ? "error" : ""}`}
              disabled={isLoading}
            />
            {shouldShowError("location") && (
              <span className="field-error">{errors.location}</span>
            )}
          </label>

          <div className="enter-actions">
            <button
              type="button"
              className="button button-secondary"
              onClick={() => router.push("/")}
              disabled={isLoading}
            >
              Back
            </button>

            <button
              type="submit"
              className="button button-primary"
              disabled={isButtonDisabled}
            >
              {isLoading ? "Submitting…" : "Proceed"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
