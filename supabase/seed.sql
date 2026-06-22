-- ============================================================
-- MisiMinda Seed Data
-- ============================================================

-- Insert Levels
insert into public.levels (id, age_group, theme, level_number, description) values
  ('00000000-0000-0000-0000-000000000001', '5-6',   'Misi Kedai Kek Cef Cilik',      1, 'Bantu Cef cilik menyediakan kek istimewa sambil belajar nombor!'),
  ('00000000-0000-0000-0000-000000000002', '7-9',   'Pasukan Penyelamat Haiwan Hutan', 1, 'Selamatkan haiwan hutan dengan menjawab soalan matematik!'),
  ('00000000-0000-0000-0000-000000000003', '10-12', 'Detektif Bandaraya Futuristik',   1, 'Jadi detektif dan selesaikan misteri dengan matematik lanjutan!');

-- ============================================================
-- Level 1: Umur 5-6 — Misi Kedai Kek Cef Cilik
-- ============================================================
insert into public.questions (level_id, story_text, question_text, options, correct_answer, success_message, order_index) values
(
  '00000000-0000-0000-0000-000000000001',
  'Cef perlukan bahan-bahan untuk membuat kek yang lazat! 🎂',
  'Cef perlukan 5 biji strawberi. Bakul mana ada 5 biji?',
  '[3, 4, 5, 6]', '5', 'Bagus! Kau tahu mengira strawberi!', 1
),
(
  '00000000-0000-0000-0000-000000000001',
  'Masa untuk campurkan bahan! Kita perlu banyak telur. 🥚',
  'Kita ada 2 biji telur. Cef tambah 2 lagi. Berapa semuanya?',
  '[2, 3, 4, 5]', '4', 'Pandai! 2 + 2 = 4 telur!', 2
),
(
  '00000000-0000-0000-0000-000000000001',
  'Tepung adalah bahan penting untuk kek yang gebu! 🌾',
  'Tepung perlu diukur. Pilih nombor 8 pada penimbang.',
  '[6, 7, 8, 9]', '8', 'Betul! Nombor 8 dipilih!', 3
),
(
  '00000000-0000-0000-0000-000000000001',
  'Oh tidak! Susu tumpah semasa Cef tidak perasan! 🥛',
  'Cef ada 5 cawan susu, tumpah 1 cawan. Tinggal berapa?',
  '[3, 4, 5, 6]', '4', 'Betul! 5 - 1 = 4 cawan susu!', 4
),
(
  '00000000-0000-0000-0000-000000000001',
  'Kek sudah keluar dari oven! Cantiknya bentuk kek ini. 🍰',
  'Kek ini berbentuk bulat. Klik pada bentuk bulat.',
  '["Segi Tiga", "Bulat", "Petak", "Bintang"]', '"Bulat"', 'Tepat sekali! Kek itu berbentuk bulat!', 5
),
(
  '00000000-0000-0000-0000-000000000001',
  'Masa untuk hiaskan kek dengan coklat yang sedap! 🍫',
  'Cef perlu 10 biji coklat. Dia baru letak 9. Berapa lagi perlu ditambah?',
  '[1, 2, 3, 4]', '1', 'Betul! Tinggal 1 lagi untuk lengkapkan!', 6
),
(
  '00000000-0000-0000-0000-000000000001',
  'Wah, kek ulang tahun ada lilin-lilin yang cantik! 🕯️',
  'Ada 4 lilin di atas meja. Susun mengikut urutan 1, 2, 3, ...?',
  '[4, 5, 6, 7]', '4', 'Betul! 4 datang selepas 3!', 7
),
(
  '00000000-0000-0000-0000-000000000001',
  'Tiba masanya untuk bahagikan kek kepada sahabat-sahabat! 🍰',
  'Potong kek kepada 2 bahagian. Pilih gambar separuh.',
  '["Penuh", "Separuh", "Tiga", "Empat"]', '"Separuh"', 'Bagus! Separuh bermakna 2 bahagian sama besar!', 8
),
(
  '00000000-0000-0000-0000-000000000001',
  'Cef mula masak pagi-pagi lagi! Tengok jam berapa sekarang. ⏰',
  'Cef mula masak pukul 2, siap pukul 3. Cari nombor 3 pada jam.',
  '[1, 2, 3, 4]', '3', 'Betul! Pukul 3 — kek pun siap!', 9
),
(
  '00000000-0000-0000-0000-000000000001',
  'Kek ulang tahun sudah siap! Cantiknya dengan lilin-lilin di atasnya! 🎂🎉',
  'Kek sudah siap! Kira semua 10 lilin di atas kek ini.',
  '[8, 9, 10, 11]', '10', 'Tahniah! Kau berjaya kira 10 lilin! Misi selesai!', 10
);

