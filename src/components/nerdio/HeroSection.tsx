import { useEffect, useState } from "react";
import { heading, lemon } from "@/lib/theme";

/* Deliberately much darker than the app's regular `bg` token — this is
   the gate's own background, not shared with the authenticated app, so
   changing it here doesn't affect Profile/Airdrop/Home. */
const gateBg = "#04120c";

const WORD = "NERDIO";
const TYPE_MS = 160;   // per letter
const HOLD_MS = 700;   // pause once fully typed
const FADE_MS = 400;   // text fade-out / button fade-in

type Phase = "typing" | "holding" | "leaving" | "button";

export function ConnectGate({ onConnect, connecting }: { onConnect: () => void; connecting: boolean }) {
  const [phase, setPhase] = useState<Phase>("typing");
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (phase !== "typing") return;
    if (typed >= WORD.length) { setPhase("holding"); return; }
    const t = setTimeout(() => setTyped(n => n + 1), TYPE_MS);
    return () => clearTimeout(t);
  }, [phase, typed]);

  useEffect(() => {
    if (phase !== "holding") return;
    const t = setTimeout(() => setPhase("leaving"), HOLD_MS);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "leaving") return;
    const t = setTimeout(() => setPhase("button"), FADE_MS);
    return () => clearTimeout(t);
  }, [phase]);

  const showingText = phase === "typing" || phase === "holding" || phase === "leaving";
  const textFading = phase === "leaving";

  return (
    <div style={{
      minHeight: "100vh", background: gateBg,
      display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
    }}>
      <div className="nerdio-gate-rings">
        <svg className="nerdio-ring-outer" viewBox="0 0 240 240" width="240" height="240">
          <circle cx="120" cy="120" r="112" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <circle
            cx="120" cy="120" r="112" fill="none" stroke={lemon} strokeWidth="2.5" strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 112 * 0.16} ${2 * Math.PI * 112}`}
          />
        </svg>
        <svg className="nerdio-ring-inner" viewBox="0 0 240 240" width="196" height="196">
          <circle cx="120" cy="120" r="112" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <circle
            cx="120" cy="120" r="112" fill="none" stroke={lemon} strokeWidth="2.5" strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 112 * 0.14} ${2 * Math.PI * 112}`}
            opacity="0.75"
          />
        </svg>

        <div className="nerdio-gate-center">
          {showingText ? (
            <div
              className={textFading ? "nerdio-gate-text-out" : "nerdio-gate-text-in"}
              style={{ fontFamily: heading, fontWeight: 800, color: "#fff", fontSize: "1.8rem", letterSpacing: "0.06em" }}
            >
              {WORD.slice(0, typed)}
              <span className="nerdio-gate-caret">|</span>
            </div>
          ) : (
            <button
              onClick={onConnect}
              disabled={connecting}
              className="nerdio-gate-btn-in"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "9px",
                background: connecting ? "rgba(215,242,76,0.4)" : lemon, color: gateBg,
                border: "none", borderRadius: "12px", padding: "13px 22px",
                fontFamily: heading, fontSize: "0.86rem", fontWeight: 800,
                cursor: connecting ? "not-allowed" : "pointer", whiteSpace: "nowrap",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93Zm-1.29 19.42h2.04L6.49 3.32H4.3l13.31 17.25Z" />
              </svg>
              {connecting ? "Connecting..." : "Connect X to enter"}
            </button>
          )}
        </div>
      </div>

      <style>{`
        .nerdio-gate-rings {
          position: relative; width: 240px; height: 240px;
          display: flex; align-items: center; justify-content: center;
        }
        .nerdio-ring-outer, .nerdio-ring-inner {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
        }
        .nerdio-ring-outer { animation: nerdio-spin-cw 7s linear infinite; }
        .nerdio-ring-inner { animation: nerdio-spin-ccw 9s linear infinite; }
        @keyframes nerdio-spin-cw  { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes nerdio-spin-ccw { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(-360deg); } }

        .nerdio-gate-center { position: relative; z-index: 1; }

        .nerdio-gate-text-in { opacity: 1; transition: opacity 0.2s ease; }
        .nerdio-gate-text-out { opacity: 0; transition: opacity ${FADE_MS}ms ease; }

        .nerdio-gate-caret {
          display: inline-block; margin-left: 2px; color: ${lemon};
          animation: nerdio-caret-blink 0.9s steps(1) infinite;
        }
        @keyframes nerdio-caret-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }

        .nerdio-gate-btn-in {
          opacity: 0; animation: nerdio-btn-in ${FADE_MS}ms ease forwards;
        }
        @keyframes nerdio-btn-in { to { opacity: 1; } }
      `}</style>
    </div>
  );
}
