import { useEffect } from "react";
import { createPortal } from "react-dom";
import { heading, bg, lemon } from "@/lib/theme";

export function ComingSoonToast({ show, onDone }: { show: boolean; onDone: () => void }) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [show, onDone]);

  if (!show) return null;

  return createPortal(
    <div
      className="nerdio-toast-in"
      style={{
        position: "fixed", left: "50%", bottom: "28px", zIndex: 60,
        transform: "translateX(-50%)",
        background: lemon, color: bg, borderRadius: "999px",
        padding: "12px 20px", fontFamily: heading, fontSize: "0.8rem", fontWeight: 800,
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)", whiteSpace: "nowrap",
      }}
    >
      Airdrop campaign — coming soon
      <style>{`
        .nerdio-toast-in { animation: nerdio-toast-in 0.25s ease; }
        @keyframes nerdio-toast-in {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>,
    document.body
  );
}
