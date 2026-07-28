-- ============================================================
-- MisiMinda: Seed 'Kira Menegak' (pengiraan lajur)
-- Dijana oleh scripts/gen_kira.py — JANGAN EDIT MANUAL
-- Jenis soalan baru 'kira' untuk semua peringkat umur
-- ============================================================

INSERT INTO public.levels (id, age_group, theme, level_number, description, quiz_mode, category, icon, subject) VALUES
('40000000-0000-0000-0000-000000000001', '2-5', 'Tambah Mudah', 50, 'Susun & tambah nombor kecil', 'prasekolah', 'kira-menegak', '🧮', 'matematik'),
('40000000-0000-0000-0000-000000000002', '2-5', 'Tambah Hingga 10', 51, 'Tambah nombor sampai 10', 'prasekolah', 'kira-menegak', '🧮', 'matematik'),
('40000000-0000-0000-0000-000000000011', '5-6', 'Tambah Dalam 100', 50, 'Tambah 2 digit tanpa mengumpul', 'latihan', 'kira-menegak', '🧮', 'matematik'),
('40000000-0000-0000-0000-000000000012', '5-6', 'Tambah Dengan Mengumpul', 51, 'Tambah 2 digit — ada mengumpul', 'latihan', 'kira-menegak', '🧮', 'matematik'),
('40000000-0000-0000-0000-000000000013', '5-6', 'Tolak Dalam 100', 52, 'Tolak nombor 2 digit', 'latihan', 'kira-menegak', '🧮', 'matematik'),
('40000000-0000-0000-0000-000000000021', '7-9', 'Tambah 3 Digit', 50, 'Tambah nombor 3 digit', 'latihan', 'kira-menegak', '🧮', 'matematik'),
('40000000-0000-0000-0000-000000000022', '7-9', 'Tolak 3 Digit', 51, 'Tolak nombor 3 digit', 'latihan', 'kira-menegak', '🧮', 'matematik'),
('40000000-0000-0000-0000-000000000023', '7-9', 'Darab Satu Digit', 52, 'Darab 2 digit dengan 1 digit', 'latihan', 'kira-menegak', '🧮', 'matematik'),
('40000000-0000-0000-0000-000000000031', '10-12', 'Tambah Nombor Besar', 50, 'Tambah nombor hingga 4 digit', 'latihan', 'kira-menegak', '🧮', 'matematik'),
('40000000-0000-0000-0000-000000000032', '10-12', 'Tolak Nombor Besar', 51, 'Tolak nombor besar', 'latihan', 'kira-menegak', '🧮', 'matematik'),
('40000000-0000-0000-0000-000000000033', '10-12', 'Darab Nombor', 52, 'Darab 3 digit dengan 1 digit', 'latihan', 'kira-menegak', '🧮', 'matematik');

