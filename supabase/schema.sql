-- ============================================================
-- MisiMinda Database Schema
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- TABLES
-- ============================================================

-- Parents table (linked to Supabase Auth)
create table if not exists public.parents (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  name text not null,
  subscription_status text not null default 'inactive' check (subscription_status in ('active', 'inactive', 'trial')),
  pin text, -- 4-digit hashed PIN for dashboard access
  chip_customer_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Kids table
create table if not exists public.kids (
  id uuid primary key default uuid_generate_v4(),
  parent_id uuid not null references public.parents(id) on delete cascade,
  name text not null,
  age_group text not null check (age_group in ('5-6', '7-9', '10-12')),
  avatar_url text not null default 'rocket',
  total_stars integer not null default 0,
  created_at timestamptz not null default now(),
  constraint max_kids_per_parent check (
    (select count(*) from public.kids k where k.parent_id = parent_id) <= 4
  )
);

-- Levels table
create table if not exists public.levels (
  id uuid primary key default uuid_generate_v4(),
  age_group text not null check (age_group in ('5-6', '7-9', '10-12')),
  theme text not null,
  level_number integer not null,
  description text,
  created_at timestamptz not null default now(),
  unique(age_group, level_number)
);

-- Questions table
create table if not exists public.questions (
  id uuid primary key default uuid_generate_v4(),
  level_id uuid not null references public.levels(id) on delete cascade,
  story_text text not null,
  question_text text not null,
  options jsonb not null, -- array of string|number
  correct_answer jsonb not null, -- string or number
  success_message text not null default 'Hebat! Jawapan betul!',
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

-- Kid progress table
create table if not exists public.kid_progress (
  id uuid primary key default uuid_generate_v4(),
  kid_id uuid not null references public.kids(id) on delete cascade,
  level_id uuid not null references public.levels(id) on delete cascade,
  questions_answered integer not null default 0,
  stars_earned integer not null default 0,
  completed boolean not null default false,
  completed_at timestamptz,
  unique(kid_id, level_id)
);

-- Rewards table
create table if not exists public.rewards (
  id uuid primary key default uuid_generate_v4(),
  parent_id uuid not null references public.parents(id) on delete cascade,
  kid_id uuid not null references public.kids(id) on delete cascade,
  reward_name text not null,
  stars_required integer not null,
  is_redeemed boolean not null default false,
  redeemed_at timestamptz,
  created_at timestamptz not null default now()
);

-- Payments table (for CHIP webhook records)
create table if not exists public.payments (
  id uuid primary key default uuid_generate_v4(),
  parent_id uuid not null references public.parents(id) on delete cascade,
  chip_purchase_id text not null unique,
  plan text not null,
  amount integer not null, -- in sen
  status text not null default 'pending' check (status in ('pending', 'paid', 'expired', 'cancelled')),
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.parents enable row level security;
alter table public.kids enable row level security;
alter table public.levels enable row level security;
alter table public.questions enable row level security;
alter table public.kid_progress enable row level security;
alter table public.rewards enable row level security;
alter table public.payments enable row level security;

-- Parents: users can only see/edit their own record
create policy "Parents can view own record"
  on public.parents for select
  using (auth.uid() = id);

create policy "Parents can update own record"
  on public.parents for update
  using (auth.uid() = id);

create policy "Parents can insert own record"
  on public.parents for insert
  with check (auth.uid() = id);

-- Kids: parents can manage their own kids
create policy "Parents can view own kids"
  on public.kids for select
  using (auth.uid() = parent_id);

create policy "Parents can insert own kids"
  on public.kids for insert
  with check (auth.uid() = parent_id);

create policy "Parents can update own kids"
  on public.kids for update
  using (auth.uid() = parent_id);

create policy "Parents can delete own kids"
  on public.kids for delete
  using (auth.uid() = parent_id);

-- Levels & Questions: public read
create policy "Levels are publicly readable"
  on public.levels for select
  using (true);

create policy "Questions are publicly readable"
  on public.questions for select
  using (true);

-- Kid progress: parent can manage their kids' progress
create policy "Parents can manage kid progress"
  on public.kid_progress for all
  using (
    exists (
      select 1 from public.kids
      where kids.id = kid_progress.kid_id
      and kids.parent_id = auth.uid()
    )
  );

-- Rewards: parents manage their own rewards
create policy "Parents can manage own rewards"
  on public.rewards for all
  using (auth.uid() = parent_id);

-- Payments: parents can view own payments
create policy "Parents can view own payments"
  on public.payments for select
  using (auth.uid() = parent_id);

-- ============================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================

-- Auto-create parent record when a new user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.parents (id, email, name, subscription_status)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    'inactive'
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_parents_updated_at
  before update on public.parents
  for each row execute procedure public.handle_updated_at();

-- Increment kid total_stars when progress is updated
create or replace function public.update_kid_stars()
returns trigger
language plpgsql
security definer
as $$
begin
  update public.kids
  set total_stars = (
    select coalesce(sum(stars_earned), 0)
    from public.kid_progress
    where kid_id = new.kid_id
  )
  where id = new.kid_id;
  return new;
end;
$$;

create trigger on_progress_update_stars
  after insert or update of stars_earned on public.kid_progress
  for each row execute procedure public.update_kid_stars();
