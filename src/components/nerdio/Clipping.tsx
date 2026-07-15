import { paper, ink } from "@/lib/theme";

export function Clipping({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: paper, color: ink, borderRadius: "3px",
      padding: "18px 20px", boxShadow: "0 6px 24px rgba(0,0,0,0.35)",
      transform: "rotate(-0.3deg)", position: "relative",
      ...style,
    }}>
      {children}
    </div>
  );
}
