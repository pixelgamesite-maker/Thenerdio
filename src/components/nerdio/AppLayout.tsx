import { useEffect } from "react";
import { Route, Switch } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { NerdioContext } from "@/context/NerdioContext";
import { ConnectGate } from "@/components/nerdio/ConnectGate";
import { AppShell } from "@/components/nerdio/AppShell";
import { SplashIntro, useSplashOnce } from "@/components/nerdio/SplashIntro";
import Home from "@/pages/home";
import ProfilePage from "@/pages/profile";
import AirdropPage from "@/pages/airdrop";
import { bg, heading, lemon, FONT_LINK } from "@/lib/theme";

export function AppLayout() {
  const { session, profile, setProfile, loading, connecting, connectX, signOut } = useAuth();
  const { show: showSplash, finish: finishSplash } = useSplashOnce();

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

  /* Splash only ever precedes the Connect X screen — once someone is
     signed in, they never see it again, even in a fresh session. */
  if (!session) {
    return (
      <>
        <div style={{
          filter: showSplash ? "blur(10px)" : "blur(0px)",
          transition: "filter 0.6s ease",
        }}>
          <ConnectGate onConnect={connectX} connecting={connecting} />
        </div>
        {showSplash && <SplashIntro onFinish={finishSplash} />}
      </>
    );
  }

  return (
    <NerdioContext.Provider value={{ profile, setProfile }}>
      <AppShell profile={profile} onSignOut={signOut}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/airdrop" component={AirdropPage} />
          <Route>
            <div style={{ fontFamily: heading, fontSize: "1rem", color: lemon, textAlign: "center", padding: "40px 0" }}>
              404 — page not found
            </div>
          </Route>
        </Switch>
      </AppShell>
    </NerdioContext.Provider>
  );
}
