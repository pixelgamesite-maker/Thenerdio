import { body, whiteFaint } from "@/lib/theme";

/* Clean section label — small caps, muted, no dividers or kickers. */
export function Label({ text }: { text: string }) {
  return (
    <div style={{
      fontFamily: body, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em",
      textTransform: "uppercase", color: whiteFaint, margin: "0 0 12px",
    }}>
      {text}
    </div>
  );
}
