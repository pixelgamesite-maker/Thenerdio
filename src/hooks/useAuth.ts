import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { Profile, REF_STORAGE_KEY, referralCodeFromId } from "@/lib/nerdio-data";

/* ── Auth wiring — assumes X (Twitter) is configured as an OAuth provider
   in your Supabase project. If you're handling OAuth outside Supabase
   (your own /api/auth/x endpoints), swap out `connectX` below and keep
   the rest of this hook — session/profile shape stays the same either way. ── */
export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  /* ── Load or create the profile row once authenticated. Assumes a
     `profiles` table: id (uuid, = auth user id), x_handle, x_avatar_url,
     points, referral_code. Referral attribution reads the code stashed
     in localStorage by connectX(), since it survives the round trip
     through X's OAuth screen. ── */
  useEffect(() => {
    if (!session?.user) { setProfile(null); return; }
    const user = session.user;

    (async () => {
      const { data: existing } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (existing) {
        const { count } = await supabase
          .from("referrals")
          .select("*", { count: "exact", head: true })
          .eq("referrer_id", user.id);
        setProfile({ ...(existing as any), referral_count: count ?? 0 });
        return;
      }

      const handle = (user.user_metadata?.user_name || user.user_metadata?.preferred_username || "unknown") as string;
      const avatar = (user.user_metadata?.avatar_url || null) as string | null;
      const code = referralCodeFromId(user.id);

      const { data: created } = await supabase
        .from("profiles")
        .insert({ id: user.id, x_handle: handle, x_avatar_url: avatar, points: 0, referral_code: code })
        .select()
        .single();

      const refCode = localStorage.getItem(REF_STORAGE_KEY);
      if (refCode && created) {
        await supabase.from("referrals").insert({ referrer_id: null, referred_id: user.id, referral_code: refCode });
        localStorage.removeItem(REF_STORAGE_KEY);
      }

      setProfile(created ? { ...(created as any), referral_count: 0 } : null);
    })();
  }, [session]);

  const connectX = useCallback(async () => {
    setConnecting(true);
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (ref) localStorage.setItem(REF_STORAGE_KEY, ref);

    await supabase.auth.signInWithOAuth({
      provider: "x",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }, []);

  const signOut = useCallback(() => supabase.auth.signOut(), []);

  return { session, profile, setProfile, loading, connecting, connectX, signOut };
  }
  
