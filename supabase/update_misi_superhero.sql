-- Add icon column to levels
ALTER TABLE public.levels ADD COLUMN IF NOT EXISTS icon TEXT DEFAULT '🎯';

-- Update misi levels with superhero themes and icons
UPDATE public.levels SET theme = 'BoBoiBoy: Selamatkan Ochobot!', icon = '⚡', description = 'Bantu BoBoiBoy selesaikan matematik untuk selamatkan Ochobot!'
WHERE id = '00000000-0000-0000-0000-000000000001';

UPDATE public.levels SET theme = 'BoBoiBoy Galaxy: Perang Angkasa!', icon = '⚡', description = 'Sertai BoBoiBoy Galaxy lawan musuh angkasa dengan matematik!'
WHERE id = '00000000-0000-0000-0000-000000000002';

UPDATE public.levels SET theme = 'BoBoiBoy: Kuasa Elemen!', icon = '⚡', description = 'Kuasai elemen matematik bersama BoBoiBoy!'
WHERE id = '00000000-0000-0000-0000-000000000003';

UPDATE public.levels SET theme = 'Ejen Ali: Tangkap Pencuri!', icon = '🕵️', description = 'Bantu Ejen Ali dan MATA tangkap pencuri jahat!'
WHERE id = '00000000-0000-0000-0000-000000000004';

UPDATE public.levels SET theme = 'Ejen Ali: Operasi Rahsia!', icon = '🕵️', description = 'Selesaikan misi rahsia bersama Ejen Ali!'
WHERE id = '00000000-0000-0000-0000-000000000006';

UPDATE public.levels SET theme = 'Ejen Ali: Misi Mustahil!', icon = '🕵️', description = 'Misi paling susah! Bantu Ejen Ali!'
WHERE id = '00000000-0000-0000-0000-000000000008';

UPDATE public.levels SET theme = 'Upin & Ipin: Hari Raya Gembira!', icon = '🌙', description = 'Bantu Upin & Ipin sambut Hari Raya dengan matematik!'
WHERE id = '00000000-0000-0000-0000-000000000005';

UPDATE public.levels SET theme = 'Upin & Ipin: Musim Periksa!', icon = '🌙', description = 'Tolong Upin & Ipin belajar untuk peperiksaan!'
WHERE id = '00000000-0000-0000-0000-000000000007';

UPDATE public.levels SET theme = 'Upin & Ipin: Juara Sekolah!', icon = '🌙', description = 'Bantu Upin & Ipin jadi juara sekolah!'
WHERE id = '00000000-0000-0000-0000-000000000009';

-- Delete old questions for misi levels 001-009
DELETE FROM public.questions WHERE level_id IN (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000004',
  '00000000-0000-0000-0000-000000000005',
  '00000000-0000-0000-0000-000000000006',
  '00000000-0000-0000-0000-000000000007',
  '00000000-0000-0000-0000-000000000008',
  '00000000-0000-0000-0000-000000000009'
);

