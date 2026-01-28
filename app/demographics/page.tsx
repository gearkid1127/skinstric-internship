"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PHASE2_URL =
  "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo";

type Phase2Response = {
  message: string;
  data: {
    race: Record<string, number>;
    age: Record<string, number>;
    gender: Record<string, number>;
  };
};

type TabKey = "race" | "age" | "sex";

function toLabel(s: string) {
  return s.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

function toPercent(v: number) {
  return Math.round(v * 100 * 100) / 100;
}

export default function DemographicsPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [apiData, setApiData] = useState<Phase2Response["data"] | null>(null);

  const [tab, setTab] = useState<TabKey>("race");
  const [actual, setActual] = useState<{
    race: { label: string; value: number };
    age: { label: string; value: number };
    sex: { label: string; value: number };
  } | null>(null);

  useEffect(() => {
    const base64 = sessionStorage.getItem("skinstric:image_base64");

    if (!base64) {
      setError("No captured image found.");
      setLoading(false);
      return;
    }

    const run = async () => {
      try {
        const res = await fetch(PHASE2_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        });

        if (!res.ok) throw new Error("API request failed");

        const json = (await res.json()) as Phase2Response;
        setApiData(json.data);
      } catch {
        setError("Failed to analyze image.");
      } finally {
        setLoading(false);
      }
    };

    void run();
  }, []);

  const sorted = (obj?: Record<string, number>) => {
    if (!obj) return [];
    return Object.entries(obj)
      .map(([key, value]) => ({
        key,
        label: toLabel(key),
        value: toPercent(value),
      }))
      .sort((a, b) => b.value - a.value);
  };

  const raceOptions = sorted(apiData?.race);
  const ageOptions = sorted(apiData?.age);
  const sexOptions = sorted(apiData?.gender);

  const aiTop = {
    race: {
      label: raceOptions[0]?.label ?? "—",
      value: raceOptions[0]?.value ?? 0,
    },
    age: {
      label: ageOptions[0]?.label ?? "—",
      value: ageOptions[0]?.value ?? 0,
    },
    sex: {
      label: sexOptions[0]?.label ?? "—",
      value: sexOptions[0]?.value ?? 0,
    },
  };

  const DATA = {
    race: actual?.race ?? aiTop.race,
    age: actual?.age ?? aiTop.age,
    sex: actual?.sex ?? aiTop.sex,
  };

  const panel =
    tab === "race"
      ? {
          title: "Race",
          selected: DATA.race.label,
          selectedValue: DATA.race.value,
          options: raceOptions,
        }
      : tab === "age"
        ? {
            title: "Age",
            selected: DATA.age.label,
            selectedValue: DATA.age.value,
            options: ageOptions,
          }
        : {
            title: "Sex",
            selected: DATA.sex.label,
            selectedValue: DATA.sex.value,
            options: sexOptions,
          };

  const onPick = (label: string, value: number) => {
    setActual((prev) => ({
      race: prev?.race ?? aiTop.race,
      age: prev?.age ?? aiTop.age,
      sex: prev?.sex ?? aiTop.sex,
      [tab]: { label, value },
    }));
  };

  const onBack = () => router.back();
  const onReset = () => setActual(null);
  const onConfirm = () => {
    const final = {
      race: actual?.race ?? aiTop.race,
      age: actual?.age ?? aiTop.age,
      sex: actual?.sex ?? aiTop.sex,
    };

    sessionStorage.setItem("skinstric:demographics", JSON.stringify(final));

    // next route (change later if your next page differs)
    router.push("/analysis");
  };

  return (
    <section className="demo">
      <header className="demo-header">
        <p className="demo-breadcrumb">
          SKINSTRIC&nbsp;&nbsp;[&nbsp;ANALYSIS&nbsp;]
        </p>
        <p className="demo-kicker">A.I. ANALYSIS</p>
        <h1 className="demo-title">DEMOGRAPHICS</h1>
        <p className="demo-sub">PREDICTED RACE & AGE</p>
      </header>

      <div className="demo-shell">
        {/* Left */}
        <aside className="demo-left">
          <div className="demo-tabs">
            <button
              className={`demo-tab ${tab === "race" ? "is-active" : ""}`}
              onClick={() => setTab("race")}
              type="button"
            >
              <span className="demo-tab-top">
                {DATA.race.label.toUpperCase()}
              </span>
              <span className="demo-tab-bottom">RACE</span>
            </button>

            <button
              className={`demo-tab ${tab === "age" ? "is-active" : ""}`}
              onClick={() => setTab("age")}
              type="button"
            >
              <span className="demo-tab-top">
                {DATA.age.label.toUpperCase()}
              </span>
              <span className="demo-tab-bottom">AGE</span>
            </button>

            <button
              className={`demo-tab ${tab === "sex" ? "is-active" : ""}`}
              onClick={() => setTab("sex")}
              type="button"
            >
              <span className="demo-tab-top">
                {DATA.sex.label.toUpperCase()}
              </span>
              <span className="demo-tab-bottom">SEX</span>
            </button>
            <button type="button" className="demo-back" onClick={onBack}>
              <svg
                width="97"
                height="44"
                viewBox="0 0 97 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M43.293 22L22 43.293L0.707031 22L22 0.707031L43.293 22Z"
                  stroke="#1A1B1C"
                />
                <path
                  d="M15.7148 22L25.1434 27.4436V16.5564L15.7148 22Z"
                  fill="#1A1B1C"
                />
                <path
                  d="M64.872 28C66.93 28 68.288 26.922 68.288 25.102C68.288 23.786 67.532 23.002 66.608 22.652C67.21 22.344 67.798 21.644 67.798 20.72C67.798 19.096 66.524 18.2 64.732 18.2H60.938V28H64.872ZM62.758 19.684H64.578C65.586 19.684 66.076 20.104 66.076 20.86C66.076 21.616 65.586 22.036 64.606 22.036H62.758V19.684ZM62.758 23.604H64.676C65.922 23.604 66.51 24.108 66.51 25.004C66.51 25.914 65.922 26.39 64.676 26.39H62.758V23.604ZM77.6856 28L73.9056 18.2H72.1696L68.4036 28H70.3076L71.1476 25.718H74.9276L75.7676 28H77.6856ZM73.0516 20.566L74.3676 24.15H71.7356L73.0516 20.566ZM82.4387 28.112C84.8467 28.112 86.6387 26.726 86.8347 24.696H84.9867C84.8187 25.76 83.7827 26.502 82.4387 26.502C80.7307 26.502 79.4427 25.326 79.4427 23.1C79.4427 20.874 80.7307 19.684 82.4387 19.684C83.7547 19.684 84.7907 20.426 84.9307 21.504H86.8627C86.5967 19.474 84.8047 18.088 82.4387 18.088C79.8767 18.088 77.5807 19.768 77.5807 23.1C77.5807 26.432 79.8347 28.112 82.4387 28.112ZM96.3629 28L92.4009 22.092L95.9989 18.2H93.6889L89.7549 22.47V18.2H87.8929V28H89.7549V24.948L91.1269 23.464L94.0669 28H96.3629Z"
                  fill="#1A1B1C"
                />
              </svg>
            </button>
          </div>
        </aside>

        {/* Center */}
        <main className="demo-center">
          <div className="demo-center-top">
            <p className="demo-selected">{panel.selected}</p>
          </div>

          <div className="demo-meter" aria-hidden="true">
            <div className="demo-meter-circle">
              <span className="demo-meter-value">
                {panel.selectedValue.toFixed(0)}%
              </span>
            </div>
          </div>

          <p className="demo-hint">
            If A.I. estimate is wrong, select the correct one.
          </p>
        </main>

        {/* Right */}
        <aside className="demo-right">
          <div className="demo-right-head">
            <span className="demo-right-title">
              {panel.title.toUpperCase()}
            </span>
            <span className="demo-right-title">A.I. CONFIDENCE</span>
          </div>

          <ul className="demo-list">
            {panel.options.map((o) => (
              <li key={o.label} className="demo-row">
                <button
                  type="button"
                  className="demo-row-btn"
                  onClick={() => onPick(o.label, o.value)}
                >
                  <span className="demo-row-left">
                    <span className="demo-bullet">◇</span>
                    {o.label}
                  </span>
                  <span className="demo-row-right">{o.value.toFixed(2)}%</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="demo-actions">
            <button
              type="button"
              className="demo-btn demo-btn--ghost"
              onClick={onReset}
            >
              RESET
            </button>
            <button type="button" className="demo-btn" onClick={onConfirm}>
              CONFIRM
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
