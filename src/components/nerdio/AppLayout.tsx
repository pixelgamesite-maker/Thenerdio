import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { NerdioContext } from "@/context/NerdioContext";
import { AppShell } from "@/components/nerdio/AppShell";
import { SplashIntro, useSplashOnce } from "@/components/nerdio/SplashIntro";
import Home from "@/pages/home";
import ProfilePage from "@/pages/profile";
import AirdropPage from "@/pages/airdrop";
import { bg, heading, lemon, FONT_LINK } from "@/lib/theme";

/* Home is public — no auth check. /airdrop and /profile require a
   connection; visiting either directly without one just sends you back
   to "/", where the Join Airdrop Campaign button is what actually
   prompts the connect popup. */
export function AppLayout() {
  const { session, profile, setProfile, loading, connecting, connectX, signOut } = useAuth();
  const { show: showSplash, finish: finishSplash } = useSplashOnce();
  const isConnected = !!session;

  /* Keeps the `filter` CSS property present only while the blur
     transition is actually happening. A lingering `filter: blur(0px)`
     still creates a new containing block for any `position: fixed`
     descendant (per the CSS spec), which silently breaks fixed
     positioning for anything nested here — that's what caused the
     Connect popup to render mid-page instead of over the viewport.
     Dropping the property entirely once the transition completes
     prevents that for this and any future fixed-position element. */
  const [wrapperBlurred, setWrapperBlurred] = useState(true);
  useEffect(() => {
    if (showSplash) { setWrapperBlurred(true); return; }
    const t = setTimeout(() => setWrapperBlurred(false), 650);
    return () => clearTimeout(t);
  }, [showSplash]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_LINK;
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  if (loading) {
    return <div style={{ minHeight: "100vh", background: bg }} />;
  }

  return (
    <NerdioContext.Provider value={{ profile, setProfile, isConnected, connecting, connectX }}>
      <div style={wrapperBlurred ? { filter: showSplash ? "blur(10px)" : "blur(0px)", transition: "filter 0.6s ease" } : undefined}>
        <AppShell profile={profile} isConnected={isConnected} onSignOut={signOut}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/airdrop">
              {isConnected ? <AirdropPage /> : <Redirect to="/" />}
            </Route>
            <Route path="/profile">
              {isConnected ? <ProfilePage /> : <Redirect to="/" />}
            </Route>
            <Route>
              <div style={{ fontFamily: heading, fontSize: "1rem", color: lemon, textAlign: "center", padding: "40px 0" }}>
                404 — page not found
              </div>
            </Route>
          </Switch>
        </AppShell>
      </div>
      {showSplash && <SplashIntro onFinish={finishSplash} />}
    </NerdioContext.Provider>
  );
}
