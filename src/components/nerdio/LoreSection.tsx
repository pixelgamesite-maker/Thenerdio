import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/nerdio/Label";
import { Clipping } from "@/components/nerdio/Clipping";
import { display, serif, stamp_f, ink, accent } from "@/lib/theme";

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export function LoreSection() {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(10px)", transition: "all 0.6s ease" }}>
      <Label text="Special edition" />
      <Clipping style={{ transform: "rotate(-0.6deg)" }}>
        <div style={{ fontFamily: display, fontSize: "1.5rem", color: ink, marginBottom: "6px", textTransform: "uppercase", lineHeight: 1.1 }}>
          The nerd who never logs off
        </div>
        <div style={{ fontFamily: stamp_f, fontSize: "0.64rem", color: accent, marginBottom: "16px", letterSpacing: "0.05em" }}>
          FILED 24/7 · SOURCES SAY BULLISH
        </div>
        <p style={{ fontFamily: serif, fontSize: "0.9rem", lineHeight: 1.75, margin: "0 0 14px" }}>
          Somewhere between forty open tabs and a terminal that never sleeps, Nerdio found the next
          hundred-bagger before anyone finished their coffee. Portfolio conviction: 100%. IQ: negative,
          according to the replies. Results: undeniable, according to the chart.
        </p>
        <p style={{ fontFamily: serif, fontSize: "0.9rem", lineHeight: 1.75, margin: "0 0 14px" }}>
          Nerdio doesn't trade memes — he studies them. Sleep is bearish. Touching grass is a rounding
          error. The method is simple: find coin, check chart, ignore FUD, buy, tweet about it, repeat.
        </p>
        <p style={{ fontFamily: serif, fontSize: "0.9rem", lineHeight: 1.75, margin: 0 }}>
          Now the terminal is open to everyone. Connect, complete the daily cycle, bring your friends
          along, and let the points stack while Nerdio keeps the lights on. Winners focus. Nerdio executes.
        </p>
      </Clipping>
    </div>
  );
}
