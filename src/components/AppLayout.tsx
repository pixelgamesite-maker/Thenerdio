import { Route, Switch } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { NerdioContext } from "@/context/NerdioContext";
import { ConnectGate } from "@/components/nerdio/ConnectGate";
import { AppShell } from "@/components/nerdio/AppShell";
import Home from "@/pages/home";
import ProfilePage from "@/pages/profile";
import AirdropPage from "@/pages/airdrop";
import { bgVoid, mono, green } from "@/lib/theme";

export function AppLayout() {
  const { session, profile, setProfile, loading, connecting, connectX, signOut } = useAuth();

  if (loading) {
    return <div style={{ minHeight: "100vh", background: bgVoid }} />;
  }

  if (!session) {
    return <ConnectGate onConnect={connectX} connecting={connecting} />;
  }

  return (
    <NerdioContext.Provider value={{ profile, setProfile }}>
      <AppShell profile={profile} onSignOut={signOut}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/airdrop" component={AirdropPage} />
          <Route>
            <div style={{ fontFamily: mono, fontSize: "0.9rem", color: green, textAlign: "center", padding: "40px 0" }}>
              404 — page not found
            </div>
          </Route>
        </Switch>
      </AppShell>
    </NerdioContext.Provider>
  );
}
