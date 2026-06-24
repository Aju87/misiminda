-- ============================================================
-- MisiMinda: Tambah Level 2 & 3 untuk setiap kumpulan umur
-- Jalankan fail ini dalam Supabase SQL Editor
-- ============================================================

-- Insert 6 Levels baru (Level 2 & 3 per age group)
insert into public.levels (id, age_group, theme, level_number, description) values
  -- 5-6 tahun
  ('00000000-0000-0000-0000-000000000004', '5-6',   'Taman Bunga Ajaib',             2, 'Jaga taman bunga ajaib sambil belajar nombor dan bentuk!'),
  ('00000000-0000-0000-0000-000000000005', '5-6',   'Ladang Haiwan Gembira',          3, 'Bantu haiwan ladang yang comel dengan kira-kira mudah!'),
  -- 7-9 tahun
  ('00000000-0000-0000-0000-000000000006', '7-9',   'Pasar Tani Misteri',             2, 'Selesaikan misteri pasar tani dengan kemahiran matematik!'),
  ('00000000-0000-0000-0000-000000000007', '7-9',   'Ekspedisi Angkasa',              3, 'Terbang ke angkasa dan selesaikan cabaran matematik!'),
  -- 10-12 tahun
  ('00000000-0000-0000-0000-000000000008', '10-12', 'Misi Bawah Laut',               2, 'Selami lautan dalam dan pecahkan misteri matematik lanjutan!'),
  ('00000000-0000-0000-0000-000000000009', '10-12', 'Penjelajah Hutan Amazon',        3, 'Jelajah hutan Amazon dengan matematik yang mencabar!');

-- ============================================================
-- Level 4 (5-6 Tahun, Level 2): Taman Bunga Ajaib
-- Fokus: Nombor 1-20, tambah & tolak dalam 10, corak mudah
-- ============================================================
insert into public.questions (level_id, story_text, question_text, options, correct_answer, success_message, order_index) values
(
  '00000000-0000-0000-0000-000000000004',
  'Taman bunga kita perlukan benih baru! Mari kita tanam sama-sama. 🌱',
  'Kita ada 6 biji benih. Kita tanam lagi 4 biji. Berapa semuanya?',
  '[8, 9, 10, 11]', '10', 'Bagus! 6 + 4 = 10 benih!', 1
),
(
  '00000000-0000-0000-0000-000000000004',
  'Rama-rama cantik hinggap di bunga kita! Kiranya sama-sama. 🦋',
  'Ada 8 rama-rama, terbang pergi 3. Tinggal berapa?',
  '[4, 5, 6, 7]', '5', 'Betul! 8 - 3 = 5 rama-rama!', 2
),
(
  '00000000-0000-0000-0000-000000000004',
  'Tempat air untuk bunga perlu diisi penuh sebelum hari panas. 💧',
  'Bekas air boleh isi 10 liter. Sudah ada 4 liter. Berapa lagi perlu tambah?',
  '[4, 5, 6, 7]', '6', 'Pandai! 10 - 4 = 6 liter lagi!', 3
),
(
  '00000000-0000-0000-0000-000000000004',
  'Pokok ros kita sedang berbunga dengan indahnya! 🌹',
  'Pokok ros ada 9 bunga hari ini. Semalam ada 7. Bertambah berapa?',
  '[1, 2, 3, 4]', '2', 'Betul! 9 - 7 = 2 bunga baru!', 4
),
(
  '00000000-0000-0000-0000-000000000004',
  'Oh tidak! Ulat datang hendak makan daun bunga kita! 🐛',
  'Ada 5 ulat pada pokok. Kita tangkap 2 ekor. Berapa tinggal?',
  '[2, 3, 4, 5]', '3', 'Bagus! 5 - 2 = 3 ulat tinggal!', 5
),
(
  '00000000-0000-0000-0000-000000000004',
  'Musim bunga tiba! Bunga-bunga mekar di mana-mana. 🌸',
  'Kirakan bunga: ada 7 bunga merah dan 6 bunga kuning. Jumlah semua?',
  '[11, 12, 13, 14]', '13', 'Betul! 7 + 6 = 13 bunga semuanya!', 6
),
(
  '00000000-0000-0000-0000-000000000004',
  'Lebah rajin datang ambil madu dari bunga kita! 🐝',
  'Setiap lebah bawa madu dari 2 bunga. Ada 5 ekor lebah. Berapa bunga dilawati?',
  '[8, 9, 10, 11]', '10', 'Pandai! 5 x 2 = 10 bunga!', 7
),
(
  '00000000-0000-0000-0000-000000000004',
  'Kita perlu susun bunga dalam baris yang cantik. 🌷',
  'Baris 1 ada 4 bunga. Baris 2 ada 4 bunga. Baris 3 ada 4 bunga. Jumlah?',
  '[10, 11, 12, 13]', '12', 'Betul! 4 + 4 + 4 = 12 bunga!', 8
),
(
  '00000000-0000-0000-0000-000000000004',
  'Wah! Burung kecil datang minum air dari kolam taman kita! 🐦',
  'Kolam taman berbentuk segi empat. Ia ada berapa tepi?',
  '[2, 3, 4, 5]', '4', 'Betul! Segi empat ada 4 tepi!', 9
),
(
  '00000000-0000-0000-0000-000000000004',
  'Taman kita sudah cantik sekali! Mari kira semua bunganya! 🌺',
  'Ada 10 bunga matahari, 5 bunga ros, 5 bunga orkid. Jumlah semua?',
  '[18, 19, 20, 21]', '20', 'Tahniah! 10 + 5 + 5 = 20 bunga! Taman paling cantik!', 10
);

