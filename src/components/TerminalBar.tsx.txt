import { mono, dim, lineSoft } from "@/lib/theme";

export function TerminalBar({ path }: { path: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "10px",
      padding: "10px 16px", background: "#0d0f08",
      borderBottom: `1px solid ${lineSoft}`,
    }}>
      <div style={{ display: "flex", gap: "6px" }}>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#4a4a42" }} />
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#4a4a42" }} />
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#4a4a42" }} />
      </div>
      <span style={{ fontFamily: mono, fontSize: "0.7rem", color: dim, letterSpacing: "0.02em" }}>
        nerdio@terminal: {path}
      </span>
    </div>
  );
}
