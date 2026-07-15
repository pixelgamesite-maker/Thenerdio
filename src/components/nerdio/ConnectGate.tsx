import { Masthead } from "@/components/nerdio/Masthead";
import { display, stamp_f, paper, paperCard, ink, inkSoft, rule, accent, accentDark, shadowCard } from "@/lib/theme";

export function ConnectGate({ onConnect, connecting }: { onConnect: () => void; connecting: boolean }) {
  const today = new Date().toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });

  return (
    <div style={{ minHeight: "100vh", background: paper, padding: "12px" }}>
      <div style={{ maxWidth: "480px", margin: "0 auto" }}>
        <Masthead dateline={today} />

        <div style={{
          background: paperCard, boxShadow: shadowCard, padding: "26px 24px 28px", marginTop: "18px",
          backgroundImage: "radial-gradient(rgba(33,28,20,0.05) 0.7px, transparent 0.7px)",
          backgroundSize: "5px 5px",
        }}>
          <div style={{ position: "relative", width: "132px", margin: "0 auto 14px" }}>
            <img
              src="/Nerd-head.png"
              alt="Nerdio"
              style={{
                width: "132px", height: "132px", objectFit: "cover",
                border: `3px solid ${ink}`, boxShadow: "0 4px 10px rgba(33,20,12,0.25)",
                transform: "rotate(-2deg)", display: "block", background: "#fff",
              }}
            />
            <div style={{
              position: "absolute", top: "-8px", right: "-14px",
              fontFamily: stamp_f, fontSize: "0.58rem", letterSpacing: "0.1em",
              textTransform: "uppercase", color: "#fff",
              background: accent, padding: "3px 7px", transform: "rotate(6deg)",
            }}>
              Exclusive
            </div>
          </div>
          <div style={{ height: "1px", background: rule, margin: "6px 0 20px" }} />

          <button
            onClick={onConnect}
            disabled={connecting}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
              background: connecting ? "#c7bda3" : accent, color: "#fff",
              border: "none", padding: "15px",
              fontFamily: display, fontSize: "0.95rem", letterSpacing: "0.02em", textTransform: "uppercase",
              cursor: connecting ? "not-allowed" : "pointer", transition: "background 0.2s",
            }}
            onMouseEnter={e => { if (!connecting) (e.currentTarget as HTMLButtonElement).style.background = accentDark; }}
            onMouseLeave={e => { if (!connecting) (e.currentTarget as HTMLButtonElement).style.background = accent; }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93Zm-1.29 19.42h2.04L6.49 3.32H4.3l13.31 17.25Z" />
            </svg>
            {connecting ? "Connecting..." : "Connect X to enter"}
          </button>
          <p style={{ margin: "12px 0 0", fontFamily: stamp_f, fontSize: "0.64rem", color: inkSoft, textAlign: "center" }}>
            We only read your public profile. Nothing is posted on your behalf.
          </p>
        </div>
      </div>
    </div>
  );
}
