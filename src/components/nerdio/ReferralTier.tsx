import { heading, body, whiteFaint, surface, surfaceSoft, stroke, lemon } from "@/lib/theme";

export function ReferralTier({ label, progress, of, reward, unlocked }: {
  label: string; progress: number; of: number; reward: string; unlocked: boolean;
}) {
  const pct = Math.round((progress / of) * 100);
  return (
    <div style={{ background: surface, border: `1px solid ${unlocked ? lemon : stroke}`, borderRadius: "12px", padding: "14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: body, fontSize: "0.72rem", color: whiteFaint, marginBottom: "8px" }}>
        <span>{label}</span>
        <span style={{ color: unlocked ? lemon : whiteFaint, fontWeight: 600 }}>{reward}</span>
      </div>
      <div style={{ height: "6px", background: surfaceSoft, borderRadius: "3px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: lemon, transition: "width 0.4s ease" }} />
      </div>
      {unlocked && <div style={{ fontFamily: heading, fontSize: "0.64rem", fontWeight: 700, color: lemon, marginTop: "6px" }}>Unlocked</div>}
    </div>
  );
}
