import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabaseClient";
import { bgVoid, mono, green, dim } from "@/lib/theme";
import { TerminalBar } from "@/components/nerdio/TerminalBar";

/* Supabase's client parses the OAuth redirect (detectSessionInUrl is on
   by default), so this page just needs to wait for a session to show up
   — or for an error — and then move on. If nothing resolves after a few
   seconds, something's off with the OAuth app config rather than this
   page (redirect URI mismatch is the usual culprit). */
export default function AuthCallback() {
  const [, navigate] = useLocation();
  const [status, setStatus] = useState<"waiting" | "error">("waiting");
  const [message, setMessage] = useState("verifying with x...");

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
      if (!settled) { setStatus("error"); setMessage("no session appeared — check the redirect URL in your X app settings."); }
    }, 8000);

    return () => { sub.subscription.unsubscribe(); clearTimeout(timeout); };
  }, [navigate]);

  return (
    <div style={{ minHeight: "100vh", background: bgVoid, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "420px", border: "1px solid rgba(143,214,148,0.16)", borderRadius: "8px", overflow: "hidden" }}>
        <TerminalBar path="~/auth/callback" />
        <div style={{ padding: "26px 22px", background: "#121409" }}>
          <div style={{ fontFamily: mono, fontSize: "0.8rem", color: status === "error" ? "#c5453a" : green }}>
            $ {message}
          </div>
          {status === "waiting" && (
            <div style={{ fontFamily: mono, fontSize: "0.72rem", color: dim, marginTop: "10px" }}>
              hang tight, this only takes a second_
            </div>
          )}
          {status === "error" && (
            <button
              onClick={() => navigate("/")}
              style={{
                marginTop: "16px", background: "none", border: "1px solid rgba(143,214,148,0.3)",
                color: green, borderRadius: "4px", padding: "8px 14px",
                fontFamily: mono, fontSize: "0.7rem", cursor: "pointer",
              }}
            >
              back to start
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
