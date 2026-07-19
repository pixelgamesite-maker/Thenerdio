import { useEffect, useState } from "react";
import { heading, bg, lemon, solanaPurple, solanaGreen } from "@/lib/theme";

const SEEN_KEY = "nerdio_splash_seen";
const WORD = "NERDIO";
const TYPE_MS = 160;
const HOLD_MS = 600;
const FADE_MS = 450;

/* Plays once per browser session, at the app root — not tied to any
   particular page, since there's no longer a dedicated "connect" gate
   for it to hand off to. Pure CSS/SVG, no animation library. */
export function useSplashOnce() {
  const [show, setShow] = useState(() => {
    try { return !sessionStorage.getItem(SEEN_KEY); } catch { return true; }
  });

  function finish() {
    try { sessionStorage.setItem(SEEN_KEY, "1"); } catch {}
    setShow(false);
  }

  return { show, finish };
}

export function SplashIntro({ onFinish }: { onFinish: () => void }) {
  const [typed, setTyped] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (typed >= WORD.length) return;
    const t = setTimeout(() => setTyped(n => n + 1), TYPE_MS);
    return () => clearTimeout(t);
  }, [typed]);

  useEffect(() => {
    if (typed < WORD.length) return;
    const t = setTimeout(() => setLeaving(true), HOLD_MS);
    return () => clearTimeout(t);
  }, [typed]);

  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(onFinish, FADE_MS);
    return () => clearTimeout(t);
  }, [leaving, onFinish]);

  return (
    <div
      className={`nerdio-splash ${leaving ? "nerdio-splash-out" : ""}`}
      style={{
        position: "fixed", inset: 0, zIndex: 100, background: bg,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <div className="nerdio-gate-rings">
        <svg className="nerdio-ring-outer" viewBox="0 0 240 240" width="240" height="240">
          <defs>
            <linearGradient id="nerdio-ring-grad-outer" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={solanaPurple} />
              <stop offset="100%" stopColor={solanaGreen} />
            </linearGradient>
          </defs>
          <circle cx="120" cy="120" r="112" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <circle
            cx="120" cy="120" r="112" fill="none" stroke="url(#nerdio-ring-grad-outer)" strokeWidth="2.5" strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 112 * 0.16} ${2 * Math.PI * 112}`}
          />
        </svg>
        <svg className="nerdio-ring-inner" viewBox="0 0 240 240" width="196" height="196">
          <defs>
            <linearGradient id="nerdio-ring-grad-inner" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={solanaGreen} />
              <stop offset="100%" stopColor={solanaPurple} />
            </linearGradient>
          </defs>
          <circle cx="120" cy="120" r="112" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <circle
            cx="120" cy="120" r="112" fill="none" stroke="url(#nerdio-ring-grad-inner)" strokeWidth="2.5" strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 112 * 0.14} ${2 * Math.PI * 112}`}
            opacity="0.85"
          />
        </svg>

        <div style={{ position: "relative", zIndex: 1, fontFamily: heading, fontWeight: 800, color: "#fff", fontSize: "1.8rem", letterSpacing: "0.06em" }}>
          {WORD.slice(0, typed)}
          <span className="nerdio-gate-caret">|</span>
        </div>
      </div>

      <style>{`
        .nerdio-splash { transition: opacity ${FADE_MS}ms ease; }
        .nerdio-splash-out { opacity: 0; }

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

        .nerdio-gate-caret {
          display: inline-block; margin-left: 2px; color: ${lemon};
          animation: nerdio-caret-blink 0.9s steps(1) infinite;
        }
        @keyframes nerdio-caret-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
      `}</style>
    </div>
  );
}
