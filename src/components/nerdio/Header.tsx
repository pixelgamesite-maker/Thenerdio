import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ProfileMenu } from "@/components/nerdio/ProfileMenu";
import { Profile } from "@/lib/nerdio-data";
import { heading, bg, surface, white, stroke, lemon } from "@/lib/theme";

export function Header({ profile, onSignOut }: { profile: Profile | null; onSignOut: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 10, background: bg }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 20px 14px", borderBottom: `1px solid ${stroke}`,
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "9px", textDecoration: "none" }}>
          <img src="/Nerd-logo.jpg" alt="" style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
          <span style={{ fontFamily: heading, fontSize: "1.05rem", fontWeight: 800, color: white, letterSpacing: "-0.01em" }}>
            The Nerdio
          </span>
        </Link>

        <div ref={ref} style={{ position: "relative" }}>
          <button
            onClick={() => setOpen(o => !o)}
            style={{
              background: "none", border: `1px solid ${stroke}`, borderRadius: "50%",
              width: "38px", height: "38px", padding: 0, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
            }}
          >
            {profile?.x_avatar_url ? (
              <img src={profile.x_avatar_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", background: surface }} />
            )}
          </button>
          {open && <ProfileMenu profile={profile} onSignOut={onSignOut} onClose={() => setOpen(false)} />}
        </div>
      </div>

      <div style={{ padding: "16px 20px 4px" }}>
        <Link
          href="/airdrop"
          className="nerdio-sticker-btn"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            background: lemon, color: bg, textDecoration: "none",
            borderRadius: "14px", padding: "14px", fontFamily: heading, fontSize: "0.9rem",
            fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em",
            border: "3px solid #0a0a0a", boxShadow: "4px 4px 0 #0a0a0a",
          }}
        >
          Airdrop Campaign
          <span>&rarr;</span>
        </Link>
      </div>
      <style>{`
        .nerdio-sticker-btn { transition: transform 0.1s ease, box-shadow 0.1s ease; }
        .nerdio-sticker-btn:active {
          transform: translate(3px, 3px);
          box-shadow: 1px 1px 0 #0a0a0a !important;
        }
      `}</style>
    </div>
  );
}
