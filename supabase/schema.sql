-- Run this in the Supabase SQL editor (Dashboard > SQL Editor > New query).
-- Replaces the base44 `Lead` and `Application` entities.
-- `User` no longer needs a table of its own — Supabase Auth's built-in
-- `auth.users` table covers it; query it via supabase.auth.getUser()/getSession()
-- rather than a custom table.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  age text,
  goal text,
  experience text,
  message text,
  created_at timestamptz not null default now()
);

-- Row Level Security: both forms are public (unauthenticated visitors submit
-- them), so we allow anonymous INSERT only. No one can SELECT/UPDATE/DELETE
-- from the client — read the data from the Supabase dashboard/Table editor,
-- or add an authenticated-admin policy later if you build an admin view.

alter table public.leads enable row level security;
alter table public.applications enable row level security;

create policy "Allow public insert on leads"
  on public.leads for insert
  to anon
  with check (true);

create policy "Allow public insert on applications"
  on public.applications for insert
  to anon
  with check (true);

-- Public storage bucket for site images (logo, about photo, etc.) that used
-- to live on base44's media CDN. Public = readable by anyone via URL, which
-- is what you want for images embedded in a public landing page.
-- Easiest to create via Dashboard > Storage > New bucket > name "site-assets"
-- and toggle "Public bucket" on. Or run this instead:
insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;
