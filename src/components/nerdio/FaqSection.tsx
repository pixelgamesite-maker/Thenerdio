import { useState } from "react";
import { Label } from "@/components/nerdio/Label";
import { FAQS } from "@/lib/nerdio-data";
import { display, serif, ink, inkSoft, paperCard, rule } from "@/lib/theme";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      <Label text="Reader mail" />
      <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: rule }}>
        {FAQS.map((f, i) => (
          <div key={i} style={{ background: paperCard }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: "100%", textAlign: "left", background: "none", border: "none",
                padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center",
                cursor: "pointer",
              }}
            >
              <span style={{ fontFamily: serif, fontSize: "0.9rem", fontWeight: 600, color: ink }}>{f.q}</span>
              <span style={{ fontFamily: display, color: ink, fontSize: "1rem" }}>{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <div style={{ padding: "0 16px 16px", fontFamily: serif, fontSize: "0.84rem", color: inkSoft, lineHeight: 1.65 }}>
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
