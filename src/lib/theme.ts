/* ────────────────────────────────────────────────────────────────────────
   THE NERDIO — design tokens, v4
   Solana-themed: near-black purple-tinted background, Solana's signature
   purple→green gradient on primary CTAs, solid Solana green everywhere
   else. Token NAMES kept identical to the previous (green/lemon) system
   on purpose — every component already imports `lemon`, `bg`, `surface`,
   etc., and changing names would mean touching ~20 files. Only the
   values change here.
   ──────────────────────────────────────────────────────────────────────── */

export const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap";

export const heading = "'Manrope', -apple-system, 'Segoe UI', sans-serif"; /* headings, buttons, numbers */
export const body     = "'Inter', -apple-system, 'Segoe UI', sans-serif";  /* body copy, labels */

export const bg          = "#0b0713"; /* near-black, purple-tinted — Solana-style deep background */
export const surface     = "#170f26"; /* raised panel / card */
export const surfaceSoft = "#130c1f"; /* recessed panel, e.g. ticker strip */
export const surfaceHi   = "#20142f"; /* hover state on cards */

export const white     = "#ffffff";
export const whiteSoft = "rgba(255,255,255,0.66)";
export const whiteFaint= "rgba(255,255,255,0.4)";
export const stroke    = "rgba(180,140,255,0.16)"; /* purple-tinted hairline instead of neutral white */
export const strokeSoft= "rgba(180,140,255,0.08)";

/* `lemon` is a legacy name from the old green-accent theme — it now
   holds Solana Green. Kept as-is so every existing import still works. */
export const lemon     = "#14F195"; /* Solana Green — primary accent */
export const lemonDim  = "#0fcf7e"; /* pressed / secondary use */
export const lemonSoft = "rgba(20,241,149,0.14)"; /* tinted background for accent chips */

export const shadowCard = "0 8px 24px rgba(0,0,0,0.35)";

/* Solana's actual brand signature — the purple→green gradient. Used
   selectively (primary CTA buttons, splash rings) rather than
   everywhere, since gradients don't work as text/icon color without
   background-clip tricks; flat `lemon` (Solana Green) covers those. */
export const solanaPurple   = "#9945FF";
export const solanaGreen    = "#14F195";
export const gradientAccent = `linear-gradient(90deg, ${solanaPurple} 0%, ${solanaGreen} 100%)`;
