export const X_PROFILE_URL = "https://x.com/thenerdio";

/* Adjust to match your live daily-task rotation window. */
export const DAY_MS = 24 * 60 * 60 * 1000;

export type Profile = {
  id: string;
  x_handle: string;
  x_avatar_url: string | null;
  points: number;
  referral_code: string;
  referral_count: number;
};

export type DailyTask = {
  id: string;
  title: string;
  description: string;
  url: string;
  points: number;
  kind: "follow" | "interact";
};

/* ── Placeholder daily tasks — replace with a fetch from a `daily_tasks`
   table where now() is between active_from and active_until. Insert a new
   batch every 24h via a scheduled job so this list rotates itself. ── */
export const FALLBACK_TASKS: DailyTask[] = [
  {
    id: "follow-nerdio",
    title: "Follow @TheNerdio",
    description: "Follow the account. One-time, stays complete once verified.",
    url: X_PROFILE_URL,
    points: 50,
    kind: "follow",
  },
  {
    id: "interact-today",
    title: "Interact with today's post",
    description: "Like, repost, and leave a real reply on today's pinned post.",
    url: X_PROFILE_URL,
    points: 100,
    kind: "interact",
  },
];

export const FAQS: { q: string; a: string }[] = [
  { q: "What is the Nerdio airdrop?", a: "A points-based campaign that rewards holders and early community members for genuine engagement. Points earned now are tracked toward a future token distribution." },
  { q: "How do I earn points?", a: "Connect your X account, complete the daily task set (it refreshes every 24 hours), and refer friends using your personal link." },
  { q: "Why does connecting X matter?", a: "It's how we verify task completion and prevent duplicate or bot accounts from farming points meant for real community members." },
  { q: "How do referrals work?", a: "Share your link. You earn 25 points for every account that connects through it — no cap, no waiting for a milestone." },
  { q: "Do points expire?", a: "No. Points accumulate across every daily cycle and are tied to your connected account." },
  { q: "When does the airdrop happen?", a: "Timing and allocation details will be announced on X. Points earned during this campaign will factor into that distribution." },
  { q: "Is this financial advice?", a: "No. Nerdio is a community and content project. Nothing here is a guarantee of value. DYOR." },
];

export function msUntilNextRotation(anchor: number) {
  const elapsed = (Date.now() - anchor) % DAY_MS;
  return DAY_MS - elapsed;
}

export function formatCountdown(ms: number) {
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function referralCodeFromId(id: string) {
  return id.replace(/-/g, "").slice(0, 8).toUpperCase();
}

export const REF_STORAGE_KEY = "nerdio_ref";
export const REDIRECT_STORAGE_KEY = "nerdio_redirect_after_auth";

/* Must match the `points_awarded` default on the `referrals` table in
   schema.sql — this constant is just for display math (e.g. the
   referral tier cards), the actual crediting happens in Postgres. */
export const POINTS_PER_REFERRAL = 25;
