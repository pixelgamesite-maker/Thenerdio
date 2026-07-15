import { DailyTask } from "@/lib/nerdio-data";
import { heading, body, white, whiteFaint, surface, bg, stroke, lemon } from "@/lib/theme";

export function TaskRow({ task, done, onComplete }: { task: DailyTask; done: boolean; onComplete: () => void }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "14px",
      background: surface, border: `1px solid ${stroke}`, borderRadius: "12px",
      padding: "14px 16px", opacity: done ? 0.6 : 1,
    }}>
      <div style={{
        width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
        background: done ? lemon : bg, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: heading, fontSize: "0.8rem", fontWeight: 800, color: done ? bg : whiteFaint,
      }}>
        {done ? "✓" : task.kind === "follow" ? "+" : "↺"}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: heading, fontSize: "0.88rem", fontWeight: 700, color: white }}>{task.title}</div>
        <div style={{ fontFamily: body, fontSize: "0.76rem", color: whiteFaint, marginTop: "2px" }}>{task.description}</div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontFamily: heading, fontSize: "0.8rem", fontWeight: 800, color: lemon, marginBottom: "6px" }}>+{task.points}</div>
        <button
          onClick={onComplete}
          disabled={done}
          style={{
            background: done ? "transparent" : lemon, color: done ? whiteFaint : bg,
            border: done ? `1px solid ${stroke}` : "none", borderRadius: "8px", padding: "6px 14px",
            fontFamily: heading, fontSize: "0.7rem", fontWeight: 700,
            cursor: done ? "default" : "pointer",
          }}
        >
          {done ? "Done" : "Go"}
        </button>
      </div>
    </div>
  );
}
