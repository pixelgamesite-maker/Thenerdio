import { LoreSection } from "@/components/nerdio/LoreSection";
import { FaqSection } from "@/components/nerdio/FaqSection";
import { rule } from "@/lib/theme";

export default function Home() {
  return (
    <div>
      <LoreSection />
      <div style={{ height: "1px", background: rule, margin: "36px 0 30px" }} />
      <FaqSection />
    </div>
  );
}
