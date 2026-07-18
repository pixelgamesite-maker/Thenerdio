import { body, whiteFaint, stroke, lemon } from "@/lib/theme";
import { X_PROFILE_URL, SUPPORT_EMAIL } from "@/lib/nerdio-data";

/* Plain mailto:, not a Gmail web-compose URL — the Gmail Android app
   doesn't reliably honor the view=cm/fs=1 compose params from that web
   URL, it just opens to the inbox. mailto: is what the OS hands
   straight to whatever mail app is set up (Gmail, for most Android
   devices) with a compose screen already open and addressed. */
const MAILTO = `mailto:${SUPPORT_EMAIL}`;

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
        <IconLink href={MAILTO} label={`Email ${SUPPORT_EMAIL}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2.5" y="4.5" width="19" height="15" rx="2.2" />
            <path d="m3 6 9 6.5L21 6" />
          </svg>
        </IconLink>
      </div>

      {/* Visible as text too, not just the icon — so the address is
          readable/copyable even if a device has no mail app configured
          to catch the mailto: link. */}
      <a
        href={MAILTO}
        style={{ fontFamily: body, fontSize: "0.72rem", color: whiteFaint, textDecoration: "none" }}
      >
        {SUPPORT_EMAIL}
      </a>

      <p style={{ margin: 0, fontFamily: body, fontSize: "0.7rem", color: whiteFaint }}>
        © {new Date().getFullYear()} The Nerdio
      </p>
    </div>
  );
}
