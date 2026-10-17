"use client";
import { useEffect, useMemo, useState } from "react";

type Answer = { id: string; text: string };
type Today = {
  date: string; dayNumber: number;
  round: { id: string; secret: string; category: string; prompt: string };
  answers: Answer[]; guesses: { id: string; correct: boolean }[]; finished: boolean;
  imposterId?: string; sources?: Record<string, string>;
  crowd?: { picked_answer_id: string; first_picks: number; total_picks: number }[];
  stats?: { streak: number; best_streak: number; games: number; wins: number };
};
type Tomorrow = { available: boolean; role?: "knower" | "imposter"; category?: string; prompt?: string; secret?: string | null; submitted?: boolean };

function pid(): string {
  try {
    let p = localStorage.getItem("imp_pid");
    if (!p) { p = crypto.randomUUID().replace(/-/g, "").slice(0, 24); localStorage.setItem("imp_pid", p); }
    return p;
  } catch { return "anon" + Math.random().toString(36).slice(2, 12); }
}
async function api(path: string, body?: unknown) {
  const r = await fetch(path, { method: body ? "POST" : "GET", headers: { "x-player": pid(), "content-type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || "Request failed");
  return j;
}

export default function Page() {
  const [t, setT] = useState<Today | null>(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [shakeId, setShakeId] = useState("");
  const [tm, setTm] = useState<Tomorrow | null>(null);
  const [draft, setDraft] = useState("");
  const [subErr, setSubErr] = useState("");
  const [copied, setCopied] = useState(false);

  const load = () => api("/api/today").then(setT).catch(e => setErr(e.message));
  useEffect(() => { load(); }, []);
  useEffect(() => { if (t?.finished) api("/api/tomorrow").then(setTm).catch(() => {}); }, [t?.finished]);

  const wrongIds = useMemo(() => new Set((t?.guesses ?? []).filter(g => !g.correct).map(g => g.id)), [t]);
  const won = t?.guesses.some(g => g.correct) ?? false;
  const totalFirst = (t?.crowd ?? []).reduce((s, c) => s + Number(c.first_picks), 0) || 0;

  async function guess(id: string) {
    if (!t || t.finished || busy || wrongIds.has(id)) return;
    setBusy(true); setErr("");
    try {
      const r = await api("/api/guess", { answerId: id });
      if (!r.correct) { setShakeId(id); setTimeout(() => setShakeId(""), 400); }
      await load();
    } catch (e: any) { setErr(e.message); } finally { setBusy(false); }
  }

  async function submit() {
    setSubErr("");
    try { await api("/api/submit", { text: draft }); setTm({ ...tm!, submitted: true }); }
    catch (e: any) { setSubErr(e.message); }
  }

  function share() {
    if (!t) return;
    const marks = t.guesses.map(g => (g.correct ? "🟩" : "🟥")).join("");
    const line = won ? `Caught the imposter in ${t.guesses.length}` : "The imposter got away";
    const txt = `Imposter Daily #${t.dayNumber} ${marks}\n${line} 🕵️ · Streak ${t.stats?.streak ?? 0}\n${location.origin}`;
    if (navigator.share) navigator.share({ text: txt }).catch(() => {});
    else navigator.clipboard?.writeText(txt).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); });
  }

  if (err && !t) return <main className="wrap"><header><h1>Imposter <span>Daily</span></h1></header><p className="status bad">{err}</p></main>;
  if (!t) return <main className="wrap"><header><h1>Imposter <span>Daily</span></h1></header><p className="rule">Loading…</p></main>;

  return (
    <main className="wrap">
      <header>
        <h1>Imposter <span>Daily</span></h1>
        <span className="day">#{t.dayNumber} · {t.date}</span>
      </header>

      <div className="secret">
        <div className="lbl">The secret word</div>
        <div className="word">{t.round.secret}</div>
        <div className="cat">{t.round.category}</div>
      </div>
      <p className="rule">Nine people described it. One only knew the category and bluffed. Tap the imposter — you get 2 shots.</p>

      <div className="grid">
        {t.answers.map(a => {
          const isImp = t.finished && a.id === t.imposterId;
          const c = t.crowd?.find(x => x.picked_answer_id === a.id);
          const pct = totalFirst ? Math.round((Number(c?.first_picks ?? 0) / totalFirst) * 100) : 0;
          return (
            <button key={a.id} className={`ans ${wrongIds.has(a.id) ? "wrong" : ""} ${isImp ? "imposter" : ""} ${shakeId === a.id ? "shake" : ""}`}
              disabled={t.finished || busy || wrongIds.has(a.id)} onClick={() => guess(a.id)}>
              {isImp && <span className="tag">IMPOSTER</span>}
              <span className="t">“{a.text}”</span>
              {t.finished && (
                <>
                  <span className="bar"><i style={{ width: `${pct}%` }} /></span>
                  <span className="m"><span>{pct}% suspected</span>
                    {t.sources?.[a.id] === "human" && <button className="flag" onClick={e => { e.stopPropagation(); api("/api/flag", { answerId: a.id }); }}>flag</button>}
                  </span>
                </>
              )}
            </button>
          );
        })}
      </div>

      <p className={`status ${t.finished ? (won ? "ok" : "bad") : ""}`}>
        {err ? err : t.finished ? (won ? `Caught in ${t.guesses.length}. Nice read.` : "The imposter got away.") : t.guesses.length === 1 ? "Wrong. One shot left." : ""}
      </p>

      {t.finished && (
        <section className="panel">
          <div className="stats">
            <div><b>{t.stats?.streak ?? 0}</b><small>streak</small></div>
            <div><b>{t.stats?.best_streak ?? 0}</b><small>best</small></div>
            <div><b>{t.stats?.games ? Math.round((t.stats.wins / t.stats.games) * 100) : 0}%</b><small>win rate</small></div>
            <div><b>{t.stats?.games ?? 0}</b><small>played</small></div>
          </div>
          <button className="btn" onClick={share}>{copied ? "Copied!" : "Share result"}</button>
        </section>
      )}

      {t.finished && tm?.available && (
        <section className="panel">
          <h2>Your line for tomorrow’s round</h2>
          {tm.role === "knower"
            ? <><div className="role k">You know the secret: <u>{tm.secret}</u></div><p className="rule">Describe it in up to 5 words — without saying it. Make it true but not too obvious, or you’ll make the imposter’s job easy.</p></>
            : <><div className="role i">🤫 You’re tomorrow’s IMPOSTER</div><p className="rule">You only know the category: <b>{tm.category}</b>. Write a vague line (up to 5 words) that could pass as a real description. Fool everyone.</p></>}
          {tm.submitted ? <p className="status ok">Submitted. Come back tomorrow to see if it made the lineup.</p> : (
            <>
              <input className="txt" maxLength={40} placeholder="e.g. late night box" value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} />
              {subErr && <p className="err">{subErr}</p>}
              <button className="btn ghost" onClick={submit} disabled={draft.trim().length < 2}>Submit my line</button>
            </>
          )}
        </section>
      )}

      <p className="foot">New round daily at 00:00 UTC · Every player's line feeds the next day's game.</p>
    </main>
  );
}
