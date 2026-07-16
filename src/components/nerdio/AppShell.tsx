import { Header } from "@/components/nerdio/Header";
import { Profile } from "@/lib/nerdio-data";
import { bg } from "@/lib/theme";

export function AppShell({ profile, isConnected, onSignOut, children }: {
  profile: Profile | null; isConnected: boolean; onSignOut: () => void; children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: "100vh", background: bg }}>
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        <Header profile={profile} isConnected={isConnected} onSignOut={onSignOut} />
        <div style={{ padding: "26px 20px 60px" }}>{children}</div>
      </div>
    </div>
  );
}
