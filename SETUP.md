# ManifestDaily — Waitlist Setup Guide

## 1. Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. In the SQL Editor, run the contents of `supabase/schema.sql`
3. Copy your project URL and anon key from **Project Settings → API**

## 2. Environment Variables

Create a `.env` file in the project root:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Never commit this file.** The `.gitignore` already excludes `.env`.

> The anon key is safe to expose in the browser — Row Level Security on the
> `waitlist_emails` table ensures anon users can only INSERT, never SELECT.
> Never use the service role key on the frontend.

## 3. Local Development

```bash
npm install
npm run dev
```

## 4. Production Deployment (Vercel)

```bash
npm install -g vercel
vercel
```

Set env vars in the Vercel dashboard:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 5. Analytics (Optional)

Open `src/lib/analytics.ts` and wire up your provider (PostHog, Mixpanel, etc.)
inside the `track()` function. Three events are already emitted:

| Event | When |
|---|---|
| `Waitlist Submitted` | Successful new signup |
| `Duplicate Email` | Email already in waitlist |
| `Waitlist Error` | Supabase error |

## 6. Database Schema

```sql
create table waitlist_emails (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  created_at timestamptz default now() not null
);
```

## 7. Viewing Signups

In Supabase Dashboard → Table Editor → `waitlist_emails`.
Or via service role in a server-side script — never expose service role key to the browser.
