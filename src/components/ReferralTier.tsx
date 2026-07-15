import { mono, sans, green, dim, bgPanel, line } from "@/lib/theme";

export function ReferralTier({ label, progress, of, reward, unlocked }: {
  label: string; progress: number; of: number; reward: string; unlocked: boolean;
}) {
  const pct = Math.round((progress / of) * 100);
  return (
    <div style={{ background: bgPanel, border: `1px solid ${unlocked ? green : line}`, borderRadius: "6px", padding: "14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: "0.68rem", color: dim, marginBottom: "8px" }}>
        <span>{label}</span>
        <span style={{ color: unlocked ? green : dim }}>{reward}</span>
      </div>
      <div style={{ height: "5px", background: "rgba(255,255,255,0.06)", borderRadius: "3px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: green, transition: "width 0.4s ease" }} />
      </div>
      {unlocked && <div style={{ fontFamily: sans, fontSize: "0.62rem", color: green, marginTop: "6px" }}>Unlocked</div>}
    </div>
  );
}
