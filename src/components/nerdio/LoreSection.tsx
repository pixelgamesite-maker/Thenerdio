import { Label } from "@/components/nerdio/Label";
import { Card } from "@/components/nerdio/Card";
import { heading, body, white, whiteSoft, lemon } from "@/lib/theme";

export function LoreSection() {
  return (
    <div>
      <Label text="About Nerdio" />
      <Card>
        <div style={{ fontFamily: heading, fontSize: "1.15rem", fontWeight: 800, color: white, marginBottom: "4px" }}>
          The nerd who never logs off
        </div>
        <div style={{ fontFamily: body, fontSize: "0.68rem", fontWeight: 600, color: lemon, marginBottom: "14px", letterSpacing: "0.04em" }}>
          ONLINE 24/7 · SOURCES SAY BULLISH
        </div>
        <p style={{ fontFamily: body, fontSize: "0.86rem", lineHeight: 1.7, color: whiteSoft, margin: "0 0 14px" }}>
          Somewhere between forty open tabs and a terminal that never sleeps, Nerdio found the next
          hundred-bagger before anyone finished their coffee. Portfolio conviction: 100%. IQ: negative,
          according to the replies. Results: undeniable, according to the chart.
        </p>
        <p style={{ fontFamily: body, fontSize: "0.86rem", lineHeight: 1.7, color: whiteSoft, margin: "0 0 14px" }}>
          This one’s for the lads who never left the trenches, the ones glued to Dexscreener 24/7, the chart watchers, the degens, the believers, and the ones who keep grinding no matter what. This one’s for the nerdios!
        </p>
        <p style={{ fontFamily: body, fontSize: "0.86rem", lineHeight: 1.7, color: whiteSoft, margin: 0 }}>
          Now the airdrop is open to everyone. Connect, complete the daily cycle, bring your friends
          along, and let the points stack while Nerdio keeps the lights on. Winners focus. Nerdio executes.
        </p>
      </Card>
    </div>
  );
}
