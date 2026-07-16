import { useState } from "react";
import { useLocation } from "wouter";
import { HeroSection } from "@/components/nerdio/HeroSection";
import { LoreSection } from "@/components/nerdio/LoreSection";
import { FaqSection } from "@/components/nerdio/FaqSection";
import { ConnectModal } from "@/components/nerdio/ConnectModal";
import { useNerdioProfile } from "@/context/NerdioContext";

export default function Home() {
  const { isConnected, connecting, connectX } = useNerdioProfile();
  const [, navigate] = useLocation();
  const [modalOpen, setModalOpen] = useState(false);

  function handleJoin() {
    if (isConnected) { navigate("/airdrop"); return; }
    setModalOpen(true);
  }

  function handleConnect() {
    connectX("/airdrop");
  }

  return (
    <div>
      <div style={{ margin: "-26px -20px 0" }}>
        <HeroSection onJoin={handleJoin} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "28px", padding: "0 20px" }}>
        <LoreSection />
        <FaqSection />
      </div>

      <ConnectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConnect={handleConnect}
        connecting={connecting}
      />
    </div>
  );
}
