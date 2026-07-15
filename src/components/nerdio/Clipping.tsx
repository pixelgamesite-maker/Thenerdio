import { paperCard, ink, shadowCard } from "@/lib/theme";

/* A pinned newspaper clipping — used for anything that's a record, claim,
   or artifact (identity file, lore feature, etc). The halftone texture and
   torn top edge are what read as "cut from a real page" rather than just
   another rounded card. */
export function Clipping({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: paperCard, color: ink, position: "relative",
      padding: "22px 22px 20px", boxShadow: shadowCard,
      backgroundImage: "radial-gradient(rgba(33,28,20,0.05) 0.7px, transparent 0.7px)",
      backgroundSize: "5px 5px",
      clipPath: "polygon(0% 1.5%, 4% 0%, 9% 1.2%, 15% 0%, 21% 1%, 27% 0%, 33% 1.3%, 39% 0%, 45% 1%, 52% 0%, 58% 1.2%, 64% 0%, 70% 1%, 76% 0%, 83% 1.3%, 89% 0%, 95% 1%, 100% 0%, 100% 100%, 0% 100%)",
      ...style,
    }}>
      {/* pin */}
      <div style={{
        position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)",
        width: "9px", height: "9px", borderRadius: "50%",
        background: "#a53a2c", boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
      }} />
      {children}
    </div>
  );
}
