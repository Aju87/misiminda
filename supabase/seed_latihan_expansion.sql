-- ============================================================
-- MisiMinda: Perluasan Latihan Pantas
-- Tambah: Wang & Kewangan, Masa & Ukuran, Geometri, Statistik & Data
-- Jalankan selepas seed_latihan.sql
-- ============================================================

-- ============================================================
-- LEVELS BAHARU
-- ============================================================
INSERT INTO public.levels (id, age_group, theme, level_number, description, quiz_mode, category) VALUES

-- ===== 5-6 TAHUN =====
('a4c2ce87-49fc-49a6-976f-3b9879657eca', '5-6', 'Kenali Duit Malaysia', 3,
 'Kenali syiling dan wang kertas Ringgit Malaysia!', 'latihan', 'wang'),
('c9ff58a9-162f-4442-8e7d-971d8545d689', '5-6', 'Masa & Ukuran Asas', 4,
 'Kenal pagi, petang, malam dan banding saiz!', 'latihan', 'masa-ukuran'),

-- ===== 7-9 TAHUN =====
('d0dbddcc-a9fb-49c7-aa00-5f13f28cdf61', '7-9', 'Celik Kewangan Asas', 4,
 'Kira wang hingga RM10,000 — jadi bijak duit!', 'latihan', 'wang'),
('26109a7c-97db-4bcf-89b3-befbd4692a12', '7-9', 'Jam & Sukatan', 5,
 'Baca jam dan kira ukuran panjang, berat, isipadu!', 'latihan', 'masa-ukuran'),
('22d64939-8604-473c-b3a6-60b2923fb076', '7-9', 'Piktograf & Carta', 6,
 'Baca piktograf dan carta palang mudah!', 'latihan', 'data'),

-- ===== 10-12 TAHUN =====
('bf78ec6b-9719-46cb-b9d6-b6bb6b24cf4c', '10-12', 'Untung Rugi & Diskaun', 7,
 'Kira untung, rugi, diskaun dan bajet peribadi!', 'latihan', 'wang'),
('967b57e1-b259-4046-8331-f92644b0539a', '10-12', 'Perimeter & Luas', 8,
 'Kira perimeter, luas dan isipadu bentuk!', 'latihan', 'geometri'),
('0281e42d-e855-472f-9443-1937923b60aa', '10-12', 'Purata & Carta Pai', 9,
 'Fahami min, mod, median dan carta pai!', 'latihan', 'data');

