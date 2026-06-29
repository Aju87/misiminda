-- ============================================================
-- Tambah kolum quiz_mode dan category pada jadual levels
-- Jalankan ini DULU sebelum seed_latihan.sql
-- ============================================================

ALTER TABLE public.levels
  ADD COLUMN IF NOT EXISTS quiz_mode TEXT NOT NULL DEFAULT 'misi',
  ADD COLUMN IF NOT EXISTS category  TEXT;

-- Update semua level sedia ada kepada 'misi'
UPDATE public.levels SET quiz_mode = 'misi' WHERE quiz_mode IS NULL OR quiz_mode = '';
