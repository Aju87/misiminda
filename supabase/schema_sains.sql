-- ============================================================
-- MisiMinda: Subjek Sains
-- Jalankan DULU sebelum seed_sains.sql
-- ============================================================

-- 1) Bezakan level mengikut subjek. Semua level sedia ada = matematik.
alter table public.levels
  add column if not exists subject text not null default 'matematik';

update public.levels set subject = 'matematik' where subject is null or subject = '';

create index if not exists levels_subject_age_idx
  on public.levels (subject, age_group, quiz_mode, level_number);

-- 2) Jenis soalan baharu untuk Sains:
--    'urutan'   = susun kad mengikut urutan betul (kitaran hidup, proses)
--    'kategori' = asingkan item kepada 2 kumpulan (hidup/bukan hidup, timbul/tenggelam)
--    (kolum question_type sudah wujud dari schema_prasekolah.sql — tiada
--     CHECK constraint, jadi nilai baharu diterima terus)
alter table public.questions
  add column if not exists question_type text not null default 'pilihan';
