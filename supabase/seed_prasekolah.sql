-- ============================================================
-- MisiMinda: Seed Prasekolah (umur 2-5 tahun) — "Kuiz Si Kecil"
-- 10 level · 3 modul: Mengenal Huruf, Mengeja, Padanan
-- Jalankan schema_prasekolah.sql DULU
-- ============================================================

-- ---------- LEVELS ----------
INSERT INTO public.levels (id, age_group, theme, level_number, description, quiz_mode, category, icon) VALUES
-- Modul 1: Mengenal Huruf
('20000000-0000-0000-0000-000000000001', '2-5', 'Huruf A hingga E', 1, 'Kenal huruf pertama A, B, C, D, E', 'prasekolah', 'kenal-huruf', '🔤'),
('20000000-0000-0000-0000-000000000002', '2-5', 'Huruf G hingga M', 2, 'Kenal huruf G, I, K, L, M', 'prasekolah', 'kenal-huruf', '🔤'),
('20000000-0000-0000-0000-000000000003', '2-5', 'Huruf N hingga S', 3, 'Kenal huruf N, O, P, R, S', 'prasekolah', 'kenal-huruf', '🔤'),
('20000000-0000-0000-0000-000000000004', '2-5', 'Huruf T hingga Z', 4, 'Kenal huruf T, U dan ulang kaji', 'prasekolah', 'kenal-huruf', '🔤'),
-- Modul 2: Mengeja
('20000000-0000-0000-0000-000000000005', '2-5', 'Eja Nama Haiwan', 5, 'Susun huruf jadi nama haiwan', 'prasekolah', 'eja', '✏️'),
('20000000-0000-0000-0000-000000000006', '2-5', 'Eja Makanan', 6, 'Susun huruf jadi nama makanan', 'prasekolah', 'eja', '✏️'),
('20000000-0000-0000-0000-000000000007', '2-5', 'Eja Benda Harian', 7, 'Susun huruf jadi nama benda', 'prasekolah', 'eja', '✏️'),
-- Modul 3: Padanan (Kuiz Si Kecil)
('20000000-0000-0000-0000-000000000008', '2-5', 'Padan Gambar & Huruf', 8, 'Padankan gambar dengan huruf pertama', 'prasekolah', 'padanan', '🧩'),
('20000000-0000-0000-0000-000000000009', '2-5', 'Padan Huruf Besar & Kecil', 9, 'Padankan huruf besar dengan huruf kecil', 'prasekolah', 'padanan', '🧩'),
('20000000-0000-0000-0000-000000000010', '2-5', 'Padan Gambar & Perkataan', 10, 'Padankan gambar dengan perkataan', 'prasekolah', 'padanan', '🧩');

