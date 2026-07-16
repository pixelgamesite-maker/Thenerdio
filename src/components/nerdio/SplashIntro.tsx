import { useEffect, useState } from "react";
import { heading, bg, white, lemon } from "@/lib/theme";

const SEEN_KEY = "nerdio_splash_seen";

/* Plays once per browser session on first load, then fades out for good.
   Pure CSS/SVG — no animation library, so it can't introduce a new
   dependency the build doesn't have. */
export function useSplashOnce() {
  const [show, setShow] = useState(() => {
    try { return !sessionStorage.getItem(SEEN_KEY); } catch { return true; }
  });

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => finish(), 2200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finish() {
    try { sessionStorage.setItem(SEEN_KEY, "1"); } catch {}
    setShow(false);
  }

  return { show, finish };
}

export function SplashIntro({ onFinish }: { onFinish: () => void }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLeaving(true), 1750);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(onFinish, 450);
    return () => clearTimeout(t);
  }, [leaving, onFinish]);

  return (
    <div
      onClick={() => setLeaving(true)}
      className={`nerdio-splash ${leaving ? "nerdio-splash-out" : ""}`}
      style={{
        position: "fixed", inset: 0, zIndex: 100, background: bg,
        display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
      }}
    >
      <div className="nerdio-reticle">
        <span className="nerdio-corner nerdio-corner-tl" />
        <span className="nerdio-corner nerdio-corner-tr" />
        <span className="nerdio-corner nerdio-corner-bl" />
        <span className="nerdio-corner nerdio-corner-br" />

        <svg className="nerdio-ring" viewBox="0 0 200 200" width="230" height="230">
          <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
          <circle
            cx="100" cy="100" r="92" fill="none" stroke={lemon} strokeWidth="1.6"
            strokeDasharray="4 10" strokeLinecap="round"
          />
        </svg>

        <div className="nerdio-splash-mark">
          <img src="/Nerd-logo.jpg" alt="" className="nerdio-splash-logo" />
          <span style={{ fontFamily: heading, fontWeight: 800, color: white, fontSize: "1.4rem", letterSpacing: "0.02em" }}>
            NERDIO
          </span>
        </div>
      </div>

      <style>{`
        .nerdio-splash { transition: opacity 0.45s ease; }
        .nerdio-splash-out { opacity: 0; }

        .nerdio-reticle {
          position: relative; width: 230px; height: 230px;
          display: flex; align-items: center; justify-content: center;
        }
        .nerdio-corner {
          position: absolute; width: 22px; height: 22px;
          border-color: ${lemon}; opacity: 0;
          animation: nerdio-corner-in 0.6s ease forwards;
        }
        .nerdio-corner-tl { top: -6px; left: -6px; border-top: 2px solid; border-left: 2px solid; animation-delay: 0.05s; }
        .nerdio-corner-tr { top: -6px; right: -6px; border-top: 2px solid; border-right: 2px solid; animation-delay: 0.15s; }
        .nerdio-corner-bl { bottom: -6px; left: -6px; border-bottom: 2px solid; border-left: 2px solid; animation-delay: 0.15s; }
        .nerdio-corner-br { bottom: -6px; right: -6px; border-bottom: 2px solid; border-right: 2px solid; animation-delay: 0.05s; }
        @keyframes nerdio-corner-in {
          0%   { opacity: 0; transform: scale(1.6); }
          100% { opacity: 1; transform: scale(1); }
        }

        .nerdio-ring {
          position: absolute; opacity: 0;
          animation: nerdio-spin 14s linear infinite, nerdio-ring-in 0.5s ease 0.2s forwards;
        }
        @keyframes nerdio-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes nerdio-ring-in { to { opacity: 1; } }

        .nerdio-splash-mark {
          display: flex; flex-direction: column; align-items: center; gap: 10px;
          opacity: 0; filter: blur(6px); transform: scale(0.85);
          animation: nerdio-mark-in 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) 0.35s forwards;
        }
        @keyframes nerdio-mark-in {
          0%   { opacity: 0; filter: blur(6px); transform: scale(0.85) skewX(6deg); }
          60%  { opacity: 1; filter: blur(0px); transform: scale(1.04) skewX(-2deg); }
          100% { opacity: 1; filter: blur(0px); transform: scale(1) skewX(0deg); }
        }
        .nerdio-splash-logo {
          width: 54px; height: 54px; border-radius: 50%; object-fit: cover;
        }
      `}</style>
    </div>
  );
}