-- ============================================================
-- Level 5 (5-6 Tahun, Level 3): Ladang Haiwan Gembira
-- Fokus: Nombor 1-20, tolak dalam 20, separuh dan dua kali
-- ============================================================
insert into public.questions (level_id, story_text, question_text, options, correct_answer, success_message, order_index) values
(
  '00000000-0000-0000-0000-000000000005',
  'Ladang kita ada banyak haiwan yang comel! Mari kenali semua. 🐄',
  'Ada 8 ayam dan 4 itik di ladang. Berapa jumlah burung ternakan?',
  '[10, 11, 12, 13]', '12', 'Betul! 8 + 4 = 12!', 1
),
(
  '00000000-0000-0000-0000-000000000005',
  'Kuda-kuda suka berlari di padang rumput yang luas! 🐴',
  'Ada 12 kuda di padang. 5 kuda masuk kandang. Berapa tinggal?',
  '[6, 7, 8, 9]', '7', 'Pandai! 12 - 5 = 7 kuda!', 2
),
(
  '00000000-0000-0000-0000-000000000005',
  'Arnab kecil suka makan lobak merah yang segar! 🐰',
  'Ada 10 lobak merah. Kita bagi sama rata kepada 2 arnab. Setiap arnab dapat berapa?',
  '[3, 4, 5, 6]', '5', 'Betul! 10 ÷ 2 = 5 lobak setiap arnab!', 3
),
(
  '00000000-0000-0000-0000-000000000005',
  'Masa makan untuk lembu-lembu ladang kita yang besar! 🐄',
  'Setiap lembu makan 3 bakul rumput. Ada 4 lembu. Berapa bakul perlu?',
  '[10, 11, 12, 13]', '12', 'Bagus! 4 x 3 = 12 bakul!', 4
),
(
  '00000000-0000-0000-0000-000000000005',
  'Anak ayam baru menetas dari telur! Comelnya! 🐣',
  'Ada 15 telur. 9 sudah menetas. Berapa telur masih belum menetas?',
  '[4, 5, 6, 7]', '6', 'Betul! 15 - 9 = 6 telur lagi!', 5
),
(
  '00000000-0000-0000-0000-000000000005',
  'Babi kecil suka bermain dalam lumpur di ladang kita! 🐷',
  'Ada 3 babi besar dan 6 anak babi. Jumlah semua babi?',
  '[7, 8, 9, 10]', '9', 'Pandai! 3 + 6 = 9 babi!', 6
),
(
  '00000000-0000-0000-0000-000000000005',
  'Pokok epal di ladang sudah berbuah dengan lebatnya! 🍎',
  'Pokok epal ada 18 buah. Kita petik separuh. Berapa yang dipetik?',
  '[7, 8, 9, 10]', '9', 'Betul! Separuh daripada 18 = 9 buah!', 7
),
(
  '00000000-0000-0000-0000-000000000005',
  'Angsa putih mandi di tasik kecil ladang kita! 🦢',
  'Tasik kita berbentuk bulat. Berapa bucu/sudut ada pada bulatan?',
  '[0, 1, 2, 3]', '0', 'Tepat! Bulatan tiada bucu!', 8
),
(
  '00000000-0000-0000-0000-000000000005',
  'Petang tiba! Masa untuk kumpul semua haiwan masuk kandang. 🌅',
  'Pukul 5 petang semua haiwan perlu masuk. Sekarang pukul 3. Berapa jam lagi?',
  '[1, 2, 3, 4]', '2', 'Betul! 5 - 3 = 2 jam lagi!', 9
),
(
  '00000000-0000-0000-0000-000000000005',
  'Ladang kita sungguh meriah dan penuh dengan haiwan yang bahagia! 🎉',
  'Kira semua: 6 ayam, 4 itik, 5 arnab, 5 lembu. Berapa jumlah semua haiwan?',
  '[18, 19, 20, 21]', '20', 'Luar biasa! 6+4+5+5 = 20! Kau hebat mengira!', 10
);

