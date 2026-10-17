# Imposter Daily

Daily social-deduction game. Ten short lines describe a secret word; nine authors knew the word, one only knew the category and bluffed. Players get 2 guesses, then write a line for tomorrow's round (1 in 8 are secretly assigned as the imposter) — so players generate the content.

## Stack
- Next.js 15 (app router) on Vercel
- Supabase Postgres (project `open-brain`, tables `imp_*`)
- All game logic lives in `security definer` RPCs: `imp_today`, `imp_guess`, `imp_tomorrow`, `imp_submit`, `imp_flag_answer`. Anon has **no table access**, so the anon key is safe to ship.

## Deploy
```bash
npx vercel --prod
```
Env vars (optional, defaults baked in): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## Content
- `seed/rounds.json` — 31 seeded rounds (2026-10-17 → 2026-11-16). Add more and run `node scripts/seed.mjs 2026-11-17 > seed/seed.sql`, then execute in Supabase SQL editor.
- Human answers are preferred over seed when building each day's lineup. Lineups freeze on first view.
- 3 flags hide a human answer.

## Ops SQL
```sql
-- human lines queued per day
select r.play_date, count(*) filter (where is_imposter) imps, count(*) total
from imp_answers a join imp_rounds r on r.id=a.round_id where a.source='human' group by 1 order by 1;
-- daily actives
select round_id, count(distinct player_id) players from imp_guesses group by 1;
```
