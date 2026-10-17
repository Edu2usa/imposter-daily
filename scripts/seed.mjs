// Generates seed SQL from seed/rounds.json. Usage: node scripts/seed.mjs [startDate] > seed.sql
import fs from "node:fs";
const rounds = JSON.parse(fs.readFileSync(new URL("../seed/rounds.json", import.meta.url)));
const start = process.argv[2] || new Date().toISOString().slice(0, 10);
const q = s => "'" + String(s).replace(/'/g, "''") + "'";
let sql = "";
rounds.forEach((r, i) => {
  const d = new Date(start + "T00:00:00Z"); d.setUTCDate(d.getUTCDate() + i);
  const date = d.toISOString().slice(0, 10);
  const prompt = `Describe "${r.secret}" in up to 5 words without saying it.`;
  sql += `with r as (insert into imp_rounds (play_date, secret, category, prompt) values (${q(date)}, ${q(r.secret)}, ${q(r.category)}, ${q(prompt)}) on conflict (play_date) do update set secret=excluded.secret returning id)\n`;
  sql += `insert into imp_answers (round_id, text, is_imposter, source) select r.id, v.t, v.i, 'seed' from r, (values\n`;
  sql += [...r.true.map(t => `(${q(t)}, false)`), `(${q(r.imposter)}, true)`].join(",\n") + `\n) as v(t, i);\n\n`;
});
process.stdout.write(sql);
