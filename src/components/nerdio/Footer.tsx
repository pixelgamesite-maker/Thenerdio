import { body, whiteFaint, stroke, lemon } from "@/lib/theme";
import { X_PROFILE_URL } from "@/lib/nerdio-data";

export function Footer() {
  return (
    <div style={{
      marginTop: "36px", paddingTop: "26px", borderTop: `1px solid ${stroke}`,
      display: "flex", flexDirection: "column", alignItems: "center", gap: "14px",
    }}>
      <a
        href={X_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nerdio on X"
        style={{
          width: "40px", height: "40px", borderRadius: "50%", border: `1px solid ${stroke}`,
          display: "flex", alignItems: "center", justifyContent: "center", color: lemon,
          textDecoration: "none", transition: "border-color 0.15s ease",
        }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93Zm-1.29 19.42h2.04L6.49 3.32H4.3l13.31 17.25Z" />
        </svg>
      </a>
      <p style={{ margin: 0, fontFamily: body, fontSize: "0.7rem", color: whiteFaint }}>
        © {new Date().getFullYear()} The Nerdio
      </p>
    </div>
  );
}
