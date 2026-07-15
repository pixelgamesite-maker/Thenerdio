import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabaseClient";
import { bg, surface, heading, body, white, whiteFaint, stroke, lemon, shadowCard } from "@/lib/theme";

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
    <div style={{ minHeight: "100vh", background: bg, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{
        width: "100%", maxWidth: "360px", background: surface, border: `1px solid ${stroke}`,
        borderRadius: "16px", boxShadow: shadowCard, padding: "26px 22px", textAlign: "center",
      }}>
        <div style={{ fontFamily: heading, fontSize: "1.05rem", fontWeight: 800, color: status === "error" ? lemon : white }}>
          {message}
        </div>
        {status === "waiting" && (
          <div style={{ fontFamily: body, fontSize: "0.75rem", color: whiteFaint, marginTop: "10px" }}>
            Hang tight, this only takes a second.
          </div>
        )}
        {status === "error" && (
          <button
            onClick={() => navigate("/")}
            style={{
              marginTop: "16px", background: "none", border: `1px solid ${lemon}`,
              color: lemon, borderRadius: "8px", padding: "8px 14px",
              fontFamily: heading, fontSize: "0.72rem", fontWeight: 700, cursor: "pointer",
            }}
          >
            Back to start
          </button>
        )}
      </div>
    </div>
  );
}
