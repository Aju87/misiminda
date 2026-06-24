import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// One-time seed endpoint — protected by SEED_SECRET env var
// Usage: POST /api/seed  with header  x-seed-secret: <SEED_SECRET>
export async function POST(req: Request) {
  const secret = req.headers.get("x-seed-secret");
  if (!secret || secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: "Tidak dibenarkan." }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""
  );

  // Levels
  const levels = [
    {
      id: "00000000-0000-0000-0000-000000000001",
      age_group: "5-6",
      theme: "Misi Kedai Kek Cef Cilik",
      level_number: 1,
      description: "Bantu Cef cilik menyediakan kek istimewa sambil belajar nombor!",
    },
    {
      id: "00000000-0000-0000-0000-000000000002",
      age_group: "7-9",
      theme: "Pasukan Penyelamat Haiwan Hutan",
      level_number: 1,
      description: "Selamatkan haiwan hutan dengan menjawab soalan matematik!",
    },
    {
      id: "00000000-0000-0000-0000-000000000003",
      age_group: "10-12",
      theme: "Detektif Bandaraya Futuristik",
      level_number: 1,
      description: "Jadi detektif dan selesaikan misteri dengan matematik lanjutan!",
    },
  ];

  const { error: lvlErr } = await supabase
    .from("levels")
    .upsert(levels, { onConflict: "id" });

  if (lvlErr) {
    return NextResponse.json({ error: "Level seed gagal.", detail: lvlErr.message }, { status: 500 });
  }

  // Questions
  type Q = { level_id: string; story_text: string; question_text: string; options: unknown[]; correct_answer: unknown; success_message: string; order_index: number };

  const questions: Q[] = [
    // Level 1 — Umur 5-6
    { level_id: "00000000-0000-0000-0000-000000000001", story_text: "Cef perlukan bahan-bahan untuk membuat kek yang lazat! 🎂", question_text: "Cef perlukan 5 biji strawberi. Bakul mana ada 5 biji?", options: [3,4,5,6], correct_answer: 5, success_message: "Bagus! Kau tahu mengira strawberi!", order_index: 1 },
    { level_id: "00000000-0000-0000-0000-000000000001", story_text: "Masa untuk campurkan bahan! Kita perlu banyak telur. 🥚", question_text: "Kita ada 2 biji telur. Cef tambah 2 lagi. Berapa semuanya?", options: [2,3,4,5], correct_answer: 4, success_message: "Pandai! 2 + 2 = 4 telur!", order_index: 2 },
    { level_id: "00000000-0000-0000-0000-000000000001", story_text: "Tepung adalah bahan penting untuk kek yang gebu! 🌾", question_text: "Tepung perlu diukur. Pilih nombor 8 pada penimbang.", options: [6,7,8,9], correct_answer: 8, success_message: "Betul! Nombor 8 dipilih!", order_index: 3 },
    { level_id: "00000000-0000-0000-0000-000000000001", story_text: "Oh tidak! Susu tumpah semasa Cef tidak perasan! 🥛", question_text: "Cef ada 5 cawan susu, tumpah 1 cawan. Tinggal berapa?", options: [3,4,5,6], correct_answer: 4, success_message: "Betul! 5 - 1 = 4 cawan susu!", order_index: 4 },
    { level_id: "00000000-0000-0000-0000-000000000001", story_text: "Kek sudah keluar dari oven! Cantiknya bentuk kek ini. 🍰", question_text: "Kek ini berbentuk bulat. Klik pada bentuk bulat.", options: ["Segi Tiga","Bulat","Petak","Bintang"], correct_answer: "Bulat", success_message: "Tepat sekali! Kek itu berbentuk bulat!", order_index: 5 },
    { level_id: "00000000-0000-0000-0000-000000000001", story_text: "Masa untuk hiaskan kek dengan coklat yang sedap! 🍫", question_text: "Cef perlu 10 biji coklat. Dia baru letak 9. Berapa lagi perlu ditambah?", options: [1,2,3,4], correct_answer: 1, success_message: "Betul! Tinggal 1 lagi untuk lengkapkan!", order_index: 6 },
    { level_id: "00000000-0000-0000-0000-000000000001", story_text: "Wah, kek ulang tahun ada lilin-lilin yang cantik! 🕯️", question_text: "Ada 4 lilin di atas meja. Susun mengikut urutan 1, 2, 3, ...?", options: [4,5,6,7], correct_answer: 4, success_message: "Betul! 4 datang selepas 3!", order_index: 7 },
    { level_id: "00000000-0000-0000-0000-000000000001", story_text: "Tiba masanya untuk bahagikan kek kepada sahabat-sahabat! 🍰", question_text: "Potong kek kepada 2 bahagian. Pilih gambar separuh.", options: ["Penuh","Separuh","Tiga","Empat"], correct_answer: "Separuh", success_message: "Bagus! Separuh bermakna 2 bahagian sama besar!", order_index: 8 },
    { level_id: "00000000-0000-0000-0000-000000000001", story_text: "Cef mula masak pagi-pagi lagi! Tengok jam berapa sekarang. ⏰", question_text: "Cef mula masak pukul 2, siap pukul 3. Cari nombor 3 pada jam.", options: [1,2,3,4], correct_answer: 3, success_message: "Betul! Pukul 3 — kek pun siap!", order_index: 9 },
    { level_id: "00000000-0000-0000-0000-000000000001", story_text: "Kek ulang tahun sudah siap! Cantiknya dengan lilin-lilin di atasnya! 🎂🎉", question_text: "Kek sudah siap! Kira semua 10 lilin di atas kek ini.", options: [8,9,10,11], correct_answer: 10, success_message: "Tahniah! Kau berjaya kira 10 lilin! Misi selesai!", order_index: 10 },
    // Level 2 — Umur 7-9
    { level_id: "00000000-0000-0000-0000-000000000002", story_text: "Monyet kecil memerlukan bantuan! Dia ada banyak pisang untuk dikongsi. 🐒", question_text: "Monyet kumpul 15 biji pisang, beri 5 pada gajah. Baki pisang?", options: [5,10,15,20], correct_answer: 10, success_message: "Betul! 15 - 5 = 10 pisang!", order_index: 1 },
    { level_id: "00000000-0000-0000-0000-000000000002", story_text: "Kumpulan penyelamat sedang berjalan ke sungai untuk menyelamatkan kura-kura! 🐢", question_text: "Jarak ke sungai ialah 20 meter. Kita sudah jalan 12 meter. Berapa meter lagi?", options: [6,7,8,9], correct_answer: 8, success_message: "Pandai! 20 - 12 = 8 meter lagi!", order_index: 2 },
    { level_id: "00000000-0000-0000-0000-000000000002", story_text: "Wah! Banyaknya semut sedang berpindah ke sarang baru. 🐜", question_text: "Ada 4 kumpulan semut. Setiap kumpulan ada 5 ekor. Jumlah semut?", options: [15,20,25,30], correct_answer: 20, success_message: "Hebat! 4 x 5 = 20 ekor semut!", order_index: 3 },
    { level_id: "00000000-0000-0000-0000-000000000002", story_text: "Gajah sakit dan perlukan ubat segera! Kita perlu beli ubat di kedai. 🐘", question_text: "Ubat nyamuk gajah berharga RM15. Awak bayar RM20. Baki?", options: ["RM2","RM5","RM10","RM15"], correct_answer: "RM5", success_message: "Betul! RM20 - RM15 = RM5 baki!", order_index: 4 },
    { level_id: "00000000-0000-0000-0000-000000000002", story_text: "Rusa terperangkap dalam sangkar! Kita perlu cari nombor yang betul untuk buka kunci. 🦌", question_text: "Kunci sangkar perlukan nombor genap selepas 12.", options: [13,14,15,16], correct_answer: 14, success_message: "Betul! 14 adalah nombor genap selepas 12!", order_index: 5 },
    { level_id: "00000000-0000-0000-0000-000000000002", story_text: "Burung helang terbang tinggi mencari anaknya yang hilang! 🦅", question_text: "Burung terbang setinggi 45 meter. Ia turun 20 meter. Ketinggian sekarang?", options: [15,20,25,30], correct_answer: 25, success_message: "Betul! 45 - 20 = 25 meter!", order_index: 6 },
    { level_id: "00000000-0000-0000-0000-000000000002", story_text: "Anak gajah yang comel perlu minum banyak air setiap hari! 🐘💧", question_text: "Anak gajah minum 2 liter air sehari. Untuk 3 hari, berapa liter?", options: [4,5,6,7], correct_answer: 6, success_message: "Pandai! 2 x 3 = 6 liter air!", order_index: 7 },
    { level_id: "00000000-0000-0000-0000-000000000002", story_text: "Sudah hampir waktu makan untuk gajah! Jangan lambat! ⏰", question_text: "Jam tunjuk pukul 4:00 petang. Gajah makan sejam kemudian. Pukul berapa?", options: ["3:00","4:30","5:00","6:00"], correct_answer: "5:00", success_message: "Betul! 4:00 + 1 jam = 5:00 petang!", order_index: 8 },
    { level_id: "00000000-0000-0000-0000-000000000002", story_text: "Burung kecil memerlukan rumah baru yang selamat! 🐦🏠", question_text: "Bentuk rumah burung ada 3 sisi yang sama. Apakah bentuk itu?", options: ["Segi Empat","Bulat","Segi Tiga","Bujur"], correct_answer: "Segi Tiga", success_message: "Tepat! Segi tiga ada 3 sisi!", order_index: 9 },
    { level_id: "00000000-0000-0000-0000-000000000002", story_text: "Misi hampir selesai! Tapi ada satu lagi kotak kecemasan yang perlu dibuka! 🔐", question_text: "Kotak kecemasan ada kod rahsia: 10, 20, 30, ...?", options: [40,50,60,70], correct_answer: 40, success_message: "Tahniah! 40 — pola tambah 10! Semua haiwan selamat!", order_index: 10 },
    // Level 3 — Umur 10-12
    { level_id: "00000000-0000-0000-0000-000000000003", story_text: "Alat pengesan canggih awak hampir kehabisan bateri semasa misi penting! 🔋", question_text: "Bateri alat pengesan tinggal 25%. Apakah ia dalam bentuk pecahan termudah?", options: ["1/2","1/3","1/4","1/5"], correct_answer: "1/4", success_message: "Betul! 25% = 25/100 = 1/4!", order_index: 1 },
    { level_id: "00000000-0000-0000-0000-000000000003", story_text: "Kereta terbang mengejar suspek di atas bandaraya futuristik! 🚗✈️", question_text: "Kereta terbang bergerak sejauh 120.5 km. Bundarkan ke nombor bulat terdekat.", options: [120,121,122,125], correct_answer: 121, success_message: "Pandai! 120.5 dibundarkan ke atas menjadi 121!", order_index: 2 },
    { level_id: "00000000-0000-0000-0000-000000000003", story_text: "Detektif perlu masuk ke bilik kebal untuk cari bukti penting! 🔒", question_text: "Luas bilik kebal ialah 48 meter persegi. Jika panjangnya 8m, berapakah lebar?", options: ["5m","6m","7m","8m"], correct_answer: "6m", success_message: "Betul! 48 / 8 = 6 meter!", order_index: 3 },
    { level_id: "00000000-0000-0000-0000-000000000003", story_text: "Pencuri telah mencuri wang dari bank digital bandaraya! 💰", question_text: "Pencuri tinggalkan 30% daripada RM500 wang curian. Berapa nilai yang ditinggalkan?", options: ["RM100","RM150","RM200","RM250"], correct_answer: "RM150", success_message: "Betul! 30% x RM500 = RM150!", order_index: 4 },
    { level_id: "00000000-0000-0000-0000-000000000003", story_text: "Sistem keselamatan bangunan menggunakan laser yang sangat tepat! ⚡", question_text: "Sudut pancaran laser keselamatan ialah sudut tegak. Berapakah nilainya?", options: ["45 darjah","90 darjah","180 darjah","360 darjah"], correct_answer: "90 darjah", success_message: "Betul! Sudut tegak = 90 darjah!", order_index: 5 },
    { level_id: "00000000-0000-0000-0000-000000000003", story_text: "Robot polis sedang berkawal di seluruh bandaraya futuristik! 🤖", question_text: "Jisim robot polis ialah 4.5 kg. Berapakah jisimnya dalam gram?", options: ["45g","450g","4500g","45000g"], correct_answer: "4500g", success_message: "Betul! 4.5 kg = 4500 gram!", order_index: 6 },
    { level_id: "00000000-0000-0000-0000-000000000003", story_text: "Peti besi rahsia mempunyai kata laluan matematik yang kompleks! 🗄️", question_text: "Kata laluan ialah hasil darab 12 dan 15.", options: [150,160,170,180], correct_answer: 180, success_message: "Betul! 12 x 15 = 180!", order_index: 7 },
    { level_id: "00000000-0000-0000-0000-000000000003", story_text: "Alat pengimbas terkini dijual di kedai teknologi bandaraya! 📡", question_text: "Harga alat pengimbas ialah RM120. Diskaun 20% diberi. Berapa harga baru?", options: ["RM96","RM100","RM104","RM110"], correct_answer: "RM96", success_message: "Tepat! RM120 - 20% = RM96!", order_index: 8 },
    { level_id: "00000000-0000-0000-0000-000000000003", story_text: "Senjata siber musuh sedang mengancam sistem kuasa bandaraya! ⚡💻", question_text: "Jika x + 15 = 40 (nilai tenaga bateri siber), apakah nilai x?", options: [15,20,25,30], correct_answer: 25, success_message: "Betul! x = 40 - 15 = 25!", order_index: 9 },
    { level_id: "00000000-0000-0000-0000-000000000003", story_text: "Detektif tiba di markas musuh — sebuah bangunan heksagon gergasi! 🏢", question_text: "Perimeter bangunan heksagon sekata ialah 60m. Berapakah panjang satu sisinya?", options: ["8m","10m","12m","15m"], correct_answer: "10m", success_message: "Tahniah! 60 / 6 = 10m. Misi berjaya! Bandaraya selamat!", order_index: 10 },
  ];

  const { error: qErr } = await supabase
    .from("questions")
    .upsert(questions, { onConflict: "level_id,order_index" });

  if (qErr) {
    return NextResponse.json({ error: "Questions seed gagal.", detail: qErr.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    seeded: { levels: levels.length, questions: questions.length },
  });
}

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""
  );

  const [{ count: lvlCount }, { count: qCount }] = await Promise.all([
    supabase.from("levels").select("*", { count: "exact", head: true }),
    supabase.from("questions").select("*", { count: "exact", head: true }),
  ]);

  return NextResponse.json({ levels: lvlCount ?? 0, questions: qCount ?? 0 });
}