-- ---------- MODUL 1: MENGENAL HURUF (pilihan) ----------
-- Level 1: A–E
INSERT INTO public.questions (level_id, question_type, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('20000000-0000-0000-0000-000000000001','pilihan','🐔 Ayam','Ayam mula dengan huruf apa?','["A","S","M","I"]','"A"','Hebat! A untuk Ayam! 🐔',1),
('20000000-0000-0000-0000-000000000001','pilihan','⚽ Bola','Bola mula dengan huruf apa?','["D","B","P","O"]','"B"','Bagus! B untuk Bola! ⚽',2),
('20000000-0000-0000-0000-000000000001','pilihan','🌶️ Cili','Cili mula dengan huruf apa?','["S","C","L","I"]','"C"','Pandai! C untuk Cili! 🌶️',3),
('20000000-0000-0000-0000-000000000001','pilihan','🍃 Daun','Daun mula dengan huruf apa?','["B","D","N","U"]','"D"','Yeay! D untuk Daun! 🍃',4),
('20000000-0000-0000-0000-000000000001','pilihan','🍎 Epal','Epal mula dengan huruf apa?','["A","E","I","O"]','"E"','Tahniah! E untuk Epal! 🍎',5);

-- Level 2: G, I, K, L, M
INSERT INTO public.questions (level_id, question_type, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('20000000-0000-0000-0000-000000000002','pilihan','🐘 Gajah','Gajah mula dengan huruf apa?','["G","J","H","A"]','"G"','Hebat! G untuk Gajah! 🐘',1),
('20000000-0000-0000-0000-000000000002','pilihan','🐟 Ikan','Ikan mula dengan huruf apa?','["L","I","N","K"]','"I"','Bagus! I untuk Ikan! 🐟',2),
('20000000-0000-0000-0000-000000000002','pilihan','🐱 Kucing','Kucing mula dengan huruf apa?','["K","C","G","U"]','"K"','Pandai! K untuk Kucing! 🐱',3),
('20000000-0000-0000-0000-000000000002','pilihan','🐝 Lebah','Lebah mula dengan huruf apa?','["B","L","E","H"]','"L"','Yeay! L untuk Lebah! 🐝',4),
('20000000-0000-0000-0000-000000000002','pilihan','👁️ Mata','Mata mula dengan huruf apa?','["N","A","M","T"]','"M"','Tahniah! M untuk Mata! 👁️',5);

-- Level 3: N, O, P, R, S
INSERT INTO public.questions (level_id, question_type, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('20000000-0000-0000-0000-000000000003','pilihan','🍍 Nanas','Nanas mula dengan huruf apa?','["M","N","A","S"]','"N"','Hebat! N untuk Nanas! 🍍',1),
('20000000-0000-0000-0000-000000000003','pilihan','🍊 Oren','Oren mula dengan huruf apa?','["O","E","R","A"]','"O"','Bagus! O untuk Oren! 🍊',2),
('20000000-0000-0000-0000-000000000003','pilihan','🍌 Pisang','Pisang mula dengan huruf apa?','["B","P","S","G"]','"P"','Pandai! P untuk Pisang! 🍌',3),
('20000000-0000-0000-0000-000000000003','pilihan','🍞 Roti','Roti mula dengan huruf apa?','["D","T","R","O"]','"R"','Yeay! R untuk Roti! 🍞',4),
('20000000-0000-0000-0000-000000000003','pilihan','🥛 Susu','Susu mula dengan huruf apa?','["S","C","U","Z"]','"S"','Tahniah! S untuk Susu! 🥛',5);

-- Level 4: T, U + ulang kaji
INSERT INTO public.questions (level_id, question_type, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('20000000-0000-0000-0000-000000000004','pilihan','🎩 Topi','Topi mula dengan huruf apa?','["P","T","D","O"]','"T"','Hebat! T untuk Topi! 🎩',1),
('20000000-0000-0000-0000-000000000004','pilihan','🐍 Ular','Ular mula dengan huruf apa?','["A","O","U","R"]','"U"','Bagus! U untuk Ular! 🐍',2),
('20000000-0000-0000-0000-000000000004','pilihan','👕 Baju','Baju mula dengan huruf apa?','["B","D","P","J"]','"B"','Pandai! B untuk Baju! 👕',3),
('20000000-0000-0000-0000-000000000004','pilihan','🚗 Kereta','Kereta mula dengan huruf apa?','["G","K","T","R"]','"K"','Yeay! K untuk Kereta! 🚗',4),
('20000000-0000-0000-0000-000000000004','pilihan','🦷 Gigi','Gigi mula dengan huruf apa?','["J","G","I","D"]','"G"','Tahniah! Kamu kenal semua huruf! 🎉',5);

-- ---------- MODUL 2: MENGEJA (susun) ----------
-- Level 5: Haiwan
INSERT INTO public.questions (level_id, question_type, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('20000000-0000-0000-0000-000000000005','susun','🐴','Eja perkataan: KUDA','["D","A","U","K"]','"KUDA"','Hebat! K-U-D-A, Kuda! 🐴',1),
('20000000-0000-0000-0000-000000000005','susun','🐟','Eja perkataan: IKAN','["N","I","A","K"]','"IKAN"','Bagus! I-K-A-N, Ikan! 🐟',2),
('20000000-0000-0000-0000-000000000005','susun','🐔','Eja perkataan: AYAM','["M","A","Y","A"]','"AYAM"','Pandai! A-Y-A-M, Ayam! 🐔',3),
('20000000-0000-0000-0000-000000000005','susun','🦆','Eja perkataan: ITIK','["K","I","T","I"]','"ITIK"','Yeay! I-T-I-K, Itik! 🦆',4),
('20000000-0000-0000-0000-000000000005','susun','🐘','Eja perkataan: GAJAH','["J","G","A","H","A"]','"GAJAH"','Tahniah! Kamu pandai mengeja! 🐘',5);

-- Level 6: Makanan
INSERT INTO public.questions (level_id, question_type, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('20000000-0000-0000-0000-000000000006','susun','🍎','Eja perkataan: EPAL','["P","E","A","L"]','"EPAL"','Hebat! E-P-A-L, Epal! 🍎',1),
('20000000-0000-0000-0000-000000000006','susun','🥛','Eja perkataan: SUSU','["U","S","S","U"]','"SUSU"','Bagus! S-U-S-U, Susu! 🥛',2),
('20000000-0000-0000-0000-000000000006','susun','🍞','Eja perkataan: ROTI','["T","R","O","I"]','"ROTI"','Pandai! R-O-T-I, Roti! 🍞',3),
('20000000-0000-0000-0000-000000000006','susun','🥝','Eja perkataan: KIWI','["W","K","I","I"]','"KIWI"','Yeay! K-I-W-I, Kiwi! 🥝',4),
('20000000-0000-0000-0000-000000000006','susun','🎋','Eja perkataan: TEBU','["B","T","E","U"]','"TEBU"','Tahniah! Kamu hebat mengeja! 🎋',5);

-- Level 7: Benda
INSERT INTO public.questions (level_id, question_type, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('20000000-0000-0000-0000-000000000007','susun','👕','Eja perkataan: BAJU','["J","B","A","U"]','"BAJU"','Hebat! B-A-J-U, Baju! 👕',1),
('20000000-0000-0000-0000-000000000007','susun','📖','Eja perkataan: BUKU','["K","B","U","U"]','"BUKU"','Bagus! B-U-K-U, Buku! 📖',2),
('20000000-0000-0000-0000-000000000007','susun','🎩','Eja perkataan: TOPI','["P","T","O","I"]','"TOPI"','Pandai! T-O-P-I, Topi! 🎩',3),
('20000000-0000-0000-0000-000000000007','susun','⚽','Eja perkataan: BOLA','["L","B","O","A"]','"BOLA"','Yeay! B-O-L-A, Bola! ⚽',4),
('20000000-0000-0000-0000-000000000007','susun','🎲','Eja perkataan: DADU','["D","A","D","U"]','"DADU"','Tahniah! Kamu juara mengeja! 🎲',5);

-- ---------- MODUL 3: PADANAN (padanan) ----------
-- Level 8: Gambar & huruf pertama
INSERT INTO public.questions (level_id, question_type, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('20000000-0000-0000-0000-000000000008','padanan','','Padan gambar dengan huruf pertama','{"pairs":[{"left":"🐝","right":"L"},{"left":"🍎","right":"E"},{"left":"🐱","right":"K"},{"left":"🐟","right":"I"}]}','[{"left":"🐝","right":"L"},{"left":"🍎","right":"E"},{"left":"🐱","right":"K"},{"left":"🐟","right":"I"}]','Hebat! Semua betul! 🎉',1),
('20000000-0000-0000-0000-000000000008','padanan','','Padan gambar dengan huruf pertama','{"pairs":[{"left":"🐔","right":"A"},{"left":"⚽","right":"B"},{"left":"🍞","right":"R"},{"left":"🥛","right":"S"}]}','[{"left":"🐔","right":"A"},{"left":"⚽","right":"B"},{"left":"🍞","right":"R"},{"left":"🥛","right":"S"}]','Bagus! Kamu pandai! 🎉',2),
('20000000-0000-0000-0000-000000000008','padanan','','Padan gambar dengan huruf pertama','{"pairs":[{"left":"🐘","right":"G"},{"left":"🍍","right":"N"},{"left":"🎩","right":"T"},{"left":"🐍","right":"U"}]}','[{"left":"🐘","right":"G"},{"left":"🍍","right":"N"},{"left":"🎩","right":"T"},{"left":"🐍","right":"U"}]','Tahniah! Semua padanan betul! 🌟',3);

-- Level 9: Huruf besar & kecil
INSERT INTO public.questions (level_id, question_type, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('20000000-0000-0000-0000-000000000009','padanan','','Padan huruf BESAR dengan huruf kecil','{"pairs":[{"left":"A","right":"a"},{"left":"B","right":"b"},{"left":"C","right":"c"},{"left":"D","right":"d"}]}','[{"left":"A","right":"a"},{"left":"B","right":"b"},{"left":"C","right":"c"},{"left":"D","right":"d"}]','Hebat! Semua betul! 🎉',1),
('20000000-0000-0000-0000-000000000009','padanan','','Padan huruf BESAR dengan huruf kecil','{"pairs":[{"left":"E","right":"e"},{"left":"G","right":"g"},{"left":"K","right":"k"},{"left":"M","right":"m"}]}','[{"left":"E","right":"e"},{"left":"G","right":"g"},{"left":"K","right":"k"},{"left":"M","right":"m"}]','Bagus! Kamu pandai! 🎉',2),
('20000000-0000-0000-0000-000000000009','padanan','','Padan huruf BESAR dengan huruf kecil','{"pairs":[{"left":"O","right":"o"},{"left":"P","right":"p"},{"left":"R","right":"r"},{"left":"S","right":"s"}]}','[{"left":"O","right":"o"},{"left":"P","right":"p"},{"left":"R","right":"r"},{"left":"S","right":"s"}]','Tahniah! Kamu hebat! 🌟',3);

-- Level 10: Gambar & perkataan
INSERT INTO public.questions (level_id, question_type, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('20000000-0000-0000-0000-000000000010','padanan','','Padan gambar dengan perkataan','{"pairs":[{"left":"🐱","right":"KUCING"},{"left":"🐟","right":"IKAN"},{"left":"🍎","right":"EPAL"},{"left":"⚽","right":"BOLA"}]}','[{"left":"🐱","right":"KUCING"},{"left":"🐟","right":"IKAN"},{"left":"🍎","right":"EPAL"},{"left":"⚽","right":"BOLA"}]','Hebat! Semua betul! 🎉',1),
('20000000-0000-0000-0000-000000000010','padanan','','Padan gambar dengan perkataan','{"pairs":[{"left":"🐴","right":"KUDA"},{"left":"🐔","right":"AYAM"},{"left":"📖","right":"BUKU"},{"left":"🎩","right":"TOPI"}]}','[{"left":"🐴","right":"KUDA"},{"left":"🐔","right":"AYAM"},{"left":"📖","right":"BUKU"},{"left":"🎩","right":"TOPI"}]','Bagus! Kamu pandai! 🎉',2),
('20000000-0000-0000-0000-000000000010','padanan','','Padan gambar dengan perkataan','{"pairs":[{"left":"🐘","right":"GAJAH"},{"left":"🍌","right":"PISANG"},{"left":"👕","right":"BAJU"},{"left":"🥛","right":"SUSU"}]}','[{"left":"🐘","right":"GAJAH"},{"left":"🍌","right":"PISANG"},{"left":"👕","right":"BAJU"},{"left":"🥛","right":"SUSU"}]','Tahniah! Kamu juara Kuiz Si Kecil! 🏆',3);
