import { surface, stroke, shadowCard } from "@/lib/theme";

export function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: surface, border: `1px solid ${stroke}`, borderRadius: "14px",
      padding: "20px", boxShadow: shadowCard,
      ...style,
    }}>
      {children}
    </div>
  );
}
