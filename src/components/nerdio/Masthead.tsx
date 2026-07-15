import { display, stamp_f, ink, inkFaint, rule } from "@/lib/theme";

export function Masthead({ dateline }: { dateline: string }) {
  return (
    <div style={{ textAlign: "center", padding: "22px 20px 14px" }}>
      <div style={{
        fontFamily: stamp_f, fontSize: "0.62rem", letterSpacing: "0.18em",
        textTransform: "uppercase", color: inkFaint, marginBottom: "6px",
      }}>
        Vol. I, No. 1 · {dateline}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
        <img
          src="/Nerd-logo.jpg"
          alt=""
          style={{ width: "clamp(34px, 8vw, 46px)", height: "clamp(34px, 8vw, 46px)", objectFit: "cover", borderRadius: "50%", border: `2px solid ${ink}` }}
        />
        <div style={{
          fontFamily: display, fontSize: "clamp(2.2rem, 9vw, 3.1rem)", color: ink,
          letterSpacing: "0.01em", lineHeight: 1, textTransform: "uppercase",
        }}>
          The Nerdio
        </div>
      </div>
      <div style={{
        fontFamily: stamp_f, fontSize: "0.68rem", color: inkFaint,
        marginTop: "8px", fontStyle: "italic",
      }}>
        &ldquo;All the alpha that's fit to print&rdquo;
      </div>
      <div style={{ height: "3px", background: ink, marginTop: "16px" }} />
      <div style={{ height: "1px", background: rule, marginTop: "3px" }} />
    </div>
  );
}
