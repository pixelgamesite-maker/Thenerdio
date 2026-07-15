import { stamp_f, ink, rule } from "@/lib/theme";

/* Section rule — reads like a tabloid subhead/kicker rather than a
   hairline-and-caps UI divider. */
export function Label({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "8px 0 16px" }}>
      <span style={{ width: "6px", height: "6px", background: ink, flexShrink: 0 }} />
      <span style={{
        fontFamily: stamp_f, fontSize: "0.7rem", letterSpacing: "0.14em",
        textTransform: "uppercase", color: ink, whiteSpace: "nowrap",
      }}>
        {text}
      </span>
      <div style={{ height: "1px", flex: 1, background: rule }} />
    </div>
  );
}
