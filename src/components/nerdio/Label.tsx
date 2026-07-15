import { mono, green, line } from "@/lib/theme";

export function Label({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
      <div style={{ height: "1px", flex: 1, background: `linear-gradient(90deg,transparent,${line})` }} />
      <span style={{ fontFamily: mono, fontSize: "0.62rem", letterSpacing: "0.24em", textTransform: "uppercase", color: green }}>
        {text}
      </span>
      <div style={{ height: "1px", flex: 1, background: `linear-gradient(90deg,${line},transparent)` }} />
    </div>
  );
}