-- ============================================================
-- LEVEL 001: BoBoiBoy (5-6 tahun) - 30 soalan tambah/tolak dalam 10
-- ============================================================
INSERT INTO public.questions (id, level_id, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('b1q01','00000000-0000-0000-0000-000000000001','BoBoiBoy dan Ochobot sedang di Pulau Rintis. Tiba-tiba Adu Du datang! BoBoiBoy kumpul kuasa untuk lawan.','BoBoiBoy ada 3 kuasa. Dia dapat 2 lagi. Berapa jumlah kuasa?','["4","5","6","7"]','5','Hebat! BoBoiBoy makin kuat!',1),
('b1q02','00000000-0000-0000-0000-000000000001','Ochobot nak bantu BoBoiBoy. Dia kira berapa bahan yang ada.','Ochobot ada 4 bahan. Dia guna 2. Berapa yang tinggal?','["1","2","3","4"]','2','Pandai! Ochobot suka kamu!',2),
('b1q03','00000000-0000-0000-0000-000000000001','Yaya dan Ying lari dari robot Adu Du. Mereka kena kira langkah!','Yaya langkah 5 kali. Ying langkah 3 kali. Berapa jumlah langkah?','["7","8","9","10"]','8','Lari laju! Kamu bijak!',3),
('b1q04','00000000-0000-0000-0000-000000000001','Gopal takut tengok robot. Dia sorok di sebalik pokok.','Ada 6 pokok. Robot rosak 2 pokok. Berapa pokok yang tinggal?','["3","4","5","6"]','4','Bagus! Pokok selamat!',4),
('b1q05','00000000-0000-0000-0000-000000000001','BoBoiBoy Petir panah robot Adu Du. Setiap panah kena robot!','BoBoiBoy tembak 7 panah. 3 kena robot. Berapa yang tak kena?','["3","4","5","6"]','4','Terus cuba! BoBoiBoy tak putus asa!',5),
('b1q06','00000000-0000-0000-0000-000000000001','Adu Du suruh Probe kira berapa BoBoiBoy ada kawan.','BoBoiBoy ada 2 kawan lelaki dan 3 kawan perempuan. Berapa semua?','["4","5","6","7"]','5','Kamu kira dengan betul!',6),
('b1q07','00000000-0000-0000-0000-000000000001','Ochobot terbang dan tengok dari atas. Dia kira robot Adu Du.','Ada 8 robot. BoBoiBoy kalahkan 3. Berapa robot yang tinggal?','["4","5","6","7"]','5','Syabas! BoBoiBoy menang!',7),
('b1q08','00000000-0000-0000-0000-000000000001','Mama Zila masak untuk budak-budak. Mereka nak makan selepas selamatkan Ochobot.','Mama Zila buat 9 cucur. Mereka makan 4. Berapa yang tinggal?','["4","5","6","7"]','5','Sedap! Kamu bijak macam Mama Zila!',8),
('b1q09','00000000-0000-0000-0000-000000000001','BoBoiBoy kumpul kristal untuk bagi tenaga pada Ochobot.','BoBoiBoy jumpa 1 kristal di hutan dan 6 di pantai. Berapa semua?','["6","7","8","9"]','7','Ochobot gembira! Kamu hebat!',9),
('b1q10','00000000-0000-0000-0000-000000000001','Ying berlari laju dan selamatkan Ochobot dari robot!','Ying lari 10 langkah. Dia rehat lepas 4 langkah. Berapa lagi?','["5","6","7","8"]','6','Laju macam Ying! Bagus!',10),
('b1q11','00000000-0000-0000-0000-000000000001','Gopal tukar makanan jadi senjata! Dia kira banyak mana yang ada.','Gopal ada 3 keropok dan 4 gula-gula. Berapa semua?','["6","7","8","9"]','7','Kamu kira macam Gopal yang bijak!',11),
('b1q12','00000000-0000-0000-0000-000000000001','BoBoiBoy angin tiup robot-robot. Mereka jatuh satu persatu!','Ada 8 robot berdiri. 5 jatuh. Berapa yang masih berdiri?','["2","3","4","5"]','3','Angin kencang! Kamu betul!',12),
('b1q13','00000000-0000-0000-0000-000000000001','Yaya terbang dan nampak kapal Adu Du di langit.','Kapal ada 2 tingkap di kiri dan 4 di kanan. Berapa semua?','["5","6","7","8"]','6','Pandangan tajam macam Yaya!',13),
('b1q14','00000000-0000-0000-0000-000000000001','Probe dan Computer sengketa pasal berapa bintang di langit malam.','Probe kira 5 bintang. Computer kira 3 lagi. Berapa semua?','["7","8","9","10"]','8','Kamu lebih bijak dari Probe!',14),
('b1q15','00000000-0000-0000-0000-000000000001','BoBoiBoy tembak kilat pada robot. Ada yang rosak terus!','BoBoiBoy tembak 9 kali. 6 kena robot. Berapa yang terpesong?','["2","3","4","5"]','3','Tepat macam BoBoiBoy! Bagus!',15),
('b1q16','00000000-0000-0000-0000-000000000001','Adu Du marah sebab rancangannya gagal. Dia kira berapa kali dia kalah.','Adu Du kalah 4 kali pagi dan 2 kali petang. Berapa semua?','["5","6","7","8"]','6','Ha! Adu Du memang kalah!',16),
('b1q17','00000000-0000-0000-0000-000000000001','Ochobot sembuh dan bagi bintang kepada BoBoiBoy!','Ochobot bagi 3 bintang kuning dan 5 bintang merah. Berapa semua?','["7","8","9","10"]','8','Terima kasih Ochobot! Kamu hebat!',17),
('b1q18','00000000-0000-0000-0000-000000000001','Tok Aba buat coklat untuk semua orang. Dia kira cawan yang ada.','Tok Aba ada 10 cawan. Dia guna 7. Berapa yang tinggal?','["2","3","4","5"]','3','Coklat Tok Aba paling sedap!',18),
('b1q19','00000000-0000-0000-0000-000000000001','BoBoiBoy gabung semua kuasanya untuk serang Adu Du!','BoBoiBoy ada kuasa angin 2, petir 3, dan api 1. Berapa semua?','["5","6","7","8"]','6','Tiga dalam satu! Kamu bijak!',19),
('b1q20','00000000-0000-0000-0000-000000000001','Semua kawan BoBoiBoy bersatu untuk lawan Adu Du sekali lagi.','Ada 3 kawan lelaki dan 2 kawan perempuan. Berapa semua kawan?','["4","5","6","7"]','5','Bersatu teguh! Kamu betul!',20),
('b1q21','00000000-0000-0000-0000-000000000001','Yaya buat perisai pelindung. Dia kira berapa banyak yang boleh dilindungi.','Yaya boleh lindungi 4 orang. Ying boleh lindungi 4 orang. Berapa semua?','["6","7","8","9"]','8','Dua hero lebih kuat!',21),
('b1q22','00000000-0000-0000-0000-000000000001','Gopal makan banyak. Dia kira berapa makanan yang dia habiskan.','Gopal makan 6 cucur. Ada 2 lagi. Berapa semua yang ada tadi?','["7","8","9","10"]','8','Ha! Gopal memang suka makan!',22),
('b1q23','00000000-0000-0000-0000-000000000001','BoBoiBoy berjaya selamatkan Ochobot! Semua orang gembira.','Ada 5 orang gembira. 3 lagi datang. Berapa semua yang gembira?','["7","8","9","10"]','8','Misi berjaya! Kamu bijak!',23),
('b1q24','00000000-0000-0000-0000-000000000001','Probe cuba baiki robot yang rosak. Dia kira berapa skru yang ada.','Ada 9 skru. Probe guna 5. Berapa skru yang tinggal?','["3","4","5","6"]','4','Probe kena belajar matematik macam kamu!',24),
('b1q25','00000000-0000-0000-0000-000000000001','Computer berikan markah kepada BoBoiBoy lepas menang.','BoBoiBoy dapat 3 markah pagi dan 6 markah petang. Berapa semua?','["7","8","9","10"]','9','Markah penuh! Kamu macam BoBoiBoy!',25),
('b1q26','00000000-0000-0000-0000-000000000001','Adu Du rancang untuk balik dan serang lagi. Dia kira robot baru.','Adu Du ada 2 robot lama dan buat 5 robot baru. Berapa semua?','["6","7","8","9"]','7','Tapi BoBoiBoy pasti menang lagi!',26),
('b1q27','00000000-0000-0000-0000-000000000001','Tok Aba kasih semua orang minum coklat. Dia kira cawan.','Ada 8 orang. 3 dah minum. Berapa yang belum minum?','["4","5","6","7"]','5','Minum dulu! Kamu bijak!',27),
('b1q28','00000000-0000-0000-0000-000000000001','Ochobot terbang tinggi dan nampak semua dari atas.','Ochobot nampak 4 rumah di kiri dan 4 rumah di kanan. Berapa semua?','["6","7","8","9"]','8','Pandangan luas! Kamu betul!',28),
('b1q29','00000000-0000-0000-0000-000000000001','BoBoiBoy selamatkan semua orang! Dia kira berapa orang yang selamat.','BoBoiBoy selamatkan 5 orang pagi dan 4 orang petang. Berapa semua?','["7","8","9","10"]','9','Hero sejati! Tahniah kamu!',29),
('b1q30','00000000-0000-0000-0000-000000000001','Tamat! BoBoiBoy menang dan Ochobot selamat. Semua orang bersorak!','Ada 10 orang bersorak. 2 dah balik. Berapa yang masih bersorak?','["6","7","8","9"]','8','Tahniah! Kamu berjaya macam BoBoiBoy!',30);

-- ============================================================
-- LEVEL 002: BoBoiBoy Galaxy (7-9 tahun) - 30 soalan tambah/tolak dalam 100
-- ============================================================
INSERT INTO public.questions (id, level_id, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('b2q01','00000000-0000-0000-0000-000000000002','BoBoiBoy Galaxy dan krew Kapal Spaceship bertembung dengan tentera Retak-na!','Kapal ada 45 peluru. Mereka tembak 23. Berapa yang tinggal?','["20","22","24","26"]','22','Tepat! Krew selamat!',1),
('b2q02','00000000-0000-0000-0000-000000000002','Kiki dan Ochobot kira stok makanan dalam kapal.','Ada 38 tin makanan. Mereka makan 15. Berapa yang tinggal?','["21","22","23","24"]','23','Cukup untuk perjalanan jauh!',2),
('b2q03','00000000-0000-0000-0000-000000000002','BoBoiBoy Petir melancarkan serangan pada kapal musuh!','Kapal musuh ada 67 prajurit. 34 dah lari. Berapa yang tinggal?','["31","32","33","34"]','33','Musuh ketakutan!',3),
('b2q04','00000000-0000-0000-0000-000000000002','Sai dan Shielda tolong Fang kira bintang untuk navigasi kapal.','Mereka kira 25 bintang di utara dan 43 di selatan. Berapa semua?','["66","67","68","69"]','68','Navigasi betul! Bagus!',4),
('b2q05','00000000-0000-0000-0000-000000000002','Fang tunjukkan kekuatan bayang-bayang untuk selamatkan krew.','Fang ada 50 tenaga. Dia guna 28. Berapa yang tinggal?','["20","22","24","26"]','22','Bayang-bayang masih kuat!',5),
('b2q06','00000000-0000-0000-0000-000000000002','Adu Du ikut dalam kapal diam-diam dan cuba curi makanan.','Adu Du ambil 17 dari 60 tin makanan. Berapa yang tinggal?','["41","42","43","44"]','43','Tangkap Adu Du!',6),
('b2q07','00000000-0000-0000-0000-000000000002','Kapal Galaxy tiba di planet baru. Mereka kira batu asing.','Jumpa 32 batu biru dan 45 batu merah. Berapa semua batu?','["75","76","77","78"]','77','Planet baru, matematik sama!',7),
('b2q08','00000000-0000-0000-0000-000000000002','BoBoiBoy Api tembak musuh yang menghampiri kapal!','Ada 80 musuh. BoBoiBoy Api kalahkan 37. Berapa yang tinggal?','["41","42","43","44"]','43','Api berkobar! Kamu betul!',8),
('b2q09','00000000-0000-0000-0000-000000000002','Ochobot upgrade kuasa BoBoiBoy. Semua kru gembira!','Kuasa asal 55. Lepas upgrade jadi 55+33. Berapa jumlah?','["86","87","88","89"]','88','Upgrade berjaya!',9),
('b2q10','00000000-0000-0000-0000-000000000002','Retak-na hantar 70 prajurit serang kapal Galaxy!','BoBoiBoy Kilat kalahkan 29. Berapa prajurit yang tinggal?','["39","40","41","42"]','41','Teruskan perjuangan!',10),
('b2q11','00000000-0000-0000-0000-000000000002','Kiki masak makanan untuk krew yang lapar selepas perang.','Kiki masak 54 roti. Krew makan 26. Berapa yang tinggal?','["26","27","28","29"]','28','Sedap masakan Kiki!',11),
('b2q12','00000000-0000-0000-0000-000000000002','Kapal Galaxy jumpa kapal lain yang perlukan bantuan di angkasa.','Kapal tu ada 36 penumpang. Mereka selamatkan 15 lagi. Berapa semua?','["49","50","51","52"]','51','Hero angkasa!',12),
('b2q13','00000000-0000-0000-0000-000000000002','BoBoiBoy Air membuat ribut untuk halang musuh.','Ada 90 titik air dalam ribut. 48 dah jatuh. Berapa yang tinggal?','["40","41","42","43"]','42','Ribut semakin kuat!',13),
('b2q14','00000000-0000-0000-0000-000000000002','Fang dan BoBoiBoy gabung kuasa untuk serang ketua musuh!','Fang ada tenaga 43. BoBoiBoy ada 35. Berapa jumlah tenaga?','["76","77","78","79"]','78','Gabungan kuasa terhebat!',14),
('b2q15','00000000-0000-0000-0000-000000000002','Sai selamatkan penumpang dari kapal yang terbakar.','Ada 62 penumpang. Sai selamatkan 38. Berapa yang masih dalam bahaya?','["22","23","24","25"]','24','Cepat! Selamatkan semua!',15),
('b2q16','00000000-0000-0000-0000-000000000002','Kapal Galaxy dapat bahan api baru dari planet aman.','Bahan api asal 40. Dapat tambah 47. Berapa semua?','["85","86","87","88"]','87','Kapal boleh terus terbang!',16),
('b2q17','00000000-0000-0000-0000-000000000002','BoBoiBoy Daun tumbuhkan pokok untuk lindungi krew.','Tumbuh 28 pokok di kiri dan 39 di kanan. Berapa semua pokok?','["65","66","67","68"]','67','Alam lindungi kita!',17),
('b2q18','00000000-0000-0000-0000-000000000002','Kapal Galaxy hampir tiba di destinasi! Semua kru bersedia.','Destinasi tinggal 85 minit lagi. Dah melalui 46 minit. Berapa lagi?','["37","38","39","40"]','39','Hampir sampai! Teruskan!',18),
('b2q19','00000000-0000-0000-0000-000000000002','Musuh besar muncul! BoBoiBoy gabung semua elemen.','Kuasa angin 25, api 33, petir 30. Berapa jumlah kuasa?','["86","87","88","89"]','88','Kuasa penuh! Menang!',19),
('b2q20','00000000-0000-0000-0000-000000000002','Retak-na berundur! Kapal Galaxy menang dalam perang angkasa!','Ada 100 bintang kemenangan. Krew dapat 63. Berapa yang tinggal?','["35","36","37","38"]','37','Kemenangan untuk Galaxy!',20),
('b2q21','00000000-0000-0000-0000-000000000002','Ochobot kira markah kemenangan untuk semua ahli krew.','Kiki dapat 24, Ying dapat 31, Yaya dapat 29. Berapa semua?','["82","83","84","85"]','84','Semua hero dapat markah tinggi!',21),
('b2q22','00000000-0000-0000-0000-000000000002','Krew Galaxy buat pesta kemenangan di kapal!','Ada 55 orang dalam pesta. 18 pergi tidur. Berapa yang masih berpesta?','["35","36","37","38"]','37','Pesta terus! Kamu bijak!',22),
('b2q23','00000000-0000-0000-0000-000000000002','BoBoiBoy dapat berita ada planet lain yang perlukan bantuan.','Perjalanan ambil 72 jam. Dah pergi 38 jam. Berapa jam lagi?','["32","33","34","35"]','34','Terus pergi! Hero tak rehat!',23),
('b2q24','00000000-0000-0000-0000-000000000002','Shielda buat perisai besar untuk lindungi kapal dari asteroid.','Asteroid ada 91. Perisai halang 56. Berapa yang masih datang?','["33","34","35","36"]','35','Perisai kuat! Kapal selamat!',24),
('b2q25','00000000-0000-0000-0000-000000000002','Fang latihan bersama semua orang untuk misi seterusnya.','Krew latihan 47 minit. Rehat 13 minit. Berapa minit latihan semua?','["58","59","60","61"]','60','Latihan keras bagi hasil!',25),
('b2q26','00000000-0000-0000-0000-000000000002','BoBoiBoy selesai misi angkasa dan semua kru selamat!','Krew asal 30 orang. Selamatkan 47 orang lagi. Berapa semua?','["75","76","77","78"]','77','Misi berjaya! Tahniah!',26),
('b2q27','00000000-0000-0000-0000-000000000002','Kapal Galaxy balik ke bumi dengan penuh kebanggaan!','Perjalanan balik 83 minit. Dah 49 minit berlalu. Berapa lagi?','["32","33","34","35"]','34','Hampir sampai rumah!',27),
('b2q28','00000000-0000-0000-0000-000000000002','Semua kawan-kawan BoBoiBoy tunggu dia di bumi!','Ada 20 kawan tunggu di bumi dan 18 di angkasawan. Berapa semua?','["36","37","38","39"]','38','Ramai kawan BoBoiBoy!',28),
('b2q29','00000000-0000-0000-0000-000000000002','BoBoiBoy turun dari kapal dan semua orang bersorak!','Ada 65 orang bersorak. 28 lagi datang kemudian. Berapa semua?','["91","92","93","94"]','93','Selamat datang balik hero!',29),
('b2q30','00000000-0000-0000-0000-000000000002','Misi angkasa selesai! BoBoiBoy galaxy menang dengan matematik!','Jumlah bintang yang dikumpul: 56 + 37 = ?','["91","92","93","94"]','93','Tahniah! Kamu berjaya!',30);

-- ============================================================
-- LEVEL 003: BoBoiBoy Kuasa Elemen (10-12 tahun) - 30 soalan sifir & bahagi
-- ============================================================
INSERT INTO public.questions (id, level_id, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('b3q01','00000000-0000-0000-0000-000000000003','BoBoiBoy ada 7 elemen berbeza! Setiap elemen ada kuasa yang berbeza.','Setiap elemen ada 8 kuasa. Ada 7 elemen. Berapa jumlah kuasa?','["54","55","56","57"]','56','7 × 8 = 56! Kamu hebat!',1),
('b3q02','00000000-0000-0000-0000-000000000003','BoBoiBoy bahagi kuasanya kepada kawan-kawan untuk lawan musuh.','56 unit kuasa dibahagi 8 orang. Setiap orang dapat berapa?','["6","7","8","9"]','7','56 ÷ 8 = 7! Bijak!',2),
('b3q03','00000000-0000-0000-0000-000000000003','Ejen Ochobot kira tenaga dalam kristal yang dijumpai.','Jumpa 9 kristal. Setiap kristal ada 6 tenaga. Berapa semua tenaga?','["52","53","54","55"]','54','9 × 6 = 54! Tenaga penuh!',3),
('b3q04','00000000-0000-0000-0000-000000000003','Fang bahagi latihan kepada semua pelajar kuasa di akademi.','72 pelajar dibahagi 9 kumpulan. Setiap kumpulan ada berapa pelajar?','["7","8","9","10"]','8','72 ÷ 9 = 8! Kumpulan sempurna!',4),
('b3q05','00000000-0000-0000-0000-000000000003','BoBoiBoy Api menyalakan 7 api dalam masa yang sama!','Setiap api bakar 9 saat. Ada 7 api. Berapa jumlah saat?','["60","62","63","64"]','63','7 × 9 = 63! Api marak!',5),
('b3q06','00000000-0000-0000-0000-000000000003','Kapal musuh datang dalam kumpulan. Krew kira berapa kesemuanya.','63 musuh dalam 7 kapal sama rata. Setiap kapal ada berapa musuh?','["7","8","9","10"]','9','63 ÷ 7 = 9! Kira betul!',6),
('b3q07','00000000-0000-0000-0000-000000000003','BoBoiBoy Tanah angkat batu besar untuk sekat jalan musuh.','Setiap batu wajah 8 meter. Angkat 6 batu. Berapa jumlah meter?','["46","47","48","49"]','48','6 × 8 = 48! Kuat macam bumi!',7),
('b3q08','00000000-0000-0000-0000-000000000003','Ying bahagi perisai masa kepada semua kawan-kawannya.','48 shield dibahagi 6. Setiap orang dapat berapa?','["6","7","8","9"]','8','48 ÷ 6 = 8! Ying suka kamu!',8),
('b3q09','00000000-0000-0000-0000-000000000003','BoBoiBoy Kilat tembak musuh berkali-kali dengan pantas!','Tembak 7 kali setiap minit. 9 minit berlalu. Berapa jumlah tembakan?','["61","62","63","64"]','63','7 × 9 = 63! Kilat pantas!',9),
('b3q10','00000000-0000-0000-0000-000000000003','Yaya bahagi senjata kepada pasukan yang bersedia untuk bertempur.','54 senjata untuk 9 pasukan. Setiap pasukan dapat berapa?','["5","6","7","8"]','6','54 ÷ 9 = 6! Sedia bertempur!',10),
('b3q11','00000000-0000-0000-0000-000000000003','BoBoiBoy Air buat ombak besar untuk halang musuh di pantai.','Setiap ombak ada 8 meter tinggi. Buat 8 ombak. Berapa meter semua?','["62","63","64","65"]','64','8 × 8 = 64! Ombak ganas!',11),
('b3q12','00000000-0000-0000-0000-000000000003','Gopal bahagi makanan kepada semua orang yang lapar lepas perang.','64 makanan untuk 8 orang. Setiap orang dapat berapa?','["7","8","9","10"]','8','64 ÷ 8 = 8! Semua kenyang!',12),
('b3q13','00000000-0000-0000-0000-000000000003','BoBoiBoy Daun tumbuhkan hutan untuk sorok semua kawan daripada musuh.','Setiap baris ada 7 pokok. Ada 9 baris. Berapa jumlah pokok?','["61","62","63","64"]','63','7 × 9 = 63! Hutan lebat!',13),
('b3q14','00000000-0000-0000-0000-000000000003','Probe kira berapa lama perjalanan kapal musuh ke Pulau Rintis.','63 jam dibahagi 7 hari. Setiap hari berapa jam perjalanan?','["7","8","9","10"]','9','63 ÷ 7 = 9! Kira tepat!',14),
('b3q15','00000000-0000-0000-0000-000000000003','Semua elemen BoBoiBoy bergabung untuk serangan terakhir!','6 elemen × 9 tenaga setiap satu. Berapa jumlah tenaga?','["52","53","54","55"]','54','6 × 9 = 54! Kuasa gabungan!',15),
('b3q16','00000000-0000-0000-0000-000000000003','Retak-na cuba bahagi tentera dia kepada beberapa barisan.','81 tentera dibahagi 9 barisan. Setiap barisan ada berapa?','["8","9","10","11"]','9','81 ÷ 9 = 9! Tapi BoBoiBoy menang!',16),
('b3q17','00000000-0000-0000-0000-000000000003','Ochobot kira bintang kemenangan yang dikumpul oleh semua krew.','8 krew × 9 bintang setiap satu. Berapa jumlah bintang?','["70","71","72","73"]','72','8 × 9 = 72! Hebat krew Galaxy!',17),
('b3q18','00000000-0000-0000-0000-000000000003','BoBoiBoy bahagi kristal tenaga kepada semua ahli pasukan.','72 kristal untuk 8 ahli. Setiap ahli dapat berapa?','["7","8","9","10"]','9','72 ÷ 8 = 9! Adil dan tepat!',18),
('b3q19','00000000-0000-0000-0000-000000000003','Sai kira berapa lama dia boleh kekalkan perisai tenaga tinggi.','Perisai bertahan 9 minit. Guna 8 kali. Berapa minit semua?','["70","71","72","73"]','72','9 × 8 = 72! Perisai hebat!',19),
('b3q20','00000000-0000-0000-0000-000000000003','Krew Galaxy buat strategi untuk bahagi tugas dalam pertempuran besar.','90 tugas dibahagi 9 orang. Setiap orang dapat berapa tugas?','["9","10","11","12"]','10','90 ÷ 9 = 10! Strategi sempurna!',20),
('b3q21','00000000-0000-0000-0000-000000000003','BoBoiBoy terbang dan serang musuh dari atas! Serangan bertubi-tubi!','Setiap pusingan 7 serangan. Buat 8 pusingan. Berapa semua serangan?','["54","55","56","57"]','56','7 × 8 = 56! Serangan dahsyat!',21),
('b3q22','00000000-0000-0000-0000-000000000003','Shielda kira berapa banyak pelindung yang perlu dibuat untuk krew.','56 pelindung untuk 7 orang. Setiap orang dapat berapa?','["7","8","9","10"]','8','56 ÷ 7 = 8! Semua terlindung!',22),
('b3q23','00000000-0000-0000-0000-000000000003','BoBoiBoy Petir melepaskan serangan muktamad pada boss musuh!','Serangan ada 9 peringkat. Setiap peringkat ada 8 halilintar. Berapa semua?','["70","71","72","73"]','72','9 × 8 = 72! Boss kalah!',23),
('b3q24','00000000-0000-0000-0000-000000000003','Kiki bahagi hadiah kepada semua krew yang menang dalam pertempuran.','72 hadiah untuk 9 orang. Setiap orang dapat berapa?','["7","8","9","10"]','8','72 ÷ 9 = 8! Hadiah untuk semua!',24),
('b3q25','00000000-0000-0000-0000-000000000003','BoBoiBoy menang! Semua elemen bergabung dalam satu kuasa terakhir.','7 elemen × 8 kuasa terakhir. Berapa jumlah kuasa?','["54","55","56","57"]','56','7 × 8 = 56! Menang!',25),
('b3q26','00000000-0000-0000-0000-000000000003','Musuh lari! BoBoiBoy kira berapa musuh yang berjaya melarikan diri.','54 musuh lari. Dibahagi 6 arah. Setiap arah ada berapa musuh?','["7","8","9","10"]','9','54 ÷ 6 = 9! Musuh pengecut!',26),
('b3q27','00000000-0000-0000-0000-000000000003','Fang dan BoBoiBoy kira jumlah latihan yang mereka buat bersama.','6 bulan × 9 latihan sebulan. Berapa jumlah latihan?','["52","53","54","55"]','54','6 × 9 = 54! Kerja keras berbaloi!',27),
('b3q28','00000000-0000-0000-0000-000000000003','Krew Galaxy bahagi tugas untuk membina markas baru di angkasa.','63 kerja dibahagi 7 orang. Setiap orang buat berapa kerja?','["7","8","9","10"]','9','63 ÷ 7 = 9! Markas berjaya!',28),
('b3q29','00000000-0000-0000-0000-000000000003','BoBoiBoy dapat kuasa baru selepas menang! Semua orang kagum.','Kuasa baru: 8 jenis × 8 tahap. Berapa jumlah tahap kuasa?','["62","63","64","65"]','64','8 × 8 = 64! Kuasa luar biasa!',29),
('b3q30','00000000-0000-0000-0000-000000000003','Tamat! BoBoiBoy adalah hero terhebat! Terima kasih kerana bantu!','64 bintang untuk 8 hero. Setiap hero dapat berapa bintang?','["7","8","9","10"]','8','Tahniah hero matematik!',30);

-- ============================================================
-- LEVEL 004: Ejen Ali (5-6 tahun) - 30 soalan tambah/tolak dalam 20
-- ============================================================
INSERT INTO public.questions (id, level_id, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('e1q01','00000000-0000-0000-0000-000000000004','Ejen Ali misi pertama! Dia kena tangkap pencuri di pasar malam.','Ali ada 8 alat perisik. Dia dapat 5 lagi dari MATA. Berapa semua?','["11","12","13","14"]','13','8 + 5 = 13! Misi berjaya!',1),
('e1q02','00000000-0000-0000-0000-000000000004','Ejen Dos bantu Ali kesan pencuri. Mereka kira tapak kaki.','Ada 15 tapak kaki. 7 milik pencuri. Berapa yang bukan pencuri?','["6","7","8","9"]','8','15 - 7 = 8! Kesan bijak!',2),
('e1q03','00000000-0000-0000-0000-000000000004','Ibu Ali masak untuk tenaga sebelum misi. Ali kena makan kenyang!','Ibu masak 12 lauk. Ali makan 5. Berapa yang tinggal?','["5","6","7","8"]','7','12 - 5 = 7! Makan dulu baru misi!',3),
('e1q04','00000000-0000-0000-0000-000000000004','Ali guna MURI untuk kesan pencuri. MURI kesan beberapa laluan.','MURI kesan 9 laluan di utara dan 6 di selatan. Berapa semua?','["13","14","15","16"]','15','9 + 6 = 15! MURI canggih!',4),
('e1q05','00000000-0000-0000-0000-000000000004','Pencuri lari! Ali kejar dengan laju. Dia kira langkah dia.','Ali dah langkah 11 meter. Pencuri ada 17 meter ke hadapan. Berapa jauh lagi?','["5","6","7","8"]','6','17 - 11 = 6! Kejar lagi!',5),
('e1q06','00000000-0000-0000-0000-000000000004','Ejen Zain beri maklumat kepada Ali tentang kawasan yang perlu dijaga.','Ada 7 kawasan barat dan 8 kawasan timur. Berapa semua kawasan?','["13","14","15","16"]','15','7 + 8 = 15! Kawasan dijaga!',6),
('e1q07','00000000-0000-0000-0000-000000000004','Ali sorok di belakang kereta untuk tengok pencuri tidak nampak.','Ada 18 kereta di kawasan tu. Ali sorok di belakang 3 kereta. Berapa kereta yang Ali tak sorok?','["13","14","15","16"]','15','18 - 3 = 15! Ali bijak!',7),
('e1q08','00000000-0000-0000-0000-000000000004','MURI kesan isyarat dari pencuri! Ali dapat koordinat.','Koordinat: 6 arah ke kiri dan 7 arah ke atas. Berapa jumlah koordinat?','["12","13","14","15"]','13','6 + 7 = 13! Koordinat tepat!',8),
('e1q09','00000000-0000-0000-0000-000000000004','Ali terjumpa kawan pencuri yang cuba halang dia!','Ada 16 penghalang. Ali dah lepasi 9. Berapa yang tinggal?','["6","7","8","9"]','7','16 - 9 = 7! Ali tak berhenti!',9),
('e1q10','00000000-0000-0000-0000-000000000004','Pencuri cuba sorok barangan yang dicuri dalam beberapa beg.','Ali jumpa 5 beg merah dan 8 beg hitam. Berapa semua beg?','["12","13","14","15"]','13','5 + 8 = 13! Jumpa semua beg!',10),
('e1q11','00000000-0000-0000-0000-000000000004','Ejen Dos halang pencuri dari belakang. Ali serbu dari hadapan!','Ada 14 pencuri. Dos tangkap 6. Berapa yang Ali perlu tangkap?','["7","8","9","10"]','8','14 - 6 = 8! Tangkap semua!',11),
('e1q12','00000000-0000-0000-0000-000000000004','Ali guna gadget istimewa dari MATA untuk kesan pencuri utama.','Gadget ada tenaga 20. Dah guna 11. Berapa tenaga yang tinggal?','["7","8","9","10"]','9','20 - 11 = 9! Tenaga cukup!',12),
('e1q13','00000000-0000-0000-0000-000000000004','Pencuri cuba bagi rasuah kepada Ali. Tapi Ali tak menerima!','Pencuri tawarkan 9 wang emas dan 4 permata. Berapa semua tawaran?','["12","13","14","15"]','13','9 + 4 = 13! Ali tolak semuanya!',13),
('e1q14','00000000-0000-0000-0000-000000000004','Ali berjaya tangkap pencuri! MATA bagi kredit kepada Ali.','Ali dapat 7 kredit dari Ejen Zain dan 9 dari MATA. Berapa semua?','["14","15","16","17"]','16','7 + 9 = 16! Kredit tinggi!',14),
('e1q15','00000000-0000-0000-0000-000000000004','Pencuri dimasukkan dalam lokap. Ali lapor kepada ketua MATA.','Ada 18 laporan. Ali dah siapkan 10. Berapa yang tinggal?','["7","8","9","10"]','8','18 - 10 = 8! Siapkan semua!',15),
('e1q16','00000000-0000-0000-0000-000000000004','Ibu Ali bangga dengan kejayaan anaknya! Dia buat kek!','Kek ada 15 cerasa. Ali makan 6. Berapa yang tinggal?','["7","8","9","10"]','9','15 - 6 = 9! Selamat makan Ali!',16),
('e1q17','00000000-0000-0000-0000-000000000004','Ejen Ali dapat berita ada pencuri lain! Misi belum selesai.','MURI kesan 8 pencuri baru di kawasan A dan 5 di kawasan B. Berapa semua?','["12","13","14","15"]','13','8 + 5 = 13! Misi teruskan!',17),
('e1q18','00000000-0000-0000-0000-000000000004','Ali panggil bantuan dari kawan-kawan ejen yang lain.','Ali panggil 4 ejen dari utara dan 9 ejen dari selatan. Berapa semua?','["12","13","14","15"]','13','4 + 9 = 13! Pasukan lengkap!',18),
('e1q19','00000000-0000-0000-0000-000000000004','Pasukan Ali kepung kawasan pencuri dari semua arah!','Ada 17 arah kepungan. Ali cover 8 arah. Kawan cover selebihnya. Berapa kawan cover?','["7","8","9","10"]','9','17 - 8 = 9! Kepungan sempurna!',19),
('e1q20','00000000-0000-0000-0000-000000000004','Semua pencuri ditangkap! Ali menang dalam misi pertamanya.','Tangkap 13 pencuri pertama dan 7 yang baru. Berapa semua pencuri ditangkap?','["18","19","20","21"]','20','13 + 7 = 20! Misi berjaya!',20),
('e1q21','00000000-0000-0000-0000-000000000004','MATA bagi anugerah kepada Ali kerana berjaya dalam misi.','Ali dapat anugerah bernilai 16 mata. Dos dapat 8 mata. Berapa lebih Ali dari Dos?','["7","8","9","10"]','8','16 - 8 = 8! Ali nombor satu!',21),
('e1q22','00000000-0000-0000-0000-000000000004','Ali simpan semua gadget dalam bilik rahsianya.','Bilik ada ruang untuk 20 gadget. Ali ada 14. Berapa ruang yang tinggal?','["5","6","7","8"]','6','20 - 14 = 6! Ruang untuk gadget baru!',22),
('e1q23','00000000-0000-0000-0000-000000000004','Ejen Dos ambil gambar sebagai kenangan selepas misi berjaya.','Dos ambil 9 gambar pagi dan 8 gambar petang. Berapa semua gambar?','["15","16","17","18"]','17','9 + 8 = 17! Kenangan indah!',23),
('e1q24','00000000-0000-0000-0000-000000000004','Ibu Ali masak makanan kegemaran Ali untuk sambut kejayaan misi!','Ada 11 hidangan. 4 untuk Ali, selebihnya untuk keluarga. Berapa untuk keluarga?','["6","7","8","9"]','7','11 - 4 = 7! Makan bersama!',24),
('e1q25','00000000-0000-0000-0000-000000000004','Ali baca fail misi untuk buat laporan kepada MATA.','Fail ada 19 muka surat. Ali baca 12. Berapa yang tinggal?','["6","7","8","9"]','7','19 - 12 = 7! Hampir siap!',25),
('e1q26','00000000-0000-0000-0000-000000000004','Ejen Zain bagi pujian kepada Ali di hadapan semua ejen MATA.','Ada 6 ejen lelaki dan 7 ejen perempuan dalam bilik tu. Berapa semua?','["12","13","14","15"]','13','6 + 7 = 13! Semua kagum dengan Ali!',26),
('e1q27','00000000-0000-0000-0000-000000000004','MURI beri maklumat tentang misi seterusnya kepada Ali.','MURI ada 15 fail misi. 8 sudah selesai. Berapa yang belum?','["6","7","8","9"]','7','15 - 8 = 7! Misi belum habis!',27),
('e1q28','00000000-0000-0000-0000-000000000004','Ali bersedia untuk misi seterusnya! Dia kumpul semua alat.','Ali ada 5 alat lama dan dapat 9 alat baru. Berapa semua alat?','["13","14","15","16"]','14','5 + 9 = 14! Sedia untuk misi!',28),
('e1q29','00000000-0000-0000-0000-000000000004','Ibu Ali doakan keselamatan anaknya sebelum dia pergi misi.','Ali ada 16 doa dari ibu. Dos ada 8 doa. Berapa lebih Ali?','["7","8","9","10"]','8','16 - 8 = 8! Doa ibu kuat!',29),
('e1q30','00000000-0000-0000-0000-000000000004','Ejen Ali berjaya! MATA bangga ada ejen muda seperti dia!','Jumlah misi berjaya: 9 misi hari ini + 4 sebelumnya. Berapa semua?','["12","13","14","15"]','13','Tahniah Ejen Ali muda!',30);

-- ============================================================
-- LEVEL 005: Upin & Ipin Hari Raya (5-6 tahun) - 30 soalan tambah/tolak dalam 20
-- ============================================================
INSERT INTO public.questions (id, level_id, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('u1q01','00000000-0000-0000-0000-000000000005','Upin dan Ipin excited sambut Hari Raya! Opah masak banyak makanan.','Opah masak 8 kuih dan Mak Su buat 7 kuih. Berapa semua kuih?','["13","14","15","16"]','15','8 + 7 = 15! Banyaknya kuih!',1),
('u1q02','00000000-0000-0000-0000-000000000005','Upin dan Ipin dapat duit raya dari semua orang yang datang.','Dapat 9 ringgit dari Opah dan 6 ringgit dari Mak Su. Berapa semua?','["13","14","15","16"]','15','9 + 6 = 15! Kaya raya!',2),
('u1q03','00000000-0000-0000-0000-000000000005','Mail jual mercun masa Hari Raya. Dia kira berapa yang laku.','Mail ada 18 mercun. Dah jual 9. Berapa yang tinggal?','["8","9","10","11"]','9','18 - 9 = 9! Lagi separuh!',3),
('u1q04','00000000-0000-0000-0000-000000000005','Mei Mei datang sambut Hari Raya bersama Upin dan Ipin!','Mereka bertiga main dan ada 5 kawan lain join. Berapa semua kawan?','["7","8","9","10"]','8','3 + 5 = 8! Ramai kawan!',4),
('u1q05','00000000-0000-0000-0000-000000000005','Upin dan Ipin tolong Opah angkat kuih ke meja untuk tetamu.','Ada 16 kuih di dapur. Dah bawa 7 ke meja. Berapa yang tinggal?','["8","9","10","11"]','9','16 - 7 = 9! Rajin tolong Opah!',5),
('u1q06','00000000-0000-0000-0000-000000000005','Ehsan datang beraya dengan baju baru yang cantik!','Ehsan dapat 7 angpau dari kiri dan 8 dari kanan. Berapa semua?','["13","14","15","16"]','15','7 + 8 = 15! Syukur Ehsan!',6),
('u1q07','00000000-0000-0000-0000-000000000005','Jarjit buat lawak masa Hari Raya. Semua orang gelak!','Ada 12 orang dengar lawak. 5 dah balik. Berapa yang masih dengar?','["6","7","8","9"]','7','12 - 5 = 7! Kelakar Jarjit!',7),
('u1q08','00000000-0000-0000-0000-000000000005','Fizi makan banyak kuih raya. Perutnya dah penuh!','Fizi makan 6 kuih pagi dan 5 kuih petang. Berapa semua kuih Fizi makan?','["10","11","12","13"]','11','6 + 5 = 11! Perut Fizi bulat!',8),
('u1q09','00000000-0000-0000-0000-000000000005','Upin dan Ipin pakai baju baru dan pergi rumah jiran beraya.','Mereka singgah 8 rumah pagi dan 6 rumah petang. Berapa semua rumah?','["12","13","14","15"]','14','8 + 6 = 14! Rajin beraya!',9),
('u1q10','00000000-0000-0000-0000-000000000005','Opah hitung duit untuk bagi kepada cucu-cucu dia.','Opah ada 20 ringgit. Bagi kepada 5 cucu sama rata. Setiap cucu dapat berapa?','["2","3","4","5"]','4','20 ÷ 5 = 4! Adil Opah!',10),
('u1q11','00000000-0000-0000-0000-000000000005','Kak Ros marah sikit sebab Upin Ipin buat bising masa orang tidur.','Ada 15 orang tidur. Upin Ipin kejutkan 6. Berapa yang masih tidur?','["8","9","10","11"]','9','15 - 6 = 9! Sssshh!',11),
('u1q12','00000000-0000-0000-0000-000000000005','Upin Ipin tolong Mak Su susun kerusi untuk tetamu Hari Raya.','Ada 13 kerusi. Dah susun 8. Berapa yang belum disusun?','["4","5","6","7"]','5','13 - 8 = 5! Sikit lagi!',12),
('u1q13','00000000-0000-0000-0000-000000000005','Tetamu datang beramai-ramai ke rumah Opah! Meriah sangat!','Pagi datang 9 tetamu. Petang datang 8 lagi. Berapa semua?','["15","16","17","18"]','17','9 + 8 = 17! Rumah Opah meriah!',13),
('u1q14','00000000-0000-0000-0000-000000000005','Upin Ipin main bunga api bersama kawan-kawan pada malam Hari Raya.','Ada 18 bunga api. Dah bakar 11. Berapa yang tinggal?','["6","7","8","9"]','7','18 - 11 = 7! Cantiknya bunga api!',14),
('u1q15','00000000-0000-0000-0000-000000000005','Opah kira berapa banyak kuih yang tinggal selepas tetamu balik.','Opah buat 20 kuih. Tetamu habis makan 14. Berapa yang tinggal?','["5","6","7","8"]','6','20 - 14 = 6! Sedap kuih Opah!',15),
('u1q16','00000000-0000-0000-0000-000000000005','Mail jual lemang masa Hari Raya! Lemang dia sedap!','Mail masak 9 batang lemang. Jual 5. Berapa yang tinggal?','["3","4","5","6"]','4','9 - 5 = 4! Lemang laris!',16),
('u1q17','00000000-0000-0000-0000-000000000005','Upin Ipin pergi solat raya pagi-pagi bersama kawan-kawan.','Mereka berdua bawa 7 kawan. Jumpa 5 kawan lain di sana. Berapa semua?','["13","14","15","16"]','14','2 + 7 + 5 = 14! Ramai solat raya!',17),
('u1q18','00000000-0000-0000-0000-000000000005','Upin Ipin minta maaf kepada Opah dan Kak Ros pada hari raya.','Mereka minta maaf 4 orang pagi dan 3 orang petang. Berapa semua?','["6","7","8","9"]','7','4 + 3 = 7! Budak baik!',18),
('u1q19','00000000-0000-0000-0000-000000000005','Ehsan beli baju raya paling mahal! Tapi dia kira baki duit.','Ehsan ada 20 ringgit. Baju berharga 13 ringgit. Berapa baki?','["5","6","7","8"]','7','20 - 13 = 7! Kira betul Ehsan!',19),
('u1q20','00000000-0000-0000-0000-000000000005','Semua kawan Upin Ipin kumpul untuk ambil gambar raya bersama!','Ada 6 kawan lelaki dan 8 kawan perempuan. Berapa semua yang bergambar?','["13","14","15","16"]','14','6 + 8 = 14! Gambar cantik!',20),
('u1q21','00000000-0000-0000-0000-000000000005','Upin Ipin simpan duit raya dalam tabung mereka.','Upin simpan 9 ringgit. Ipin simpan 8 ringgit. Berapa semua simpanan?','["15","16","17","18"]','17','9 + 8 = 17! Pandai menabung!',21),
('u1q22','00000000-0000-0000-0000-000000000005','Opah cerita tentang Hari Raya masa dia kecil dulu.','Opah cerita 12 kisah. Upin Ipin dengar 7 kisah. Berapa lagi?','["4","5","6","7"]','5','12 - 7 = 5! Cerita Opah best!',22),
('u1q23','00000000-0000-0000-0000-000000000005','Jarjit buat nasyid raya. Semua orang nyanyi bersama!','Ada 15 orang nyanyi. 6 orang tak tahu lirik. Berapa yang tahu lirik?','["8","9","10","11"]','9','15 - 6 = 9! Nasyid meriah!',23),
('u1q24','00000000-0000-0000-0000-000000000005','Upin Ipin tolong Opah kemas rumah selepas tetamu balik.','Ada 19 perkara nak dikemas. Dah kemas 11. Berapa yang tinggal?','["7","8","9","10"]','8','19 - 11 = 8! Tolong Opah!',24),
('u1q25','00000000-0000-0000-0000-000000000005','Mak Su beli kuih raya dari kedai untuk tambah stok.','Mak Su beli 8 bekas kuih cornflakes dan 9 bekas kuih tart. Berapa semua?','["15","16","17","18"]','17','8 + 9 = 17! Kuih berlambak!',25),
('u1q26','00000000-0000-0000-0000-000000000005','Upin Ipin buat kad raya untuk cikgu-cikgu mereka!','Mereka buat 7 kad untuk cikgu perempuan dan 5 kad untuk cikgu lelaki. Berapa semua?','["11","12","13","14"]','12','7 + 5 = 12! Budak baik!',26),
('u1q27','00000000-0000-0000-0000-000000000005','Semua orang rasa sedih bila Hari Raya nak habis. Tapi kenangan indah!','Hari Raya berlangsung 15 hari. Dah berlalu 9 hari. Berapa lagi?','["5","6","7","8"]','6','15 - 9 = 6! Nikmati lagi!',27),
('u1q28','00000000-0000-0000-0000-000000000005','Upin Ipin kumpul semua duit raya dan kira bersama-sama!','Upin dapat 11 ringgit. Ipin dapat 8 ringgit. Berapa jumlah duit mereka?','["17","18","19","20"]','19','11 + 8 = 19! Banyaknya duit!',28),
('u1q29','00000000-0000-0000-0000-000000000005','Opah doakan Upin Ipin pandai dalam pelajaran lepas Hari Raya.','Upin jawab 13 soalan. Betul 9. Berapa yang salah?','["3","4","5","6"]','4','13 - 9 = 4! Cuba lagi!',29),
('u1q30','00000000-0000-0000-0000-000000000005','Selamat Hari Raya! Upin dan Ipin gembira bersama keluarga!','Keluarga ada 6 orang. Jiran datang 9 orang. Berapa semua yang berkumpul?','["14","15","16","17"]','15','Selamat Hari Raya! Tahniah!',30);

-- ============================================================
-- LEVEL 006: Ejen Ali Operasi Rahsia (7-9 tahun) - 30 soalan darab/bahagi kecil
-- ============================================================
INSERT INTO public.questions (id, level_id, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('e2q01','00000000-0000-0000-0000-000000000006','Ejen Ali dapat misi rahsia! Dia kena pecahkan kod rahsia musuh.','Kod ada 4 baris. Setiap baris ada 6 nombor. Berapa jumlah nombor?','["22","23","24","25"]','24','4 × 6 = 24! Kod berjaya dipecah!',1),
('e2q02','00000000-0000-0000-0000-000000000006','MURI bahagi fail misi kepada semua ejen yang terlibat.','30 fail dibahagi 5 ejen. Setiap ejen dapat berapa fail?','["5","6","7","8"]','6','30 ÷ 5 = 6! Tugas dibahagi adil!',2),
('e2q03','00000000-0000-0000-0000-000000000006','Ejen Dos set up kamera pengawasan di kawasan mencurigakan.','Set 7 kamera di setiap lorong. Ada 4 lorong. Berapa jumlah kamera?','["26","27","28","29"]','28','7 × 4 = 28! Kawasan dipantau!',3),
('e2q04','00000000-0000-0000-0000-000000000006','Ejen Zain bahagi pasukan untuk cover semua kawasan dengan sama rata.','28 ejen dibahagi 4 kawasan. Setiap kawasan ada berapa ejen?','["6","7","8","9"]','7','28 ÷ 4 = 7! Kawasan selamat!',4),
('e2q05','00000000-0000-0000-0000-000000000006','Ali guna MURI untuk hantar mesej rahsia kepada semua ejen.','MURI hantar 5 mesej kepada 8 ejen setiap kali. Berapa mesej semua?','["38","39","40","41"]','40','5 × 8 = 40! Mesej sampai!',5),
('e2q06','00000000-0000-0000-0000-000000000006','Markah misi dikira dan dibahagi kepada semua ahli pasukan.','36 markah untuk 6 orang. Setiap orang dapat berapa?','["5","6","7","8"]','6','36 ÷ 6 = 6! Adil untuk semua!',6),
('e2q07','00000000-0000-0000-0000-000000000006','Ali latihan sebelum misi. Dia buat senaman setiap hari.','Senaman 9 set sehari. Latihan 5 hari. Berapa jumlah set?','["43","44","45","46"]','45','9 × 5 = 45! Kuat macam Ali!',7),
('e2q08','00000000-0000-0000-0000-000000000006','MATA bahagi alat canggih kepada ejen-ejen dalam misi khas.','45 alat untuk 9 ejen. Setiap ejen dapat berapa alat?','["4","5","6","7"]','5','45 ÷ 9 = 5! Senjata cukup!',8),
('e2q09','00000000-0000-0000-0000-000000000006','Ali kesan kereta musuh yang membawa dokumen rahsia.','Setiap kereta ada 6 dokumen. Ali kesan 8 kereta. Berapa jumlah dokumen?','["46","47","48","49"]','48','6 × 8 = 48! Banyak bukti!',9),
('e2q10','00000000-0000-0000-0000-000000000006','MATA bahagi dokumen yang dirampas kepada jabatan berbeza.','48 dokumen untuk 8 jabatan. Setiap jabatan dapat berapa?','["5","6","7","8"]','6','48 ÷ 8 = 6! Dokumen selamat!',10),
('e2q11','00000000-0000-0000-0000-000000000006','Ejen Dos buat laporan tentang bilangan musuh yang ditangkap.','Tangkap 7 musuh setiap hari. Dalam 6 hari. Berapa jumlah musuh?','["40","41","42","43"]','42','7 × 6 = 42! Misi hebat!',11),
('e2q12','00000000-0000-0000-0000-000000000006','Ali bahagi tugas penyiasatan kepada semua ejen junior.','42 tugas untuk 7 ejen junior. Setiap ejen dapat berapa tugas?','["5","6","7","8"]','6','42 ÷ 7 = 6! Pembahagian tepat!',12),
('e2q13','00000000-0000-0000-0000-000000000006','Ibu Ali masak untuk semua ejen yang bekerja keras!','Masak 8 jenis lauk. Setiap lauk untuk 5 orang. Berapa jumlah hidangan?','["38","39","40","41"]','40','8 × 5 = 40! Terima kasih Ibu Ali!',13),
('e2q14','00000000-0000-0000-0000-000000000006','Makanan dibahagi sama rata kepada semua ejen yang lapar.','40 hidangan untuk 8 ejen. Setiap ejen dapat berapa hidangan?','["4","5","6","7"]','5','40 ÷ 8 = 5! Semua kenyang!',14),
('e2q15','00000000-0000-0000-0000-000000000006','Ali susun fail misi mengikut keutamaan dan masa.','Setiap hari siapkan 9 fail. Dalam 4 hari. Berapa jumlah fail?','["34","35","36","37"]','36','9 × 4 = 36! Rajin Ali!',15),
('e2q16','00000000-0000-0000-0000-000000000006','Fail rahsia dibahagi kepada kumpulan untuk disemak bersama.','36 fail untuk 9 kumpulan. Setiap kumpulan dapat berapa?','["3","4","5","6"]','4','36 ÷ 9 = 4! Semak teliti!',16),
('e2q17','00000000-0000-0000-0000-000000000006','Ali latihan karate dengan guru sensei untuk tingkatkan kemahiran.','Latih 8 gerakan dalam setiap sesi. Ada 7 sesi. Berapa jumlah gerakan?','["54","55","56","57"]','56','8 × 7 = 56! Ali semakin kuat!',17),
('e2q18','00000000-0000-0000-0000-000000000006','Ejen dibahagi kepada squad untuk cover kawasan yang lebih luas.','56 ejen dibahagi 8 squad. Setiap squad ada berapa ejen?','["6","7","8","9"]','7','56 ÷ 8 = 7! Squad siap!',18),
('e2q19','00000000-0000-0000-0000-000000000006','MURI kira bilangan mesej rahsia yang berjaya dipintas.','Pintas 6 mesej setiap jam. Dalam 9 jam. Berapa semua?','["52","53","54","55"]','54','6 × 9 = 54! MURI hebat!',19),
('e2q20','00000000-0000-0000-0000-000000000006','Mesej yang dipintas dianalisis dan dibahagi kepada pakar.','54 mesej untuk 9 pakar. Setiap pakar analisis berapa?','["5","6","7","8"]','6','54 ÷ 9 = 6! Analisis sempurna!',20),
('e2q21','00000000-0000-0000-0000-000000000006','Ali dan Dos buat peta kawasan untuk strategi serangan!','Peta terbahagi 5 zon. Setiap zon ada 9 titik penting. Berapa semua?','["43","44","45","46"]','45','5 × 9 = 45! Peta lengkap!',21),
('e2q22','00000000-0000-0000-0000-000000000006','Titik penting dibahagi kepada ejen untuk dipantau sepanjang masa.','45 titik untuk 9 ejen. Setiap ejen pantau berapa titik?','["4","5","6","7"]','5','45 ÷ 9 = 5! Pantau dengan teliti!',22),
('e2q23','00000000-0000-0000-0000-000000000006','Ali dapat maklumat tentang kapal musuh yang akan tiba!','Kapal musuh ada 8 dek. Setiap dek ada 7 tentera. Berapa semua?','["54","55","56","57"]','56','8 × 7 = 56! Ramai musuh!',23),
('e2q24','00000000-0000-0000-0000-000000000006','Ali panggil bala bantuan! Ejen bahagi mengikut kapal musuh.','56 ejen untuk 8 kapal musuh. Setiap kapal diserang berapa ejen?','["6","7","8","9"]','7','56 ÷ 8 = 7! Serangan berjaya!',24),
('e2q25','00000000-0000-0000-0000-000000000006','Misi rahsia hampir selesai! Ali kira markah terakhir.','Ali dapat 9 markah dalam 7 peringkat. Berapa jumlah markah?','["61","62","63","64"]','63','9 × 7 = 63! Markah terbaik!',25),
('e2q26','00000000-0000-0000-0000-000000000006','Markah Ali dibahagi untuk penilaian dalam beberapa kategori.','63 markah dalam 9 kategori. Setiap kategori ada berapa?','["6","7","8","9"]','7','63 ÷ 9 = 7! Gred cemerlang!',26),
('e2q27','00000000-0000-0000-0000-000000000006','MATA bagi anugerah kepada Ali! Semua ejen tepuk tangan!','Setiap ejen tepuk tangan 8 kali. Ada 9 ejen. Berapa jumlah tepukan?','["70","71","72","73"]','72','8 × 9 = 72! Ali dipuji semua!',27),
('e2q28','00000000-0000-0000-0000-000000000006','Hadiah dibahagi kepada semua ejen yang terlibat dalam misi.','72 hadiah untuk 8 ejen. Setiap ejen dapat berapa?','["8","9","10","11"]','9','72 ÷ 8 = 9! Terima kasih MATA!',28),
('e2q29','00000000-0000-0000-0000-000000000006','Ali bersedia untuk misi seterusnya yang lebih mencabar!','Latihan 7 hari × 9 sesi sehari. Berapa jumlah sesi latihan?','["61","62","63","64"]','63','7 × 9 = 63! Ali sedia!',29),
('e2q30','00000000-0000-0000-0000-000000000006','Operasi Rahsia berjaya! Ali adalah ejen terhebat MATA!','63 bintang dibahagi 7 hari misi. Setiap hari dapat berapa bintang?','["8","9","10","11"]','9','Tahniah Ejen Ali!',30);

-- ============================================================
-- LEVEL 007: Upin Ipin Musim Periksa (7-9 tahun) - 30 soalan darab/bahagi
-- ============================================================
INSERT INTO public.questions (id, level_id, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('u2q01','00000000-0000-0000-0000-000000000007','Upin dan Ipin belajar kuat untuk peperiksaan! Mereka kira soalan yang perlu dibuat.','Ada 6 subjek. Setiap subjek ada 8 soalan latihan. Berapa semua soalan?','["46","47","48","49"]','48','6 × 8 = 48! Belajar rajin!',1),
('u2q02','00000000-0000-0000-0000-000000000007','Cikgu Jasmin bahagi kertas latihan kepada semua pelajar.','48 kertas untuk 8 pelajar. Setiap pelajar dapat berapa?','["5","6","7","8"]','6','48 ÷ 8 = 6! Kertas cukup!',2),
('u2q03','00000000-0000-0000-0000-000000000007','Ehsan belajar bersama Upin Ipin. Mereka ulangkaji setiap hari.','Ulangkaji 7 topik sehari. Dalam 9 hari. Berapa jumlah topik?','["61","62","63","64"]','63','7 × 9 = 63! Ulangkaji lengkap!',3),
('u2q04','00000000-0000-0000-0000-000000000007','Fizi bahagi buku teks kepada kumpulan belajar di rumah Opah.','63 muka surat dibahagi 9 sesi. Setiap sesi cover berapa muka surat?','["6","7","8","9"]','7','63 ÷ 9 = 7! Belajar sistematik!',4),
('u2q05','00000000-0000-0000-0000-000000000007','Jarjit buat nota ringkas untuk semua kawan-kawan dia!','Buat 8 nota untuk setiap bab. Ada 7 bab. Berapa jumlah nota?','["54","55","56","57"]','56','8 × 7 = 56! Jarjit pandai!',5),
('u2q06','00000000-0000-0000-0000-000000000007','Nota Jarjit dibahagi kepada semua kawan yang nak belajar.','56 nota untuk 8 kawan. Setiap kawan dapat berapa nota?','["6","7","8","9"]','7','56 ÷ 8 = 7! Terima kasih Jarjit!',6),
('u2q07','00000000-0000-0000-0000-000000000007','Opah doakan Upin Ipin supaya dapat markah cemerlang!','Upin belajar 6 jam sehari. Dalam 9 hari peperiksaan. Berapa jumlah jam?','["52","53","54","55"]','54','6 × 9 = 54! Opah pasti bangga!',7),
('u2q08','00000000-0000-0000-0000-000000000007','Masa belajar dibahagi untuk semua subjek dengan sama rata.','54 jam dibahagi 9 subjek. Setiap subjek dapat berapa jam?','["5","6","7","8"]','6','54 ÷ 9 = 6! Masa cukup untuk semua!',8),
('u2q09','00000000-0000-0000-0000-000000000007','Mei Mei ajak semua buat kumpulan belajar! Lebih seronok belajar sama-sama.','Ada 7 kumpulan. Setiap kumpulan belajar 8 tajuk. Berapa jumlah tajuk?','["54","55","56","57"]','56','7 × 8 = 56! Belajar bersama best!',9),
('u2q10','00000000-0000-0000-0000-000000000007','Cikgu Jasmin bahagi masa mengajar untuk semua pelajar.','56 minit dibahagi 7 kumpulan. Setiap kumpulan dapat berapa minit?','["7","8","9","10"]','8','56 ÷ 7 = 8! Masa sama rata!',10),
('u2q11','00000000-0000-0000-0000-000000000007','Upin Ipin buat latihan soalan peperiksaan tahun lepas!','Selesaikan 9 soalan setiap pagi. Dalam 8 pagi. Berapa jumlah soalan?','["70","71","72","73"]','72','9 × 8 = 72! Latihan banyak!',11),
('u2q12','00000000-0000-0000-0000-000000000007','Soalan latihan dibahagi ikut topik untuk lebih teratur.','72 soalan dibahagi 9 topik. Setiap topik ada berapa soalan?','["7","8","9","10"]','8','72 ÷ 9 = 8! Tersusun!',12),
('u2q13','00000000-0000-0000-0000-000000000007','Kak Ros tolong Upin Ipin semak jawapan mereka setiap malam.','Semak 8 kertas setiap malam. Dalam 7 malam. Berapa jumlah kertas?','["54","55","56","57"]','56','8 × 7 = 56! Terima kasih Kak Ros!',13),
('u2q14','00000000-0000-0000-0000-000000000007','Kertas latihan dibahagi mengikut bilangan soalan yang salah.','56 soalan salah dibahagi 7 pelajar. Setiap pelajar ada berapa salah?','["7","8","9","10"]','8','56 ÷ 7 = 8! Kena betulkan!',14),
('u2q15','00000000-0000-0000-0000-000000000007','Hari peperiksaan tiba! Upin Ipin tenang dan yakin!','Periksa berlangsung 6 hari. Setiap hari ada 7 soalan. Berapa semua?','["40","41","42","43"]','42','6 × 7 = 42! Jawab dengan yakin!',15),
('u2q16','00000000-0000-0000-0000-000000000007','Soalan dibahagi mengikut masa yang diberikan untuk setiap bahagian.','42 minit dibahagi 6 bahagian. Setiap bahagian berapa minit?','["6","7","8","9"]','7','42 ÷ 6 = 7! Urus masa!',16),
('u2q17','00000000-0000-0000-0000-000000000007','Upin Ipin dapat markah tinggi! Cikgu Jasmin senyum bangga!','Upin dapat 9 markah bagi 8 soalan semua betul. Berapa jumlah markah?','["70","71","72","73"]','72','9 × 8 = 72! Cemerlang!',17),
('u2q18','00000000-0000-0000-0000-000000000007','Markah semua pelajar dikira dan dibahagi untuk purata kelas.','72 markah dari 9 pelajar. Purata setiap pelajar berapa?','["7","8","9","10"]','8','72 ÷ 9 = 8! Kelas pandai!',18),
('u2q19','00000000-0000-0000-0000-000000000007','Opah masak makanan istimewa untuk raikan Upin Ipin yang cemerlang!','Masak 9 jenis lauk. Setiap lauk cukup untuk 6 orang. Berapa hidangan semua?','["52","53","54","55"]','54','9 × 6 = 54! Terima kasih Opah!',19),
('u2q20','00000000-0000-0000-0000-000000000007','Hidangan dibahagi sama rata kepada semua yang hadir meraikan.','54 hidangan untuk 9 orang. Setiap orang dapat berapa hidangan?','["5","6","7","8"]','6','54 ÷ 9 = 6! Semua dapat sama!',20),
('u2q21','00000000-0000-0000-0000-000000000007','Fizi dapat hadiah buku sebab naik markah! Dia gembira sangat!','Ada 7 buku dalam pakej hadiah. Dapat 8 pakej. Berapa jumlah buku?','["54","55","56","57"]','56','7 × 8 = 56! Bacaan banyak!',21),
('u2q22','00000000-0000-0000-0000-000000000007','Buku-buku itu dibahagi kepada perpustakaan sekolah sebagai sumbangan.','56 buku untuk 8 rak. Setiap rak ada berapa buku?','["6","7","8","9"]','7','56 ÷ 8 = 7! Perpustakaan penuh!',22),
('u2q23','00000000-0000-0000-0000-000000000007','Ehsan buat poster motivasi untuk kelas! Semua orang bersemangat.','Lukis 9 poster. Setiap poster ambil 7 minit. Berapa jumlah minit?','["61","62","63","64"]','63','9 × 7 = 63! Poster cantik!',23),
('u2q24','00000000-0000-0000-0000-000000000007','Masa melukis poster dibahagi kepada semua pelajar yang terlibat.','63 minit untuk 9 pelajar. Setiap pelajar lukis berapa minit?','["6","7","8","9"]','7','63 ÷ 9 = 7! Masa sama rata!',24),
('u2q25','00000000-0000-0000-0000-000000000007','Upin Ipin buat pelan belajar untuk peperiksaan tahun depan!','6 bulan × 8 jam belajar sebulan. Berapa jumlah jam belajar?','["46","47","48","49"]','48','6 × 8 = 48! Rancangan bagus!',25),
('u2q26','00000000-0000-0000-0000-000000000007','Jam belajar dibahagi kepada semua subjek dengan bijaksana.','48 jam untuk 8 subjek. Setiap subjek dapat berapa jam?','["5","6","7","8"]','6','48 ÷ 8 = 6! Belajar terancang!',26),
('u2q27','00000000-0000-0000-0000-000000000007','Cikgu Jasmin puji Upin Ipin di hadapan seluruh sekolah!','Ada 9 kelas. Setiap kelas ada 8 pelajar beri pujian. Berapa semua pujian?','["70","71","72","73"]','72','9 × 8 = 72! Bangga!',27),
('u2q28','00000000-0000-0000-0000-000000000007','Pujian dikira dan dibahagi sebagai galakan kepada semua pelajar.','72 pujian untuk 8 kelas. Setiap kelas dapat berapa pujian?','["8","9","10","11"]','9','72 ÷ 8 = 9! Motivasi tinggi!',28),
('u2q29','00000000-0000-0000-0000-000000000007','Upin Ipin terima hadiah buku terbaik dari Cikgu Jasmin!','Ada 7 hadiah. Setiap hadiah ada 9 buku. Berapa jumlah buku?','["61","62","63","64"]','63','7 × 9 = 63! Banyaknya buku!',29),
('u2q30','00000000-0000-0000-0000-000000000007','Musim periksa tamat! Upin Ipin jadi juara kelas! Tahniah!','63 bintang dibahagi 7 hari peperiksaan. Setiap hari dapat berapa bintang?','["8","9","10","11"]','9','Tahniah! Juara matematik!',30);

-- ============================================================
-- LEVEL 008: Ejen Ali Misi Mustahil (10-12 tahun) - 30 soalan nombor besar
-- ============================================================
INSERT INTO public.questions (id, level_id, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('e3q01','00000000-0000-0000-0000-000000000008','Ejen Ali dapat misi paling susah! Dia kena pecahkan pangkalan musuh besar.','Pangkalan ada 1250 + 875 tentera. Berapa semua tentera?','["2100","2115","2125","2135"]','2125','1250 + 875 = 2125! Misi diterima!',1),
('e3q02','00000000-0000-0000-0000-000000000008','MATA kerahkan ejen untuk serang pangkalan dari semua arah.','MATA ada 3000 ejen. Serang 1456. Berapa yang tunggu di belakang?','["1540","1544","1548","1554"]','1544','3000 - 1456 = 1544! Strategi tersusun!',2),
('e3q03','00000000-0000-0000-0000-000000000008','Ali kesan kawasan rahsia musuh menggunakan MURI canggih.','MURI scan 2500 meter persegi. Jumpa kawasan 1375 meter. Baki yang belum scan?','["1123","1124","1125","1126"]','1125','2500 - 1375 = 1125! Scan terus!',3),
('e3q04','00000000-0000-0000-0000-000000000008','Ejen Dos koordinasi dengan pasukan dari utara dan selatan.','Pasukan utara ada 1650 orang. Pasukan selatan ada 2340. Berapa semua?','["3988","3989","3990","3991"]','3990','1650 + 2340 = 3990! Pasukan besar!',4),
('e3q05','00000000-0000-0000-0000-000000000008','Ali pecahkan kod dengan cepat! Setiap digit penting.','Kod musuh: 4 peringkat × 125 digit. Berapa jumlah digit?','["498","499","500","501"]','500','4 × 125 = 500! Kod berjaya dipecah!',5),
('e3q06','00000000-0000-0000-0000-000000000008','MATA bahagi pasukan kepada unit khas untuk misi ini.','600 ejen dibahagi 24 unit. Setiap unit ada berapa ejen?','["23","24","25","26"]','25','600 ÷ 24 = 25! Unit sempurna!',6),
('e3q07','00000000-0000-0000-0000-000000000008','Ejen Zain perlu koordinasi pelbagai jabatan dalam masa yang singkat.','Hantar 48 mesej kepada 3250 ejen. Berapa mesej per ejen?','["1","2","3","4"]','"1"','48... kira dahulu berapa untuk setiap kumpulan!',7),
('e3q08','00000000-0000-0000-0000-000000000008','Ali guna gadget untuk lacak pergerakan musuh dari jarak jauh.','Musuh bergerak 1200 meter ke timur dan 850 meter ke utara. Jumlah pergerakan?','["2048","2049","2050","2051"]','2050','1200 + 850 = 2050! Lacak berjaya!',8),
('e3q09','00000000-0000-0000-0000-000000000008','Dokumen rahsia ditemui! Terdapat berbilang folder yang perlu diperiksa.','Ada 15 folder. Setiap folder ada 85 dokumen. Berapa semua dokumen?','["1273","1274","1275","1276"]','1275','15 × 85 = 1275! Banyak bukti!',9),
('e3q10','00000000-0000-0000-0000-000000000008','Dokumen dibahagi kepada jabatan penyiasatan untuk analisis.','1275 dokumen untuk 17 jabatan. Setiap jabatan dapat berapa?','["73","74","75","76"]','75','1275 ÷ 17 = 75! Kerja bermula!',10),
('e3q11','00000000-0000-0000-0000-000000000008','Ali dan Dos rancang serangan akhir pada markas besar musuh!','Markas ada 2 peringkat × 675 bilik. Berapa jumlah bilik?','["1348","1349","1350","1351"]','1350','2 × 675 = 1350! Banyak bilik!',11),
('e3q12','00000000-0000-0000-0000-000000000008','Ejen dibahagi untuk geledah setiap bilik dalam masa yang sama.','1350 bilik untuk 27 pasukan. Setiap pasukan geledah berapa bilik?','["48","49","50","51"]','50','1350 ÷ 27 = 50! Sistematik!',12),
('e3q13','00000000-0000-0000-0000-000000000008','Ali jumpa ketua musuh! Pertarungan terakhir bermula!','Ketua musuh ada 3500 mata kesihatan. Serang dengan 1875. Berapa baki?','["1623","1624","1625","1626"]','1625','3500 - 1875 = 1625! Teruskan!',13),
('e3q14','00000000-0000-0000-0000-000000000008','Ali guna semua kuasanya dalam serangan bertubi-tubi!','Serangan pertama: 1250. Serangan kedua: 1625. Berapa jumlah kerosakan?','["2873","2874","2875","2876"]','2875','1250 + 1625 = 2875! Hampir menang!',14),
('e3q15','00000000-0000-0000-0000-000000000008','Musuh kehabisan kuasa! Ali menghampiri kemenangan!','Baki ketua musuh: 3500 - 2875 = ?','["623","624","625","626"]','625','3500 - 2875 = 625! Hampir!',15),
('e3q16','00000000-0000-0000-0000-000000000008','Ali dapat bantuan dari Dos! Serangan gabungan!','Ali serang 450. Dos serang 325. Berapa jumlah serangan?','["773","774","775","776"]','775','450 + 325 = 775! Musuh jatuh!',16),
('e3q17','00000000-0000-0000-0000-000000000008','Ketua musuh hampir kalah! MATA hantar ejen sokongan.','Ejen sokongan: 18 kumpulan × 75 orang. Berapa jumlah?','["1348","1349","1350","1351"]','1350','18 × 75 = 1350! Bantuan tiba!',17),
('e3q18','00000000-0000-0000-0000-000000000008','Ejen sokongan dibahagi kepada kawasan yang paling kritikal.','1350 ejen untuk 54 kawasan. Setiap kawasan ada berapa ejen?','["23","24","25","26"]','25','1350 ÷ 54 = 25! Semua kawasan dijaga!',18),
('e3q19','00000000-0000-0000-0000-000000000008','Misi hampir berjaya! Hitung jumlah musuh yang ditangkap.','Tangkap 2340 musuh. 875 lebih tangkap kemudian. Berapa semua?','["3213","3214","3215","3216"]','3215','2340 + 875 = 3215! Tangkap semua!',19),
('e3q20','00000000-0000-0000-0000-000000000008','Musuh ditahan dalam beberapa pusat tahanan sementara.','3215 musuh dalam 23 pusat. Setiap pusat ada berapa musuh?','["138","139","140","141"]','140','Kira: 3215 ÷ 23 ≈ 140! Tertahan!',20),
('e3q21','00000000-0000-0000-0000-000000000008','Ali jumpa aset berharga musuh yang disembunyikan!','Nilai aset: RM 4500 + RM 3750. Berapa jumlah nilai?','["8248","8249","8250","8251"]','8250','4500 + 3750 = 8250! Harta ditemui!',21),
('e3q22','00000000-0000-0000-0000-000000000008','Aset dikembalikan kepada pemilik asal yang sebenar.','Nilai aset RM 8250 dikembalikan kepada 25 mangsa. Setiap mangsa dapat berapa?','["328","329","330","331"]','330','8250 ÷ 25 = 330! Keadilan ditegak!',22),
('e3q23','00000000-0000-0000-0000-000000000008','Ali tulis laporan lengkap tentang misi mustahil ini!','Laporan ada 36 bahagian. Setiap bahagian ada 125 patah perkataan. Berapa semua?','["4498","4499","4500","4501"]','4500','36 × 125 = 4500! Laporan lengkap!',23),
('e3q24','00000000-0000-0000-0000-000000000008','Laporan dikongsi dengan semua jabatan keselamatan negara.','4500 salinan untuk 90 jabatan. Setiap jabatan dapat berapa salinan?','["48","49","50","51"]','50','4500 ÷ 90 = 50! Semua diberitahu!',24),
('e3q25','00000000-0000-0000-0000-000000000008','MATA hitung jumlah kredit yang Ali perolehi dalam misi ini!','Ali dapat 1750 kredit dalam misi ini. Kredit sebelum: 2650. Jumlah?','["4398","4399","4400","4401"]','4400','2650 + 1750 = 4400! Rekod baru!',25),
('e3q26','00000000-0000-0000-0000-000000000008','Kredit Ali dibahagi mengikut kategori pencapaian berbeza.','4400 kredit dalam 8 kategori. Setiap kategori berapa kredit?','["548","549","550","551"]','550','4400 ÷ 8 = 550! Pencapaian tinggi!',26),
('e3q27','00000000-0000-0000-0000-000000000008','MATA adakan majlis penghargaan untuk semua ejen yang terlibat!','Hadir 2500 orang. Meja makan ada 125 meja. Setiap meja berapa orang?','["18","19","20","21"]','20','2500 ÷ 125 = 20! Majlis meriah!',27),
('e3q28','00000000-0000-0000-0000-000000000008','Hadiah diberikan kepada ejen-ejen terbaik dalam misi ini.','Hadiah bernilai: 20 × RM 450. Berapa jumlah nilai hadiah?','["8998","8999","9000","9001"]','9000','20 × 450 = 9000! Hadiah besar!',28),
('e3q29','00000000-0000-0000-0000-000000000008','Ali terima anugerah terbaik MATA buat pertama kalinya!','Anugerah pertama dapat 3500 mata. Anugerah kedua dapat 2750 mata. Jumlah?','["6248","6249","6250","6251"]','6250','3500 + 2750 = 6250! Rekod dunia!',29),
('e3q30','00000000-0000-0000-0000-000000000008','Misi Mustahil berjaya! Ejen Ali adalah ejen terhebat sepanjang zaman!','6250 mata dibahagi 25 pencapaian. Setiap pencapaian berapa mata?','["248","249","250","251"]','250','Tahniah! 250 mata! Ali terhebat!',30);

-- ============================================================
-- LEVEL 009: Upin Ipin Juara Sekolah (10-12 tahun) - 30 soalan nombor besar & pecahan
-- ============================================================
INSERT INTO public.questions (id, level_id, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('u3q01','00000000-0000-0000-0000-000000000009','Upin dan Ipin bertanding jadi Juara Sekolah! Mereka kena score tinggi!','Markah Upin: 1250. Markah Ipin: 1375. Jumlah markah kembar?','["2623","2624","2625","2626"]','2625','1250 + 1375 = 2625! Kembar terhebat!',1),
('u3q02','00000000-0000-0000-0000-000000000009','Cikgu Jasmin bahagi soalan kepada semua peserta pertandingan.','2800 soalan untuk 56 peserta. Setiap peserta dapat berapa soalan?','["48","49","50","51"]','50','2800 ÷ 56 = 50! Adil cikgu!',2),
('u3q03','00000000-0000-0000-0000-000000000009','Ehsan bersaing dengan Upin Ipin! Dia belajar lebih kuat dari biasa.','Ehsan belajar 45 jam dalam 9 minggu. Setiap minggu berapa jam?','["4","5","6","7"]','5','45 ÷ 9 = 5! Rajin Ehsan!',3),
('u3q04','00000000-0000-0000-0000-000000000009','Markah semua peserta dikira selepas ujian pertama.','Ada 35 peserta. Jumlah markah 4550. Purata setiap peserta?','["128","129","130","131"]','130','4550 ÷ 35 = 130! Purata tinggi!',4),
('u3q05','00000000-0000-0000-0000-000000000009','Ipin jawab soalan pecahan! Dia ingat apa yang Cikgu Jasmin ajar.','1/2 dari 840 buku ada di perpustakaan. Berapa buku di perpustakaan?','["418","419","420","421"]','420','1/2 × 840 = 420! Pandai Ipin!',5),
('u3q06','00000000-0000-0000-0000-000000000009','Upin jawab soalan nombor besar dengan yakin!','Sekolah ada 1250 pelajar. 3/5 pergi aktiviti. Berapa yang pergi?','["748","749","750","751"]','750','3/5 × 1250 = 750! Betul!',6),
('u3q07','00000000-0000-0000-0000-000000000009','Fizi dapat soalan tentang pengukuran jarak. Dia guna formula.','Padang sekolah 480 meter × 95 meter. Berapa luas padang?','["45598","45599","45600","45601"]','45600','480 × 95 = 45600! Kira tepat!',7),
('u3q08','00000000-0000-0000-0000-000000000009','Jarjit kena bahagi masa untuk semua aktiviti sepanjang hari.','Sehari ada 24 jam. Tidur 8 jam. Baki untuk aktiviti dibahagi 4 slot. Setiap slot berapa jam?','["3","4","5","6"]','4','(24-8) ÷ 4 = 4! Bijak Jarjit!',8),
('u3q09','00000000-0000-0000-0000-000000000009','Upin Ipin kira markah gabungan dari semua ujian mereka.','Ujian 1: 1250. Ujian 2: 1475. Ujian 3: 1325. Jumlah semua?','["4048","4049","4050","4051"]','4050','1250 + 1475 + 1325 = 4050! Markah tinggi!',9),
('u3q10','00000000-0000-0000-0000-000000000009','Purata markah dikira untuk tentukan juara keseluruhan.','Jumlah 4050 dalam 3 ujian. Berapa purata setiap ujian?','["1348","1349","1350","1351"]','1350','4050 ÷ 3 = 1350! Purata cemerlang!',10),
('u3q11','00000000-0000-0000-0000-000000000009','Mei Mei jawab soalan tentang belian di pasar. Dia guna matematik harian.','Beli 24 buku @ RM 4.50 sebuah. Berapa jumlah kos?','["RM 106","RM 107","RM 108","RM 109"]','RM 108','24 × 4.50 = RM108! Betul!',11),
('u3q12','00000000-0000-0000-0000-000000000009','Baki wang dikira selepas membeli semua alatan yang diperlukan.','Ada RM 250. Beli barang RM 108. Berapa baki?','["RM 140","RM 141","RM 142","RM 143"]','RM 142','250 - 108 = RM142! Cermat berbelanja!',12),
('u3q13','00000000-0000-0000-0000-000000000009','Ehsan kena kira bilangan patah perkataan dalam esei dia.','Esei ada 18 perenggan × 45 patah perkataan. Berapa jumlah patah perkataan?','["808","809","810","811"]','810','18 × 45 = 810! Esei panjang!',13),
('u3q14','00000000-0000-0000-0000-000000000009','Patah perkataan dikira dan dinilai berdasarkan kualiti esei.','Esei 810 patah perkataan dinilai 9 aspek. Setiap aspek cover berapa patah perkataan?','["88","89","90","91"]','90','810 ÷ 9 = 90! Esei tersusun!',14),
('u3q15','00000000-0000-0000-0000-000000000009','Upin Ipin maju ke peringkat akhir! Saingan makin sengit!','Peringkat akhir ada 5 peserta. Markah keseluruhan 6500. Purata?','["1298","1299","1300","1301"]','1300','6500 ÷ 5 = 1300! Purata tinggi!',15),
('u3q16','00000000-0000-0000-0000-000000000009','Soalan peringkat akhir lebih susah! Tapi Upin Ipin tidak gentar!','Ada 4/5 dari 2500 soalan yang dijawab betul. Berapa soalan betul?','["1998","1999","2000","2001"]','2000','4/5 × 2500 = 2000! Cemerlang!',16),
('u3q17','00000000-0000-0000-0000-000000000009','Opah berdoa dengan penuh harap untuk kejayaan Upin Ipin!','Opah doa 12 kali × 25 minit setiap kali. Berapa jumlah minit doa?','["298","299","300","301"]','300','12 × 25 = 300! Doa Opah penuh kasih!',17),
('u3q18','00000000-0000-0000-0000-000000000009','Masa doa dikira dalam jam untuk rekod keluarga.','300 minit = berapa jam?','["4","5","6","7"]','5','300 ÷ 60 = 5 jam! Berkat doa Opah!',18),
('u3q19','00000000-0000-0000-0000-000000000009','Keputusan hampir diumumkan! Semua orang tegang!','Upin dapat 1450 markah. Ipin dapat 1375. Jumlah kembar?','["2823","2824","2825","2826"]','2825','1450 + 1375 = 2825! Kembar terbaik!',19),
('u3q20','00000000-0000-0000-0000-000000000009','Markah kembar dibandingkan dengan peserta lain.','Markah kembar: 2825. Markah lawan: 2650. Selisih berapa?','["173","174","175","176"]','175','2825 - 2650 = 175! Kembar menang!',20),
('u3q21','00000000-0000-0000-0000-000000000009','Keputusan diumumkan! Upin dan Ipin MENANG! Semua orang bersorak!','Hadiah pertama bernilai RM 500. 1/4 untuk derma. Berapa untuk derma?','["RM 123","RM 124","RM 125","RM 126"]','RM 125','1/4 × 500 = RM125! Budak dermawan!',21),
('u3q22','00000000-0000-0000-0000-000000000009','Baki hadiah digunakan untuk beli alatan belajar untuk sekolah.','Baki RM 375 dibeli alatan untuk 15 kumpulan. Setiap kumpulan dapat berapa?','["RM 23","RM 24","RM 25","RM 26"]','RM 25','375 ÷ 15 = RM25! Berkongsi!',22),
('u3q23','00000000-0000-0000-0000-000000000009','Kak Ros rakam video kemenangan Upin Ipin untuk kenangan keluarga!','Video 45 minit. Setiap 5 minit ada 1 babak. Berapa jumlah babak?','["7","8","9","10"]','9','45 ÷ 5 = 9! Kenangan indah!',23),
('u3q24','00000000-0000-0000-0000-000000000009','Upin Ipin buat ucapan kemenangan di hadapan seluruh sekolah!','Sekolah ada 1200 pelajar. 3/4 hadir mendengar ucapan. Berapa yang hadir?','["898","899","900","901"]','900','3/4 × 1200 = 900! Ramai hadir!',24),
('u3q25','00000000-0000-0000-0000-000000000009','Majlis kemenangan diadakan di dewan sekolah yang besar!','Dewan ada 85 baris kerusi. Setiap baris ada 32 kerusi. Berapa semua kerusi?','["2718","2719","2720","2721"]','2720','85 × 32 = 2720! Semua boleh duduk!',25),
('u3q26','00000000-0000-0000-0000-000000000009','Kerusi dibahagi kepada beberapa bahagian mengikut kelas.','2720 kerusi untuk 34 kelas. Setiap kelas dapat berapa kerusi?','["78","79","80","81"]','80','2720 ÷ 34 = 80! Semua dapat tempat!',26),
('u3q27','00000000-0000-0000-0000-000000000009','Cikgu Jasmin buat hadiah khas untuk semua peserta yang bertanding!','Ada 56 peserta. Hadiah bernilai RM 28 setiap satu. Berapa jumlah kos?','["1566","1567","1568","1569"]','1568','56 × 28 = RM1568! Murah hati!',27),
('u3q28','00000000-0000-0000-0000-000000000009','Wang hadiah dikira dari dana sekolah yang ada.','Dana sekolah RM 5000. Habis RM 1568. Berapa baki dana?','["3430","3431","3432","3433"]','3432','5000 - 1568 = RM3432! Baki cukup!',28),
('u3q29','00000000-0000-0000-0000-000000000009','Opah masak kenduri besar untuk raikan kejayaan Upin Ipin!','Masak untuk 250 orang. Setiap orang makan 3/4 pinggan nasi. Berapa pinggan nasi semua?','["186","187","188","189"]','188','250 × 3/4 ≈ 188 pinggan! Banyaknya nasi!',29),
('u3q30','00000000-0000-0000-0000-000000000009','Tamat! Upin dan Ipin Juara Sekolah! Tahniah kepada kamu juga!','Jumlah bintang yang dikumpul: 1450 + 1375 + 1250 = ?','["4073","4074","4075","4076"]','4075','Tahniah! 4075 bintang! Kamu Juara!',30);