-- ============================================================
-- Level 6 (7-9 Tahun, Level 2): Pasar Tani Misteri
-- Fokus: Perpuluhan mudah, pecahan, wang RM, darab/bahagi
-- ============================================================
insert into public.questions (level_id, story_text, question_text, options, correct_answer, success_message, order_index) values
(
  '00000000-0000-0000-0000-000000000006',
  'Pasar tani pagi ini penuh dengan sayur-sayuran segar! 🥬',
  'Penjual jual 3 ikat sayur, setiap ikat RM2.50. Berapa jumlah wang?',
  '["RM6.00", "RM7.00", "RM7.50", "RM8.00"]', '"RM7.50"', 'Betul! 3 x RM2.50 = RM7.50!', 1
),
(
  '00000000-0000-0000-0000-000000000006',
  'Peniaga durian ada banyak stok pagi ini! 🍊',
  'Dia ada 48 biji durian. Dibahagi kepada 6 bakul sama rata. Tiap bakul ada berapa?',
  '[6, 7, 8, 9]', '8', 'Pandai! 48 ÷ 6 = 8 durian sebakul!', 2
),
(
  '00000000-0000-0000-0000-000000000006',
  'Penjual ikan sedang susun ikan-ikan segar di meja jualannya! 🐟',
  'Ikan merah berharga RM12.80 sekilo. Bayar RM20. Baki wang?',
  '["RM6.20", "RM7.00", "RM7.20", "RM8.00"]', '"RM7.20"', 'Betul! RM20 - RM12.80 = RM7.20!', 3
),
(
  '00000000-0000-0000-0000-000000000006',
  'Budak-budak suka beli aiskrim kelapa muda di pasar! 🍦',
  'Aiskrim berharga RM1.50. Beli untuk 4 orang. Berapa kos semua?',
  '["RM4.50", "RM5.50", "RM6.00", "RM6.50"]', '"RM6.00"', 'Betul! 4 x RM1.50 = RM6.00!', 4
),
(
  '00000000-0000-0000-0000-000000000006',
  'Makcik jual kuih pelbagai jenis di gerai kuihnya! 🍡',
  'Ada 24 biji kuih. 3/4 daripadanya sudah terjual. Berapa yang tinggal?',
  '[4, 5, 6, 7]', '6', 'Pandai! 24 x (1/4) = 6 kuih tinggal!', 5
),
(
  '00000000-0000-0000-0000-000000000006',
  'Timbang berat buah-buahan untuk pelanggan. ⚖️',
  'Pisang berat 1.5 kg, mangga 0.75 kg. Jumlah berat kedua-duanya?',
  '["1.75 kg", "2.00 kg", "2.25 kg", "2.50 kg"]', '"2.25 kg"', 'Betul! 1.5 + 0.75 = 2.25 kg!', 6
),
(
  '00000000-0000-0000-0000-000000000006',
  'Penjual beras perlu kira stok yang ada di gudang. 🌾',
  'Gudang ada 200 kg beras. Jual 75 kg pagi, 45 kg petang. Baki?',
  '[70, 75, 80, 85]', '80', 'Betul! 200 - 75 - 45 = 80 kg!', 7
),
(
  '00000000-0000-0000-0000-000000000006',
  'Meja peniaga berbentuk segi empat tepat untuk susun barang. 📐',
  'Meja panjang 120 cm dan lebar 60 cm. Berapakah perimeter meja?',
  '[300, 320, 340, 360]', '360', 'Betul! (120+60) x 2 = 360 cm!', 8
),
(
  '00000000-0000-0000-0000-000000000006',
  'Pasar tutup pukul 1 tengahari. Dah hampir masa tutup! ⏰',
  'Pasar buka 8 pagi dan tutup 1 petang. Berapa jam ia buka?',
  '[3, 4, 5, 6]', '5', 'Betul! Dari 8 pagi ke 1 petang = 5 jam!', 9
),
(
  '00000000-0000-0000-0000-000000000006',
  'Misi akhir di pasar tani! Jumlah semua hasil jualan hari ini! 💰',
  'Jual sayur RM45, buah RM78, ikan RM67. Jumlah pendapatan hari ini?',
  '["RM180", "RM185", "RM190", "RM195"]', '"RM190"', 'Luar biasa! RM45+RM78+RM67 = RM190! Pasar tani misteri terpecah!', 10
);

