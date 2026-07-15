import { Clipping } from "@/components/nerdio/Clipping";
import { Label } from "@/components/nerdio/Label";
import { useNerdioProfile } from "@/context/NerdioContext";
import { sans, mono, green, stamp, dim, bgPanel, line } from "@/lib/theme";

export default function ProfilePage() {
  const { profile } = useNerdioProfile();

  return (
    <div>
      <Label text="Identity file" />
      <Clipping>
        <div style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: "0.68rem", letterSpacing: "0.06em", color: stamp, marginBottom: "10px" }}>
          NERDIO TIMES — HOLDER RECORD
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {profile?.x_avatar_url ? (
            <img src={profile.x_avatar_url} alt="" style={{ width: 56, height: 56, borderRadius: "50%" }} />
          ) : (
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#d8d2c0" }} />
          )}
          <div>
            <div style={{ fontFamily: sans, fontWeight: 800, fontSize: "1.1rem" }}>@{profile?.x_handle ?? "unknown"}</div>
            <div style={{ fontFamily: mono, fontSize: "0.72rem", color: "#4c4a3e" }}>referral code: {profile?.referral_code ?? "—"}</div>
          </div>
        </div>
      </Clipping>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "18px" }}>
        <StatBlock label="Points balance" value={String(profile?.points ?? 0)} />
        <StatBlock label="Referrals" value={String(profile?.referral_count ?? 0)} />
      </div>
    </div>
  );
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: bgPanel, border: `1px solid ${line}`, borderRadius: "6px", padding: "16px" }}>
      <div style={{ fontFamily: mono, fontSize: "0.6rem", color: dim, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontFamily: mono, fontSize: "1.6rem", color: green, fontWeight: 600, marginTop: "4px" }}>{value}</div>
    </div>
  );
}
