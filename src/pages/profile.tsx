import { Clipping } from "@/components/nerdio/Clipping";
import { Label } from "@/components/nerdio/Label";
import { useNerdioProfile } from "@/context/NerdioContext";
import { display, serif, stamp_f, ink, inkSoft, accent, paperCard, rule } from "@/lib/theme";

export default function ProfilePage() {
  const { profile } = useNerdioProfile();

  return (
    <div>
      <Label text="Identity file" />
      <Clipping>
        <div style={{ fontFamily: stamp_f, fontSize: "0.66rem", letterSpacing: "0.06em", color: accent, marginBottom: "10px", textTransform: "uppercase" }}>
          Nerdio Times — holder record
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {profile?.x_avatar_url ? (
            <img src={profile.x_avatar_url} alt="" style={{ width: 56, height: 56, borderRadius: "50%", border: `2px solid ${ink}` }} />
          ) : (
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#d8d0ba", border: `2px solid ${ink}` }} />
          )}
          <div>
            <div style={{ fontFamily: display, fontSize: "1.2rem", color: ink }}>@{profile?.x_handle ?? "unknown"}</div>
            <div style={{ fontFamily: stamp_f, fontSize: "0.72rem", color: inkSoft }}>referral code: {profile?.referral_code ?? "—"}</div>
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
    <div style={{ background: paperCard, border: `1px solid ${rule}`, padding: "16px" }}>
      <div style={{ fontFamily: stamp_f, fontSize: "0.62rem", color: inkSoft, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontFamily: display, fontSize: "1.9rem", color: ink, marginTop: "4px" }}>{value}</div>
    </div>
  );
}
