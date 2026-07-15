import { useEffect, useState } from "react";
import { TerminalBar } from "@/components/nerdio/TerminalBar";
import { bgVoid, bgPanel, mono, sans, green, greenHi, line, lineSoft, dim } from "@/lib/theme";

const BOOT_LINES = [
  "$ whoami",
  "> guest",
  "$ ./enter_nerdio.sh",
  "> scanning for x_account...",
  "> not found. connection required.",
];

export function ConnectGate({ onConnect, connecting }: { onConnect: () => void; connecting: boolean }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= BOOT_LINES.length) return;
    const t = setTimeout(() => setShown(s => s + 1), 420);
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <div style={{
      minHeight: "100vh", background: bgVoid, display: "flex",
      alignItems: "center", justifyContent: "center", padding: "24px",
      fontFamily: mono,
    }}>
      <div style={{ width: "100%", maxWidth: "460px", border: `1px solid ${line}`, borderRadius: "8px", overflow: "hidden", boxShadow: `0 0 60px ${green}0d` }}>
        <TerminalBar path="~" />
        <div style={{ padding: "28px 24px 26px", background: bgPanel }}>
          <div style={{ minHeight: "150px" }}>
            {BOOT_LINES.slice(0, shown).map((l, i) => (
              <div key={i} style={{
                fontSize: "0.82rem", lineHeight: 1.9,
                color: l.startsWith("$") ? "rgba(255,255,255,0.85)" : green,
              }}>
                {l}
              </div>
            ))}
            {shown >= BOOT_LINES.length && (
              <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.85)" }}>
                $ <span style={{ opacity: 0.6 }}>_</span>
              </div>
            )}
          </div>

          <div style={{ marginTop: "22px", paddingTop: "22px", borderTop: `1px solid ${lineSoft}` }}>
            <h1 style={{ margin: "0 0 6px", fontFamily: sans, fontSize: "1.5rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.01em" }}>
              THE NERDIO
            </h1>
            <p style={{ margin: "0 0 20px", fontFamily: sans, fontSize: "0.85rem", color: dim, lineHeight: 1.5 }}>
              The internet's favorite crypto nerd is running an airdrop.
              Connect your X account to open the terminal.
            </p>
            <button
              onClick={onConnect}
              disabled={connecting}
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                background: connecting ? "rgba(143,214,148,0.15)" : green, color: "#0a0b09",
                border: "none", borderRadius: "5px", padding: "14px",
                fontFamily: sans, fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.04em",
                cursor: connecting ? "not-allowed" : "pointer", transition: "all 0.2s",
              }}
              onMouseEnter={e => { if (!connecting) (e.currentTarget as HTMLButtonElement).style.background = greenHi; }}
              onMouseLeave={e => { if (!connecting) (e.currentTarget as HTMLButtonElement).style.background = green; }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93Zm-1.29 19.42h2.04L6.49 3.32H4.3l13.31 17.25Z" />
              </svg>
              {connecting ? "Connecting..." : "Connect X to enter"}
            </button>
            <p style={{ margin: "12px 0 0", fontFamily: sans, fontSize: "0.68rem", color: "rgba(238,232,217,0.3)", textAlign: "center" }}>
              We only read your public profile. Nothing is posted on your behalf.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
