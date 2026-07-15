import { HeroSection } from "@/components/nerdio/HeroSection";
import { LoreSection } from "@/components/nerdio/LoreSection";
import { FaqSection } from "@/components/nerdio/FaqSection";

export default function Home() {
  return (
    <div>
      <div style={{ margin: "-26px -20px 0" }}>
        <HeroSection />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "28px", padding: "0 20px" }}>
        <LoreSection />
        <FaqSection />
      </div>
    </div>
  );
}
