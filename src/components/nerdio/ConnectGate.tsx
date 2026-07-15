import { heading, body, bg, surface, white, whiteSoft, whiteFaint, stroke, lemon, shadowCard } from "@/lib/theme";

export function ConnectGate({ onConnect, connecting }: { onConnect: () => void; connecting: boolean }) {
  return (
    <div style={{ minHeight: "100vh", background: bg, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: "380px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "26px" }}>
          <img src="/Nerd-logo.jpg" alt="" style={{ width: "34px", height: "34px", borderRadius: "50%" }} />
          <span style={{ fontFamily: heading, fontSize: "1.2rem", fontWeight: 800, color: white }}>The Nerdio</span>
        </div>

        <div style={{
          background: surface, border: `1px solid ${stroke}`, borderRadius: "20px",
          padding: "28px 24px", boxShadow: shadowCard, textAlign: "center",
        }}>
          <img
            src="/Nerd-head.png"
            alt="Nerdio"
            style={{
              width: "92px", height: "92px", objectFit: "cover", borderRadius: "50%",
              border: `3px solid ${lemon}`, margin: "0 auto 18px", display: "block", background: "#fff",
            }}
          />

          <h1 style={{ margin: "0 0 8px", fontFamily: heading, fontSize: "1.35rem", fontWeight: 800, color: white, lineHeight: 1.25 }}>
            The airdrop is live
          </h1>
          <p style={{ margin: "0 0 22px", fontFamily: body, fontSize: "0.86rem", lineHeight: 1.6, color: whiteSoft }}>
            Connect your X account to start earning points from daily tasks and referrals.
          </p>

          <button
            onClick={onConnect}
            disabled={connecting}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "9px",
              background: connecting ? "rgba(215,242,76,0.4)" : lemon, color: bg,
              border: "none", borderRadius: "12px", padding: "14px",
              fontFamily: heading, fontSize: "0.9rem", fontWeight: 800,
              cursor: connecting ? "not-allowed" : "pointer",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93Zm-1.29 19.42h2.04L6.49 3.32H4.3l13.31 17.25Z" />
            </svg>
            {connecting ? "Connecting..." : "Connect X to enter"}
          </button>
          <p style={{ margin: "12px 0 0", fontFamily: body, fontSize: "0.68rem", color: whiteFaint }}>
            We only read your public profile. Nothing is posted on your behalf.
          </p>
        </div>
      </div>
    </div>
  );
}