-- ============================================================
-- Level 7 (7-9 Tahun, Level 3): Ekspedisi Angkasa
-- Fokus: Darab/bahagi, perpuluhan, pola nombor, kira-kira yang lebih kompleks
-- ============================================================
insert into public.questions (level_id, story_text, question_text, options, correct_answer, success_message, order_index) values
(
  '00000000-0000-0000-0000-000000000007',
  'Roket kita akan berangkat ke angkasa! Semak semua sistem. 🚀',
  'Roket ada 9 bahagian. Setiap bahagian ada 8 skru. Berapa jumlah skru?',
  '[63, 64, 72, 81]', '72', 'Betul! 9 x 8 = 72 skru!', 1
),
(
  '00000000-0000-0000-0000-000000000007',
  'Kita masuk orbit Bumi! Bintang-bintang bersinar indah! ⭐',
  'Bintang dalam gambar: 56 bintang dibahagi sama rata kepada 7 astronot. Setiap orang dapat?',
  '[6, 7, 8, 9]', '8', 'Pandai! 56 ÷ 7 = 8 bintang!', 2
),
(
  '00000000-0000-0000-0000-000000000007',
  'Planet Marikh kelihatan merah dari tingkap roket kita! 🪐',
  'Jarak ke Marikh ialah 225 juta km. Jarak ke Venus 100 juta km. Perbezaan jarak?',
  '[100, 110, 120, 125]', '125', 'Betul! 225 - 100 = 125 juta km!', 3
),
(
  '00000000-0000-0000-0000-000000000007',
  'Astronot perlu makan makanan angkasa yang berkhasiat! 🥗',
  'Seorang astronot makan 3 pek makanan sehari. Untuk 8 hari, berapa pek perlu?',
  '[20, 22, 24, 26]', '24', 'Betul! 3 x 8 = 24 pek makanan!', 4
),
(
  '00000000-0000-0000-0000-000000000007',
  'Meteor kecil melintasi roket kita! Jangan panik, ukur saiznya! ☄️',
  'Meteor pertama berat 3.6 kg, yang kedua 4.8 kg. Jumlah berat kedua-duanya?',
  '["7.4 kg", "8.4 kg", "8.8 kg", "9.4 kg"]', '"8.4 kg"', 'Betul! 3.6 + 4.8 = 8.4 kg!', 5
),
(
  '00000000-0000-0000-0000-000000000007',
  'Teleskop canggih kita boleh nampak galaksi yang jauh! 🔭',
  'Teleskop dapat nampak galaksi pada jarak 100, 200, 300, 400... Seterusnya?',
  '[450, 500, 550, 600]', '500', 'Betul! Pola tambah 100, jadi 500!', 6
),
(
  '00000000-0000-0000-0000-000000000007',
  'Kita nampak Bulan yang indah! Saiznya luar biasa dari dekat! 🌕',
  'Garis pusat Bulan ialah 3,474 km. Bundarkan ke ribu yang terdekat.',
  '["3,000 km", "3,400 km", "3,500 km", "4,000 km"]', '"3,000 km"', 'Betul! 3,474 dibundarkan ke 3,000!', 7
),
(
  '00000000-0000-0000-0000-000000000007',
  'Stesen angkasa mempunyai banyak bilik dan laluan. 🛸',
  'Stesen ada 6 modul. Setiap modul ada 4 bilik. Berapa bilik semuanya?',
  '[20, 22, 24, 26]', '24', 'Pandai! 6 x 4 = 24 bilik!', 8
),
(
  '00000000-0000-0000-0000-000000000007',
  'Oksigen dalam tong perlu dikira dengan teliti! 💨',
  'Tong oksigen boleh tahan 180 minit. Sudah digunakan 75 minit. Tinggal berapa minit?',
  '[95, 100, 105, 110]', '105', 'Betul! 180 - 75 = 105 minit!', 9
),
(
  '00000000-0000-0000-0000-000000000007',
  'Misi terakhir: Kira semua bintang yang ditemui dalam ekspedisi! 🌟',
  'Ditemui: 45 bintang merah, 35 bintang biru, 20 bintang kuning. Jumlah?',
  '[95, 100, 105, 110]', '100', 'Luar biasa! 45+35+20 = 100 bintang! Ekspedisi angkasa berjaya!', 10
);

