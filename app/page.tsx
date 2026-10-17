"use client";
import { useEffect, useMemo, useState } from "react";
import { DICT, LANGS, detectLang, type Lang, type Dict } from "@/lib/i18n";

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

function Rules({ t: d }: { t: Dict }) {
  return (
    <>
      <div className="rules">
        <div className="rule"><div className="n">1</div><div><b>{d.rule1t}</b><span>{d.rule1}</span></div></div>
        <div className="rule"><div className="n">2</div><div><b>{d.rule2t}</b><span>{d.rule2}</span></div></div>
        <div className="rule"><div className="n">3</div><div><b>{d.rule3t}</b><span>{d.rule3}</span></div></div>
      </div>
      <div className="example">
        <b>{d.exampleLabel}</b> — {d.exampleSecret} <b>Coffee</b>: “dark and bitter” ✓ · “morning survival juice” ✓ · <span className="im">“bubbles tickle nose”</span> {d.exampleTail} <b>{d.exampleCat}</b>.
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
  const [lang, setLangState] = useState<Lang>("en");
  const d = DICT[lang];
  function setLang(l: Lang) { setLangState(l); try { localStorage.setItem("imp_lang", l); document.documentElement.lang = l; } catch {} }
  function cycleLang() { const i = LANGS.findIndex(x => x.code === lang); setLang(LANGS[(i + 1) % LANGS.length].code); }

  const load = () => api("/api/today").then(setT).catch(e => setErr(e.message));
  useEffect(() => {
    load();
    setLangState(detectLang());
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
    const line = won ? (t.guesses.length === 1 ? d.shareWinFirst : d.shareWinSecond) : d.shareLose;
    const txt = `Imposter Daily #${t.dayNumber} ${marks}\n${line}\n${d.shareStreak}: ${t.stats?.streak ?? 0}\nimposterdaily.com`;
    if (navigator.share) navigator.share({ text: txt }).catch(() => {});
    else navigator.clipboard?.writeText(txt).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); });
  }

  const header = (
    <div className="top">
      <div className="logo"><span className="mask">🕵️</span>Imposter <em>Daily</em></div>
      <div className="right">
        {t && <span className="pill">#{t.dayNumber}</span>}
        {t?.stats && t.stats.streak > 0 && <span className="pill hot">🔥 {t.stats.streak}</span>}
        <button className="pill lang" onClick={cycleLang} title={LANGS.find(x => x.code === lang)?.label} aria-label="Change language">{LANGS.find(x => x.code === lang)?.flag} {lang.toUpperCase()}</button>
        <button className="pill" onClick={() => setShowRules(true)}>{d.howToPlay}</button>
      </div>
    </div>
  );

  // landing / rules gate for first-time visitors
  if (!started) {
    return (
      <main className="wrap">
        {header}
        <section className="hero">
          <h1>{d.heroTitle1}<br /><span>{d.heroTitle2}</span></h1>
          <p>{d.heroLead}</p>
        </section>
        <Rules t={d} />
        <button className="btn" style={{ marginTop: 18 }} onClick={start} disabled={!t && !err}>
          {t ? `${d.playToday} · ${t.round.category}` : err ? err : d.loading}
        </button>
        <p className="foot">{d.footerFree}{lang !== "en" && <><br />{d.contentNote}</>}</p>
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
            <h2>{d.howToPlay}</h2>
            <p className="lead">{d.modalLead}</p>
            <Rules t={d} />
            <button className="btn" style={{ marginTop: 16 }} onClick={() => setShowRules(false)}>{d.gotIt}</button>
          </div>
        </div>
      )}

      {!t ? (
        <>
          <div className="secret"><div className="lbl">{d.secretWord}</div><div className="word">…</div></div>
          <div className="grid">{Array.from({ length: 10 }).map((_, i) => <div key={i} className="skel" />)}</div>
        </>
      ) : (
        <>
          <div className="secret pop">
            <div className="lbl">{d.secretWord}</div>
            <div className="word">{t.round.secret}</div>
            <div className="cat">{t.round.category}</div>
            {!t.finished && <>
              <p className="goal">{d.goalA} <b>{d.goalB}</b> {d.goalC}</p>
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
                  {isImp ? <span className="tag">{d.imposter}</span> : (t.finished && mine && <span className="you">{d.yourPick}</span>)}
                  <span className="num">{i + 1}</span>
                  <span className="t">“{a.text}”</span>
                  {t.finished ? (
                    <>
                      <span className="bar"><i style={{ width: `${pct}%` }} /></span>
                      <span className="m"><span>{pct}% {d.suspected}</span>
                        {t.sources?.[a.id] === "human" && <button className="flag" onClick={e => { e.stopPropagation(); api("/api/flag", { answerId: a.id }); }}>{d.flag}</button>}
                      </span>
                    </>
                  ) : <span className="m"><span>{t.sources?.[a.id] === "human" ? "" : ""}</span></span>}
                </button>
              );
            })}
          </div>

          <p className={`status ${t.finished ? (won ? "ok" : "bad") : ""}`}>
            {err ? err : t.finished ? (won ? (t.guesses.length === 1 ? d.winFirst : d.winSecond) : d.lose) : t.guesses.length === 1 ? d.lastShot : ""}
          </p>
          {t.finished && <p className="sub">{totalFirst > 0 ? d.playersToday(totalFirst.toLocaleString()) : d.firstIn}</p>}

          {t.finished && (
            <section className="panel pop">
              <div className="stats">
                <div><b>{t.stats?.streak ?? 0}</b><small>{d.streak}</small></div>
                <div><b>{t.stats?.best_streak ?? 0}</b><small>{d.best}</small></div>
                <div><b>{t.stats?.games ? Math.round((t.stats.wins / t.stats.games) * 100) : 0}%</b><small>{d.winRate}</small></div>
                <div><b>{t.stats?.games ?? 0}</b><small>{d.played}</small></div>
              </div>
              <button className="btn" onClick={share}>{d.share}</button>
              {copied && <p className="copied">{d.copied}</p>}
            </section>
          )}

          {t.finished && tm?.available && (
            <section className="panel pop">
              <h2>{d.tomorrowTitle}</h2>
              {tm.role === "knower"
                ? <><div className="role k">{d.knowerRole} <u>{tm.secret}</u></div><p className="sub" style={{ textAlign: "left" }}>{d.knowerHelp}</p></>
                : <><div className="role i">{d.imposterRole}</div><p className="sub" style={{ textAlign: "left" }}>{d.imposterHelpA} <b style={{ color: "var(--text)" }}>{tm.category}</b>. {d.imposterHelpB}</p></>}
              {tm.submitted ? <p className="status ok" style={{ fontSize: 16 }}>{d.submitted}</p> : (
                <>
                  <input className="txt" maxLength={40} placeholder={tm.role === "knower" ? d.phKnower : d.phImposter} value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} />
                  {subErr && <p className="err">{subErr}</p>}
                  <button className={`btn ${tm.role === "imposter" ? "gold" : ""}`} onClick={submit} disabled={draft.trim().length < 2}>
                    {tm.role === "imposter" ? d.plantBluff : d.submitLine}
                  </button>
                </>
              )}
            </section>
          )}
        </>
      )}

      <p className="foot">{d.footer}<br /><button className="flag" onClick={() => setShowRules(true)}>{d.howToPlay}</button></p>
    </main>
  );
}
