import { useState } from "react";
import { Label } from "@/components/nerdio/Label";
import { FAQS } from "@/lib/nerdio-data";
import { sans, mono, green, dim, bgPanel, lineSoft } from "@/lib/theme";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      <Label text="man nerdio_faq" />
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {FAQS.map((f, i) => (
          <div key={i} style={{ background: bgPanel, border: `1px solid ${lineSoft}`, borderRadius: "6px", overflow: "hidden" }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: "100%", textAlign: "left", background: "none", border: "none",
                padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center",
                cursor: "pointer",
              }}
            >
              <span style={{ fontFamily: sans, fontSize: "0.86rem", fontWeight: 700, color: "#fff" }}>{f.q}</span>
              <span style={{ fontFamily: mono, color: green, fontSize: "0.9rem" }}>{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <div style={{ padding: "0 16px 16px", fontFamily: sans, fontSize: "0.8rem", color: dim, lineHeight: 1.6 }}>
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
