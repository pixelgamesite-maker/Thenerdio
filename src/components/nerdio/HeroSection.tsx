import { heading, body, white, whiteSoft, gradientAccent, solanaPurple, lemon } from "@/lib/theme";

export function HeroSection({ onJoin }: { onJoin: () => void }) {
  return (
    <div style={{ padding: "44px 24px 34px" }}>
      <div style={{
        fontFamily: heading, fontWeight: 800, color: white, textTransform: "uppercase",
        fontSize: "clamp(2.6rem, 15vw, 4rem)", lineHeight: 0.98, letterSpacing: "-0.01em",
      }}>
        The<br />Nerdio
      </div>

      <p style={{
        margin: "18px 0 0", fontFamily: body, fontSize: "1.02rem", lineHeight: 1.55,
        color: whiteSoft, maxWidth: "300px",
      }}>
        The internet's favorite crypto nerd
      </p>

      <div className="nerdio-stripe-divider" />

      <button
        onClick={onJoin}
        className="nerdio-sticker-btn"
        style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
          background: gradientAccent, color: white,
          borderRadius: "14px", padding: "14px 26px", fontFamily: heading, fontSize: "0.9rem",
          fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em",
          border: "3px solid #0a0a0a", boxShadow: "4px 4px 0 #0a0a0a", cursor: "pointer",
        }}
      >
        Join Airdrop Campaign
        <span>&rarr;</span>
      </button>

      <style>{`
        .nerdio-stripe-divider {
          height: 14px; margin: 30px 0 26px; border-radius: 3px;
          background: repeating-linear-gradient(
            135deg,
            ${solanaPurple} 0px, ${solanaPurple} 10px,
            ${lemon} 10px, ${lemon} 20px
          );
          opacity: 0.9;
        }
        .nerdio-sticker-btn { transition: transform 0.1s ease, box-shadow 0.1s ease; }
        .nerdio-sticker-btn:active {
          transform: translate(3px, 3px);
          box-shadow: 1px 1px 0 #0a0a0a !important;
        }
      `}</style>
    </div>
  );
}
