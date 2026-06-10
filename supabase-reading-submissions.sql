create table if not exists public.reading_submissions (
  id uuid primary key default gen_random_uuid(),
  student_name text not null default 'Student',
  material_id text not null,
  material_title text not null,
  level text not null,
  multiple_choice_answers jsonb not null default '{}'::jsonb,
  gap_fill_answers jsonb not null default '{}'::jsonb,
  multiple_choice_score integer not null default 0,
  multiple_choice_total integer not null default 0,
  submitted_at timestamptz not null default now()
);

alter table public.reading_submissions enable row level security;

drop policy if exists "Anyone can submit reading worksheet answers" on public.reading_submissions;
create policy "Anyone can submit reading worksheet answers"
on public.reading_submissions
for insert
to anon
with check (
  char_length(student_name) <= 80
  and char_length(material_id) <= 160
  and char_length(material_title) <= 240
  and char_length(level) <= 20
  and multiple_choice_score >= 0
  and multiple_choice_total >= 0
  and multiple_choice_score <= multiple_choice_total
);

drop policy if exists "No public reading submission browsing" on public.reading_submissions;
create policy "No public reading submission browsing"
on public.reading_submissions
for select
to anon
using (false);
