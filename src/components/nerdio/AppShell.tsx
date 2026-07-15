import { Header } from "@/components/nerdio/Header";
import { Profile } from "@/lib/nerdio-data";
import { bg } from "@/lib/theme";

export function AppShell({ profile, onSignOut, children }: {
  profile: Profile | null; onSignOut: () => void; children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: "100vh", background: bg }}>
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        <Header profile={profile} onSignOut={onSignOut} />
        <div style={{ padding: "26px 20px 60px" }}>{children}</div>
      </div>
    </div>
  );
}
