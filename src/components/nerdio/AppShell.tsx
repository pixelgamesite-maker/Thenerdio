import { Link, useLocation } from "wouter";
import { Masthead } from "@/components/nerdio/Masthead";
import { Profile } from "@/lib/nerdio-data";
import { display, stamp_f, serif, paper, ink, inkSoft, rule, accent } from "@/lib/theme";

const TABS: { path: string; label: string }[] = [
  { path: "/", label: "Front Page" },
  { path: "/profile", label: "Profile" },
  { path: "/airdrop", label: "Airdrop" },
];

export function AppShell({ profile, onSignOut, children }: {
  profile: Profile | null; onSignOut: () => void; children: React.ReactNode;
}) {
  const [location] = useLocation();
  const today = new Date().toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });

  return (
    <div style={{ minHeight: "100vh", background: paper }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <Masthead dateline={today} />

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 20px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {profile?.x_avatar_url ? (
              <img src={profile.x_avatar_url} alt="" style={{ width: 34, height: 34, borderRadius: "50%", border: `2px solid ${ink}` }} />
            ) : (
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#d8d0ba", border: `2px solid ${ink}` }} />
            )}
            <div>
              <div style={{ fontFamily: serif, fontSize: "0.82rem", fontWeight: 600, color: ink }}>@{profile?.x_handle ?? "..."}</div>
              <div style={{ fontFamily: stamp_f, fontSize: "0.64rem", color: accent }}>{profile?.points ?? 0} pts on file</div>
            </div>
          </div>
          <button onClick={onSignOut} style={{
            background: "none", border: `1px solid ${rule}`, borderRadius: "0px",
            padding: "6px 12px", color: inkSoft, fontFamily: stamp_f, fontSize: "0.62rem",
            letterSpacing: "0.06em", cursor: "pointer",
          }}>
            disconnect
          </button>
        </div>

        <nav style={{ display: "flex", borderTop: `2px solid ${ink}`, borderBottom: `2px solid ${ink}` }}>
          {TABS.map(t => {
            const active = location === t.path;
            return (
              <Link key={t.path} href={t.path} style={{
                flex: 1, padding: "12px 8px", textAlign: "center", textDecoration: "none",
                background: active ? ink : "transparent",
                color: active ? paper : ink,
                fontFamily: display, fontSize: "0.78rem", letterSpacing: "0.04em", textTransform: "uppercase",
                transition: "all 0.15s",
              }}>
                {t.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: "28px 20px 60px" }}>{children}</div>
      </div>
    </div>
  );
}