-- ============================================================
-- Level 2: Umur 7-9 — Pasukan Penyelamat Haiwan Hutan
-- ============================================================
insert into public.questions (level_id, story_text, question_text, options, correct_answer, success_message, order_index) values
(
  '00000000-0000-0000-0000-000000000002',
  'Monyet kecil memerlukan bantuan! Dia ada banyak pisang untuk dikongsi. 🐒',
  'Monyet kumpul 15 biji pisang, beri 5 pada gajah. Baki pisang?',
  '[5, 10, 15, 20]', '10', 'Betul! 15 - 5 = 10 pisang!', 1
),
(
  '00000000-0000-0000-0000-000000000002',
  'Kumpulan penyelamat sedang berjalan ke sungai untuk menyelamatkan kura-kura! 🐢',
  'Jarak ke sungai ialah 20 meter. Kita sudah jalan 12 meter. Berapa meter lagi?',
  '[6, 7, 8, 9]', '8', 'Pandai! 20 - 12 = 8 meter lagi!', 2
),
(
  '00000000-0000-0000-0000-000000000002',
  'Wah! Banyaknya semut sedang berpindah ke sarang baru. 🐜',
  'Ada 4 kumpulan semut. Setiap kumpulan ada 5 ekor. Jumlah semut?',
  '[15, 20, 25, 30]', '20', 'Hebat! 4 x 5 = 20 ekor semut!', 3
),
(
  '00000000-0000-0000-0000-000000000002',
  'Gajah sakit dan perlukan ubat segera! Kita perlu beli ubat di kedai. 🐘',
  'Ubat nyamuk gajah berharga RM15. Awak bayar RM20. Baki?',
  '["RM2", "RM5", "RM10", "RM15"]', '"RM5"', 'Betul! RM20 - RM15 = RM5 baki!', 4
),
(
  '00000000-0000-0000-0000-000000000002',
  'Rusa terperangkap dalam sangkar! Kita perlu cari nombor yang betul untuk buka kunci. 🦌',
  'Kunci sangkar perlukan nombor genap selepas 12.',
  '[13, 14, 15, 16]', '14', 'Betul! 14 adalah nombor genap selepas 12!', 5
),
(
  '00000000-0000-0000-0000-000000000002',
  'Burung helang terbang tinggi mencari anaknya yang hilang! 🦅',
  'Burung terbang setinggi 45 meter. Ia turun 20 meter. Ketinggian sekarang?',
  '[15, 20, 25, 30]', '25', 'Betul! 45 - 20 = 25 meter!', 6
),
(
  '00000000-0000-0000-0000-000000000002',
  'Anak gajah yang comel perlu minum banyak air setiap hari! 🐘💧',
  'Anak gajah minum 2 liter air sehari. Untuk 3 hari, berapa liter?',
  '[4, 5, 6, 7]', '6', 'Pandai! 2 x 3 = 6 liter air!', 7
),
(
  '00000000-0000-0000-0000-000000000002',
  'Sudah hampir waktu makan untuk gajah! Jangan lambat! ⏰',
  'Jam tunjuk pukul 4:00 petang. Gajah makan sejam kemudian. Pukul berapa?',
  '["3:00", "4:30", "5:00", "6:00"]', '"5:00"', 'Betul! 4:00 + 1 jam = 5:00 petang!', 8
),
(
  '00000000-0000-0000-0000-000000000002',
  'Burung kecil memerlukan rumah baru yang selamat! 🐦🏠',
  'Bentuk rumah burung ada 3 sisi yang sama. Apakah bentuk itu?',
  '["Segi Empat", "Bulat", "Segi Tiga", "Bujur"]', '"Segi Tiga"', 'Tepat! Segi tiga ada 3 sisi!', 9
),
(
  '00000000-0000-0000-0000-000000000002',
  'Misi hampir selesai! Tapi ada satu lagi kotak kecemasan yang perlu dibuka! 🔐',
  'Kotak kecemasan ada kod rahsia: 10, 20, 30, ...?',
  '[40, 50, 60, 70]', '40', 'Tahniah! 40 — pola tambah 10! Semua haiwan selamat!', 10
);

