create table if not exists public.student_reviews (
  id uuid primary key default gen_random_uuid(),
  student_name text not null default 'Student',
  rating integer not null check (rating between 1 and 5),
  comment text not null check (char_length(comment) <= 220),
  is_approved boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.student_reviews
alter column is_approved set default true;

alter table public.student_reviews enable row level security;

drop policy if exists "Anyone can read approved student reviews" on public.student_reviews;
drop policy if exists "Anyone can read student reviews" on public.student_reviews;
create policy "Anyone can read student reviews"
on public.student_reviews
for select
to anon
using (true);

drop policy if exists "Anyone can submit student reviews" on public.student_reviews;
create policy "Anyone can submit student reviews"
on public.student_reviews
for insert
to anon
with check (
  rating between 1 and 5
  and char_length(comment) <= 220
  and is_approved = true
);

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'student_reviews'
  ) then
    alter publication supabase_realtime add table public.student_reviews;
  end if;
end $$;

insert into public.student_reviews (student_name, rating, comment, is_approved)
values
  ('Alya', 5, 'The lessons feel easy to follow, and I like choosing the space that matches what I want to practice.', true),
  ('Bima', 4, 'The platform makes reading and listening practice more interesting because the material looks clear.', true),
  ('Citra', 5, 'I feel more motivated to learn English because the homepage looks fun and the levels are simple to find.', true)
on conflict do nothing;
