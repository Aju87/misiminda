-- ============================================================
-- MisiMinda: Conversions API (Meta CAPI + TikTok Events API)
-- Jalankan dalam Supabase SQL Editor
-- ============================================================

-- 1) Jadual RAHSIA untuk access token.
--    PENTING: RLS dihidupkan TANPA sebarang policy →
--    anon key & authenticated user TIDAK boleh baca langsung.
--    Hanya service_role (API server) boleh akses.
create table if not exists public.secure_settings (
  key        text primary key,
  value      text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.secure_settings enable row level security;

-- Buang sebarang policy lama (jika ada) supaya benar-benar tertutup
drop policy if exists "secure_settings_public_read"  on public.secure_settings;
drop policy if exists "secure_settings_public_write" on public.secure_settings;

insert into public.secure_settings (key, value) values
  ('meta_access_token',    ''),
  ('meta_test_event_code', ''),
  ('tiktok_access_token',  '')
on conflict (key) do nothing;

-- 2) Simpan data atribusi iklan (fbp/fbc/ttclid/UA/IP) pada parent.
--    Digunakan semasa webhook CHIP hantar event Purchase ke Meta/TikTok
--    supaya "match quality" tinggi dan conversion dapat dipadankan.
alter table public.parents
  add column if not exists ad_attribution jsonb;
