create table if not exists public.progress_snapshots (
  user_id uuid primary key references auth.users (id) on delete cascade,
  snapshot jsonb not null,
  revision integer not null default 1 check (revision > 0),
  updated_at timestamptz not null default now()
);

alter table public.progress_snapshots enable row level security;

drop policy if exists "Read own progress snapshot" on public.progress_snapshots;
create policy "Read own progress snapshot"
  on public.progress_snapshots for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Insert own progress snapshot" on public.progress_snapshots;
create policy "Insert own progress snapshot"
  on public.progress_snapshots for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Update own progress snapshot" on public.progress_snapshots;
create policy "Update own progress snapshot"
  on public.progress_snapshots for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

grant select, insert, update on public.progress_snapshots to authenticated;
