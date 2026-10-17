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

function Rules() {
  return (
    <>
      <div className="rules">
        <div className="rule"><div className="n">1</div><div><b>Everyone sees the secret word.</b><span>Ten short lines describe it. Nine writers knew the word. One only knew the category — and bluffed.</span></div></div>
        <div className="rule"><div className="n">2</div><div><b>Find the imposter in 2 shots.</b><span>Tap the line that doesn’t fit. Guess right first try for a perfect round; miss twice and the imposter wins.</span></div></div>
        <div className="rule"><div className="n">3</div><div><b>Write tomorrow’s round.</b><span>After you play, you get a role for tomorrow: describe the next secret word — or, if you’re chosen as the imposter, bluff your way past everyone else.</span></div></div>
      </div>
      <div className="example">
        <b>Example</b> — secret word <b>Coffee</b>: “dark and bitter” ✓ · “morning survival juice” ✓ · <span className="im">“bubbles tickle nose”</span> ← imposter only knew the category <b>Drinks</b>.
      </div>
    </>
  );
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
  const [showRules, setShowRules] = useState(false);
  const [started, setStarted] = useState(false);

  const load = () => api("/api/today").then(setT).catch(e => setErr(e.message));
  useEffect(() => {
    load();
    try { if (localStorage.getItem("imp_seen")) setStarted(true); } catch {}
  }, []);
  useEffect(() => { if (t?.finished) { setStarted(true); api("/api/tomorrow").then(setTm).catch(() => {}); } }, [t?.finished]);

  const wrongIds = useMemo(() => new Set((t?.guesses ?? []).filter(g => !g.correct).map(g => g.id)), [t]);
  const won = t?.guesses.some(g => g.correct) ?? false;
  const totalFirst = (t?.crowd ?? []).reduce((s, c) => s + Number(c.first_picks), 0) || 0;
  const shotsLeft = 2 - (t?.guesses.filter(g => !g.correct).length ?? 0);

  function start() { setStarted(true); try { localStorage.setItem("imp_seen", "1"); } catch {} }

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
    const marks = t.guesses.map(g => (g.correct ? "🟩" : "🟥")).join("") + (won && t.guesses.length === 1 ? "⬛" : "");
    const line = won ? (t.guesses.length === 1 ? "Caught the imposter first try 🕵️" : "Caught the imposter in 2 🕵️") : "The imposter got away 🫣";
    const txt = `Imposter Daily #${t.dayNumber} ${marks}\n${line}\nStreak: ${t.stats?.streak ?? 0}\n${location.origin}`;
    if (navigator.share) navigator.share({ text: txt }).catch(() => {});
    else navigator.clipboard?.writeText(txt).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); });
  }

  const header = (
    <div className="top">
      <div className="logo"><span className="mask">🕵️</span>Imposter <em>Daily</em></div>
      <div className="right">
        {t && <span className="pill">#{t.dayNumber}</span>}
        {t?.stats && t.stats.streak > 0 && <span className="pill hot">🔥 {t.stats.streak}</span>}
        <button className="pill" onClick={() => setShowRules(true)}>How to play</button>
      </div>
    </div>
  );

  // landing / rules gate for first-time visitors
  if (!started) {
    return (
      <main className="wrap">
        {header}
        <section className="hero">
          <h1>Nine told the truth.<br /><span>One is lying.</span></h1>
          <p>A 60-second daily game of bluffing and deduction. Same round for everyone, new one every day — and the players write the next one.</p>
        </section>
        <Rules />
        <button className="btn" style={{ marginTop: 18 }} onClick={start} disabled={!t && !err}>
          {t ? `Play today’s round · ${t.round.category}` : err ? err : "Loading…"}
        </button>
        <p className="foot">Free · No sign-up · New round daily at 00:00 UTC</p>
      </main>
    );
  }

  if (err && !t) return <main className="wrap">{header}<p className="status bad">{err}</p></main>;

  return (
    <main className="wrap">
      {header}

      {showRules && (
        <div className="overlay" onClick={() => setShowRules(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>How to play</h2>
            <p className="lead">Sixty seconds. Two guesses. One liar.</p>
            <Rules />
            <button className="btn" style={{ marginTop: 16 }} onClick={() => setShowRules(false)}>Got it</button>
          </div>
        </div>
      )}

      {!t ? (
        <>
          <div className="secret"><div className="lbl">The secret word</div><div className="word">…</div></div>
          <div className="grid">{Array.from({ length: 10 }).map((_, i) => <div key={i} className="skel" />)}</div>
        </>
      ) : (
        <>
          <div className="secret pop">
            <div className="lbl">The secret word</div>
            <div className="word">{t.round.secret}</div>
            <div className="cat">{t.round.category}</div>
            {!t.finished && <>
              <p className="goal">Nine of these lines were written by people who knew the word. <b>One writer only knew the category.</b> Tap the imposter.</p>
              <div className="shots"><i className={shotsLeft >= 1 ? "on" : ""} /><i className={shotsLeft >= 2 ? "on" : ""} /></div>
            </>}
          </div>

          <div className="grid">
            {t.answers.map((a, i) => {
              const isImp = t.finished && a.id === t.imposterId;
              const c = t.crowd?.find(x => x.picked_answer_id === a.id);
              const pct = totalFirst ? Math.round((Number(c?.first_picks ?? 0) / totalFirst) * 100) : 0;
              const mine = t.guesses.some(g => g.id === a.id);
              return (
                <button key={a.id} className={`ans ${wrongIds.has(a.id) ? "wrong" : ""} ${isImp ? "imposter" : ""} ${shakeId === a.id ? "shake" : ""}`}
                  disabled={t.finished || busy || wrongIds.has(a.id)} onClick={() => guess(a.id)}>
                  {isImp ? <span className="tag">IMPOSTER</span> : (t.finished && mine && <span className="you">YOUR PICK</span>)}
                  <span className="num">{i + 1}</span>
                  <span className="t">“{a.text}”</span>
                  {t.finished ? (
                    <>
                      <span className="bar"><i style={{ width: `${pct}%` }} /></span>
                      <span className="m"><span>{pct}% suspected this</span>
                        {t.sources?.[a.id] === "human" && <button className="flag" onClick={e => { e.stopPropagation(); api("/api/flag", { answerId: a.id }); }}>flag</button>}
                      </span>
                    </>
                  ) : <span className="m"><span>{t.sources?.[a.id] === "human" ? "" : ""}</span></span>}
                </button>
              );
            })}
          </div>

          <p className={`status ${t.finished ? (won ? "ok" : "bad") : ""}`}>
            {err ? err : t.finished ? (won ? (t.guesses.length === 1 ? "First try. Flawless." : "Caught in two. Nice read.") : "The imposter got away.") : t.guesses.length === 1 ? "Not that one. Last shot." : ""}
          </p>
          {t.finished && <p className="sub">{totalFirst > 0 ? `${totalFirst.toLocaleString()} players guessed today.` : "You’re first in today. Share it."}</p>}

          {t.finished && (
            <section className="panel pop">
              <div className="stats">
                <div><b>{t.stats?.streak ?? 0}</b><small>streak</small></div>
                <div><b>{t.stats?.best_streak ?? 0}</b><small>best</small></div>
                <div><b>{t.stats?.games ? Math.round((t.stats.wins / t.stats.games) * 100) : 0}%</b><small>win rate</small></div>
                <div><b>{t.stats?.games ?? 0}</b><small>played</small></div>
              </div>
              <button className="btn" onClick={share}>Share result</button>
              {copied && <p className="copied">Copied to clipboard.</p>}
            </section>
          )}

          {t.finished && tm?.available && (
            <section className="panel pop">
              <h2>Now write tomorrow’s round</h2>
              {tm.role === "knower"
                ? <><div className="role k">Tomorrow’s secret word is <u>{tm.secret}</u></div><p className="sub" style={{ textAlign: "left" }}>Describe it in up to 5 words without saying it. True, but not obvious — easy clues help the imposter blend in.</p></>
                : <><div className="role i">🤫 You’ve been chosen as tomorrow’s IMPOSTER</div><p className="sub" style={{ textAlign: "left" }}>You only know the category: <b style={{ color: "var(--text)" }}>{tm.category}</b>. Write a vague line (up to 5 words) that could pass as real. Fool everyone.</p></>}
              {tm.submitted ? <p className="status ok" style={{ fontSize: 16 }}>Submitted. Come back tomorrow to see if your line made the lineup.</p> : (
                <>
                  <input className="txt" maxLength={40} placeholder={tm.role === "knower" ? "e.g. late night box" : "e.g. everyone has one"} value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} />
                  {subErr && <p className="err">{subErr}</p>}
                  <button className={`btn ${tm.role === "imposter" ? "gold" : ""}`} onClick={submit} disabled={draft.trim().length < 2}>
                    {tm.role === "imposter" ? "Plant my bluff" : "Submit my line"}
                  </button>
                </>
              )}
            </section>
          )}
        </>
      )}

      <p className="foot">New round daily at 00:00 UTC · Every player’s line feeds the next day’s game.<br /><button className="flag" onClick={() => setShowRules(true)}>How to play</button></p>
    </main>
  );
}
