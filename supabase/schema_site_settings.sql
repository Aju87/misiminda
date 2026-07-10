-- ============================================================
-- MisiMinda: Site Settings (tracking pixels, dll)
-- Jalankan dalam Supabase SQL Editor
-- ============================================================

create table if not exists public.site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

-- Semua orang boleh baca (pixel perlu dibaca sebelum login)
drop policy if exists "site_settings_public_read" on public.site_settings;
create policy "site_settings_public_read"
  on public.site_settings for select
  using (true);

-- Tiada policy insert/update — hanya service role (API admin) boleh tulis

-- Seed baris kosong untuk pixel
insert into public.site_settings (key, value) values
  ('meta_pixel_id', ''),
  ('tiktok_pixel_id', '')
on conflict (key) do nothing;