INSERT INTO public.questions (level_id, question_type, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('40000000-0000-0000-0000-000000000001', 'kira', '', 'Tambah nombor ini', '{"operands": ["3", "2"], "operator": "+"}', '"5"', 'Yeay! Betul! 🌟', 1),
('40000000-0000-0000-0000-000000000001', 'kira', '', 'Tambah nombor ini', '{"operands": ["5", "2"], "operator": "+"}', '"7"', 'Yeay! Betul! 🌟', 2),
('40000000-0000-0000-0000-000000000001', 'kira', '', 'Tambah nombor ini', '{"operands": ["5", "4"], "operator": "+"}', '"9"', 'Yeay! Betul! 🌟', 3),
('40000000-0000-0000-0000-000000000001', 'kira', '', 'Tambah nombor ini', '{"operands": ["3", "4"], "operator": "+"}', '"7"', 'Yeay! Betul! 🌟', 4),
('40000000-0000-0000-0000-000000000001', 'kira', '', 'Tambah nombor ini', '{"operands": ["1", "4"], "operator": "+"}', '"5"', 'Yeay! Betul! 🌟', 5),
('40000000-0000-0000-0000-000000000001', 'kira', '', 'Tambah nombor ini', '{"operands": ["2", "4"], "operator": "+"}', '"6"', 'Yeay! Betul! 🌟', 6),
('40000000-0000-0000-0000-000000000001', 'kira', '', 'Tambah nombor ini', '{"operands": ["3", "1"], "operator": "+"}', '"4"', 'Yeay! Betul! 🌟', 7),
('40000000-0000-0000-0000-000000000001', 'kira', '', 'Tambah nombor ini', '{"operands": ["4", "4"], "operator": "+"}', '"8"', 'Yeay! Betul! 🌟', 8);

INSERT INTO public.questions (level_id, question_type, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('40000000-0000-0000-0000-000000000002', 'kira', '', 'Tambah nombor ini', '{"operands": ["4", "2"], "operator": "+"}', '"6"', 'Hebat! Kamu pandai mengira! 🎉', 1),
('40000000-0000-0000-0000-000000000002', 'kira', '', 'Tambah nombor ini', '{"operands": ["4", "4"], "operator": "+"}', '"8"', 'Hebat! Kamu pandai mengira! 🎉', 2),
('40000000-0000-0000-0000-000000000002', 'kira', '', 'Tambah nombor ini', '{"operands": ["2", "4"], "operator": "+"}', '"6"', 'Hebat! Kamu pandai mengira! 🎉', 3),
('40000000-0000-0000-0000-000000000002', 'kira', '', 'Tambah nombor ini', '{"operands": ["3", "4"], "operator": "+"}', '"7"', 'Hebat! Kamu pandai mengira! 🎉', 4),
('40000000-0000-0000-0000-000000000002', 'kira', '', 'Tambah nombor ini', '{"operands": ["6", "3"], "operator": "+"}', '"9"', 'Hebat! Kamu pandai mengira! 🎉', 5),
('40000000-0000-0000-0000-000000000002', 'kira', '', 'Tambah nombor ini', '{"operands": ["4", "5"], "operator": "+"}', '"9"', 'Hebat! Kamu pandai mengira! 🎉', 6),
('40000000-0000-0000-0000-000000000002', 'kira', '', 'Tambah nombor ini', '{"operands": ["4", "3"], "operator": "+"}', '"7"', 'Hebat! Kamu pandai mengira! 🎉', 7),
('40000000-0000-0000-0000-000000000002', 'kira', '', 'Tambah nombor ini', '{"operands": ["6", "2"], "operator": "+"}', '"8"', 'Hebat! Kamu pandai mengira! 🎉', 8);

INSERT INTO public.questions (level_id, question_type, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('40000000-0000-0000-0000-000000000011', 'kira', '', 'Tambah nombor ini', '{"operands": ["36", "13"], "operator": "+"}', '"49"', 'Betul! Tepat pengiraan kamu!', 1),
('40000000-0000-0000-0000-000000000011', 'kira', '', 'Tambah nombor ini', '{"operands": ["21", "46"], "operator": "+"}', '"67"', 'Betul! Tepat pengiraan kamu!', 2),
('40000000-0000-0000-0000-000000000011', 'kira', '', 'Tambah nombor ini', '{"operands": ["20", "58"], "operator": "+"}', '"78"', 'Betul! Tepat pengiraan kamu!', 3),
('40000000-0000-0000-0000-000000000011', 'kira', '', 'Tambah nombor ini', '{"operands": ["30", "12"], "operator": "+"}', '"42"', 'Betul! Tepat pengiraan kamu!', 4),
('40000000-0000-0000-0000-000000000011', 'kira', '', 'Tambah nombor ini', '{"operands": ["51", "26"], "operator": "+"}', '"77"', 'Betul! Tepat pengiraan kamu!', 5),
('40000000-0000-0000-0000-000000000011', 'kira', '', 'Tambah nombor ini', '{"operands": ["11", "62"], "operator": "+"}', '"73"', 'Betul! Tepat pengiraan kamu!', 6),
('40000000-0000-0000-0000-000000000011', 'kira', '', 'Tambah nombor ini', '{"operands": ["40", "32"], "operator": "+"}', '"72"', 'Betul! Tepat pengiraan kamu!', 7),
('40000000-0000-0000-0000-000000000011', 'kira', '', 'Tambah nombor ini', '{"operands": ["82", "17"], "operator": "+"}', '"99"', 'Betul! Tepat pengiraan kamu!', 8),
('40000000-0000-0000-0000-000000000011', 'kira', '', 'Tambah nombor ini', '{"operands": ["41", "50"], "operator": "+"}', '"91"', 'Betul! Tepat pengiraan kamu!', 9),
('40000000-0000-0000-0000-000000000011', 'kira', '', 'Tambah nombor ini', '{"operands": ["42", "47"], "operator": "+"}', '"89"', 'Betul! Tepat pengiraan kamu!', 10);

INSERT INTO public.questions (level_id, question_type, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('40000000-0000-0000-0000-000000000012', 'kira', '', 'Tambah nombor ini', '{"operands": ["15", "55"], "operator": "+"}', '"70"', 'Betul! Tepat pengiraan kamu!', 1),
('40000000-0000-0000-0000-000000000012', 'kira', '', 'Tambah nombor ini', '{"operands": ["77", "17"], "operator": "+"}', '"94"', 'Betul! Tepat pengiraan kamu!', 2),
('40000000-0000-0000-0000-000000000012', 'kira', '', 'Tambah nombor ini', '{"operands": ["66", "28"], "operator": "+"}', '"94"', 'Betul! Tepat pengiraan kamu!', 3),
('40000000-0000-0000-0000-000000000012', 'kira', '', 'Tambah nombor ini', '{"operands": ["29", "53"], "operator": "+"}', '"82"', 'Betul! Tepat pengiraan kamu!', 4),
('40000000-0000-0000-0000-000000000012', 'kira', '', 'Tambah nombor ini', '{"operands": ["68", "18"], "operator": "+"}', '"86"', 'Betul! Tepat pengiraan kamu!', 5),
('40000000-0000-0000-0000-000000000012', 'kira', '', 'Tambah nombor ini', '{"operands": ["34", "28"], "operator": "+"}', '"62"', 'Betul! Tepat pengiraan kamu!', 6),
('40000000-0000-0000-0000-000000000012', 'kira', '', 'Tambah nombor ini', '{"operands": ["19", "15"], "operator": "+"}', '"34"', 'Betul! Tepat pengiraan kamu!', 7),
('40000000-0000-0000-0000-000000000012', 'kira', '', 'Tambah nombor ini', '{"operands": ["69", "25"], "operator": "+"}', '"94"', 'Betul! Tepat pengiraan kamu!', 8),
('40000000-0000-0000-0000-000000000012', 'kira', '', 'Tambah nombor ini', '{"operands": ["66", "15"], "operator": "+"}', '"81"', 'Betul! Tepat pengiraan kamu!', 9),
('40000000-0000-0000-0000-000000000012', 'kira', '', 'Tambah nombor ini', '{"operands": ["15", "26"], "operator": "+"}', '"41"', 'Betul! Tepat pengiraan kamu!', 10);

INSERT INTO public.questions (level_id, question_type, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('40000000-0000-0000-0000-000000000013', 'kira', '', 'Tolak nombor ini', '{"operands": ["83", "49"], "operator": "−"}', '"34"', 'Betul! Pandai menolak!', 1),
('40000000-0000-0000-0000-000000000013', 'kira', '', 'Tolak nombor ini', '{"operands": ["45", "19"], "operator": "−"}', '"26"', 'Betul! Pandai menolak!', 2),
('40000000-0000-0000-0000-000000000013', 'kira', '', 'Tolak nombor ini', '{"operands": ["74", "46"], "operator": "−"}', '"28"', 'Betul! Pandai menolak!', 3),
('40000000-0000-0000-0000-000000000013', 'kira', '', 'Tolak nombor ini', '{"operands": ["93", "42"], "operator": "−"}', '"51"', 'Betul! Pandai menolak!', 4),
('40000000-0000-0000-0000-000000000013', 'kira', '', 'Tolak nombor ini', '{"operands": ["68", "10"], "operator": "−"}', '"58"', 'Betul! Pandai menolak!', 5),
('40000000-0000-0000-0000-000000000013', 'kira', '', 'Tolak nombor ini', '{"operands": ["93", "38"], "operator": "−"}', '"55"', 'Betul! Pandai menolak!', 6),
('40000000-0000-0000-0000-000000000013', 'kira', '', 'Tolak nombor ini', '{"operands": ["66", "13"], "operator": "−"}', '"53"', 'Betul! Pandai menolak!', 7),
('40000000-0000-0000-0000-000000000013', 'kira', '', 'Tolak nombor ini', '{"operands": ["57", "41"], "operator": "−"}', '"16"', 'Betul! Pandai menolak!', 8),
('40000000-0000-0000-0000-000000000013', 'kira', '', 'Tolak nombor ini', '{"operands": ["58", "52"], "operator": "−"}', '"6"', 'Betul! Pandai menolak!', 9),
('40000000-0000-0000-0000-000000000013', 'kira', '', 'Tolak nombor ini', '{"operands": ["66", "21"], "operator": "−"}', '"45"', 'Betul! Pandai menolak!', 10);

INSERT INTO public.questions (level_id, question_type, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('40000000-0000-0000-0000-000000000021', 'kira', '', 'Tambah nombor ini', '{"operands": ["621", "676"], "operator": "+"}', '"1297"', 'Betul! Tepat pengiraan kamu!', 1),
('40000000-0000-0000-0000-000000000021', 'kira', '', 'Tambah nombor ini', '{"operands": ["755", "665"], "operator": "+"}', '"1420"', 'Betul! Tepat pengiraan kamu!', 2),
('40000000-0000-0000-0000-000000000021', 'kira', '', 'Tambah nombor ini', '{"operands": ["162", "421"], "operator": "+"}', '"583"', 'Betul! Tepat pengiraan kamu!', 3),
('40000000-0000-0000-0000-000000000021', 'kira', '', 'Tambah nombor ini', '{"operands": ["767", "439"], "operator": "+"}', '"1206"', 'Betul! Tepat pengiraan kamu!', 4),
('40000000-0000-0000-0000-000000000021', 'kira', '', 'Tambah nombor ini', '{"operands": ["455", "428"], "operator": "+"}', '"883"', 'Betul! Tepat pengiraan kamu!', 5),
('40000000-0000-0000-0000-000000000021', 'kira', '', 'Tambah nombor ini', '{"operands": ["705", "310"], "operator": "+"}', '"1015"', 'Betul! Tepat pengiraan kamu!', 6),
('40000000-0000-0000-0000-000000000021', 'kira', '', 'Tambah nombor ini', '{"operands": ["507", "518"], "operator": "+"}', '"1025"', 'Betul! Tepat pengiraan kamu!', 7),
('40000000-0000-0000-0000-000000000021', 'kira', '', 'Tambah nombor ini', '{"operands": ["785", "328"], "operator": "+"}', '"1113"', 'Betul! Tepat pengiraan kamu!', 8),
('40000000-0000-0000-0000-000000000021', 'kira', '', 'Tambah nombor ini', '{"operands": ["439", "252"], "operator": "+"}', '"691"', 'Betul! Tepat pengiraan kamu!', 9),
('40000000-0000-0000-0000-000000000021', 'kira', '', 'Tambah nombor ini', '{"operands": ["200", "308"], "operator": "+"}', '"508"', 'Betul! Tepat pengiraan kamu!', 10);

INSERT INTO public.questions (level_id, question_type, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('40000000-0000-0000-0000-000000000022', 'kira', '', 'Tolak nombor ini', '{"operands": ["850", "431"], "operator": "−"}', '"419"', 'Betul! Pandai menolak!', 1),
('40000000-0000-0000-0000-000000000022', 'kira', '', 'Tolak nombor ini', '{"operands": ["564", "290"], "operator": "−"}', '"274"', 'Betul! Pandai menolak!', 2),
('40000000-0000-0000-0000-000000000022', 'kira', '', 'Tolak nombor ini', '{"operands": ["791", "461"], "operator": "−"}', '"330"', 'Betul! Pandai menolak!', 3),
('40000000-0000-0000-0000-000000000022', 'kira', '', 'Tolak nombor ini', '{"operands": ["588", "426"], "operator": "−"}', '"162"', 'Betul! Pandai menolak!', 4),
('40000000-0000-0000-0000-000000000022', 'kira', '', 'Tolak nombor ini', '{"operands": ["560", "164"], "operator": "−"}', '"396"', 'Betul! Pandai menolak!', 5),
('40000000-0000-0000-0000-000000000022', 'kira', '', 'Tolak nombor ini', '{"operands": ["978", "449"], "operator": "−"}', '"529"', 'Betul! Pandai menolak!', 6),
('40000000-0000-0000-0000-000000000022', 'kira', '', 'Tolak nombor ini', '{"operands": ["907", "262"], "operator": "−"}', '"645"', 'Betul! Pandai menolak!', 7),
('40000000-0000-0000-0000-000000000022', 'kira', '', 'Tolak nombor ini', '{"operands": ["810", "287"], "operator": "−"}', '"523"', 'Betul! Pandai menolak!', 8),
('40000000-0000-0000-0000-000000000022', 'kira', '', 'Tolak nombor ini', '{"operands": ["676", "557"], "operator": "−"}', '"119"', 'Betul! Pandai menolak!', 9),
('40000000-0000-0000-0000-000000000022', 'kira', '', 'Tolak nombor ini', '{"operands": ["750", "667"], "operator": "−"}', '"83"', 'Betul! Pandai menolak!', 10);

INSERT INTO public.questions (level_id, question_type, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('40000000-0000-0000-0000-000000000023', 'kira', '', 'Darab nombor ini', '{"operands": ["28", "3"], "operator": "×"}', '"84"', 'Hebat! Betul hasil darab!', 1),
('40000000-0000-0000-0000-000000000023', 'kira', '', 'Darab nombor ini', '{"operands": ["30", "7"], "operator": "×"}', '"210"', 'Hebat! Betul hasil darab!', 2),
('40000000-0000-0000-0000-000000000023', 'kira', '', 'Darab nombor ini', '{"operands": ["21", "8"], "operator": "×"}', '"168"', 'Hebat! Betul hasil darab!', 3),
('40000000-0000-0000-0000-000000000023', 'kira', '', 'Darab nombor ini', '{"operands": ["27", "4"], "operator": "×"}', '"108"', 'Hebat! Betul hasil darab!', 4),
('40000000-0000-0000-0000-000000000023', 'kira', '', 'Darab nombor ini', '{"operands": ["16", "6"], "operator": "×"}', '"96"', 'Hebat! Betul hasil darab!', 5),
('40000000-0000-0000-0000-000000000023', 'kira', '', 'Darab nombor ini', '{"operands": ["27", "7"], "operator": "×"}', '"189"', 'Hebat! Betul hasil darab!', 6),
('40000000-0000-0000-0000-000000000023', 'kira', '', 'Darab nombor ini', '{"operands": ["32", "3"], "operator": "×"}', '"96"', 'Hebat! Betul hasil darab!', 7),
('40000000-0000-0000-0000-000000000023', 'kira', '', 'Darab nombor ini', '{"operands": ["34", "2"], "operator": "×"}', '"68"', 'Hebat! Betul hasil darab!', 8),
('40000000-0000-0000-0000-000000000023', 'kira', '', 'Darab nombor ini', '{"operands": ["13", "3"], "operator": "×"}', '"39"', 'Hebat! Betul hasil darab!', 9),
('40000000-0000-0000-0000-000000000023', 'kira', '', 'Darab nombor ini', '{"operands": ["28", "7"], "operator": "×"}', '"196"', 'Hebat! Betul hasil darab!', 10);

INSERT INTO public.questions (level_id, question_type, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('40000000-0000-0000-0000-000000000031', 'kira', '', 'Tambah nombor ini', '{"operands": ["2251", "2596"], "operator": "+"}', '"4847"', 'Betul! Tepat pengiraan kamu!', 1),
('40000000-0000-0000-0000-000000000031', 'kira', '', 'Tambah nombor ini', '{"operands": ["7802", "3691"], "operator": "+"}', '"11493"', 'Betul! Tepat pengiraan kamu!', 2),
('40000000-0000-0000-0000-000000000031', 'kira', '', 'Tambah nombor ini', '{"operands": ["4835", "3165"], "operator": "+"}', '"8000"', 'Betul! Tepat pengiraan kamu!', 3),
('40000000-0000-0000-0000-000000000031', 'kira', '', 'Tambah nombor ini', '{"operands": ["4774", "4997"], "operator": "+"}', '"9771"', 'Betul! Tepat pengiraan kamu!', 4),
('40000000-0000-0000-0000-000000000031', 'kira', '', 'Tambah nombor ini', '{"operands": ["5935", "620"], "operator": "+"}', '"6555"', 'Betul! Tepat pengiraan kamu!', 5),
('40000000-0000-0000-0000-000000000031', 'kira', '', 'Tambah nombor ini', '{"operands": ["6544", "1999"], "operator": "+"}', '"8543"', 'Betul! Tepat pengiraan kamu!', 6),
('40000000-0000-0000-0000-000000000031', 'kira', '', 'Tambah nombor ini', '{"operands": ["8943", "4081"], "operator": "+"}', '"13024"', 'Betul! Tepat pengiraan kamu!', 7),
('40000000-0000-0000-0000-000000000031', 'kira', '', 'Tambah nombor ini', '{"operands": ["7491", "4077"], "operator": "+"}', '"11568"', 'Betul! Tepat pengiraan kamu!', 8),
('40000000-0000-0000-0000-000000000031', 'kira', '', 'Tambah nombor ini', '{"operands": ["2766", "2628"], "operator": "+"}', '"5394"', 'Betul! Tepat pengiraan kamu!', 9),
('40000000-0000-0000-0000-000000000031', 'kira', '', 'Tambah nombor ini', '{"operands": ["1744", "4251"], "operator": "+"}', '"5995"', 'Betul! Tepat pengiraan kamu!', 10);

INSERT INTO public.questions (level_id, question_type, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('40000000-0000-0000-0000-000000000032', 'kira', '', 'Tolak nombor ini', '{"operands": ["7956", "4599"], "operator": "−"}', '"3357"', 'Betul! Pandai menolak!', 1),
('40000000-0000-0000-0000-000000000032', 'kira', '', 'Tolak nombor ini', '{"operands": ["6058", "3402"], "operator": "−"}', '"2656"', 'Betul! Pandai menolak!', 2),
('40000000-0000-0000-0000-000000000032', 'kira', '', 'Tolak nombor ini', '{"operands": ["7841", "1891"], "operator": "−"}', '"5950"', 'Betul! Pandai menolak!', 3),
('40000000-0000-0000-0000-000000000032', 'kira', '', 'Tolak nombor ini', '{"operands": ["4116", "1239"], "operator": "−"}', '"2877"', 'Betul! Pandai menolak!', 4),
('40000000-0000-0000-0000-000000000032', 'kira', '', 'Tolak nombor ini', '{"operands": ["7212", "4103"], "operator": "−"}', '"3109"', 'Betul! Pandai menolak!', 5),
('40000000-0000-0000-0000-000000000032', 'kira', '', 'Tolak nombor ini', '{"operands": ["8834", "1351"], "operator": "−"}', '"7483"', 'Betul! Pandai menolak!', 6),
('40000000-0000-0000-0000-000000000032', 'kira', '', 'Tolak nombor ini', '{"operands": ["8967", "3746"], "operator": "−"}', '"5221"', 'Betul! Pandai menolak!', 7),
('40000000-0000-0000-0000-000000000032', 'kira', '', 'Tolak nombor ini', '{"operands": ["8795", "4203"], "operator": "−"}', '"4592"', 'Betul! Pandai menolak!', 8),
('40000000-0000-0000-0000-000000000032', 'kira', '', 'Tolak nombor ini', '{"operands": ["9846", "2947"], "operator": "−"}', '"6899"', 'Betul! Pandai menolak!', 9),
('40000000-0000-0000-0000-000000000032', 'kira', '', 'Tolak nombor ini', '{"operands": ["5641", "3729"], "operator": "−"}', '"1912"', 'Betul! Pandai menolak!', 10);

INSERT INTO public.questions (level_id, question_type, story_text, question_text, options, correct_answer, success_message, order_index) VALUES
('40000000-0000-0000-0000-000000000033', 'kira', '', 'Darab nombor ini', '{"operands": ["336", "9"], "operator": "×"}', '"3024"', 'Hebat! Betul hasil darab!', 1),
('40000000-0000-0000-0000-000000000033', 'kira', '', 'Darab nombor ini', '{"operands": ["116", "8"], "operator": "×"}', '"928"', 'Hebat! Betul hasil darab!', 2),
('40000000-0000-0000-0000-000000000033', 'kira', '', 'Darab nombor ini', '{"operands": ["164", "6"], "operator": "×"}', '"984"', 'Hebat! Betul hasil darab!', 3),
('40000000-0000-0000-0000-000000000033', 'kira', '', 'Darab nombor ini', '{"operands": ["231", "3"], "operator": "×"}', '"693"', 'Hebat! Betul hasil darab!', 4),
('40000000-0000-0000-0000-000000000033', 'kira', '', 'Darab nombor ini', '{"operands": ["413", "8"], "operator": "×"}', '"3304"', 'Hebat! Betul hasil darab!', 5),
('40000000-0000-0000-0000-000000000033', 'kira', '', 'Darab nombor ini', '{"operands": ["255", "3"], "operator": "×"}', '"765"', 'Hebat! Betul hasil darab!', 6),
('40000000-0000-0000-0000-000000000033', 'kira', '', 'Darab nombor ini', '{"operands": ["415", "6"], "operator": "×"}', '"2490"', 'Hebat! Betul hasil darab!', 7),
('40000000-0000-0000-0000-000000000033', 'kira', '', 'Darab nombor ini', '{"operands": ["418", "7"], "operator": "×"}', '"2926"', 'Hebat! Betul hasil darab!', 8),
('40000000-0000-0000-0000-000000000033', 'kira', '', 'Darab nombor ini', '{"operands": ["308", "9"], "operator": "×"}', '"2772"', 'Hebat! Betul hasil darab!', 9),
('40000000-0000-0000-0000-000000000033', 'kira', '', 'Darab nombor ini', '{"operands": ["321", "4"], "operator": "×"}', '"1284"', 'Hebat! Betul hasil darab!', 10);
