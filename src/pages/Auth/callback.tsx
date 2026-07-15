import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabaseClient";
import { paper, paperCard, display, stamp_f, ink, inkSoft, accent, shadowCard } from "@/lib/theme";

/* Supabase's client parses the OAuth redirect (detectSessionInUrl is on
   by default), so this page just needs to wait for a session to show up
   — or for an error — and then move on. If nothing resolves after a few
   seconds, something's off with the OAuth app config rather than this
   page (redirect URI mismatch is the usual culprit). */
export default function AuthCallback() {
  const [, navigate] = useLocation();
  const [status, setStatus] = useState<"waiting" | "error">("waiting");
  const [message, setMessage] = useState("Verifying with X...");

  useEffect(() => {
    let settled = false;

    const finish = () => {
      if (settled) return;
      settled = true;
      navigate("/", { replace: true });
    };

    supabase.auth.getSession().then(({ data, error }) => {
      if (error) { setStatus("error"); setMessage(error.message); return; }
      if (data.session) finish();
    });

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) finish();
    });

    const timeout = setTimeout(() => {
      if (!settled) { setStatus("error"); setMessage("No session appeared — check the redirect URL in your X app settings."); }
    }, 8000);

    return () => { sub.subscription.unsubscribe(); clearTimeout(timeout); };
  }, [navigate]);

  return (
    <div style={{ minHeight: "100vh", background: paper, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{
        width: "100%", maxWidth: "400px", background: paperCard, boxShadow: shadowCard, padding: "28px 24px",
        backgroundImage: "radial-gradient(rgba(33,28,20,0.05) 0.7px, transparent 0.7px)", backgroundSize: "5px 5px",
      }}>
        <div style={{
          fontFamily: stamp_f, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase",
          color: status === "error" ? accent : inkSoft, marginBottom: "10px",
        }}>
          Press room
        </div>
        <div style={{ fontFamily: display, fontSize: "1.2rem", color: status === "error" ? accent : ink, textTransform: "uppercase", lineHeight: 1.2 }}>
          {message}
        </div>
        {status === "waiting" && (
          <div style={{ fontFamily: stamp_f, fontSize: "0.7rem", color: inkSoft, marginTop: "12px" }}>
            hang tight, this only takes a second_
          </div>
        )}
        {status === "error" && (
          <button
            onClick={() => navigate("/")}
            style={{
              marginTop: "18px", background: "none", border: `1px solid ${accent}`,
              color: accent, padding: "8px 14px",
              fontFamily: stamp_f, fontSize: "0.7rem", cursor: "pointer",
            }}
          >
            back to start
          </button>
        )}
      </div>
    </div>
  );
}
