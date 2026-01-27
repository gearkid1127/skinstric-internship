"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type CameraState = "preparing" | "live" | "captured" | "analyzing" | "denied";

export default function TestingCameraPage() {
  const router = useRouter();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [state, setState] = useState<CameraState>("preparing");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const headline = useMemo(() => {
    if (state === "preparing" || state === "analyzing") return "PREPARING YOUR ANALYSIS…";
    if (state === "captured") return "GREAT SHOT!";
    return "";
  }, [state]);

  const stopStream = () => {
    const stream = streamRef.current;
    if (!stream) return;
    stream.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  const attachStreamToVideo = async (stream: MediaStream) => {
    const video = videoRef.current;
    if (!video) return;

    video.srcObject = stream;
    video.playsInline = true;
    video.muted = true;

    // If metadata is already available, don't wait for the event
    if (video.readyState >= 1) {
      await video.play();
      return;
    }

    await new Promise<void>((resolve) => {
      const onMeta = async () => {
        video.removeEventListener("loadedmetadata", onMeta);
        await video.play();
        resolve();
      };
      video.addEventListener("loadedmetadata", onMeta);
    });
  };

  const startStream = async () => {
    setErrorMsg("");

    stopStream();

    try {
      if (!navigator?.mediaDevices?.getUserMedia) {
        setErrorMsg("Camera is not supported in this browser.");
        setState("denied");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;

      await attachStreamToVideo(stream);

      setState("live");
    } catch (err: unknown) {
      const name = (err as { name?: string })?.name ?? "";
      const message = (err as { message?: string })?.message ?? "";

      if (name === "NotAllowedError" || name === "SecurityError") {
        setErrorMsg("Camera permission was denied. Please allow access and try again.");
      } else if (name === "NotFoundError" || name === "OverconstrainedError") {
        setErrorMsg("No camera was found (or it’s unavailable).");
      } else {
        setErrorMsg(message || "Unable to access camera.");
      }

      setState("denied");
    }
  };

  useEffect(() => {
    if (state !== "preparing") return;

    const t = window.setTimeout(() => {
      void startStream();
    }, 600);

    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    return () => stopStream();
  }, []);

  const onBack = () => {
    stopStream();
    router.back();
  };

  const onRetry = () => {
    setState("preparing");
  };

  const onTakePicture = () => {
    setState("captured");
  };

  const onProceed = () => {
    stopStream();
    setState("analyzing");

    window.setTimeout(() => {
      router.push("/demographics"); // you can change this later
    }, 900);
  };

  return (
    <section className="camera">
      {/* ALWAYS mounted stage (so videoRef exists during "preparing") */}
      <div className="camera-stage">
        <div className="camera-video" aria-label="Camera preview area">
          <video ref={videoRef} className="camera-video-el" />
        </div>

        {/* PREPARING / ANALYZING overlay */}
        {(state === "preparing" || state === "analyzing") && (
          <div className="camera-loading">
            <div className="camera-diamonds" aria-hidden="true">
              <span className="camera-diamond camera-diamond--outer" />
              <span className="camera-diamond camera-diamond--mid" />
              <span className="camera-diamond camera-diamond--inner" />
            </div>
            <p className="camera-loading-text">{headline}</p>
          </div>
        )}

        {/* DENIED overlay */}
        {state === "denied" && (
          <div className="camera-denied">
            <div className="camera-denied-card">
              <p className="camera-denied-title">CAMERA ACCESS NEEDED</p>
              <p className="camera-denied-msg">
                {errorMsg || "Please allow camera access to continue."}
              </p>

              <div className="camera-denied-actions">
                <button type="button" className="camera-denied-btn" onClick={onRetry}>
                  RETRY
                </button>
                <button
                  type="button"
                  className="camera-denied-btn camera-denied-btn--ghost"
                  onClick={onBack}
                >
                  BACK
                </button>
              </div>

              <p className="camera-denied-hint">
                Tip: click the camera icon in your browser’s address bar and allow access.
              </p>
            </div>
          </div>
        )}

        {/* LIVE controls */}
        {state === "live" && (
          <>
            <button type="button" className="camera-take" onClick={onTakePicture}>
              <span className="camera-take-text">TAKE PICTURE</span>
              <span className="camera-take-btn" aria-hidden="true">
                <span className="camera-take-btn-inner" />
              </span>
            </button>

            <div className="camera-tips">
              <p className="camera-tips-title">TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
              <ul className="camera-tips-list">
                <li>◇ NEUTRAL EXPRESSION</li>
                <li>◇ FRONTAL POSE</li>
                <li>◇ ADEQUATE LIGHTING</li>
              </ul>
            </div>

            <button type="button" className="camera-nav camera-nav--left" onClick={onBack}>
              <span className="camera-nav-diamond" aria-hidden="true">
                <span className="camera-nav-arrow camera-nav-arrow--left" />
              </span>
              <span className="camera-nav-label">BACK</span>
            </button>
          </>
        )}

        {/* CAPTURED (placeholder for now) */}
        {state === "captured" && (
          <>
            <p className="camera-greatshot">{headline}</p>

            <div className="camera-tips">
              <p className="camera-tips-title">TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
              <ul className="camera-tips-list">
                <li>◇ NEUTRAL EXPRESSION</li>
                <li>◇ FRONTAL POSE</li>
                <li>◇ ADEQUATE LIGHTING</li>
              </ul>
            </div>

            <button type="button" className="camera-nav camera-nav--left" onClick={onBack}>
              <span className="camera-nav-diamond" aria-hidden="true">
                <span className="camera-nav-arrow camera-nav-arrow--left" />
              </span>
              <span className="camera-nav-label">BACK</span>
            </button>

            <button type="button" className="camera-nav camera-nav--right" onClick={onProceed}>
              <span className="camera-nav-label">PROCEED</span>
              <span className="camera-nav-diamond" aria-hidden="true">
                <span className="camera-nav-arrow camera-nav-arrow--right" />
              </span>
            </button>
          </>
        )}
      </div>
    </section>
  );
}
