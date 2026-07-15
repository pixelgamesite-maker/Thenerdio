import { LoreSection } from "@/components/nerdio/LoreSection";
import { FaqSection } from "@/components/nerdio/FaqSection";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <LoreSection />
      <FaqSection />
    </div>
  );
}
