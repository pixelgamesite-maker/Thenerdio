import { heading, body, bg, surface, white, whiteSoft, whiteFaint, stroke, lemon, shadowCard } from "@/lib/theme";

export function ConnectModal({ open, onClose, onConnect, connecting }: {
  open: boolean; onClose: () => void; onConnect: () => void; connecting: boolean;
}) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 50, background: "rgba(4,18,12,0.72)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative", width: "100%", maxWidth: "360px",
          background: surface, border: `1px solid ${stroke}`, borderRadius: "20px",
          padding: "28px 24px 24px", boxShadow: shadowCard, textAlign: "center",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute", top: "14px", right: "14px",
            background: "none", border: "none", color: whiteFaint,
            fontSize: "1.1rem", lineHeight: 1, cursor: "pointer", padding: "4px",
          }}
        >
          &times;
        </button>

        <h2 style={{ margin: "6px 0 8px", fontFamily: heading, fontSize: "1.2rem", fontWeight: 800, color: white, lineHeight: 1.25 }}>
          The internet's favorite crypto nerd
        </h2>
        <p style={{ margin: "0 0 22px", fontFamily: body, fontSize: "0.84rem", lineHeight: 1.6, color: whiteSoft }}>
          Connect, complete daily tasks, and stack points while Nerdio runs the airdrop.
        </p>

        <button
          onClick={onConnect}
          disabled={connecting}
          style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "9px",
            background: connecting ? "rgba(215,242,76,0.4)" : lemon, color: bg,
            border: "none", borderRadius: "12px", padding: "13px",
            fontFamily: heading, fontSize: "0.86rem", fontWeight: 800,
            cursor: connecting ? "not-allowed" : "pointer",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93Zm-1.29 19.42h2.04L6.49 3.32H4.3l13.31 17.25Z" />
          </svg>
          {connecting ? "Connecting..." : "Connect X to enter"}
        </button>
        <p style={{ margin: "10px 0 0", fontFamily: body, fontSize: "0.64rem", color: whiteFaint }}>
          We only read your public profile. Nothing is posted on your behalf.
        </p>
      </div>
    </div>
  );
}
