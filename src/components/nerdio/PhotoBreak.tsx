import { Label } from "@/components/nerdio/Label";
import { lemon } from "@/lib/theme";

export function PhotoBreak() {
  return (
    <div style={{ textAlign: "center" }}>
      <Label text="Meet Nerdio" />
      <img
        src="/Nerd-head.png"
        alt="Nerdio"
        style={{
          width: "140px", height: "140px", objectFit: "cover", borderRadius: "50%",
          border: `3px solid ${lemon}`, margin: "0 auto", display: "block", background: "#fff",
        }}
      />
    </div>
  );
}
