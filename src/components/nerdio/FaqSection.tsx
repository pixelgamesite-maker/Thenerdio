import { useState } from "react";
import { Label } from "@/components/nerdio/Label";
import { FAQS } from "@/lib/nerdio-data";
import { heading, body, white, whiteFaint, surface, stroke, lemon } from "@/lib/theme";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      <Label text="FAQ" />
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {FAQS.map((f, i) => (
          <div key={i} style={{ background: surface, border: `1px solid ${stroke}`, borderRadius: "12px", overflow: "hidden" }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: "100%", textAlign: "left", background: "none", border: "none",
                padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center",
                cursor: "pointer",
              }}
            >
              <span style={{ fontFamily: heading, fontSize: "0.86rem", fontWeight: 700, color: white }}>{f.q}</span>
              <span style={{ fontFamily: heading, color: lemon, fontSize: "1rem", fontWeight: 700 }}>{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <div style={{ padding: "0 16px 16px", fontFamily: body, fontSize: "0.82rem", color: whiteFaint, lineHeight: 1.6 }}>
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
