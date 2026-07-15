import { DailyTask } from "@/lib/nerdio-data";
import { display, serif, stamp_f, ink, inkSoft, paperCard, rule, accent } from "@/lib/theme";

export function TaskRow({ task, done, onComplete }: { task: DailyTask; done: boolean; onComplete: () => void }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "14px",
      background: paperCard, border: `1px solid ${rule}`,
      padding: "14px 16px", opacity: done ? 0.6 : 1,
    }}>
      <div style={{
        width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
        border: `2px solid ${done ? accent : ink}`, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: stamp_f, fontSize: "0.7rem", color: done ? accent : ink,
      }}>
        {done ? "✓" : task.kind === "follow" ? "+" : "↺"}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: serif, fontSize: "0.92rem", fontWeight: 600, color: ink }}>{task.title}</div>
        <div style={{ fontFamily: serif, fontSize: "0.78rem", color: inkSoft, marginTop: "2px" }}>{task.description}</div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontFamily: display, fontSize: "0.85rem", color: accent, marginBottom: "6px" }}>+{task.points}</div>
        <button
          onClick={onComplete}
          disabled={done}
          style={{
            background: done ? "transparent" : accent, color: done ? accent : "#fff",
            border: `1px solid ${accent}`, padding: "5px 14px",
            fontFamily: display, fontSize: "0.68rem", textTransform: "uppercase",
            cursor: done ? "default" : "pointer",
          }}
        >
          {done ? "Done" : "Go"}
        </button>
      </div>
    </div>
  );
}
