-- ManifestDaily waitlist schema
-- Run this in the Supabase SQL editor

create table if not exists waitlist_emails (
  id          uuid primary key default gen_random_uuid(),
  email       text unique not null,
  created_at  timestamptz default now() not null
);

-- Index for fast duplicate checks
create index if not exists waitlist_emails_email_idx on waitlist_emails (email);

-- Row-level security: anon key can insert but not read
alter table waitlist_emails enable row level security;

create policy "anon_insert" on waitlist_emails
  for insert to anon
  with check (true);

-- Only service role can select (for admin use)
-- anon users cannot read the list
