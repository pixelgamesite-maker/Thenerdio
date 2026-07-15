import { Link, useLocation } from "wouter";
import { TerminalBar } from "@/components/nerdio/TerminalBar";
import { Profile } from "@/lib/nerdio-data";
import { sans, mono, green, dim, lineSoft, bgPanel2, line } from "@/lib/theme";

const TABS: { path: string; label: string }[] = [
  { path: "/profile", label: "Profile" },
  { path: "/airdrop", label: "Airdrop" },
  { path: "/faq", label: "FAQ" },
  { path: "/lore", label: "Lore" },
];

export function AppShell({ profile, onSignOut, children }: {
  profile: Profile | null; onSignOut: () => void; children: React.ReactNode;
}) {
  const [location] = useLocation();

  return (
    <div style={{ maxWidth: "880px", margin: "0 auto", minHeight: "100vh", borderLeft: `1px solid ${lineSoft}`, borderRight: `1px solid ${lineSoft}` }}>
      <TerminalBar path={location} />

      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 24px", borderBottom: `1px solid ${lineSoft}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {profile?.x_avatar_url ? (
            <img src={profile.x_avatar_url} alt="" style={{ width: 30, height: 30, borderRadius: "50%", border: `1px solid ${line}` }} />
          ) : (
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: bgPanel2, border: `1px solid ${line}` }} />
          )}
          <div>
            <div style={{ fontFamily: sans, fontSize: "0.78rem", fontWeight: 700, color: "#fff" }}>@{profile?.x_handle ?? "..."}</div>
            <div style={{ fontFamily: mono, fontSize: "0.6rem", color: green }}>{profile?.points ?? 0} pts</div>
          </div>
        </div>
        <button onClick={onSignOut} style={{
          background: "none", border: `1px solid ${lineSoft}`, borderRadius: "4px",
          padding: "6px 12px", color: dim, fontFamily: mono, fontSize: "0.62rem",
          letterSpacing: "0.08em", cursor: "pointer",
        }}>
          disconnect
        </button>
      </div>

      <nav style={{ display: "flex", borderBottom: `1px solid ${lineSoft}` }}>
        {TABS.map(t => {
          const active = location === t.path;
          return (
            <Link key={t.path} href={t.path} style={{
              flex: 1, padding: "13px 10px", textAlign: "center", textDecoration: "none",
              borderBottom: `2px solid ${active ? green : "transparent"}`,
              color: active ? "#fff" : dim,
              fontFamily: mono, fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase",
              transition: "all 0.2s",
            }}>
              {t.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: "32px 24px 60px" }}>{children}</div>
    </div>
  );
}