-- ============================================================
-- Level 8 (10-12 Tahun, Level 2): Misi Bawah Laut
-- Fokus: Pecahan & perpuluhan lanjutan, peratusan, nisbah, luas
-- ============================================================
insert into public.questions (level_id, story_text, question_text, options, correct_answer, success_message, order_index) values
(
  '00000000-0000-0000-0000-000000000008',
  'Kapal selam kita menyelam ke dasar lautan yang gelap dan misterius! 🌊',
  'Tekanan air meningkat 0.1 bar setiap meter. Pada kedalaman 250 meter, berapa tekanan?',
  '[20, 25, 30, 35]', '25', 'Betul! 250 x 0.1 = 25 bar!', 1
),
(
  '00000000-0000-0000-0000-000000000008',
  'Ikan lumba-lumba berenang riang mengelilingi kapal selam kita! 🐬',
  '3/5 daripada 60 ekor lumba-lumba sedang bermain. Berapa ekor yang bermain?',
  '[30, 32, 36, 40]', '36', 'Pandai! 3/5 x 60 = 36 ekor!', 2
),
(
  '00000000-0000-0000-0000-000000000008',
  'Kita jumpa terumbu karang yang sangat indah warna-warni! 🪸',
  'Terumbu karang panjang 45 m dan lebar 20 m. Berapakah luasnya?',
  '["800 m²", "850 m²", "900 m²", "950 m²"]', '"900 m²"', 'Betul! 45 x 20 = 900 m²!', 3
),
(
  '00000000-0000-0000-0000-000000000008',
  'Gurita bijak menyembunyikan diri dalam batu karang! 🐙',
  'Nisbah ikan ke gurita dalam lautan ini ialah 5:2. Jika ada 35 ikan, berapa gurita?',
  '[10, 12, 14, 16]', '14', 'Betul! 35÷5 x 2 = 14 gurita!', 4
),
(
  '00000000-0000-0000-0000-000000000008',
  'Penyelam menemukan khazanah yang tersembunyi selama berabad-abad! 💎',
  'Nilai khazanah RM8,400. Dibahagi sama rata kepada 6 penyelam. Setiap orang dapat?',
  '["RM1,200", "RM1,300", "RM1,400", "RM1,500"]', '"RM1,400"', 'Betul! RM8,400 ÷ 6 = RM1,400!', 5
),
(
  '00000000-0000-0000-0000-000000000008',
  'Penyu besar dan tua berenang dengan tenang di lautan dalam. 🐢',
  'Penyu hidup selama 120 tahun. Ia berumur 45 tahun sekarang. Berapa tahun lagi hidup?',
  '[65, 70, 75, 80]', '75', 'Betul! 120 - 45 = 75 tahun lagi!', 6
),
(
  '00000000-0000-0000-0000-000000000008',
  'Ikan yu muncul! Kita perlu kira kecepatannya untuk mengelak! 🦈',
  'Ikan yu berenang 18 km dalam 3 jam. Berapakah kelajuannya sejam?',
  '["4 km/j", "5 km/j", "6 km/j", "7 km/j"]', '"6 km/j"', 'Betul! 18 ÷ 3 = 6 km/j!', 7
),
(
  '00000000-0000-0000-0000-000000000008',
  'Terdapat pelbagai jenis ikan warna-warni dalam lautan ini! 🐠',
  '40% daripada 250 ekor ikan adalah ikan clownfish. Berapa ekor clownfish?',
  '[90, 95, 100, 105]', '100', 'Pandai! 40% x 250 = 100 ekor!', 8
),
(
  '00000000-0000-0000-0000-000000000008',
  'Kapal tenggelam lama ditemui dengan banyak artifak sejarah! ⚓',
  'Kapal itu tenggelam tahun 1742. Sekarang tahun 2025. Berapa tahun sudah tenggelam?',
  '[278, 280, 283, 285]', '283', 'Betul! 2025 - 1742 = 283 tahun!', 9
),
(
  '00000000-0000-0000-0000-000000000008',
  'Misi bawah laut hampir selesai! Kira semua spesies yang ditemui! 🌊',
  'Ditemui: 15 spesies ikan, 8 spesies karang, 12 spesies udang & ketam. Jumlah?',
  '[33, 35, 37, 39]', '35', 'Tahniah! 15+8+12 = 35 spesies! Misi bawah laut berjaya!', 10
);

