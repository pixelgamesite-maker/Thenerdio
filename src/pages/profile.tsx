import { Card } from "@/components/nerdio/Card";
import { Label } from "@/components/nerdio/Label";
import { useNerdioProfile } from "@/context/NerdioContext";
import { heading, body, white, whiteFaint, surfaceSoft, lemon } from "@/lib/theme";

export default function ProfilePage() {
  const { profile } = useNerdioProfile();

  return (
    <div>
      <Label text="Profile" />
      <Card>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {profile?.x_avatar_url ? (
            <img src={profile.x_avatar_url} alt="" style={{ width: 60, height: 60, borderRadius: "50%" }} />
          ) : (
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: surfaceSoft }} />
          )}
          <div>
            <div style={{ fontFamily: heading, fontSize: "1.15rem", fontWeight: 800, color: white }}>@{profile?.x_handle ?? "unknown"}</div>
            <div style={{ fontFamily: body, fontSize: "0.76rem", color: whiteFaint, marginTop: "2px" }}>Referral code: {profile?.referral_code ?? "—"}</div>
          </div>
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "16px" }}>
        <StatBlock label="Points balance" value={String(profile?.points ?? 0)} />
        <StatBlock label="Referrals" value={String(profile?.referral_count ?? 0)} />
      </div>
    </div>
  );
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <Card style={{ padding: "16px" }}>
      <div style={{ fontFamily: body, fontSize: "0.66rem", color: whiteFaint, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontFamily: heading, fontSize: "1.7rem", fontWeight: 800, color: lemon, marginTop: "4px" }}>{value}</div>
    </Card>
  );
}
