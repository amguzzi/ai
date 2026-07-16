-- Quote game persistence schema.
-- Run in the Supabase SQL editor (or as a migration).

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  score integer,
  share_id text unique,
  user_agent text
);

create table if not exists guesses (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references sessions (id) on delete cascade,
  card_id text not null,
  raw_guess text not null,          -- the gold: never discard, matched or not
  normalized_guess text not null,
  is_correct boolean not null,
  matched_term text,                -- normalized accepted term that matched; null on a miss
  created_at timestamptz not null default now()
);

create index if not exists guesses_session_id_idx on guesses (session_id);
create index if not exists guesses_card_id_idx on guesses (card_id);
create index if not exists sessions_share_id_idx on sessions (share_id);

-- All access goes through the app's server (service role key), so lock the
-- tables down for anon/authenticated clients: RLS on, no policies.
alter table sessions enable row level security;
alter table guesses enable row level security;