-- ============================================================
-- Level 9 (10-12 Tahun, Level 3): Penjelajah Hutan Amazon
-- Fokus: Algebra mudah, geometri, statistik, nisbah & peratusan lanjutan
-- ============================================================
insert into public.questions (level_id, story_text, question_text, options, correct_answer, success_message, order_index) values
(
  '00000000-0000-0000-0000-000000000009',
  'Ekspedisi ke hutan Amazon bermula! Peta perlu dikira dengan tepat. 🗺️',
  'Skala peta ialah 1:50,000. Pada peta, jarak dua titik ialah 4 cm. Jarak sebenar?',
  '["1 km", "2 km", "3 km", "4 km"]', '"2 km"', 'Betul! 4 x 50,000 = 200,000 cm = 2 km!', 1
),
(
  '00000000-0000-0000-0000-000000000009',
  'Pokok tua gergasi berdiri megah di tengah hutan! 🌳',
  'Bayangan pokok ialah 15 m panjang. Jika sudut matahari 30°, tinggi pokok dalam nisbah 1:√3. Jika bayangan 15m, tinggi = 15/√3 ≈ 8.7m. Pilih anggaran terdekat.',
  '["7 m", "8 m", "9 m", "10 m"]', '"9 m"', 'Betul! Anggaran 9 m adalah yang paling hampir!', 2
),
(
  '00000000-0000-0000-0000-000000000009',
  'Sungai besar membelah hutan Amazon yang lebat! 🏞️',
  'Kelajuan aliran sungai ialah 4.5 m/s. Dalam 60 saat, berapa meter air mengalir?',
  '[240, 260, 270, 280]', '270', 'Pandai! 4.5 x 60 = 270 meter!', 3
),
(
  '00000000-0000-0000-0000-000000000009',
  'Burung Toucan mempunyai paruh yang berwarna-warni indah! 🦜',
  'Jika y = 3x + 7 dan x = 5, berapakah nilai y?',
  '[20, 21, 22, 23]', '22', 'Betul! y = 3(5) + 7 = 15 + 7 = 22!', 4
),
(
  '00000000-0000-0000-0000-000000000009',
  'Katak beracun kecil bersembunyi di balik daun besar! 🐸',
  'Populasi katak dalam kawasan A : kawasan B = 3 : 7. Jumlah 200 katak. Berapa di kawasan A?',
  '[55, 60, 65, 70]', '60', 'Pandai! 3/10 x 200 = 60 katak!', 5
),
(
  '00000000-0000-0000-0000-000000000009',
  'Ular sawa besar melingkar di dahan pokok yang besar! 🐍',
  'Ular sawa memanjang 4.5 meter. Dalam cm, berapakah panjangnya?',
  '[400, 420, 440, 450]', '450', 'Betul! 4.5 m = 450 cm!', 6
),
(
  '00000000-0000-0000-0000-000000000009',
  'Penjelajah merekod suhu hutan setiap hari untuk kajian! 🌡️',
  'Suhu 5 hari: 32°C, 35°C, 30°C, 33°C, 35°C. Apakah nilai median?',
  '["30°C", "32°C", "33°C", "35°C"]', '"33°C"', 'Betul! Susun: 30,32,33,35,35 — median ialah 33°C!', 7
),
(
  '00000000-0000-0000-0000-000000000009',
  'Tapak kem berbentuk segi tiga untuk perlindungan optimum! ⛺',
  'Segi tiga tapak kem mempunyai tapak 12 m dan tinggi 9 m. Berapakah luasnya?',
  '["50 m²", "54 m²", "60 m²", "64 m²"]', '"54 m²"', 'Betul! Luas = ½ x 12 x 9 = 54 m²!', 8
),
(
  '00000000-0000-0000-0000-000000000009',
  'Angin ribut datang! Kira kelajuan angin dari data penjelajah! 💨',
  'Angin bertiup 450 km dalam 5 jam. Apakah kelajuan purata sejam?',
  '[80, 85, 90, 95]', '90', 'Betul! 450 ÷ 5 = 90 km/j!', 9
),
(
  '00000000-0000-0000-0000-000000000009',
  'Misi terakhir! Kira luas hutan Amazon yang berjaya dijelajahi! 🏆',
  'Kawasan dijelajahi berbentuk segi empat tepat: panjang 25 km, lebar 18 km. Berapa km² luas?',
  '[430, 440, 450, 460]', '450', 'Luar biasa! 25 x 18 = 450 km²! Kau penjelajah matematika terhebat!', 10
);
