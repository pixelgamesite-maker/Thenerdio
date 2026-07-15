import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/nerdio/Label";
import { TaskRow } from "@/components/nerdio/TaskRow";
import { ReferralTier } from "@/components/nerdio/ReferralTier";
import { supabase } from "@/lib/supabaseClient";
import { useNerdioProfile } from "@/context/NerdioContext";
import { DailyTask, FALLBACK_TASKS, formatCountdown, msUntilNextRotation } from "@/lib/nerdio-data";
import { mono, sans, green, dim, bgPanel, line, lineSoft } from "@/lib/theme";

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
    const newPoints = profile.points + task.points;
    await supabase.from("profiles").update({ points: newPoints }).eq("id", profile.id);
    setProfile({ ...profile, points: newPoints });
  }

  const referralLink = profile ? `${window.location.origin}?ref=${profile.referral_code}` : "";
  const refCount = profile?.referral_count ?? 0;
  const tier5 = Math.min(refCount, 5);
  const tier10 = Math.min(Math.max(refCount - 5, 0), 5);

  return (
    <div>
      {/* Points ticker — echoes the banner's wallet readout */}
      <div style={{
        background: bgPanel, border: `1px solid ${line}`, borderRadius: "6px",
        padding: "20px", marginBottom: "26px", textAlign: "center",
      }}>
        <div style={{ fontFamily: mono, fontSize: "0.62rem", color: dim, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          Points balance
        </div>
        <div style={{ fontFamily: mono, fontSize: "2.4rem", fontWeight: 600, color: green, margin: "6px 0" }}>
          {(profile?.points ?? 0).toLocaleString()}
        </div>
        <div style={{ fontFamily: mono, fontSize: "0.62rem", color: "rgba(255,255,255,0.35)" }}>
          next task cycle in {countdown || "00:00:00"}
        </div>
      </div>

      <Label text="Daily tasks · resets every 24h" />
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "30px" }}>
        {tasks.map(task => (
          <TaskRow key={task.id} task={task} done={!!done[task.id]} onComplete={() => completeTask(task)} />
        ))}
      </div>

      <Label text="Referrals" />
      <div style={{ background: bgPanel, border: `1px solid ${line}`, borderRadius: "6px", padding: "18px", marginBottom: "18px" }}>
        <div style={{ fontFamily: mono, fontSize: "0.68rem", color: dim, marginBottom: "10px" }}>Your link</div>
        <div style={{ display: "flex", gap: "8px" }}>
          <div style={{
            flex: 1, background: "#0d0f08", border: `1px solid ${lineSoft}`, borderRadius: "4px",
            padding: "10px 12px", fontFamily: mono, fontSize: "0.72rem", color: green,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {referralLink || "connect to generate"}
          </div>
          <button
            onClick={() => referralLink && navigator.clipboard.writeText(referralLink)}
            style={{
              background: green, color: "#0a0b09", border: "none", borderRadius: "4px",
              padding: "0 16px", fontFamily: sans, fontSize: "0.72rem", fontWeight: 700, cursor: "pointer",
            }}
          >
            Copy
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <ReferralTier label="5 referrals" progress={tier5} of={5} reward="500 pts" unlocked={refCount >= 5} />
        <ReferralTier label="10 referrals" progress={tier10} of={5} reward="1,500 pts" unlocked={refCount >= 10} />
      </div>
      <p style={{ fontFamily: sans, fontSize: "0.72rem", color: dim, marginTop: "10px" }}>
        {refCount} account{refCount === 1 ? "" : "s"} referred so far.
      </p>
    </div>
  );
}