-- ============================================================
-- Level 3: Umur 10-12 — Detektif Bandaraya Futuristik
-- ============================================================
insert into public.questions (level_id, story_text, question_text, options, correct_answer, success_message, order_index) values
(
  '00000000-0000-0000-0000-000000000003',
  'Alat pengesan canggih awak hampir kehabisan bateri semasa misi penting! 🔋',
  'Bateri alat pengesan tinggal 25%. Apakah ia dalam bentuk pecahan termudah?',
  '["1/2", "1/3", "1/4", "1/5"]', '"1/4"', 'Betul! 25% = 25/100 = 1/4!', 1
),
(
  '00000000-0000-0000-0000-000000000003',
  'Kereta terbang mengejar suspek di atas bandaraya futuristik! 🚗✈️',
  'Kereta terbang bergerak sejauh 120.5 km. Bundarkan ke nombor bulat terdekat.',
  '[120, 121, 122, 125]', '121', 'Pandai! 120.5 dibundarkan ke atas menjadi 121!', 2
),
(
  '00000000-0000-0000-0000-000000000003',
  'Detektif perlu masuk ke bilik kebal untuk cari bukti penting! 🔒',
  'Luas bilik kebal ialah 48 meter persegi. Jika panjangnya 8m, berapakah lebar?',
  '["5m", "6m", "7m", "8m"]', '"6m"', 'Betul! 48 / 8 = 6 meter!', 3
),
(
  '00000000-0000-0000-0000-000000000003',
  'Pencuri telah mencuri wang dari bank digital bandaraya! 💰',
  'Pencuri tinggalkan 30% daripada RM500 wang curian. Berapa nilai yang ditinggalkan?',
  '["RM100", "RM150", "RM200", "RM250"]', '"RM150"', 'Betul! 30% x RM500 = RM150!', 4
),
(
  '00000000-0000-0000-0000-000000000003',
  'Sistem keselamatan bangunan menggunakan laser yang sangat tepat! ⚡',
  'Sudut pancaran laser keselamatan ialah sudut tegak. Berapakah nilainya?',
  '["45 darjah", "90 darjah", "180 darjah", "360 darjah"]', '"90 darjah"', 'Betul! Sudut tegak = 90 darjah!', 5
),
(
  '00000000-0000-0000-0000-000000000003',
  'Robot polis sedang berkawal di seluruh bandaraya futuristik! 🤖',
  'Jisim robot polis ialah 4.5 kg. Berapakah jisimnya dalam gram?',
  '["45g", "450g", "4500g", "45000g"]', '"4500g"', 'Betul! 4.5 kg = 4500 gram!', 6
),
(
  '00000000-0000-0000-0000-000000000003',
  'Peti besi rahsia mempunyai kata laluan matematik yang kompleks! 🗄️',
  'Kata laluan ialah hasil darab 12 dan 15.',
  '[150, 160, 170, 180]', '180', 'Betul! 12 x 15 = 180!', 7
),
(
  '00000000-0000-0000-0000-000000000003',
  'Alat pengimbas terkini dijual di kedai teknologi bandaraya! 📡',
  'Harga alat pengimbas ialah RM120. Diskaun 20% diberi. Berapa harga baru?',
  '["RM96", "RM100", "RM104", "RM110"]', '"RM96"', 'Tepat! RM120 - 20% = RM96!', 8
),
(
  '00000000-0000-0000-0000-000000000003',
  'Senjata siber musuh sedang mengancam sistem kuasa bandaraya! ⚡💻',
  'Jika x + 15 = 40 (nilai tenaga bateri siber), apakah nilai x?',
  '[15, 20, 25, 30]', '25', 'Betul! x = 40 - 15 = 25!', 9
),
(
  '00000000-0000-0000-0000-000000000003',
  'Detektif tiba di markas musuh — sebuah bangunan heksagon gergasi! 🏢',
  'Perimeter bangunan heksagon sekata ialah 60m. Berapakah panjang satu sisinya?',
  '["8m", "10m", "12m", "15m"]', '"10m"', 'Tahniah! 60 / 6 = 10m. Misi berjaya! Bandaraya selamat!', 10
);