-- ============================================================
-- QUESTIONS: 5-6 Tahun — Kenali Duit Malaysia
-- ============================================================
INSERT INTO public.questions (level_id, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('a4c2ce87-49fc-49a6-976f-3b9879657eca', '', 'Ali ada 1 syiling 50 sen. Berapa sen ada pada Ali?', '[30, 40, 50, 60]', '50', 'Betul! 50 sen!', 1),
('a4c2ce87-49fc-49a6-976f-3b9879657eca', '', 'Mira ada 2 keping syiling 10 sen. Berapa sen semua?', '[10, 15, 20, 25]', '20', 'Pandai! 20 sen!', 2),
('a4c2ce87-49fc-49a6-976f-3b9879657eca', '', '1 Ringgit (RM1) sama dengan berapa sen?', '[10, 50, 100, 1000]', '100', 'Betul! RM1 = 100 sen!', 3),
('a4c2ce87-49fc-49a6-976f-3b9879657eca', '', 'Ayu ada 1 syiling 20 sen dan 1 syiling 10 sen. Berapa sen semua?', '[20, 25, 30, 35]', '30', 'Hebat! 30 sen!', 4),
('a4c2ce87-49fc-49a6-976f-3b9879657eca', '', 'RM1 sama nilai dengan berapa keping syiling 50 sen?', '[1, 2, 3, 4]', '2', 'Betul! 2 keping!', 5),
('a4c2ce87-49fc-49a6-976f-3b9879657eca', '', 'Danish ada RM2. Berapa keping RM1 sama nilai dengannya?', '[1, 2, 3, 4]', '2', 'Pandai! 2 keping RM1!', 6),
('a4c2ce87-49fc-49a6-976f-3b9879657eca', '', 'Siapa ada lebih wang: 3 syiling 20 sen atau 1 syiling 50 sen?', '["3 syiling 20 sen", "1 syiling 50 sen"]', '"3 syiling 20 sen"', 'Betul! 60 sen lebih banyak!', 7),
('a4c2ce87-49fc-49a6-976f-3b9879657eca', '', 'Berapa syiling 10 sen diperlukan untuk buat 50 sen?', '[3, 4, 5, 6]', '5', 'Hebat! 5 keping!', 8),
('a4c2ce87-49fc-49a6-976f-3b9879657eca', '', 'Faris ada 4 syiling 5 sen. Berapa sen semua?', '[15, 20, 25, 30]', '20', 'Betul! 20 sen!', 9),
('a4c2ce87-49fc-49a6-976f-3b9879657eca', '', 'Berapa sen dalam separuh daripada RM1?', '[25, 50, 75, 100]', '50', 'Tahniah! Kamu kenal duit Malaysia!', 10);

-- ============================================================
-- QUESTIONS: 5-6 Tahun — Masa & Ukuran Asas
-- ============================================================
INSERT INTO public.questions (level_id, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('c9ff58a9-162f-4442-8e7d-971d8545d689', '', 'Kita bangun tidur pada waktu...?', '["Pagi", "Petang", "Malam"]', '"Pagi"', 'Betul! Selamat pagi!', 1),
('c9ff58a9-162f-4442-8e7d-971d8545d689', '', 'Kita makan malam pada waktu...?', '["Pagi", "Tengahari", "Malam"]', '"Malam"', 'Pandai! Waktu malam!', 2),
('c9ff58a9-162f-4442-8e7d-971d8545d689', '', 'Manakah lebih panjang: pensel atau pembaris 30cm?', '["Pensel", "Pembaris 30cm"]', '"Pembaris 30cm"', 'Betul! Pembaris lebih panjang!', 3),
('c9ff58a9-162f-4442-8e7d-971d8545d689', '', 'Manakah lebih berat: buku tebal atau pemadam?', '["Buku tebal", "Pemadam"]', '"Buku tebal"', 'Hebat! Buku lebih berat!', 4),
('c9ff58a9-162f-4442-8e7d-971d8545d689', '', 'Gajah lebih ___ daripada semut.', '["besar", "kecil"]', '"besar"', 'Betul! Gajah sangat besar!', 5),
('c9ff58a9-162f-4442-8e7d-971d8545d689', '', 'Selepas hari Isnin ialah hari...?', '["Ahad", "Selasa", "Rabu"]', '"Selasa"', 'Pandai! Hari Selasa!', 6),
('c9ff58a9-162f-4442-8e7d-971d8545d689', '', 'Sebelum petang ialah waktu...?', '["Pagi", "Malam", "Subuh"]', '"Pagi"', 'Betul! Waktu pagi dulu!', 7),
('c9ff58a9-162f-4442-8e7d-971d8545d689', '', 'Manakah lebih tinggi: pokok kelapa atau pokok bunga?', '["Pokok kelapa", "Pokok bunga"]', '"Pokok kelapa"', 'Hebat! Pokok kelapa sangat tinggi!', 8),
('c9ff58a9-162f-4442-8e7d-971d8545d689', '', '1 minggu ada berapa hari?', '[5, 6, 7, 8]', '7', 'Betul! 7 hari seminggu!', 9),
('c9ff58a9-162f-4442-8e7d-971d8545d689', '', 'Jam menunjukkan waktu supaya kita boleh...?', '["makan sahaja", "tidur sahaja", "ketahui masa"]', '"ketahui masa"', 'Tahniah! Kamu faham tentang masa dan ukuran!', 10);

-- ============================================================
-- QUESTIONS: 7-9 Tahun — Celik Kewangan Asas
-- ============================================================
INSERT INTO public.questions (level_id, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('d0dbddcc-a9fb-49c7-aa00-5f13f28cdf61', '', 'RM 45 + RM 32 = ?', '["RM 75", "RM 76", "RM 77", "RM 78"]', '"RM 77"', 'Betul! RM 45 + RM 32 = RM 77', 1),
('d0dbddcc-a9fb-49c7-aa00-5f13f28cdf61', '', 'RM 120 - RM 45 = ?', '["RM 73", "RM 74", "RM 75", "RM 76"]', '"RM 75"', 'Pandai! RM 120 - RM 45 = RM 75', 2),
('d0dbddcc-a9fb-49c7-aa00-5f13f28cdf61', '', 'RM 15 × 4 = ?', '["RM 50", "RM 55", "RM 60", "RM 65"]', '"RM 60"', 'Betul! RM 15 × 4 = RM 60', 3),
('d0dbddcc-a9fb-49c7-aa00-5f13f28cdf61', '', 'RM 200 ÷ 5 = ?', '["RM 30", "RM 35", "RM 40", "RM 45"]', '"RM 40"', 'Hebat! RM 200 ÷ 5 = RM 40', 4),
('d0dbddcc-a9fb-49c7-aa00-5f13f28cdf61', '', 'Ibu beli barang RM 350 dan RM 275. Jumlah perbelanjaan?', '["RM 615", "RM 620", "RM 625", "RM 630"]', '"RM 625"', 'Betul! RM 350 + RM 275 = RM 625', 5),
('d0dbddcc-a9fb-49c7-aa00-5f13f28cdf61', '', 'Ayah ada RM 5,000. Dia belanja RM 1,850. Baki wang?', '["RM 3,050", "RM 3,150", "RM 3,250", "RM 3,350"]', '"RM 3,150"', 'Pandai! Baki RM 3,150', 6),
('d0dbddcc-a9fb-49c7-aa00-5f13f28cdf61', '', 'RM 1,200 dibahagi 4 orang sama rata. Setiap orang dapat?', '["RM 250", "RM 300", "RM 350", "RM 400"]', '"RM 300"', 'Betul! Setiap orang RM 300', 7),
('d0dbddcc-a9fb-49c7-aa00-5f13f28cdf61', '', 'Harga buku RM 18. Beli 6 buku. Jumlah kos?', '["RM 98", "RM 100", "RM 108", "RM 110"]', '"RM 108"', 'Hebat! RM 18 × 6 = RM 108', 8),
('d0dbddcc-a9fb-49c7-aa00-5f13f28cdf61', '', 'Simpanan RM 2,500 + RM 1,750 = ?', '["RM 4,150", "RM 4,250", "RM 4,350", "RM 4,450"]', '"RM 4,250"', 'Betul! Jumlah simpanan RM 4,250', 9),
('d0dbddcc-a9fb-49c7-aa00-5f13f28cdf61', '', 'RM 9,000 - RM 3,450 = ?', '["RM 5,450", "RM 5,550", "RM 5,650", "RM 5,750"]', '"RM 5,550"', 'Tahniah! Kamu celik kewangan!', 10);

-- ============================================================
-- QUESTIONS: 7-9 Tahun — Jam & Sukatan
-- ============================================================
INSERT INTO public.questions (level_id, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('26109a7c-97db-4bcf-89b3-befbd4692a12', '', 'Jarum pendek pada 3, jarum panjang pada 12. Pukul berapa?', '["2:00", "3:00", "4:00", "5:00"]', '"3:00"', 'Betul! Pukul 3:00!', 1),
('26109a7c-97db-4bcf-89b3-befbd4692a12', '', 'Jarum pendek antara 7 dan 8, jarum panjang pada 6. Pukul berapa?', '["6:30", "7:00", "7:30", "8:00"]', '"7:30"', 'Pandai! Pukul 7:30!', 2),
('26109a7c-97db-4bcf-89b3-befbd4692a12', '', '1 meter sama dengan berapa sentimeter?', '[10, 100, 1000, 10000]', '100', 'Betul! 1m = 100cm', 3),
('26109a7c-97db-4bcf-89b3-befbd4692a12', '', '1 kilogram sama dengan berapa gram?', '[10, 100, 1000, 10000]', '1000', 'Hebat! 1kg = 1000g', 4),
('26109a7c-97db-4bcf-89b3-befbd4692a12', '', '1 liter sama dengan berapa mililiter?', '[10, 100, 1000, 10000]', '1000', 'Betul! 1L = 1000ml', 5),
('26109a7c-97db-4bcf-89b3-befbd4692a12', '', 'Meja itu panjangnya 150 cm. Berapa meter?', '[1, 1.5, 2, 2.5]', '1.5', 'Pandai! 150cm = 1.5m', 6),
('26109a7c-97db-4bcf-89b3-befbd4692a12', '', 'Botol A ada 500 ml susu, botol B ada 300 ml. Jumlah semua?', '[700, 750, 800, 850]', '800', 'Betul! 500 + 300 = 800ml', 7),
('26109a7c-97db-4bcf-89b3-befbd4692a12', '', 'Beg A 2 kg, beg B 3 kg. Jumlah berat kedua-dua beg?', '[4, 5, 6, 7]', '5', 'Hebat! 2 + 3 = 5kg', 8),
('26109a7c-97db-4bcf-89b3-befbd4692a12', '', 'Kelas bermula 8:00 pagi dan tamat 10:00 pagi. Berapa jam kelas itu?', '[1, 2, 3, 4]', '2', 'Betul! 2 jam!', 9),
('26109a7c-97db-4bcf-89b3-befbd4692a12', '', '1 minit sama dengan berapa saat?', '[10, 30, 60, 100]', '60', 'Tahniah! Kamu mahir baca jam dan sukatan!', 10);

-- ============================================================
-- QUESTIONS: 7-9 Tahun — Piktograf & Carta
-- ============================================================
INSERT INTO public.questions (level_id, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('22d64939-8604-473c-b3a6-60b2923fb076', '', 'Dalam piktograf, 1 gambar buah = 2 biji. Ada 3 gambar. Berapa buah semua?', '[4, 5, 6, 7]', '6', 'Betul! 3 × 2 = 6 buah', 1),
('22d64939-8604-473c-b3a6-60b2923fb076', '', '1 simbol = 5 murid. Ada 4 simbol dalam piktograf. Berapa murid?', '[15, 18, 20, 22]', '20', 'Pandai! 4 × 5 = 20 murid', 2),
('22d64939-8604-473c-b3a6-60b2923fb076', '', 'Carta palang tunjuk: Isnin 4, Selasa 6, Rabu 3. Jumlah 3 hari?', '[11, 12, 13, 14]', '13', 'Betul! 4 + 6 + 3 = 13', 3),
('22d64939-8604-473c-b3a6-60b2923fb076', '', 'Hari manakah paling ramai murid hadir: Isnin 20, Selasa 25, Rabu 18?', '["Isnin", "Selasa", "Rabu"]', '"Selasa"', 'Hebat! Selasa paling ramai!', 4),
('22d64939-8604-473c-b3a6-60b2923fb076', '', '1 simbol buku = 10 buku. Ada 6 simbol. Berapa buku semua?', '[50, 55, 60, 65]', '60', 'Betul! 6 × 10 = 60 buku', 5),
('22d64939-8604-473c-b3a6-60b2923fb076', '', 'Jumlah murid lelaki 15, murid perempuan 18. Berapa murid semua?', '[31, 32, 33, 34]', '33', 'Pandai! 15 + 18 = 33', 6),
('22d64939-8604-473c-b3a6-60b2923fb076', '', 'Piktograf jualan: Isnin 3 simbol, Selasa 5 simbol (1 simbol = RM10). Jualan hari Selasa?', '["RM30", "RM40", "RM50", "RM60"]', '"RM50"', 'Betul! 5 × RM10 = RM50', 7),
('22d64939-8604-473c-b3a6-60b2923fb076', '', 'Carta palang: epal 8, oren 5. Berapa lebih banyak epal berbanding oren?', '[1, 2, 3, 4]', '3', 'Hebat! 8 - 5 = 3', 8),
('22d64939-8604-473c-b3a6-60b2923fb076', '', '5 kumpulan murid, setiap kumpulan 6 orang. Jumlah semua murid?', '[25, 28, 30, 32]', '30', 'Betul! 5 × 6 = 30 murid', 9),
('22d64939-8604-473c-b3a6-60b2923fb076', '', '1 simbol = 4 ekor haiwan. Ada 7 simbol dalam piktograf. Jumlah haiwan?', '[24, 26, 28, 30]', '28', 'Tahniah! Kamu pandai baca piktograf dan carta!', 10);

-- ============================================================
-- QUESTIONS: 10-12 Tahun — Untung Rugi & Diskaun
-- ============================================================
INSERT INTO public.questions (level_id, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('bf78ec6b-9719-46cb-b9d6-b6bb6b24cf4c', '', 'Kos barang RM 80, dijual dengan harga RM 100. Berapa untung?', '["RM 15", "RM 20", "RM 25", "RM 30"]', '"RM 20"', 'Betul! Untung RM 20', 1),
('bf78ec6b-9719-46cb-b9d6-b6bb6b24cf4c', '', 'Kos barang RM 150, dijual dengan harga RM 120. Berapa rugi?', '["RM 20", "RM 25", "RM 30", "RM 35"]', '"RM 30"', 'Pandai! Rugi RM 30', 2),
('bf78ec6b-9719-46cb-b9d6-b6bb6b24cf4c', '', 'Harga asal RM 200, diskaun 10%. Harga selepas diskaun?', '["RM 170", "RM 175", "RM 180", "RM 185"]', '"RM 180"', 'Betul! RM 200 - 10% = RM 180', 3),
('bf78ec6b-9719-46cb-b9d6-b6bb6b24cf4c', '', 'Harga asal RM 50, diskaun 20%. Berapa nilai diskaun?', '["RM 5", "RM 8", "RM 10", "RM 12"]', '"RM 10"', 'Hebat! 20% × RM50 = RM10', 4),
('bf78ec6b-9719-46cb-b9d6-b6bb6b24cf4c', '', 'Simpanan RM 1,000 dengan faedah 5% setahun. Berapa faedah diterima?', '["RM 40", "RM 45", "RM 50", "RM 55"]', '"RM 50"', 'Betul! 5% × RM1000 = RM50', 5),
('bf78ec6b-9719-46cb-b9d6-b6bb6b24cf4c', '', 'Pendapatan RM 1,500, belanja bulanan RM 800. Berapa baki bajet?', '["RM 600", "RM 650", "RM 700", "RM 750"]', '"RM 700"', 'Pandai! Baki RM 700', 6),
('bf78ec6b-9719-46cb-b9d6-b6bb6b24cf4c', '', 'Barang dijual RM 250 dengan untung 25% daripada kos. Berapa kos asal?', '["RM 180", "RM 190", "RM 200", "RM 210"]', '"RM 200"', 'Betul! Kos asal RM 200', 7),
('bf78ec6b-9719-46cb-b9d6-b6bb6b24cf4c', '', 'Invois: 3 item pada harga RM 45 seunit. Jumlah invois?', '["RM 125", "RM 130", "RM 135", "RM 140"]', '"RM 135"', 'Hebat! 3 × RM45 = RM135', 8),
('bf78ec6b-9719-46cb-b9d6-b6bb6b24cf4c', '', 'Diskaun 15% untuk barang berharga RM 400. Harga selepas diskaun?', '["RM 320", "RM 330", "RM 340", "RM 350"]', '"RM 340"', 'Betul! RM 400 - 15% = RM 340', 9),
('bf78ec6b-9719-46cb-b9d6-b6bb6b24cf4c', '', 'Untung RM 60 daripada jualan bernilai RM 300. Berapa peratus untung?', '["15%", "20%", "25%", "30%"]', '"20%"', 'Tahniah! Kamu bijak urus kewangan!', 10);

-- ============================================================
-- QUESTIONS: 10-12 Tahun — Perimeter & Luas
-- ============================================================
INSERT INTO public.questions (level_id, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('967b57e1-b259-4046-8331-f92644b0539a', '', 'Perimeter segi empat tepat panjang 8cm, lebar 5cm?', '[24, 26, 28, 30]', '26', 'Betul! 2(8+5) = 26cm', 1),
('967b57e1-b259-4046-8331-f92644b0539a', '', 'Luas segi empat tepat panjang 8cm, lebar 5cm?', '[35, 38, 40, 42]', '40', 'Pandai! 8 × 5 = 40cm²', 2),
('967b57e1-b259-4046-8331-f92644b0539a', '', 'Perimeter segi empat sama bersisi 6cm?', '[18, 20, 22, 24]', '24', 'Betul! 4 × 6 = 24cm', 3),
('967b57e1-b259-4046-8331-f92644b0539a', '', 'Luas segi tiga dengan tapak 10cm dan tinggi 6cm?', '[24, 26, 28, 30]', '30', 'Hebat! (10×6)÷2 = 30cm²', 4),
('967b57e1-b259-4046-8331-f92644b0539a', '', 'Isipadu kubus bersisi 4cm?', '[48, 56, 64, 72]', '64', 'Betul! 4×4×4 = 64cm³', 5),
('967b57e1-b259-4046-8331-f92644b0539a', '', 'Isipadu kuboid 5cm × 4cm × 3cm?', '[50, 55, 60, 65]', '60', 'Pandai! 5×4×3 = 60cm³', 6),
('967b57e1-b259-4046-8331-f92644b0539a', '', 'Luas segi empat sama bersisi 9cm?', '[72, 78, 81, 84]', '81', 'Betul! 9×9 = 81cm²', 7),
('967b57e1-b259-4046-8331-f92644b0539a', '', 'Perimeter segi tiga sama sisi dengan sisi 7cm setiap satu?', '[14, 21, 28, 35]', '21', 'Hebat! 3 × 7 = 21cm', 8),
('967b57e1-b259-4046-8331-f92644b0539a', '', 'Luas segi empat tepat 12cm × 6cm?', '[66, 70, 72, 74]', '72', 'Betul! 12 × 6 = 72cm²', 9),
('967b57e1-b259-4046-8331-f92644b0539a', '', 'Isipadu kubus bersisi 5cm?', '[100, 110, 120, 125]', '125', 'Tahniah! Kamu mahir geometri!', 10);

-- ============================================================
-- QUESTIONS: 10-12 Tahun — Purata & Carta Pai
-- ============================================================
INSERT INTO public.questions (level_id, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('0281e42d-e855-472f-9443-1937923b60aa', '', 'Set data: 4, 6, 8, 10, 12. Apakah purata (min)?', '[6, 7, 8, 9]', '8', 'Betul! (4+6+8+10+12)÷5 = 8', 1),
('0281e42d-e855-472f-9443-1937923b60aa', '', 'Set data: 3, 5, 5, 7, 9. Apakah mod?', '[3, 5, 7, 9]', '5', 'Pandai! 5 muncul paling kerap', 2),
('0281e42d-e855-472f-9443-1937923b60aa', '', 'Set data: 2, 4, 6, 8, 10. Apakah median?', '[4, 6, 8, 10]', '6', 'Betul! 6 di tengah-tengah', 3),
('0281e42d-e855-472f-9443-1937923b60aa', '', 'Jumlah 5 nombor ialah 50. Apakah purata?', '[8, 9, 10, 11]', '10', 'Hebat! 50 ÷ 5 = 10', 4),
('0281e42d-e855-472f-9443-1937923b60aa', '', 'Carta pai tunjuk 25% murid suka bola sepak. Jika ada 200 murid, berapa suka bola sepak?', '[40, 45, 50, 55]', '50', 'Betul! 25% × 200 = 50', 5),
('0281e42d-e855-472f-9443-1937923b60aa', '', 'Set data: 10, 12, 12, 15, 16. Apakah julat (range)?', '[4, 5, 6, 7]', '6', 'Pandai! 16 - 10 = 6', 6),
('0281e42d-e855-472f-9443-1937923b60aa', '', 'Purata markah 3 ujian: 70, 80, 90. Berapa purata?', '[75, 80, 85, 90]', '80', 'Betul! (70+80+90)÷3 = 80', 7),
('0281e42d-e855-472f-9443-1937923b60aa', '', 'Carta pai: 50% Melayu, 30% Cina, 20% India. Jika 100 murid, berapa murid Cina?', '[20, 25, 30, 35]', '30', 'Hebat! 30% × 100 = 30', 8),
('0281e42d-e855-472f-9443-1937923b60aa', '', 'Set data: 1, 3, 3, 3, 5. Apakah mod?', '[1, 3, 5, 7]', '3', 'Betul! 3 muncul paling kerap', 9),
('0281e42d-e855-472f-9443-1937923b60aa', '', 'Jumlah markah 4 orang murid ialah 320. Berapa purata markah?', '[70, 75, 80, 85]', '80', 'Tahniah! Kamu mahir statistik dan data!', 10);
