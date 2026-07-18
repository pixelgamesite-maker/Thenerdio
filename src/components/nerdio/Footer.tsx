import { body, whiteFaint, stroke, lemon } from "@/lib/theme";
import { X_PROFILE_URL, SUPPORT_EMAIL } from "@/lib/nerdio-data";

/* Forces Gmail's web compose view specifically (pre-filled with our
   support address) rather than a bare `mailto:`, which would just hand
   off to whatever mail client/app happens to be the device default. */
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${SUPPORT_EMAIL}`;

function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        width: "40px", height: "40px", borderRadius: "50%", border: `1px solid ${stroke}`,
        display: "flex", alignItems: "center", justifyContent: "center", color: lemon,
        textDecoration: "none", transition: "border-color 0.15s ease",
      }}
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <div style={{
      marginTop: "36px", paddingTop: "26px", borderTop: `1px solid ${stroke}`,
      display: "flex", flexDirection: "column", alignItems: "center", gap: "14px",
    }}>
      <div style={{ display: "flex", gap: "10px" }}>
        <IconLink href={X_PROFILE_URL} label="Nerdio on X">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93Zm-1.29 19.42h2.04L6.49 3.32H4.3l13.31 17.25Z" />
          </svg>
        </IconLink>
        <IconLink href={GMAIL_COMPOSE_URL} label={`Email ${SUPPORT_EMAIL}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2.5" y="4.5" width="19" height="15" rx="2.2" />
            <path d="m3 6 9 6.5L21 6" />
          </svg>
        </IconLink>
      </div>
      <p style={{ margin: 0, fontFamily: body, fontSize: "0.7rem", color: whiteFaint }}>
        © {new Date().getFullYear()} The Nerdio
      </p>
    </div>
  );
}
