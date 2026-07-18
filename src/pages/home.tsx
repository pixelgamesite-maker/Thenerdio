import { useState } from "react";
import { useLocation } from "wouter";
import { HeroSection } from "@/components/nerdio/HeroSection";
import { LoreSection } from "@/components/nerdio/LoreSection";
import { FaqSection } from "@/components/nerdio/FaqSection";
import { Footer } from "@/components/nerdio/Footer";
import { ConnectModal } from "@/components/nerdio/ConnectModal";
import { ComingSoonToast } from "@/components/nerdio/ComingSoonToast";
import { useNerdioProfile } from "@/context/NerdioContext";
import { AIRDROP_LIVE } from "@/lib/nerdio-data";

export default function Home() {
  const { isConnected, connecting, connectX } = useNerdioProfile();
  const [, navigate] = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  function handleJoin() {
    if (!AIRDROP_LIVE) { setShowComingSoon(true); return; }
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
        <Footer />
      </div>

      <ConnectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConnect={handleConnect}
        connecting={connecting}
      />
      <ComingSoonToast show={showComingSoon} onDone={() => setShowComingSoon(false)} />
    </div>
  );
}
