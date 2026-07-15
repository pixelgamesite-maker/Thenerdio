import { DailyTask } from "@/lib/nerdio-data";
import { sans, mono, green, dim, bgPanel, line, lineSoft } from "@/lib/theme";

export function TaskRow({ task, done, onComplete }: { task: DailyTask; done: boolean; onComplete: () => void }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "14px",
      background: bgPanel, border: `1px solid ${done ? green + "55" : line}`,
      borderRadius: "6px", padding: "14px 16px", opacity: done ? 0.7 : 1,
    }}>
      <div style={{
        width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
        border: `1px solid ${done ? green : lineSoft}`, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: mono, fontSize: "0.7rem", color: done ? green : dim,
      }}>
        {done ? "✓" : task.kind === "follow" ? "+" : "↺"}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: sans, fontSize: "0.86rem", fontWeight: 700, color: "#fff" }}>{task.title}</div>
        <div style={{ fontFamily: sans, fontSize: "0.74rem", color: dim, marginTop: "2px" }}>{task.description}</div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontFamily: mono, fontSize: "0.72rem", color: green, marginBottom: "6px" }}>+{task.points}</div>
        <button
          onClick={onComplete}
          disabled={done}
          style={{
            background: done ? "transparent" : green, color: done ? green : "#0a0b09",
            border: `1px solid ${green}`, borderRadius: "4px", padding: "5px 12px",
            fontFamily: sans, fontSize: "0.68rem", fontWeight: 700, cursor: done ? "default" : "pointer",
          }}
        >
          {done ? "Done" : "Go"}
        </button>
      </div>
    </div>
  );
}
