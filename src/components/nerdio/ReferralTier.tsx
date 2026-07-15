import { display, stamp_f, ink, inkSoft, paperCard, paperDeep, rule, highlight } from "@/lib/theme";

export function ReferralTier({ label, progress, of, reward, unlocked }: {
  label: string; progress: number; of: number; reward: string; unlocked: boolean;
}) {
  const pct = Math.round((progress / of) * 100);
  return (
    <div style={{ background: paperCard, border: `1px solid ${unlocked ? highlight : rule}`, padding: "14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: stamp_f, fontSize: "0.68rem", color: inkSoft, marginBottom: "8px" }}>
        <span>{label}</span>
        <span style={{ color: unlocked ? highlight : inkSoft }}>{reward}</span>
      </div>
      <div style={{ height: "6px", background: paperDeep, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: unlocked ? highlight : ink, transition: "width 0.4s ease" }} />
      </div>
      {unlocked && <div style={{ fontFamily: display, fontSize: "0.62rem", color: highlight, marginTop: "6px", textTransform: "uppercase" }}>Unlocked</div>}
    </div>
  );
}
