-- ============================================================
-- MisiMinda: Sokongan Prasekolah (umur 2-5 tahun)
-- Track literasi awal: Mengenal Huruf, Mengeja, Padanan (Kuiz Si Kecil)
-- Jalankan DULU sebelum seed_prasekolah.sql
-- ============================================================

-- 1) Benarkan kumpulan umur baharu '2-5' pada jadual kids & levels
alter table public.kids
  drop constraint if exists kids_age_group_check;
alter table public.kids
  add constraint kids_age_group_check
  check (age_group in ('2-5', '5-6', '7-9', '10-12'));

alter table public.levels
  drop constraint if exists levels_age_group_check;
alter table public.levels
  add constraint levels_age_group_check
  check (age_group in ('2-5', '5-6', '7-9', '10-12'));

-- 2) Jenis soalan interaktif baharu
--    'pilihan' = tekan jawapan betul (kenal huruf / pilih perkataan)
--    'susun'   = susun huruf jadi perkataan (mengeja)
--    'padanan' = padan sisi A ke B dengan garisan
alter table public.questions
  add column if not exists question_type text not null default 'pilihan';

-- 3) Pastikan kolum tambahan pada levels wujud (jika belum dari migrasi lain)
alter table public.levels
  add column if not exists quiz_mode text not null default 'misi',
  add column if not exists category  text,
  add column if not exists icon      text default '🎯';
