-- ============================================================
-- MisiMinda: Program Affiliate
-- Affiliate bayar RM50 (app penuh + hak affiliate), dapat RM15 setiap jualan RM35.
-- Komisen "ditahan" 7 hari (tempoh refund) sebelum boleh dikeluarkan.
-- Withdraw dihadkan sekali setiap 3 hari. Payout dibuat MANUAL oleh admin.
-- ============================================================

-- 1) Kod rujukan yang membawa pelanggan ini (diisi semasa daftar)
alter table public.parents
  add column if not exists referred_by text;

-- 2) Affiliate (satu baris per pengguna yang jadi affiliate)
create table if not exists public.affiliates (
  parent_id      uuid primary key references public.parents(id) on delete cascade,
  code           text not null unique,
  status         text not null default 'active' check (status in ('active', 'suspended')),
  bank_name      text,
  bank_account   text,
  account_holder text,
  created_at     timestamptz not null default now()
);

create index if not exists affiliates_code_idx on public.affiliates (code);

-- 3) Komisen — satu per pelanggan yang dirujuk (elak kira dua kali)
create table if not exists public.commissions (
  id                 uuid primary key default uuid_generate_v4(),
  affiliate_id       uuid not null references public.affiliates(parent_id) on delete cascade,
  referred_parent_id uuid not null references public.parents(id) on delete cascade,
  amount_sen         integer not null default 1500,   -- RM15
  status             text not null default 'pending'  -- pending → available_at lepas → available → requested → paid
                     check (status in ('pending', 'requested', 'paid', 'reversed')),
  available_at       timestamptz not null,            -- created_at + 7 hari (tempoh refund)
  withdrawal_id      uuid,
  created_at         timestamptz not null default now(),
  unique(referred_parent_id)
);

create index if not exists commissions_affiliate_idx on public.commissions (affiliate_id, status);

-- 4) Permohonan pengeluaran (withdraw)
create table if not exists public.withdrawals (
  id           uuid primary key default uuid_generate_v4(),
  affiliate_id uuid not null references public.affiliates(parent_id) on delete cascade,
  amount_sen   integer not null,
  status       text not null default 'pending' check (status in ('pending', 'paid', 'rejected')),
  bank_snapshot jsonb,                    -- salinan butiran bank ketika mohon
  admin_note   text,
  requested_at timestamptz not null default now(),
  paid_at      timestamptz
);

create index if not exists withdrawals_affiliate_idx on public.withdrawals (affiliate_id, requested_at desc);

-- 5) Link pembayaran CHIP (boleh ubah dari dashboard admin)
insert into public.site_settings (key, value) values
  ('chip_app_url',       'https://pay.chip-in.asia/misiminda'),
  ('chip_affiliate_url', '')
on conflict (key) do nothing;

-- ============================================================
-- RLS — affiliate hanya boleh BACA data sendiri.
-- Semua tulisan dibuat melalui API guna service_role (pintas RLS).
-- ============================================================
alter table public.affiliates  enable row level security;
alter table public.commissions enable row level security;
alter table public.withdrawals enable row level security;

drop policy if exists "affiliate_read_own" on public.affiliates;
create policy "affiliate_read_own" on public.affiliates
  for select using (auth.uid() = parent_id);

drop policy if exists "commission_read_own" on public.commissions;
create policy "commission_read_own" on public.commissions
  for select using (auth.uid() = affiliate_id);

drop policy if exists "withdrawal_read_own" on public.withdrawals;
create policy "withdrawal_read_own" on public.withdrawals
  for select using (auth.uid() = affiliate_id);
