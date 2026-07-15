import { Link } from "wouter";
import { Profile } from "@/lib/nerdio-data";
import { heading, body, bg, surface, white, whiteSoft, whiteFaint, stroke, lemon, shadowCard } from "@/lib/theme";

export function ProfileMenu({ profile, onSignOut, onClose }: {
  profile: Profile | null; onSignOut: () => void; onClose: () => void;
}) {
  const referralLink = profile ? `${window.location.origin}?ref=${profile.referral_code}` : "";

  return (
    <div style={{
      position: "absolute", top: "calc(100% + 10px)", right: 0, width: "290px",
      background: surface, border: `1px solid ${stroke}`, borderRadius: "16px",
      boxShadow: shadowCard, padding: "18px", zIndex: 20,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
        {profile?.x_avatar_url ? (
          <img src={profile.x_avatar_url} alt="" style={{ width: 42, height: 42, borderRadius: "50%" }} />
        ) : (
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: bg }} />
        )}
        <div>
          <div style={{ fontFamily: heading, fontSize: "0.92rem", fontWeight: 700, color: white }}>@{profile?.x_handle ?? "..."}</div>
          <div style={{ fontFamily: body, fontSize: "0.72rem", color: whiteFaint }}>Nerdio member</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "14px" }}>
        <div style={{ background: bg, borderRadius: "10px", padding: "10px 12px" }}>
          <div style={{ fontFamily: body, fontSize: "0.62rem", color: whiteFaint, textTransform: "uppercase", letterSpacing: "0.06em" }}>Points</div>
          <div style={{ fontFamily: heading, fontSize: "1.3rem", fontWeight: 800, color: lemon }}>{profile?.points ?? 0}</div>
        </div>
        <div style={{ background: bg, borderRadius: "10px", padding: "10px 12px" }}>
          <div style={{ fontFamily: body, fontSize: "0.62rem", color: whiteFaint, textTransform: "uppercase", letterSpacing: "0.06em" }}>Referred</div>
          <div style={{ fontFamily: heading, fontSize: "1.3rem", fontWeight: 800, color: white }}>{profile?.referral_count ?? 0}</div>
        </div>
      </div>

      <div style={{ marginBottom: "14px" }}>
        <div style={{ fontFamily: body, fontSize: "0.68rem", color: whiteFaint, marginBottom: "6px" }}>Your referral link</div>
        <div style={{ display: "flex", gap: "6px" }}>
          <div style={{
            flex: 1, background: bg, borderRadius: "8px", padding: "8px 10px",
            fontFamily: body, fontSize: "0.7rem", color: whiteSoft,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {referralLink || "connect to generate"}
          </div>
          <button
            onClick={() => referralLink && navigator.clipboard.writeText(referralLink)}
            style={{
              background: lemon, color: bg, border: "none", borderRadius: "8px",
              padding: "0 12px", fontFamily: heading, fontSize: "0.68rem", fontWeight: 700, cursor: "pointer",
            }}
          >
            Copy
          </button>
        </div>
      </div>

      <Link
        href="/profile"
        onClick={onClose}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          fontFamily: heading, fontSize: "0.8rem", fontWeight: 700, color: white,
          textDecoration: "none", padding: "10px 2px", borderTop: `1px solid ${stroke}`, marginTop: "4px",
        }}
      >
        View full profile
        <span style={{ color: lemon }}>&rarr;</span>
      </Link>

      <button
        onClick={onSignOut}
        style={{
          width: "100%", marginTop: "8px", background: "none", border: `1px solid ${stroke}`,
          borderRadius: "8px", padding: "9px", color: whiteFaint,
          fontFamily: body, fontSize: "0.72rem", cursor: "pointer",
        }}
      >
        Disconnect
      </button>
    </div>
  );
}
