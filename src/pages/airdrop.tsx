import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/nerdio/Label";
import { Card } from "@/components/nerdio/Card";
import { TaskRow } from "@/components/nerdio/TaskRow";
import { ReferralTier } from "@/components/nerdio/ReferralTier";
import { supabase } from "@/lib/supabaseClient";
import { useNerdioProfile } from "@/context/NerdioContext";
import { DailyTask, FALLBACK_TASKS, POINTS_PER_REFERRAL, formatCountdown, msUntilNextRotation } from "@/lib/nerdio-data";
import { heading, body, white, whiteFaint, surfaceSoft, bg, lemon } from "@/lib/theme";

export default function AirdropPage() {
  const { profile, setProfile } = useNerdioProfile();
  const [tasks] = useState<DailyTask[]>(FALLBACK_TASKS);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [countdown, setCountdown] = useState("");
  const rotationAnchor = useRef(Date.now());

  useEffect(() => {
    const tick = () => setCountdown(formatCountdown(msUntilNextRotation(rotationAnchor.current)));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* Load which of today's tasks this user already completed. */
  useEffect(() => {
    if (!profile) return;
    (async () => {
      const { data } = await supabase
        .from("task_completions")
        .select("task_id")
        .eq("user_id", profile.id);
      const map: Record<string, boolean> = {};
      (data ?? []).forEach((r: any) => { map[r.task_id] = true; });
      setDone(map);
    })();
  }, [profile]);

  async function completeTask(task: DailyTask) {
    window.open(task.url, "_blank");
    if (!profile || done[task.id]) return;
    /* Optimistic UI. In production, verification of the follow/interact
       should happen server-side (a scheduled job hitting the X API)
       before points are actually credited — this call should really hit
       your own endpoint, e.g. POST /api/tasks/complete, which checks the
       action happened before writing to `task_completions`. */
    setDone(prev => ({ ...prev, [task.id]: true }));
    await supabase.from("task_completions").insert({ user_id: profile.id, task_id: task.id });

    /* Points are credited server-side by the trg_award_task_points
       trigger in schema.sql — the client never writes `points` directly.
       Re-fetch so the UI reflects the authoritative total. */
    const { data: refreshed } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", profile.id)
      .single();
    if (refreshed) setProfile({ ...profile, ...(refreshed as any) });
  }

  const referralLink = profile ? `${window.location.origin}?ref=${profile.referral_code}` : "";
  const refCount = profile?.referral_count ?? 0;
  const tier5 = Math.min(refCount, 5);
  const tier10 = Math.min(Math.max(refCount - 5, 0), 5);

  return (
    <div>
      <Card style={{ textAlign: "center", background: surfaceSoft, marginBottom: "26px" }}>
        <div style={{ fontFamily: body, fontSize: "0.68rem", color: whiteFaint, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Points balance
        </div>
        <div style={{ fontFamily: heading, fontSize: "2.4rem", fontWeight: 800, color: lemon, margin: "4px 0" }}>
          {(profile?.points ?? 0).toLocaleString()}
        </div>
        <div style={{ fontFamily: body, fontSize: "0.72rem", color: whiteFaint }}>
          Next task cycle in {countdown || "00:00:00"}
        </div>
      </Card>

      <Label text="Today's tasks · resets every 24h" />
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "30px" }}>
        {tasks.map(task => (
          <TaskRow key={task.id} task={task} done={!!done[task.id]} onComplete={() => completeTask(task)} />
        ))}
      </div>

      <Label text="Referrals" />
      <Card style={{ marginBottom: "16px" }}>
        <div style={{ fontFamily: body, fontSize: "0.7rem", color: whiteFaint, marginBottom: "10px" }}>Your link</div>
        <div style={{ display: "flex", gap: "8px" }}>
          <div style={{
            flex: 1, background: bg, borderRadius: "8px",
            padding: "10px 12px", fontFamily: body, fontSize: "0.74rem", color: white,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {referralLink || "connect to generate"}
          </div>
          <button
            onClick={() => referralLink && navigator.clipboard.writeText(referralLink)}
            style={{
              background: lemon, color: bg, border: "none", borderRadius: "8px",
              padding: "0 16px", fontFamily: heading, fontSize: "0.74rem", fontWeight: 700, cursor: "pointer",
            }}
          >
            Copy
          </button>
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <ReferralTier label="5 referrals" progress={tier5} of={5} reward={`${5 * POINTS_PER_REFERRAL} pts`} unlocked={refCount >= 5} />
        <ReferralTier label="10 referrals" progress={tier10} of={5} reward={`${10 * POINTS_PER_REFERRAL} pts`} unlocked={refCount >= 10} />
      </div>
      <p style={{ fontFamily: body, fontSize: "0.76rem", color: whiteFaint, marginTop: "10px" }}>
        {refCount} account{refCount === 1 ? "" : "s"} referred so far · {POINTS_PER_REFERRAL} pts each.
      </p>
    </div>
  );
}
