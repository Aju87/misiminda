#!/usr/bin/env python3
"""
Penjana kandungan Sains MisiMinda.
Menghasilkan supabase/seed_sains.sql — 40 level, 500+ soalan.

Silibus: PERMATA (2-5) · KSPK (5-6) · KSSR Tahap 1 (7-9) · KSSR Tahap 2 (10-12)
Jalankan:  python3 scripts/gen_sains.py
"""
import json, random, itertools, os

random.seed(20260101)  # deterministik — jana semula beri hasil sama

# ============================================================
# BANK FAKTA (dikurasi — semua fakta disemak)
# ============================================================

ANIMALS = [
    # emoji, nama, bunyi, habitat, makanan, kumpulan
    ("🐄", "Lembu",     "MOOO",     "Ladang", "Rumput",      "Mamalia"),
    ("🐱", "Kucing",    "MEOW",     "Rumah",  "Ikan",        "Mamalia"),
    ("🐶", "Anjing",    "WOOF",     "Rumah",  "Daging",      "Mamalia"),
    ("🐔", "Ayam",      "KOK-KOK",  "Reban",  "Biji-bijian", "Burung"),
    ("🦆", "Itik",      "KUEK",     "Kolam",  "Biji-bijian", "Burung"),
    ("🐐", "Kambing",   "MEHHH",    "Ladang", "Rumput",      "Mamalia"),
    ("🐘", "Gajah",     "TERUMPET", "Hutan",  "Daun",        "Mamalia"),
    ("🦁", "Singa",     "ROARR",    "Savana", "Daging",      "Mamalia"),
    ("🐒", "Monyet",    "UUK-UUK",  "Hutan",  "Pisang",      "Mamalia"),
    ("🐸", "Katak",     "KROAK",    "Kolam",  "Serangga",    "Amfibia"),
    ("🐍", "Ular",      "SSSS",     "Hutan",  "Tikus",       "Reptilia"),
    ("🐦", "Burung",    "CIP-CIP",  "Pokok",  "Biji-bijian", "Burung"),
    ("🐟", "Ikan",      "",         "Laut",   "Plankton",    "Ikan"),
    ("🐝", "Lebah",     "BZZZ",     "Sarang", "Nektar",      "Serangga"),
    ("🦋", "Rama-rama", "",         "Taman",  "Nektar",      "Serangga"),
    ("🐢", "Penyu",     "",         "Laut",   "Rumpai laut", "Reptilia"),
    ("🦀", "Ketam",     "",         "Pantai", "Sisa makanan","Krustasia"),
    ("🐰", "Arnab",     "",         "Hutan",  "Lobak",       "Mamalia"),
    ("🐭", "Tikus",     "CIT-CIT",  "Rumah",  "Biji-bijian", "Mamalia"),
    ("🦅", "Helang",    "",         "Gunung", "Daging",      "Burung"),
    ("🐬", "Dolfin",    "",         "Laut",   "Ikan",        "Mamalia"),
    ("🦌", "Rusa",      "",         "Hutan",  "Rumput",      "Mamalia"),
]

SENSES = [
    ("👁️", "Mata",    "melihat",   "Penglihatan"),
    ("👂", "Telinga", "mendengar", "Pendengaran"),
    ("👃", "Hidung",  "menghidu",  "Bau"),
    ("👅", "Lidah",   "merasa",    "Rasa"),
    ("✋", "Kulit",   "menyentuh", "Sentuhan"),
]

COLOURS  = [("🔴","Merah"),("🔵","Biru"),("🟢","Hijau"),("🟡","Kuning"),("🟠","Oren"),("🟣","Ungu")]
FRUITS   = [("🍎","Epal"),("🍌","Pisang"),("🍇","Anggur"),("🍉","Tembikai"),("🍊","Oren"),("🍍","Nanas")]
VEG      = [("🥕","Lobak"),("🥦","Brokoli"),("🌽","Jagung"),("🍅","Tomato")]
WEATHER  = [("☀️","Panas","topi"),("🌧️","Hujan","payung"),("💨","Berangin","jaket"),("⛈️","Ribut","duduk dalam rumah")]
VEHICLES = [("🚗","Kereta","darat"),("🚌","Bas","darat"),("✈️","Kapal terbang","udara"),("🚢","Kapal","air"),("🚲","Basikal","darat"),("🚀","Roket","angkasa")]

PLANT_PARTS = [
    ("Akar",  "menyerap air dan garam mineral dari tanah"),
    ("Batang","menyokong pokok dan mengangkut air"),
    ("Daun",  "membuat makanan melalui fotosintesis"),
    ("Bunga", "untuk pembiakan pokok"),
    ("Buah",  "melindungi biji benih"),
]

TEETH = [
    ("Gigi kacip",   "memotong makanan"),
    ("Gigi taring",  "mengoyak makanan"),
    ("Gigi geraham", "mengunyah dan melumat makanan"),
]

LIFE_CYCLES = [
    ("🦋 Rama-rama", ["Telur", "Ulat beluncas", "Kepompong", "Rama-rama"]),
    ("🐸 Katak",     ["Telur", "Berudu", "Katak muda", "Katak dewasa"]),
    ("🐔 Ayam",      ["Telur", "Anak ayam", "Ayam dewasa"]),
    ("🌱 Pokok",     ["Biji benih", "Bercambah", "Anak pokok", "Pokok dewasa"]),
    ("🦟 Nyamuk",    ["Telur", "Jentik-jentik", "Pupa", "Nyamuk dewasa"]),
    ("🦗 Belalang",  ["Telur", "Nimfa", "Belalang dewasa"]),
]

FLOAT_ITEMS = ["Span", "Kayu", "Bola plastik", "Daun kering", "Gabus", "Kertas"]
SINK_ITEMS  = ["Batu", "Syiling", "Paku besi", "Kunci", "Guli kaca", "Sudu logam"]

MAGNETIC     = ["Paku besi", "Klip kertas", "Gunting besi", "Kunci besi", "Skru besi"]
NON_MAGNETIC = ["Kayu", "Getah", "Plastik", "Kertas", "Kaca", "Kain"]

LIVING     = ["Pokok", "Kucing", "Ikan", "Burung", "Manusia", "Bunga", "Rama-rama"]
NON_LIVING = ["Batu", "Kerusi", "Kereta", "Buku", "Cawan", "Meja", "Bola"]

TRANSPARENT = ["Kaca tingkap", "Air jernih", "Plastik lutsinar"]
OPAQUE      = ["Kayu", "Batu", "Buku", "Dinding"]

PLANETS = [
    ("Utarid",  "planet paling dekat dengan Matahari dan paling kecil"),
    ("Zuhrah",  "planet paling panas dan berputar dari timur ke barat"),
    ("Bumi",    "satu-satunya planet yang ada hidupan dan air cair"),
    ("Marikh",  "dikenali sebagai Planet Merah"),
    ("Musytari","planet terbesar dalam Sistem Suria"),
    ("Zuhal",   "planet yang mempunyai gelang paling jelas"),
    ("Uranus",  "planet yang berputar mengiring seperti bola bergolek"),
    ("Neptun",  "planet paling jauh dari Matahari"),
]

ENERGY = [
    ("Tenaga cahaya",   "Matahari, lampu, api"),
    ("Tenaga haba",     "Dapur, seterika, api"),
    ("Tenaga bunyi",    "Radio, gitar, loceng"),
    ("Tenaga elektrik", "Bateri, suis, wayar"),
    ("Tenaga kinetik",  "Kereta bergerak, budak berlari"),
    ("Tenaga keupayaan","Batu di atas bukit, mangga di dahan"),
]

MACHINES = [
    ("Tuas",           "Jongkang-jongket, gunting, pembuka tin"),
    ("Takal",          "Kerekan bendera, kerekan perigi"),
    ("Satah condong",  "Tangga, jalan mendaki bukit"),
    ("Roda dan gandar","Basikal, kereta sorong"),
    ("Baji",           "Kapak, pisau, paku"),
    ("Skru",           "Skru kayu, penekan botol"),
]

BODY_SYSTEMS = [
    ("Sistem pernafasan",  "Peparu",  "mengambil oksigen dan membebaskan karbon dioksida"),
    ("Sistem peredaran darah","Jantung","mengepam darah ke seluruh badan"),
    ("Sistem pencernaan",  "Perut",   "mencerna makanan menjadi zat"),
    ("Sistem saraf",       "Otak",    "mengawal semua pergerakan dan fikiran"),
    ("Sistem rangka",      "Tulang",  "menyokong badan dan melindungi organ"),
]

FOOD_CHAINS = [
    ["Rumput", "Belalang", "Katak", "Ular"],
    ["Daun", "Ulat", "Burung", "Helang"],
    ["Rumpai laut", "Ikan kecil", "Ikan besar", "Jerung"],
    ["Padi", "Tikus", "Ular", "Helang"],
]

# ============================================================
# PEMBANTU
# ============================================================

def esc(t):
    return str(t).replace("'", "''")

def pick_distractors(correct, pool, n=3):
    # nyahduplikasi & buang jawapan betul supaya pilihan tidak berulang
    opts = list(dict.fromkeys(str(p) for p in pool if str(p) != str(correct)))
    random.shuffle(opts)
    return opts[:n]

rows = []  # (level_id, qtype, story, question, options, correct, success, order)

_order_counter = {}
def add(level_id, order, qtype, story, question, options, correct, success):
    # abaikan `order` yang dihantar — tetapkan berturutan supaya tiada perlanggaran
    _order_counter[level_id] = _order_counter.get(level_id, 0) + 1
    rows.append((level_id, qtype, story, question, options, correct, success, _order_counter[level_id]))

def q_pilihan(level_id, order, story, question, correct, pool, success):
    opts = pick_distractors(correct, pool, 3) + [correct]
    random.shuffle(opts)
    add(level_id, order, "pilihan", story, question, opts, correct, success)

def q_padanan(level_id, order, question, pairs, success, story=""):
    add(level_id, order, "padanan", story, question,
        {"pairs": [{"left": l, "right": r} for l, r in pairs]},
        [{"left": l, "right": r} for l, r in pairs], success)

def q_urutan(level_id, order, question, steps, success, story=""):
    add(level_id, order, "urutan", story, question, {"steps": steps}, steps, success)

def q_kategori(level_id, order, question, bucket_a, bucket_b, items_a, items_b, success, story=""):
    items = [{"label": x, "bucket": 0} for x in items_a] + [{"label": x, "bucket": 1} for x in items_b]
    random.shuffle(items)
    add(level_id, order, "kategori", story, question,
        {"buckets": [bucket_a, bucket_b], "items": items},
        [bucket_a, bucket_b], success)

# ============================================================
# DEFINISI LEVEL
# ============================================================
LEVELS = []  # (id, age, theme, num, desc, category, icon)

def lid(n):
    return f"30000000-0000-0000-0000-{n:012d}"

def level(n, age, theme, num, desc, cat, icon):
    LEVELS.append((lid(n), age, theme, num, desc, cat, icon))
    return lid(n)

# ---------- 2-5 TAHUN · PERMATA · Taman Safari ----------
L = level(1, "2-5", "Bunyi Haiwan", 1, "Kenal bunyi haiwan di sekeliling kita", "haiwan", "🔊")
noisy = [a for a in ANIMALS if a[2]]
for i, (em, nm, snd, *_ ) in enumerate(noisy[:13], 1):
    q_pilihan(L, i, f"{em}", f"Haiwan mana yang berbunyi {snd}?",
              nm, [a[1] for a in noisy], f"Betul! {nm} berbunyi {snd}! {em}")

L = level(2, "2-5", "Kenal Haiwan", 2, "Kenali nama haiwan dari gambar", "haiwan", "🦁")
for i, (em, nm, *_ ) in enumerate(ANIMALS[:13], 1):
    q_pilihan(L, i, em, "Haiwan apakah ini?", nm, [a[1] for a in ANIMALS], f"Ya! Ini {nm}! {em}")

L = level(3, "2-5", "Warna Ceria", 3, "Kenal warna asas di sekeliling", "warna", "🎨")
for i, (em, nm) in enumerate(COLOURS, 1):
    q_pilihan(L, i, em, "Apakah warna ini?", nm, [c[1] for c in COLOURS], f"Betul! Warna {nm}! {em}")
for i, (em, nm) in enumerate(FRUITS[:7], len(COLOURS) + 1):
    q_pilihan(L, i, em, "Buah apakah ini?", nm, [f[1] for f in FRUITS + VEG], f"Ya! Ini {nm}! {em}")

L = level(4, "2-5", "Anggota Badan", 4, "Kenal bahagian badan dan gunanya", "badan", "👶")
for i, (em, nm, act, _s) in enumerate(SENSES, 1):
    q_pilihan(L, i, em, f"Bahagian mana kita guna untuk {act}?", nm, [s[1] for s in SENSES], f"Betul! Kita guna {nm} untuk {act}! {em}")
extra_body = [("🦶","Kaki","berjalan"),("✋","Tangan","memegang"),("🦷","Gigi","mengunyah"),("💇","Rambut","di atas kepala"),
              ("👁️","Mata","menonton TV"),("👂","Telinga","dengar muzik"),("👃","Hidung","hidu bunga"),("👅","Lidah","rasa manis")]
for i, (em, nm, act) in enumerate(extra_body, len(SENSES) + 1):
    q_pilihan(L, i, em, f"Apa yang kita guna untuk {act}?", nm, [b[1] for b in extra_body] + [s[1] for s in SENSES], f"Pandai! {nm}! {em}")

L = level(5, "2-5", "Cuaca Hari Ini", 5, "Kenal cuaca dan pakaian sesuai", "cuaca", "🌦️")
for i, (em, nm, item) in enumerate(WEATHER, 1):
    q_pilihan(L, i, em, "Cuaca apakah ini?", nm, [w[1] for w in WEATHER], f"Betul! Cuaca {nm}! {em}")
    q_pilihan(L, i + len(WEATHER), em, f"Cuaca {nm.lower()}. Apa yang Ali patut guna?", item,
              [w[2] for w in WEATHER], f"Bagus! Guna {item} bila {nm.lower()}!")
q_kategori(L, 2 * len(WEATHER) + 1, "Asingkan: mana cuaca panas, mana cuaca hujan?",
           "☀️ Panas", "🌧️ Hujan", ["Topi", "Cermin mata hitam", "Aiskrim"], ["Payung", "Baju hujan", "But getah"],
           "Hebat! Kamu tahu bezakan cuaca!")

L = level(6, "2-5", "Kenderaan", 6, "Kenderaan darat, air dan udara", "kenderaan", "🚗")
for i, (em, nm, _w) in enumerate(VEHICLES, 1):
    q_pilihan(L, i, em, "Kenderaan apakah ini?", nm, [v[1] for v in VEHICLES], f"Ya! Ini {nm}! {em}")
q_kategori(L, len(VEHICLES) + 1, "Asingkan kenderaan darat dan kenderaan air",
           "🛣️ Darat", "🌊 Air", ["Kereta", "Bas", "Basikal"], ["Kapal", "Bot", "Sampan"],
           "Betul! Kamu pandai bezakan!")
for i, (em, nm) in enumerate(VEG, len(VEHICLES) + 2):
    q_pilihan(L, i, em, "Sayur apakah ini?", nm, [v[1] for v in VEG + FRUITS], f"Ya! Ini {nm}! {em}")

L = level(7, "2-5", "Deria Saya", 7, "Lima deria dan kegunaannya", "deria", "🖐️")
for i, (em, nm, act, sense) in enumerate(SENSES, 1):
    q_pilihan(L, i, em, f"{nm} memberi kita deria apa?", sense, [s[3] for s in SENSES], f"Betul! Deria {sense}! {em}")
sense_ex = [("🎵 Muzik","Telinga"),("🌸 Bunga wangi","Hidung"),("🍭 Gula-gula manis","Lidah"),
            ("🌈 Pelangi","Mata"),("🧊 Ais sejuk","Kulit"),("📺 Kartun","Mata"),("🔔 Loceng","Telinga"),("🍋 Limau masam","Lidah")]
for i, (cue, ans) in enumerate(sense_ex, len(SENSES) + 1):
    q_pilihan(L, i, cue.split()[0], f"Bahagian mana kita guna untuk {cue.split(' ',1)[1]}?", ans, [s[1] for s in SENSES], f"Pandai! Guna {ans}!")

L = level(8, "2-5", "Besar & Kecil", 8, "Banding saiz dan bilangan", "banding", "📏")
size_pairs = [("🐘 Gajah","🐭 Tikus","Gajah"),("🐋 Paus","🐟 Ikan kecil","Paus"),("🌳 Pokok","🌱 Anak pokok","Pokok"),
              ("🏠 Rumah","📦 Kotak","Rumah"),("🚌 Bas","🚲 Basikal","Bas"),("🦒 Zirafah","🐰 Arnab","Zirafah")]
for i, (a, b, ans) in enumerate(size_pairs, 1):
    q_pilihan(L, i, f"{a}  vs  {b}", "Yang mana LEBIH BESAR?", ans.split()[0] if " " in ans else ans,
              [x.split()[1] for x in [a, b]] + ["Sama", "Tidak tahu"], f"Betul! {ans} lebih besar!")
heavy = [("🪨 Batu","🪶 Bulu","Batu"),("📚 Buku tebal","📄 Kertas","Buku tebal"),("🚗 Kereta","⚽ Bola","Kereta")]
for i, (a, b, ans) in enumerate(heavy, len(size_pairs) + 1):
    q_pilihan(L, i, f"{a}  vs  {b}", "Yang mana LEBIH BERAT?", ans, [a.split(" ",1)[1], b.split(" ",1)[1], "Sama berat", "Tiada"], f"Ya! {ans} lebih berat!")
q_kategori(L, len(size_pairs) + len(heavy) + 1, "Asingkan haiwan besar dan haiwan kecil",
           "🐘 Besar", "🐭 Kecil", ["Gajah", "Zirafah", "Paus"], ["Semut", "Tikus", "Lebah"], "Hebat! Betul semua!")

L = level(9, "2-5", "Rumah Haiwan", 9, "Di mana haiwan tinggal", "habitat", "🏡")
hab = [(a[0], a[1], a[3]) for a in ANIMALS]
random.shuffle(hab)
for i, (em, nm, h) in enumerate(hab[:12], 1):
    q_pilihan(L, i, f"{em} {nm}", f"Di mana {nm} tinggal?", h, [a[3] for a in ANIMALS], f"Betul! {nm} tinggal di {h}! {em}")
q_padanan(L, 13, "Padankan haiwan dengan rumahnya",
          [("🐟", "Laut"), ("🐦", "Pokok"), ("🐄", "Ladang"), ("🐝", "Sarang")], "Hebat! Semua betul!")

L = level(10, "2-5", "Makanan Haiwan", 10, "Apa yang haiwan makan", "makanan", "🥕")
food = [(a[0], a[1], a[4]) for a in ANIMALS]
random.shuffle(food)
for i, (em, nm, f) in enumerate(food[:12], 1):
    q_pilihan(L, i, f"{em} {nm}", f"Apakah makanan {nm}?", f, [a[4] for a in ANIMALS], f"Ya! {nm} makan {f}! {em}")
q_padanan(L, 13, "Padankan haiwan dengan makanannya",
          [("🐰", "Lobak"), ("🐒", "Pisang"), ("🐝", "Nektar"), ("🦁", "Daging")], "Bagus! Semua padanan betul!")

# ---------- 5-6 TAHUN · KSPK · Makmal Saintis Cilik ----------
L = level(11, "5-6", "Benda Hidup & Bukan Hidup", 1, "Bezakan benda hidup dan bukan hidup", "hidup", "🌱")
for i, item in enumerate(LIVING[:7], 1):
    q_pilihan(L, i, "", f"Adakah {item} benda hidup atau bukan hidup?", "Benda hidup", ["Benda hidup", "Bukan hidup"], f"Betul! {item} bernafas dan membesar.")
for i, item in enumerate(NON_LIVING[:5], 8):
    q_pilihan(L, i, "", f"Adakah {item} benda hidup atau bukan hidup?", "Bukan hidup", ["Benda hidup", "Bukan hidup"], f"Betul! {item} tidak bernafas.")
q_kategori(L, 13, "Asingkan benda hidup dan bukan hidup", "🌿 Hidup", "🪨 Bukan Hidup",
           LIVING[:3], NON_LIVING[:3], "Hebat! Kamu saintis cilik!")

L = level(12, "5-6", "Lima Deria", 2, "Deria dan organ deria manusia", "deria", "👀")
for i, (em, nm, act, sense) in enumerate(SENSES, 1):
    q_pilihan(L, i, em, f"Organ manakah untuk deria {sense}?", nm, [s[1] for s in SENSES], f"Betul! {nm} untuk deria {sense}.")
tests = [("Bunyi loceng","Pendengaran"),("Warna pelangi","Penglihatan"),("Bau masakan","Bau"),
         ("Rasa masin","Rasa"),("Air sejuk","Sentuhan"),("Cahaya lampu","Penglihatan"),("Bunyi hujan","Pendengaran"),("Manis gula","Rasa")]
for i, (cue, ans) in enumerate(tests, len(SENSES) + 1):
    q_pilihan(L, i, "", f"{cue} dikesan oleh deria apa?", ans, [s[3] for s in SENSES], f"Ya! Deria {ans}.")

L = level(13, "5-6", "Timbul & Tenggelam", 3, "Objek mana timbul, mana tenggelam", "timbul", "🌊")
for i, item in enumerate(FLOAT_ITEMS, 1):
    q_pilihan(L, i, "🪣", f"Jika {item.lower()} dimasukkan ke dalam air, apa akan berlaku?", "Timbul", ["Timbul", "Tenggelam"], f"Betul! {item} TIMBUL kerana ringan.")
for i, item in enumerate(SINK_ITEMS, len(FLOAT_ITEMS) + 1):
    q_pilihan(L, i, "🪣", f"Jika {item.lower()} dimasukkan ke dalam air, apa akan berlaku?", "Tenggelam", ["Timbul", "Tenggelam"], f"Betul! {item} TENGGELAM kerana berat.")
q_kategori(L, 13, "Asingkan objek yang timbul dan tenggelam", "🎈 Timbul", "⚓ Tenggelam",
           FLOAT_ITEMS[:3], SINK_ITEMS[:3], "Hebat! Kamu faham konsep timbul & tenggelam!")

L = level(14, "5-6", "Kitaran Hidup", 4, "Susun kitaran hidup haiwan & tumbuhan", "kitaran", "🦋")
for i, (nm, steps) in enumerate(LIFE_CYCLES, 1):
    q_urutan(L, i, f"Susun kitaran hidup {nm} mengikut urutan betul", steps, f"Hebat! Itulah kitaran hidup {nm}!", nm.split()[0])
for i, (nm, steps) in enumerate(LIFE_CYCLES, len(LIFE_CYCLES) + 1):
    q_pilihan(L, i, nm.split()[0], f"Apakah peringkat PERTAMA kitaran hidup {nm.split()[1]}?", steps[0],
              [s[1][0] for s in LIFE_CYCLES] + ["Dewasa"], f"Betul! Bermula dengan {steps[0]}.")
q_pilihan(L, 13, "🦋", "Selepas ulat beluncas, apakah peringkat seterusnya?", "Kepompong",
          ["Kepompong", "Telur", "Rama-rama", "Berudu"], "Betul! Ulat jadi kepompong dahulu.")

L = level(15, "5-6", "Bahagian Pokok", 5, "Kenal bahagian pokok dan fungsinya", "tumbuhan", "🌳")
for i, (part, fn) in enumerate(PLANT_PARTS, 1):
    q_pilihan(L, i, "🌳", f"Bahagian manakah yang berfungsi {fn}?", part, [p[0] for p in PLANT_PARTS], f"Betul! {part} berfungsi {fn}.")
for i, (part, fn) in enumerate(PLANT_PARTS, len(PLANT_PARTS) + 1):
    q_pilihan(L, i, "🌳", f"Apakah fungsi {part.lower()}?", fn, [p[1] for p in PLANT_PARTS], f"Ya! {part} — {fn}.")
q_padanan(L, 11, "Padankan bahagian pokok dengan fungsinya",
          [("Akar", "Serap air"), ("Daun", "Buat makanan"), ("Bunga", "Pembiakan"), ("Batang", "Menyokong")], "Hebat! Semua betul!")
q_urutan(L, 12, "Susun pertumbuhan pokok mengikut urutan", ["Biji benih", "Bercambah", "Anak pokok", "Pokok dewasa"], "Betul! Itulah cara pokok membesar!", "🌱")
q_pilihan(L, 13, "🌳", "Apakah yang diperlukan pokok untuk hidup?", "Air, cahaya matahari dan udara",
          ["Air, cahaya matahari dan udara", "Hanya batu", "Hanya gula", "Tiada apa-apa"], "Betul! Pokok perlu air, cahaya dan udara.")

L = level(16, "5-6", "Haiwan & Makanan", 6, "Haiwan pemakan tumbuhan dan daging", "haiwan", "🍖")
herb = ["Lembu", "Kambing", "Arnab", "Rusa", "Gajah"]
carn = ["Singa", "Helang", "Ular", "Harimau"]
for i, a in enumerate(herb, 1):
    q_pilihan(L, i, "", f"{a} makan tumbuhan sahaja. Apakah kumpulannya?", "Herbivor", ["Herbivor", "Karnivor", "Omnivor"], f"Betul! {a} ialah herbivor.")
for i, a in enumerate(carn, len(herb) + 1):
    q_pilihan(L, i, "", f"{a} makan daging sahaja. Apakah kumpulannya?", "Karnivor", ["Herbivor", "Karnivor", "Omnivor"], f"Betul! {a} ialah karnivor.")
q_kategori(L, 10, "Asingkan haiwan pemakan tumbuhan dan pemakan daging", "🌿 Herbivor", "🍖 Karnivor",
           ["Lembu", "Arnab", "Kambing"], ["Singa", "Helang", "Ular"], "Hebat! Semua betul!")
q_pilihan(L, 11, "", "Haiwan yang makan tumbuhan DAN daging dipanggil?", "Omnivor", ["Omnivor", "Herbivor", "Karnivor", "Tiada"], "Betul! Omnivor makan kedua-duanya.")
q_padanan(L, 12, "Padankan haiwan dengan jenis makanannya",
          [("🐄 Lembu", "Rumput"), ("🦁 Singa", "Daging"), ("🐝 Lebah", "Nektar"), ("🐰 Arnab", "Lobak")], "Bagus!")
q_pilihan(L, 13, "", "Mengapa haiwan perlu makan?", "Untuk mendapat tenaga dan membesar",
          ["Untuk mendapat tenaga dan membesar", "Untuk tidur", "Untuk berlari sahaja", "Tiada sebab"], "Betul! Makanan beri tenaga.")

L = level(17, "5-6", "Cuaca & Musim", 7, "Cuaca, hujan dan langit", "cuaca", "🌈")
wq = [("Apakah yang turun dari awan semasa hujan?", "Air", ["Air", "Pasir", "Batu", "Susu"]),
      ("Apakah warna langit pada waktu siang yang cerah?", "Biru", ["Biru", "Hitam", "Merah", "Hijau"]),
      ("Bila kita nampak pelangi?", "Selepas hujan bila ada cahaya matahari", ["Selepas hujan bila ada cahaya matahari", "Waktu malam", "Bila sejuk sahaja", "Bila tidur"]),
      ("Apakah yang memberi kita cahaya pada waktu siang?", "Matahari", ["Matahari", "Bulan", "Bintang", "Lampu jalan"]),
      ("Apakah yang kita nampak di langit pada waktu malam?", "Bulan dan bintang", ["Bulan dan bintang", "Matahari", "Pelangi", "Awan sahaja"]),
      ("Apa berlaku pada baju basah yang dijemur di bawah matahari?", "Menjadi kering", ["Menjadi kering", "Menjadi lebih basah", "Bertukar warna", "Membesar"]),
      ("Angin kencang boleh menyebabkan apa?", "Pokok bergoyang", ["Pokok bergoyang", "Air membeku", "Langit hilang", "Matahari padam"]),
      ("Apakah yang terbentuk di langit sebelum hujan?", "Awan gelap", ["Awan gelap", "Pelangi", "Salji", "Bintang"])]
for i, (q, c, pool) in enumerate(wq, 1):
    q_pilihan(L, i, "", q, c, pool, "Betul! Bagus pemerhatian kamu!")
for i, (em, nm, item) in enumerate(WEATHER, len(wq) + 1):
    q_pilihan(L, i, em, f"Bila cuaca {nm.lower()}, apa yang sesuai digunakan?", item, [w[2] for w in WEATHER], f"Ya! Guna {item}.")
q_kategori(L, 13, "Asingkan: apa nampak waktu siang, apa nampak waktu malam?",
           "☀️ Siang", "🌙 Malam", ["Matahari", "Awan putih", "Pelangi"], ["Bulan", "Bintang", "Gelap"], "Hebat!")

L = level(18, "5-6", "Magnet Ajaib", 8, "Bahan yang ditarik magnet", "magnet", "🧲")
for i, item in enumerate(MAGNETIC, 1):
    q_pilihan(L, i, "🧲", f"Adakah {item.lower()} ditarik oleh magnet?", "Ya, ditarik", ["Ya, ditarik", "Tidak ditarik"], f"Betul! {item} diperbuat daripada besi.")
for i, item in enumerate(NON_MAGNETIC, len(MAGNETIC) + 1):
    q_pilihan(L, i, "🧲", f"Adakah {item.lower()} ditarik oleh magnet?", "Tidak ditarik", ["Ya, ditarik", "Tidak ditarik"], f"Betul! {item} bukan besi.")
q_kategori(L, 12, "Asingkan bahan yang ditarik dan tidak ditarik magnet", "🧲 Ditarik", "🚫 Tidak Ditarik",
           MAGNETIC[:3], NON_MAGNETIC[:3], "Hebat! Kamu faham sifat magnet!")
q_pilihan(L, 13, "🧲", "Magnet menarik bahan yang diperbuat daripada?", "Besi", ["Besi", "Kayu", "Plastik", "Kertas"], "Betul! Magnet menarik besi.")

L = level(19, "5-6", "Cahaya & Bayang", 9, "Cahaya, bayang dan bahan lut sinar", "cahaya", "💡")
lq = [("Apakah sumber cahaya semula jadi yang paling besar?", "Matahari", ["Matahari", "Lampu", "Lilin", "Suluh"]),
      ("Bayang terbentuk bila cahaya di...", "halang oleh objek", ["halang oleh objek", "matikan", "tukar warna", "hilang"]),
      ("Bila bayang paling panjang?", "Waktu pagi dan petang", ["Waktu pagi dan petang", "Tengah hari", "Waktu malam", "Tiada masa"]),
      ("Bolehkah kita nampak dalam gelap tanpa cahaya?", "Tidak boleh", ["Tidak boleh", "Boleh", "Kadang-kadang", "Sentiasa"]),
      ("Apakah sumber cahaya buatan manusia?", "Lampu", ["Lampu", "Matahari", "Bintang", "Kilat"])]
for i, (q, c, pool) in enumerate(lq, 1):
    q_pilihan(L, i, "💡", q, c, pool, "Betul! Kamu faham tentang cahaya!")
for i, item in enumerate(TRANSPARENT, len(lq) + 1):
    q_pilihan(L, i, "", f"Bolehkah cahaya menembusi {item.lower()}?", "Ya, boleh", ["Ya, boleh", "Tidak boleh"], f"Betul! {item} lut sinar.")
for i, item in enumerate(OPAQUE, len(lq) + len(TRANSPARENT) + 1):
    q_pilihan(L, i, "", f"Bolehkah cahaya menembusi {item.lower()}?", "Tidak boleh", ["Ya, boleh", "Tidak boleh"], f"Betul! {item} legap.")
q_kategori(L, 13, "Asingkan bahan lut sinar dan legap", "🔍 Lut Sinar", "🧱 Legap",
           TRANSPARENT[:3], OPAQUE[:3], "Hebat!")

L = level(20, "5-6", "Jaga Alam Sekitar", 10, "Amalan menjaga alam", "alam", "♻️")
eq = [("Ke mana kita patut buang sampah?", "Dalam tong sampah", ["Dalam tong sampah", "Dalam sungai", "Atas jalan", "Dalam hutan"]),
      ("Apa yang berlaku jika kita buang sampah dalam sungai?", "Air tercemar dan ikan mati", ["Air tercemar dan ikan mati", "Air jadi bersih", "Ikan gembira", "Tiada apa-apa"]),
      ("Apakah maksud kitar semula?", "Guna semula bahan supaya tidak jadi sampah", ["Guna semula bahan supaya tidak jadi sampah", "Buang semua barang", "Bakar sampah", "Simpan sampah"]),
      ("Mengapa kita perlu menanam pokok?", "Untuk udara bersih dan teduhan", ["Untuk udara bersih dan teduhan", "Untuk buat sampah", "Supaya panas", "Tiada sebab"]),
      ("Apa patut kita buat selepas guna air?", "Tutup paip", ["Tutup paip", "Biar terbuka", "Pecahkan paip", "Lari"]),
      ("Bahan manakah boleh dikitar semula?", "Botol plastik", ["Botol plastik", "Sisa makanan basi", "Tisu kotor", "Air kotor"]),
      ("Apa berlaku jika hutan ditebang semua?", "Haiwan hilang tempat tinggal", ["Haiwan hilang tempat tinggal", "Haiwan gembira", "Udara jadi bersih", "Hujan berhenti"]),
      ("Bagaimana cara jimat elektrik?", "Tutup lampu bila tidak guna", ["Tutup lampu bila tidak guna", "Buka semua lampu", "Biar TV menyala", "Buka peti sejuk lama-lama"])]
for i, (q, c, pool) in enumerate(eq, 1):
    q_pilihan(L, i, "♻️", q, c, pool, "Betul! Terima kasih jaga alam!")
q_kategori(L, 9, "Asingkan amalan baik dan amalan buruk untuk alam", "✅ Baik", "❌ Buruk",
           ["Tanam pokok", "Kitar semula", "Tutup paip"], ["Buang sampah merata", "Bakar hutan", "Bazir air"], "Hebat! Kamu penjaga alam!")
for i, (q, c, pool) in enumerate(eq[:4], 10):
    q_pilihan(L, i, "🌍", q.replace("kita", "keluarga kita"), c, pool, "Betul!")

# ---------- 7-9 TAHUN · KSSR T1 · Detektif Alam Sekitar ----------
L = level(21, "7-9", "Jenis Gigi", 1, "Gigi manusia dan fungsinya", "badan", "🦷")
for i, (t, fn) in enumerate(TEETH, 1):
    q_pilihan(L, i, "🦷", f"Gigi manakah berfungsi untuk {fn}?", t, [x[0] for x in TEETH], f"Betul! {t} untuk {fn}.")
    q_pilihan(L, i + 3, "🦷", f"Apakah fungsi {t.lower()}?", fn, [x[1] for x in TEETH], f"Ya! {t} — {fn}.")
scenarios = [("Ali mahu menggigit epal. Gigi mana digunakan dahulu?", "Gigi kacip"),
             ("Robot mahu mengunyah makanan keras. Gigi mana patut digunakan?", "Gigi geraham"),
             ("Singa mengoyak daging. Gigi mana yang paling tajam untuknya?", "Gigi taring")]
for i, (q, c) in enumerate(scenarios, 7):
    q_pilihan(L, i, "🦷", q, c, [x[0] for x in TEETH], f"Betul! {c}.")
q_padanan(L, 10, "Padankan gigi dengan fungsinya",
          [("Kacip", "Memotong"), ("Taring", "Mengoyak"), ("Geraham", "Mengunyah")], "Hebat! Semua betul!")
care = [("Berapa kali sehari patut kita berus gigi?", "Dua kali", ["Dua kali", "Sekali seminggu", "Tidak perlu", "Sebulan sekali"]),
        ("Apa berlaku jika kita makan terlalu banyak gula-gula?", "Gigi berlubang", ["Gigi berlubang", "Gigi kuat", "Gigi membesar", "Tiada kesan"]),
        ("Apakah gigi yang tumbuh dahulu semasa kecil?", "Gigi susu", ["Gigi susu", "Gigi kekal", "Gigi geraham bungsu", "Tiada"])]
for i, (q, c, pool) in enumerate(care, 11):
    q_pilihan(L, i, "🪥", q, c, pool, "Betul! Jaga gigi baik-baik!")

L = level(22, "7-9", "Rantai Makanan", 2, "Aliran tenaga dalam rantai makanan", "rantai", "🌾")
for i, chain in enumerate(FOOD_CHAINS, 1):
    q_urutan(L, i, "Susun rantai makanan ini mengikut urutan betul", chain, "Hebat! Itulah aliran tenaga dalam rantai makanan!", "🌾")
for i, chain in enumerate(FOOD_CHAINS, len(FOOD_CHAINS) + 1):
    q_pilihan(L, i, "", f"Dalam rantai makanan {' → '.join(chain)}, apakah pengeluar?", chain[0],
              [c[0] for c in FOOD_CHAINS] + [chain[-1]], f"Betul! {chain[0]} ialah pengeluar (tumbuhan).")
fq = [("Apakah maksud 'pengeluar' dalam rantai makanan?", "Tumbuhan yang membuat makanan sendiri", ["Tumbuhan yang membuat makanan sendiri", "Haiwan pemakan daging", "Manusia", "Batu"]),
      ("Haiwan yang makan tumbuhan dipanggil pengguna?", "Pengguna primer", ["Pengguna primer", "Pengeluar", "Pengurai", "Pemangsa akhir"]),
      ("Apakah punca tenaga utama dalam semua rantai makanan?", "Matahari", ["Matahari", "Bulan", "Angin", "Tanah"]),
      ("Apa berlaku jika semua ular dalam rantai makanan hilang?", "Bilangan tikus akan bertambah", ["Bilangan tikus akan bertambah", "Tikus akan pupus", "Rumput akan hilang", "Tiada kesan"]),
      ("Cacing dan kulat yang mereputkan bangkai dipanggil?", "Pengurai", ["Pengurai", "Pengeluar", "Pemangsa", "Herbivor"])]
for i, (q, c, pool) in enumerate(fq, 2 * len(FOOD_CHAINS) + 1):
    q_pilihan(L, i, "🌿", q, c, pool, "Betul! Kamu detektif alam yang hebat!")

L = level(23, "7-9", "Litar Elektrik", 3, "Litar lengkap, bateri dan mentol", "elektrik", "🔌")
cq = [("Mentol tidak menyala. Apakah kemungkinan puncanya?", "Litar terputus", ["Litar terputus", "Mentol terlalu cerah", "Bateri terlalu baharu", "Wayar terlalu pendek"]),
      ("Apakah yang membekalkan tenaga elektrik dalam litar ringkas?", "Bateri", ["Bateri", "Mentol", "Wayar", "Suis"]),
      ("Apakah fungsi suis dalam litar?", "Membuka dan menutup litar", ["Membuka dan menutup litar", "Menyimpan elektrik", "Mengeluarkan cahaya", "Memanaskan wayar"]),
      ("Litar yang lengkap dan membolehkan arus mengalir dipanggil?", "Litar tertutup", ["Litar tertutup", "Litar terbuka", "Litar rosak", "Litar kosong"]),
      ("Bahan manakah konduktor elektrik yang baik?", "Wayar tembaga", ["Wayar tembaga", "Getah", "Plastik", "Kayu"]),
      ("Bahan manakah penebat elektrik?", "Getah", ["Getah", "Tembaga", "Besi", "Aluminium"]),
      ("Mengapa wayar elektrik disaluti plastik?", "Untuk keselamatan supaya tidak terkena renjatan", ["Untuk keselamatan supaya tidak terkena renjatan", "Supaya cantik", "Supaya berat", "Supaya panjang"]),
      ("Jika dua bateri digunakan, apa berlaku pada mentol?", "Menyala lebih terang", ["Menyala lebih terang", "Menjadi malap", "Terus padam", "Tiada perubahan"]),
      ("Apakah simbol keselamatan penting semasa bermain dengan elektrik?", "Jangan sentuh soket dengan tangan basah", ["Jangan sentuh soket dengan tangan basah", "Sentuh dengan tangan basah", "Masukkan besi ke soket", "Cabut wayar sesuka hati"])]
for i, (q, c, pool) in enumerate(cq, 1):
    q_pilihan(L, i, "🔌", q, c, pool, "Betul! Kamu faham litar elektrik!")
q_kategori(L, 10, "Asingkan konduktor dan penebat elektrik", "⚡ Konduktor", "🛑 Penebat",
           ["Tembaga", "Besi", "Aluminium"], ["Getah", "Plastik", "Kayu"], "Hebat!")
q_padanan(L, 11, "Padankan komponen litar dengan fungsinya",
          [("Bateri", "Bekal tenaga"), ("Mentol", "Beri cahaya"), ("Suis", "Buka/tutup"), ("Wayar", "Alir arus")], "Bagus!")
q_urutan(L, 12, "Susun langkah menyalakan mentol dalam litar",
         ["Sambung wayar ke bateri", "Sambung wayar ke mentol", "Tutup suis", "Mentol menyala"], "Betul! Litar lengkap!", "💡")
q_pilihan(L, 13, "🔋", "Apakah yang berlaku jika bateri dikeluarkan dari litar?", "Mentol padam",
          ["Mentol padam", "Mentol lebih terang", "Wayar panas", "Suis rosak"], "Betul! Tiada sumber tenaga.")

L = level(24, "7-9", "Magnet & Daya", 4, "Kutub magnet, tarikan dan tolakan", "magnet", "🧲")
mq = [("Berapakah kutub yang ada pada setiap magnet?", "Dua", ["Dua", "Satu", "Tiga", "Empat"]),
      ("Apakah nama kutub magnet?", "Kutub utara dan kutub selatan", ["Kutub utara dan kutub selatan", "Kutub kiri dan kanan", "Kutub atas dan bawah", "Kutub merah dan biru"]),
      ("Apa berlaku bila kutub utara didekatkan dengan kutub utara?", "Menolak antara satu sama lain", ["Menolak antara satu sama lain", "Menarik", "Melekat", "Tiada tindak balas"]),
      ("Apa berlaku bila kutub utara didekatkan dengan kutub selatan?", "Menarik antara satu sama lain", ["Menarik antara satu sama lain", "Menolak", "Meletup", "Tiada tindak balas"]),
      ("Bahagian manakah magnet paling kuat?", "Kedua-dua hujung kutub", ["Kedua-dua hujung kutub", "Bahagian tengah", "Bahagian bawah", "Semua sama"]),
      ("Alat manakah menggunakan magnet untuk menunjuk arah?", "Kompas", ["Kompas", "Termometer", "Jam pasir", "Pembaris"]),
      ("Bolehkah magnet menarik melalui kertas nipis?", "Boleh", ["Boleh", "Tidak boleh", "Hanya waktu malam", "Hanya jika basah"]),
      ("Apakah kegunaan magnet di rumah?", "Penutup pintu peti sejuk", ["Penutup pintu peti sejuk", "Menyejukkan air", "Memasak nasi", "Menyalakan lampu"])]
for i, (q, c, pool) in enumerate(mq, 1):
    q_pilihan(L, i, "🧲", q, c, pool, "Betul! Kamu faham magnet!")
q_kategori(L, 9, "Asingkan bahan magnetik dan bukan magnetik", "🧲 Magnetik", "🚫 Bukan Magnetik",
           MAGNETIC[:3], NON_MAGNETIC[:3], "Hebat!")
for i, item in enumerate(MAGNETIC[:4], 10):
    q_pilihan(L, i, "🧲", f"Adakah {item.lower()} bahan magnetik?", "Ya", ["Ya", "Tidak"], f"Betul! {item} mengandungi besi.")

L = level(25, "7-9", "Cahaya & Bayang", 5, "Sifat cahaya, bayang dan pantulan", "cahaya", "🔦")
lq2 = [("Cahaya bergerak dalam bentuk apa?", "Garis lurus", ["Garis lurus", "Garis bengkok", "Bulatan", "Zigzag"]),
       ("Apakah yang terbentuk bila cahaya dihalang oleh objek legap?", "Bayang", ["Bayang", "Pelangi", "Cermin", "Api"]),
       ("Bila bayang paling pendek dalam sehari?", "Tengah hari", ["Tengah hari", "Waktu pagi", "Waktu petang", "Waktu malam"]),
       ("Apakah berlaku bila cahaya mengenai cermin?", "Cahaya dipantulkan", ["Cahaya dipantulkan", "Cahaya hilang", "Cahaya diserap sepenuhnya", "Cahaya membeku"]),
       ("Bahan lut sinar membenarkan cahaya?", "Menembusinya sepenuhnya", ["Menembusinya sepenuhnya", "Terhalang sepenuhnya", "Bertukar warna", "Berhenti"]),
       ("Bahan legap menyebabkan cahaya?", "Terhalang sepenuhnya", ["Terhalang sepenuhnya", "Menembusi", "Bertambah terang", "Bertukar bunyi"]),
       ("Jika objek didekatkan kepada sumber cahaya, bayangnya menjadi?", "Lebih besar", ["Lebih besar", "Lebih kecil", "Hilang", "Sama sahaja"]),
       ("Apakah sumber cahaya semula jadi?", "Matahari", ["Matahari", "Lampu suluh", "Lilin", "Mentol"]),
       ("Mengapa kita nampak objek di sekeliling?", "Cahaya dari objek masuk ke mata kita", ["Cahaya dari objek masuk ke mata kita", "Objek mengeluarkan bunyi", "Mata mengeluarkan cahaya", "Kerana angin"])]
for i, (q, c, pool) in enumerate(lq2, 1):
    q_pilihan(L, i, "🔦", q, c, pool, "Betul! Kamu faham sifat cahaya!")
q_kategori(L, 10, "Asingkan bahan lut sinar dan legap", "🔍 Lut Sinar", "🧱 Legap", TRANSPARENT[:3], OPAQUE[:3], "Hebat!")
q_kategori(L, 11, "Asingkan sumber cahaya semula jadi dan buatan", "☀️ Semula Jadi", "💡 Buatan",
           ["Matahari", "Bintang", "Kilat"], ["Lampu", "Lilin", "Suluh"], "Bagus!")
q_padanan(L, 12, "Padankan istilah dengan maksudnya",
          [("Lut sinar", "Cahaya menembusi"), ("Legap", "Cahaya terhalang"), ("Pantulan", "Cahaya melantun"), ("Bayang", "Kawasan gelap")], "Hebat!")
q_pilihan(L, 13, "🌑", "Apa berlaku pada bayang bila objek dijauhkan dari cahaya?", "Bayang menjadi lebih kecil",
          ["Bayang menjadi lebih kecil", "Bayang membesar", "Bayang hilang terus", "Bayang bertukar warna"], "Betul!")

L = level(26, "7-9", "Haiwan & Habitat", 6, "Habitat dan penyesuaian haiwan", "habitat", "🏞️")
hq = [("Mengapa ikan mempunyai insang?", "Untuk bernafas dalam air", ["Untuk bernafas dalam air", "Untuk berenang laju", "Untuk makan", "Untuk melihat"]),
      ("Mengapa burung mempunyai sayap?", "Untuk terbang", ["Untuk terbang", "Untuk berenang", "Untuk menggali", "Untuk memanjat"]),
      ("Mengapa unta boleh hidup di padang pasir?", "Menyimpan lemak dalam bonggol", ["Menyimpan lemak dalam bonggol", "Ada insang", "Ada sayap", "Berbulu tebal seperti beruang"]),
      ("Mengapa beruang kutub mempunyai bulu tebal?", "Untuk kekal panas di kawasan sejuk", ["Untuk kekal panas di kawasan sejuk", "Untuk berenang", "Untuk terbang", "Untuk menyorok"]),
      ("Katak boleh hidup di darat dan air. Ia dipanggil?", "Amfibia", ["Amfibia", "Reptilia", "Mamalia", "Burung"]),
      ("Haiwan yang menyusukan anaknya dipanggil?", "Mamalia", ["Mamalia", "Reptilia", "Amfibia", "Serangga"]),
      ("Berapakah bilangan kaki serangga?", "Enam", ["Enam", "Empat", "Lapan", "Dua"]),
      ("Haiwan berdarah sejuk yang bersisik dipanggil?", "Reptilia", ["Reptilia", "Mamalia", "Burung", "Ikan"])]
for i, (q, c, pool) in enumerate(hq, 1):
    q_pilihan(L, i, "🏞️", q, c, pool, "Betul! Detektif alam yang hebat!")
q_padanan(L, 9, "Padankan haiwan dengan habitatnya",
          [("🐪 Unta", "Padang pasir"), ("🐟 Ikan", "Laut"), ("🦅 Helang", "Gunung"), ("🐒 Monyet", "Hutan")], "Hebat!")
q_kategori(L, 10, "Asingkan haiwan mengikut kumpulan", "🐄 Mamalia", "🦎 Reptilia",
           ["Lembu", "Kucing", "Gajah"], ["Ular", "Penyu", "Buaya"], "Bagus!")
for i, (em, nm, _s, hab, _f, grp) in enumerate([a for a in ANIMALS if a[5] in ("Mamalia", "Burung", "Reptilia")][:3], 11):
    q_pilihan(L, i, em, f"{nm} tergolong dalam kumpulan apa?", grp, ["Mamalia", "Burung", "Reptilia", "Amfibia"], f"Betul! {nm} ialah {grp}.")

L = level(27, "7-9", "Tumbuhan & Makanannya", 7, "Bagaimana tumbuhan hidup dan membiak", "tumbuhan", "🌿")
tq = [("Apakah proses tumbuhan membuat makanan sendiri?", "Fotosintesis", ["Fotosintesis", "Pencernaan", "Pernafasan", "Pembiakan"]),
      ("Bahagian manakah tumbuhan menjalankan fotosintesis?", "Daun", ["Daun", "Akar", "Batang", "Buah"]),
      ("Apakah gas yang diserap tumbuhan semasa fotosintesis?", "Karbon dioksida", ["Karbon dioksida", "Oksigen", "Nitrogen", "Helium"]),
      ("Apakah gas yang dibebaskan tumbuhan semasa fotosintesis?", "Oksigen", ["Oksigen", "Karbon dioksida", "Hidrogen", "Asap"]),
      ("Apakah yang diperlukan tumbuhan untuk fotosintesis?", "Cahaya matahari, air dan karbon dioksida", ["Cahaya matahari, air dan karbon dioksida", "Hanya tanah", "Hanya batu", "Hanya angin"]),
      ("Apa berlaku pada tumbuhan yang tidak mendapat cahaya?", "Ia menjadi layu dan mati", ["Ia menjadi layu dan mati", "Ia membesar cepat", "Ia bertukar warna merah", "Tiada kesan"]),
      ("Bagaimana biji benih tersebar oleh angin?", "Biji ringan diterbangkan angin", ["Biji ringan diterbangkan angin", "Biji berjalan sendiri", "Biji berenang", "Biji melompat"]),
      ("Apakah fungsi akar selain menyerap air?", "Mencengkam tumbuhan pada tanah", ["Mencengkam tumbuhan pada tanah", "Membuat makanan", "Menghasilkan bunga", "Menyerap cahaya"])]
for i, (q, c, pool) in enumerate(tq, 1):
    q_pilihan(L, i, "🌿", q, c, pool, "Betul! Kamu faham tentang tumbuhan!")
q_padanan(L, 9, "Padankan bahagian tumbuhan dengan fungsinya",
          [("Akar", "Serap air"), ("Daun", "Fotosintesis"), ("Batang", "Angkut air"), ("Bunga", "Pembiakan")], "Hebat!")
q_urutan(L, 10, "Susun proses pertumbuhan pokok", ["Biji benih", "Bercambah", "Anak pokok", "Pokok berbuah"], "Betul!", "🌱")
q_kategori(L, 11, "Asingkan bahagian tumbuhan di atas dan bawah tanah", "🌤️ Atas Tanah", "🌍 Bawah Tanah",
           ["Daun", "Bunga", "Batang"], ["Akar", "Ubi", "Akar tunjang"], "Bagus!")
for i, (q, c, pool) in enumerate(tq[:2], 12):
    q_pilihan(L, i, "☀️", q, c, pool, "Betul!")

L = level(28, "7-9", "Bahan & Sifatnya", 8, "Jenis bahan dan kegunaannya", "bahan", "🧱")
bq = [("Bahan manakah paling sesuai untuk membuat tingkap?", "Kaca", ["Kaca", "Kayu", "Getah", "Kain"]),
      ("Mengapa periuk diperbuat daripada logam?", "Logam mengalirkan haba dengan baik", ["Logam mengalirkan haba dengan baik", "Logam ringan", "Logam murah", "Logam lut sinar"]),
      ("Mengapa payung diperbuat daripada kain kalis air?", "Supaya air tidak menembusi", ["Supaya air tidak menembusi", "Supaya berat", "Supaya panas", "Supaya cantik sahaja"]),
      ("Bahan manakah boleh diregangkan?", "Getah", ["Getah", "Kaca", "Batu", "Besi"]),
      ("Bahan manakah paling keras?", "Besi", ["Besi", "Span", "Kertas", "Kain"]),
      ("Mengapa pemegang seterika diperbuat daripada plastik?", "Plastik penebat haba", ["Plastik penebat haba", "Plastik konduktor haba", "Plastik berat", "Plastik berkilat"]),
      ("Bahan manakah menyerap air dengan baik?", "Span", ["Span", "Plastik", "Kaca", "Besi"]),
      ("Apakah keadaan air apabila disejukkan di bawah 0°C?", "Menjadi pepejal (ais)", ["Menjadi pepejal (ais)", "Menjadi gas", "Hilang terus", "Menjadi panas"]),
      ("Apakah keadaan air apabila dipanaskan sehingga mendidih?", "Menjadi wap (gas)", ["Menjadi wap (gas)", "Menjadi ais", "Menjadi batu", "Tiada perubahan"])]
for i, (q, c, pool) in enumerate(bq, 1):
    q_pilihan(L, i, "🧱", q, c, pool, "Betul! Kamu faham sifat bahan!")
q_kategori(L, 10, "Asingkan bahan mengikut keadaan", "🧊 Pepejal", "💧 Cecair",
           ["Batu", "Kayu", "Besi"], ["Air", "Susu", "Minyak"], "Hebat!")
q_padanan(L, 11, "Padankan bahan dengan kegunaannya",
          [("Kaca", "Tingkap"), ("Getah", "Tayar"), ("Kayu", "Kerusi"), ("Kain", "Baju")], "Bagus!")
q_urutan(L, 12, "Susun perubahan keadaan air apabila dipanaskan", ["Ais", "Air", "Wap air"], "Betul! Itulah perubahan keadaan jirim!", "💧")
q_pilihan(L, 13, "🧊", "Apakah proses ais bertukar menjadi air?", "Peleburan", ["Peleburan", "Pembekuan", "Pemeluwapan", "Pengewapan"], "Betul! Peleburan.")

L = level(29, "7-9", "Badan Saya", 9, "Sistem asas tubuh manusia", "badan", "🫀")
for i, (sys, organ, fn) in enumerate(BODY_SYSTEMS, 1):
    q_pilihan(L, i, "", f"Organ utama {sys.lower()} ialah?", organ, [b[1] for b in BODY_SYSTEMS], f"Betul! {organ}.")
    q_pilihan(L, i + 5, "", f"Apakah fungsi {organ.lower()}?", fn, [b[2] for b in BODY_SYSTEMS], f"Ya! {organ} — {fn}.")
q_padanan(L, 11, "Padankan organ dengan fungsinya",
          [("Jantung", "Pam darah"), ("Peparu", "Bernafas"), ("Otak", "Berfikir"), ("Perut", "Cerna makanan")], "Hebat!")
q_pilihan(L, 12, "🫁", "Gas apakah yang kita hirup masuk semasa bernafas?", "Oksigen",
          ["Oksigen", "Karbon dioksida", "Nitrogen", "Asap"], "Betul! Oksigen.")
q_pilihan(L, 13, "🦴", "Apakah fungsi rangka manusia?", "Menyokong badan dan melindungi organ",
          ["Menyokong badan dan melindungi organ", "Mencerna makanan", "Mengepam darah", "Menghasilkan cahaya"], "Betul!")

L = level(30, "7-9", "Alat & Ukuran Sains", 10, "Alat radas dan pengukuran", "alat", "🔬")
aq = [("Alat manakah digunakan untuk mengukur suhu?", "Termometer", ["Termometer", "Pembaris", "Penimbang", "Jam"]),
      ("Alat manakah digunakan untuk mengukur jisim?", "Penimbang", ["Penimbang", "Termometer", "Pembaris", "Kompas"]),
      ("Alat manakah digunakan untuk melihat objek yang sangat kecil?", "Mikroskop", ["Mikroskop", "Teleskop", "Kompas", "Termometer"]),
      ("Alat manakah digunakan untuk melihat objek yang jauh di langit?", "Teleskop", ["Teleskop", "Mikroskop", "Penimbang", "Pembaris"]),
      ("Apakah unit piawai bagi panjang?", "Meter", ["Meter", "Kilogram", "Saat", "Liter"]),
      ("Apakah unit piawai bagi jisim?", "Kilogram", ["Kilogram", "Meter", "Liter", "Celsius"]),
      ("Apakah unit bagi isipadu cecair?", "Mililiter", ["Mililiter", "Kilogram", "Meter", "Celsius"]),
      ("Alat manakah digunakan untuk menyukat isipadu cecair?", "Silinder penyukat", ["Silinder penyukat", "Pembaris", "Penimbang", "Kompas"]),
      ("Mengapa kita perlu memakai gogal di makmal?", "Untuk melindungi mata", ["Untuk melindungi mata", "Supaya nampak cantik", "Untuk mendengar", "Untuk bernafas"])]
for i, (q, c, pool) in enumerate(aq, 1):
    q_pilihan(L, i, "🔬", q, c, pool, "Betul! Saintis yang berhati-hati!")
q_padanan(L, 10, "Padankan alat dengan kegunaannya",
          [("Termometer", "Suhu"), ("Penimbang", "Jisim"), ("Pembaris", "Panjang"), ("Mikroskop", "Objek kecil")], "Hebat!")
q_kategori(L, 11, "Asingkan amalan selamat dan tidak selamat di makmal", "✅ Selamat", "❌ Bahaya",
           ["Pakai gogal", "Basuh tangan", "Ikut arahan"], ["Rasa bahan kimia", "Berlari di makmal", "Main api"], "Bagus!")
for i, (q, c, pool) in enumerate(aq[:2], 12):
    q_pilihan(L, i, "📏", q, c, pool, "Betul!")

# ---------- 10-12 TAHUN · KSSR T2 · Penjelajah Angkasa ----------
L = level(31, "10-12", "Sistem Suria", 1, "Planet dan susunannya", "angkasa", "🪐")
for i, (p, fact) in enumerate(PLANETS, 1):
    q_pilihan(L, i, "🪐", f"Saya adalah {fact}. Siapakah saya?", p, [x[0] for x in PLANETS], f"Betul! {p} — {fact}.")
q_urutan(L, 9, "Susun planet dari yang paling dekat dengan Matahari",
         ["Utarid", "Zuhrah", "Bumi", "Marikh"], "Hebat! Itulah 4 planet dalaman!", "☀️")
q_urutan(L, 10, "Susun planet luar dari yang paling dekat dengan Matahari",
         ["Musytari", "Zuhal", "Uranus", "Neptun"], "Betul! Itulah 4 planet luar!", "🪐")
q_pilihan(L, 11, "☀️", "Berapakah bilangan planet dalam Sistem Suria?", "8", ["8", "7", "9", "10"], "Betul! Ada 8 planet.")
q_pilihan(L, 12, "🌍", "Apakah yang menjadi pusat Sistem Suria?", "Matahari", ["Matahari", "Bumi", "Bulan", "Musytari"], "Betul! Matahari di tengah.")
q_padanan(L, 13, "Padankan planet dengan ciri istimewanya",
          [("Marikh", "Planet Merah"), ("Musytari", "Terbesar"), ("Zuhal", "Ada gelang"), ("Zuhrah", "Paling panas")], "Hebat!")

L = level(32, "10-12", "Bumi, Bulan & Buruj", 2, "Putaran, peredaran dan buruj", "angkasa", "🌙")
mq2 = [("Berapa lamakah Bumi berputar pada paksinya sekali?", "24 jam", ["24 jam", "365 hari", "30 hari", "12 jam"]),
       ("Berapa lamakah Bumi mengelilingi Matahari sekali?", "365 hari", ["365 hari", "24 jam", "30 hari", "100 hari"]),
       ("Apakah yang menyebabkan siang dan malam?", "Putaran Bumi pada paksinya", ["Putaran Bumi pada paksinya", "Peredaran Bulan", "Saiz Matahari", "Awan tebal"]),
       ("Apakah yang menyebabkan perubahan musim?", "Peredaran Bumi mengelilingi Matahari dan kecondongan paksi", ["Peredaran Bumi mengelilingi Matahari dan kecondongan paksi", "Putaran Bulan", "Hujan", "Angin"]),
       ("Bulan mengambil masa berapa lama mengelilingi Bumi?", "Kira-kira 30 hari", ["Kira-kira 30 hari", "24 jam", "365 hari", "7 hari"]),
       ("Apakah fasa bulan apabila kita tidak nampak bulan langsung?", "Bulan baharu", ["Bulan baharu", "Bulan purnama", "Bulan sabit", "Bulan separuh"]),
       ("Apakah fasa bulan apabila bulan kelihatan bulat penuh?", "Bulan purnama", ["Bulan purnama", "Bulan baharu", "Bulan sabit", "Anak bulan"]),
       ("Buruj Belantik juga dikenali sebagai?", "Orion", ["Orion", "Ursa Major", "Scorpio", "Leo"]),
       ("Apakah kegunaan buruj kepada pelaut zaman dahulu?", "Menentukan arah", ["Menentukan arah", "Menangkap ikan", "Meramal cuaca esok", "Mengukur berat"])]
for i, (q, c, pool) in enumerate(mq2, 1):
    q_pilihan(L, i, "🌙", q, c, pool, "Betul! Penjelajah angkasa yang hebat!")
q_urutan(L, 10, "Susun fasa bulan mengikut urutan", ["Bulan baharu", "Bulan sabit", "Bulan separuh", "Bulan purnama"], "Hebat!", "🌘")
q_kategori(L, 11, "Asingkan objek yang mengeluarkan cahaya sendiri", "⭐ Cahaya Sendiri", "🌑 Pantulkan Cahaya",
           ["Matahari", "Bintang"], ["Bulan", "Planet"], "Betul! Bulan hanya memantulkan cahaya Matahari.")
q_pilihan(L, 12, "🌑", "Gerhana matahari berlaku apabila?", "Bulan berada antara Bumi dan Matahari",
          ["Bulan berada antara Bumi dan Matahari", "Bumi antara Bulan dan Matahari", "Matahari padam", "Bumi berhenti berputar"], "Betul!")
q_pilihan(L, 13, "🌎", "Gerhana bulan berlaku apabila?", "Bumi berada antara Matahari dan Bulan",
          ["Bumi berada antara Matahari dan Bulan", "Bulan antara Bumi dan Matahari", "Bulan padam", "Matahari bergerak"], "Betul!")

L = level(33, "10-12", "Fotosintesis", 3, "Proses tumbuhan menghasilkan makanan", "tumbuhan", "🍃")
pq = [("Apakah bahan yang diperlukan untuk fotosintesis?", "Karbon dioksida, air dan cahaya matahari", ["Karbon dioksida, air dan cahaya matahari", "Oksigen dan tanah", "Hanya air", "Hanya cahaya"]),
      ("Apakah hasil fotosintesis?", "Glukosa dan oksigen", ["Glukosa dan oksigen", "Karbon dioksida dan air", "Nitrogen", "Garam"]),
      ("Apakah pigmen hijau yang menyerap cahaya dalam daun?", "Klorofil", ["Klorofil", "Kloroplas", "Stomata", "Xilem"]),
      ("Di manakah fotosintesis berlaku dalam sel tumbuhan?", "Kloroplas", ["Kloroplas", "Nukleus", "Akar", "Bunga"]),
      ("Melalui bahagian manakah gas masuk dan keluar dari daun?", "Stomata", ["Stomata", "Akar", "Bunga", "Kulit batang"]),
      ("Tisu manakah mengangkut air dari akar ke daun?", "Xilem", ["Xilem", "Floem", "Stomata", "Klorofil"]),
      ("Tisu manakah mengangkut makanan dari daun ke seluruh tumbuhan?", "Floem", ["Floem", "Xilem", "Stomata", "Kloroplas"]),
      ("Mengapa fotosintesis penting kepada manusia?", "Membekalkan oksigen untuk pernafasan", ["Membekalkan oksigen untuk pernafasan", "Menghasilkan plastik", "Membuat hujan", "Menghasilkan besi"]),
      ("Apa berlaku kepada kadar fotosintesis jika cahaya berkurang?", "Kadar fotosintesis menurun", ["Kadar fotosintesis menurun", "Kadar meningkat", "Tiada perubahan", "Tumbuhan mati serta-merta"])]
for i, (q, c, pool) in enumerate(pq, 1):
    q_pilihan(L, i, "🍃", q, c, pool, "Betul! Kamu faham fotosintesis!")
q_urutan(L, 10, "Susun proses fotosintesis mengikut urutan",
         ["Akar serap air", "Air diangkut ke daun", "Daun serap cahaya & CO₂", "Glukosa & oksigen terhasil"], "Hebat!", "🌱")
q_padanan(L, 11, "Padankan istilah dengan fungsinya",
          [("Klorofil", "Serap cahaya"), ("Stomata", "Pertukaran gas"), ("Xilem", "Angkut air"), ("Floem", "Angkut makanan")], "Bagus!")
q_kategori(L, 12, "Asingkan bahan masuk dan hasil fotosintesis", "⬅️ Bahan Masuk", "➡️ Hasil",
           ["Karbon dioksida", "Air", "Cahaya matahari"], ["Glukosa", "Oksigen"], "Hebat!")
q_pilihan(L, 13, "🌡️", "Eksperimen: daun ditutup kertas hitam tidak menghasilkan kanji. Apakah kesimpulannya?",
          "Cahaya diperlukan untuk fotosintesis", ["Cahaya diperlukan untuk fotosintesis", "Air tidak diperlukan", "Daun sudah mati", "Kertas beracun"], "Betul! Itulah KBAT!")

L = level(34, "10-12", "Bentuk Tenaga", 4, "Jenis tenaga dan perubahannya", "tenaga", "⚡")
for i, (e, ex) in enumerate(ENERGY, 1):
    q_pilihan(L, i, "⚡", f"Contoh {ex.split(',')[0].lower()} menunjukkan tenaga apa?", e, [x[0] for x in ENERGY], f"Betul! {e}.")
tq2 = [("Apakah perubahan tenaga dalam mentol yang menyala?", "Tenaga elektrik → tenaga cahaya dan haba", ["Tenaga elektrik → tenaga cahaya dan haba", "Tenaga bunyi → elektrik", "Tenaga haba → kimia", "Tiada perubahan"]),
       ("Apakah perubahan tenaga semasa kita makan dan berlari?", "Tenaga kimia → tenaga kinetik", ["Tenaga kimia → tenaga kinetik", "Tenaga cahaya → bunyi", "Tenaga elektrik → kimia", "Tiada"]),
       ("Apakah sumber tenaga boleh diperbaharui?", "Tenaga suria", ["Tenaga suria", "Petrol", "Arang batu", "Gas asli"]),
       ("Apakah sumber tenaga tidak boleh diperbaharui?", "Petrol", ["Petrol", "Angin", "Matahari", "Air"]),
       ("Apakah perubahan tenaga dalam radio?", "Tenaga elektrik → tenaga bunyi", ["Tenaga elektrik → tenaga bunyi", "Tenaga bunyi → cahaya", "Tenaga haba → kinetik", "Tiada"]),
       ("Batu di puncak bukit mempunyai tenaga apa?", "Tenaga keupayaan", ["Tenaga keupayaan", "Tenaga kinetik", "Tenaga bunyi", "Tenaga cahaya"]),
       ("Tenaga tidak boleh dicipta atau dimusnahkan, hanya boleh?", "Ditukar dari satu bentuk ke bentuk lain", ["Ditukar dari satu bentuk ke bentuk lain", "Dibuang", "Dihilangkan", "Dijual"])]
for i, (q, c, pool) in enumerate(tq2, len(ENERGY) + 1):
    q_pilihan(L, i, "🔋", q, c, pool, "Betul! Kamu faham tenaga!")
q_kategori(L, 13, "Asingkan sumber tenaga boleh dan tidak boleh diperbaharui", "♻️ Boleh Diperbaharui", "⛽ Tidak Boleh",
           ["Suria", "Angin", "Air"], ["Petrol", "Arang batu", "Gas asli"], "Hebat!")

L = level(35, "10-12", "Pengembangan & Pengecutan", 5, "Kesan haba pada bahan", "bahan", "🌡️")
eq2 = [("Apa berlaku pada logam apabila dipanaskan?", "Mengembang", ["Mengembang", "Mengecut", "Hilang", "Membeku"]),
       ("Apa berlaku pada logam apabila disejukkan?", "Mengecut", ["Mengecut", "Mengembang", "Cair", "Meletup"]),
       ("Mengapa terdapat ruang kecil antara rel keretapi?", "Untuk membenarkan pengembangan apabila panas", ["Untuk membenarkan pengembangan apabila panas", "Supaya jimat besi", "Supaya cantik", "Untuk air mengalir"]),
       ("Mengapa wayar elektrik dipasang kendur?", "Supaya tidak putus apabila mengecut waktu sejuk", ["Supaya tidak putus apabila mengecut waktu sejuk", "Supaya cantik", "Supaya murah", "Supaya berat"]),
       ("Bagaimana termometer berfungsi?", "Cecair mengembang apabila suhu naik", ["Cecair mengembang apabila suhu naik", "Cecair mengecut apabila panas", "Kaca membesar", "Angin masuk"]),
       ("Penutup botol kaca ketat. Apakah cara terbaik membukanya?", "Rendam penutup dalam air panas supaya mengembang", ["Rendam penutup dalam air panas supaya mengembang", "Sejukkan dalam peti ais", "Pukul dengan kuat", "Biarkan sahaja"]),
       ("Susunan zarah dalam pepejal ialah?", "Rapat dan tersusun", ["Rapat dan tersusun", "Jauh dan bebas", "Bergerak laju", "Tiada zarah"]),
       ("Susunan zarah dalam gas ialah?", "Jauh dan bergerak bebas", ["Jauh dan bergerak bebas", "Rapat dan tersusun", "Tidak bergerak", "Melekat"]),
       ("Apakah proses wap air bertukar menjadi titisan air?", "Kondensasi", ["Kondensasi", "Pengewapan", "Peleburan", "Pembekuan"])]
for i, (q, c, pool) in enumerate(eq2, 1):
    q_pilihan(L, i, "🌡️", q, c, pool, "Betul! Kamu faham kesan haba!")
q_urutan(L, 10, "Susun kitaran air mengikut urutan",
         ["Air laut tersejat", "Wap air naik ke langit", "Wap menyejuk jadi awan", "Hujan turun"], "Hebat! Itulah kitaran air!", "💧")
q_kategori(L, 11, "Asingkan proses yang memerlukan haba dan membebaskan haba", "🔥 Perlu Haba", "❄️ Bebas Haba",
           ["Peleburan", "Pengewapan"], ["Pembekuan", "Kondensasi"], "Bagus!")
q_padanan(L, 12, "Padankan proses dengan maksudnya",
          [("Peleburan", "Pepejal → cecair"), ("Pengewapan", "Cecair → gas"), ("Kondensasi", "Gas → cecair"), ("Pembekuan", "Cecair → pepejal")], "Hebat!")
q_pilihan(L, 13, "🚂", "Jambatan besi dibina dengan sendi khas. Mengapa?", "Untuk membenarkan pengembangan dan pengecutan",
          ["Untuk membenarkan pengembangan dan pengecutan", "Supaya boleh bergerak", "Supaya ringan", "Supaya murah"], "Betul! KBAT yang bagus!")

L = level(36, "10-12", "Mesin Ringkas", 6, "Tuas, takal dan satah condong", "mesin", "⚙️")
for i, (m, ex) in enumerate(MACHINES, 1):
    q_pilihan(L, i, "⚙️", f"{ex.split(',')[0]} ialah contoh mesin ringkas apa?", m, [x[0] for x in MACHINES], f"Betul! {m}.")
sq = [("Apakah fungsi utama mesin ringkas?", "Memudahkan kerja", ["Memudahkan kerja", "Menambah kerja", "Menghasilkan tenaga baharu", "Menyejukkan"]),
      ("Apakah titik sokongan pada tuas dipanggil?", "Fulkrum", ["Fulkrum", "Beban", "Daya", "Gandar"]),
      ("Untuk mengangkat batu berat dengan mudah, fulkrum patut diletak?", "Dekat dengan beban", ["Dekat dengan beban", "Jauh dari beban", "Di hujung tuas", "Tidak penting"]),
      ("Mengapa jalan di kawasan bukit dibina berliku?", "Ia berfungsi sebagai satah condong untuk kurangkan daya", ["Ia berfungsi sebagai satah condong untuk kurangkan daya", "Supaya cantik", "Supaya jauh", "Supaya laju"]),
      ("Takal digunakan untuk?", "Mengangkat beban ke tempat tinggi dengan mudah", ["Mengangkat beban ke tempat tinggi dengan mudah", "Memotong kayu", "Memanaskan air", "Mengukur berat"]),
      ("Gunting menggunakan gabungan mesin ringkas apa?", "Tuas dan baji", ["Tuas dan baji", "Takal dan skru", "Roda dan gandar", "Skru sahaja"]),
      ("Mesin ringkas TIDAK boleh?", "Mengurangkan jumlah kerja yang dilakukan", ["Mengurangkan jumlah kerja yang dilakukan", "Menukar arah daya", "Memudahkan kerja", "Mengurangkan daya diperlukan"])]
for i, (q, c, pool) in enumerate(sq, len(MACHINES) + 1):
    q_pilihan(L, i, "⚙️", q, c, pool, "Betul! Jurutera cilik!")

L = level(37, "10-12", "Sistem Badan Manusia", 7, "Sistem dan organ tubuh", "badan", "🫀")
for i, (sys, organ, fn) in enumerate(BODY_SYSTEMS, 1):
    q_pilihan(L, i, "", f"Apakah organ utama bagi {sys.lower()}?", organ, [b[1] for b in BODY_SYSTEMS], f"Betul! {organ}.")
bq2 = [("Apakah fungsi sel darah merah?", "Mengangkut oksigen", ["Mengangkut oksigen", "Melawan kuman", "Membekukan darah", "Mencerna makanan"]),
       ("Apakah fungsi sel darah putih?", "Melawan kuman dan penyakit", ["Melawan kuman dan penyakit", "Mengangkut oksigen", "Menyimpan lemak", "Menghasilkan tenaga"]),
       ("Organ manakah menapis darah dan menghasilkan air kencing?", "Buah pinggang", ["Buah pinggang", "Hati", "Peparu", "Jantung"]),
       ("Berapakah bilangan bilik dalam jantung manusia?", "Empat", ["Empat", "Dua", "Tiga", "Enam"]),
       ("Apakah gas yang dibebaskan semasa hembusan nafas?", "Karbon dioksida", ["Karbon dioksida", "Oksigen", "Nitrogen", "Hidrogen"]),
       ("Di manakah penyerapan zat makanan berlaku?", "Usus kecil", ["Usus kecil", "Usus besar", "Perut", "Esofagus"]),
       ("Mengapa kita perlu bersenam?", "Menguatkan jantung dan otot", ["Menguatkan jantung dan otot", "Supaya cepat penat", "Supaya kurang tenaga", "Tiada faedah"]),
       ("Apakah kesan merokok kepada peparu?", "Merosakkan peparu dan menyukarkan pernafasan", ["Merosakkan peparu dan menyukarkan pernafasan", "Menguatkan peparu", "Tiada kesan", "Menambah oksigen"])]
for i, (q, c, pool) in enumerate(bq2, len(BODY_SYSTEMS) + 1):
    q_pilihan(L, i, "🫀", q, c, pool, "Betul! Kamu faham tubuh manusia!")

L = level(38, "10-12", "Pengelasan Haiwan", 8, "Kumpulan haiwan dan ciri-cirinya", "haiwan", "🦎")
cls = [("Mamalia", "Berbulu, menyusukan anak"), ("Burung", "Berbulu pelepah, bertelur"),
       ("Reptilia", "Bersisik, berdarah sejuk"), ("Amfibia", "Hidup di darat dan air"),
       ("Ikan", "Bernafas dengan insang"), ("Serangga", "Enam kaki, badan tiga bahagian")]
for i, (c, ciri) in enumerate(cls, 1):
    q_pilihan(L, i, "", f"Kumpulan haiwan manakah yang {ciri.lower()}?", c, [x[0] for x in cls], f"Betul! {c} — {ciri}.")
for i, (em, nm, _s, _h, _f, grp) in enumerate(random.sample([a for a in ANIMALS], 5), len(cls) + 1):
    q_pilihan(L, i, em, f"{nm} tergolong dalam kumpulan apa?", grp, [x[0] for x in cls], f"Betul! {nm} ialah {grp}.")
q_kategori(L, 12, "Asingkan haiwan bertulang belakang dan tidak bertulang belakang", "🦴 Vertebrata", "🐛 Invertebrata",
           ["Kucing", "Ikan", "Burung"], ["Lebah", "Ketam", "Cacing"], "Hebat!")
q_padanan(L, 13, "Padankan kumpulan haiwan dengan cirinya",
          [("Mamalia", "Menyusu"), ("Ikan", "Insang"), ("Burung", "Pelepah"), ("Reptilia", "Bersisik")], "Bagus!")

L = level(39, "10-12", "Elektrik & Litar", 9, "Litar siri, selari dan keselamatan", "elektrik", "💡")
cq2 = [("Dalam litar siri, jika satu mentol terbakar, apa berlaku?", "Semua mentol padam", ["Semua mentol padam", "Mentol lain kekal menyala", "Mentol jadi lebih terang", "Tiada kesan"]),
       ("Dalam litar selari, jika satu mentol terbakar, apa berlaku?", "Mentol lain kekal menyala", ["Mentol lain kekal menyala", "Semua padam", "Litar terbakar", "Bateri habis"]),
       ("Litar manakah menghasilkan cahaya lebih terang bagi setiap mentol?", "Litar selari", ["Litar selari", "Litar siri", "Kedua-duanya sama", "Bergantung warna"]),
       ("Apakah fungsi fius dalam litar rumah?", "Memutuskan litar jika arus terlalu tinggi", ["Memutuskan litar jika arus terlalu tinggi", "Menambah arus", "Menyimpan elektrik", "Menerangkan lampu"]),
       ("Mengapa kita tidak boleh sentuh suis dengan tangan basah?", "Air mengalirkan elektrik dan boleh menyebabkan renjatan", ["Air mengalirkan elektrik dan boleh menyebabkan renjatan", "Suis akan berkarat", "Lampu akan padam", "Tiada bahaya"]),
       ("Apakah simbol bagi bateri dalam gambar rajah litar?", "Garis panjang dan pendek berselang", ["Garis panjang dan pendek berselang", "Bulatan dengan silang", "Segi tiga", "Anak panah"]),
       ("Apakah yang mengalir dalam wayar litar?", "Arus elektrik", ["Arus elektrik", "Air", "Udara", "Cahaya"]),
       ("Bagaimana menjimatkan tenaga elektrik di rumah?", "Tutup lampu dan alat yang tidak digunakan", ["Tutup lampu dan alat yang tidak digunakan", "Buka semua lampu", "Guna alat lama yang boros", "Biarkan TV menyala"])]
for i, (q, c, pool) in enumerate(cq2, 1):
    q_pilihan(L, i, "💡", q, c, pool, "Betul! Kamu faham litar elektrik!")
q_kategori(L, 9, "Asingkan konduktor dan penebat", "⚡ Konduktor", "🛑 Penebat",
           ["Tembaga", "Besi", "Air garam"], ["Getah", "Plastik", "Kaca"], "Hebat!")
q_padanan(L, 10, "Padankan komponen dengan simbol/fungsinya",
          [("Bateri", "Sumber tenaga"), ("Suis", "Kawal litar"), ("Mentol", "Hasilkan cahaya"), ("Fius", "Keselamatan")], "Bagus!")
q_urutan(L, 11, "Susun langkah membina litar selamat",
         ["Sediakan komponen", "Sambung wayar ke bateri", "Sambung mentol dan suis", "Uji dengan tutup suis"], "Hebat!", "🔧")
for i, (q, c, pool) in enumerate(cq2[:2], 12):
    q_pilihan(L, i, "🔌", q, c, pool, "Betul!")

L = level(40, "10-12", "Alam Sekitar & Masa Depan", 10, "Pencemaran, kitar semula & teknologi", "alam", "🌍")
envq = [("Apakah kesan utama pembakaran terbuka?", "Pencemaran udara dan jerebu", ["Pencemaran udara dan jerebu", "Udara jadi bersih", "Hujan bertambah", "Tiada kesan"]),
        ("Apakah gas utama penyebab pemanasan global?", "Karbon dioksida", ["Karbon dioksida", "Oksigen", "Nitrogen", "Helium"]),
        ("Apakah kesan penebangan hutan secara berleluasa?", "Hakisan tanah dan kehilangan habitat", ["Hakisan tanah dan kehilangan habitat", "Udara lebih bersih", "Lebih banyak haiwan", "Hujan berkurang sahaja"]),
        ("Apakah maksud 3R dalam pengurusan sisa?", "Reduce, Reuse, Recycle", ["Reduce, Reuse, Recycle", "Run, Rest, Repeat", "Read, Write, Recycle", "Reduce, Remove, Repair"]),
        ("Bahan manakah mengambil masa paling lama untuk terurai?", "Plastik", ["Plastik", "Kertas", "Sisa makanan", "Daun"]),
        ("Apakah sumber tenaga bersih untuk masa depan?", "Tenaga suria dan angin", ["Tenaga suria dan angin", "Arang batu", "Petrol", "Diesel"]),
        ("Apakah kesan pencemaran air kepada hidupan akuatik?", "Ikan mati dan ekosistem terjejas", ["Ikan mati dan ekosistem terjejas", "Ikan membesar cepat", "Air jadi bersih", "Tiada kesan"]),
        ("Mengapa lapisan ozon penting?", "Melindungi Bumi dari sinaran ultraungu", ["Melindungi Bumi dari sinaran ultraungu", "Menghasilkan hujan", "Memberi cahaya", "Menyejukkan laut"]),
        ("Apakah amalan terbaik mengurangkan sisa plastik?", "Guna beg kitar semula berulang kali", ["Guna beg kitar semula berulang kali", "Guna beg plastik baharu setiap hari", "Bakar plastik", "Buang ke sungai"])]
for i, (q, c, pool) in enumerate(envq, 1):
    q_pilihan(L, i, "🌍", q, c, pool, "Betul! Penjaga bumi masa depan!")
q_kategori(L, 10, "Asingkan bahan boleh dan tidak boleh dikitar semula", "♻️ Boleh Kitar", "🗑️ Tidak Boleh",
           ["Botol plastik", "Kertas", "Tin aluminium"], ["Sisa makanan basi", "Tisu kotor", "Seramik pecah"], "Hebat!")
q_padanan(L, 11, "Padankan masalah dengan penyelesaiannya",
          [("Pencemaran udara", "Guna pengangkutan awam"), ("Sisa plastik", "Kitar semula"), ("Penebangan hutan", "Tanam semula pokok"), ("Pembaziran air", "Tutup paip")], "Bagus!")
q_urutan(L, 12, "Susun proses kitar semula mengikut urutan",
         ["Asingkan sisa", "Hantar ke pusat kitar semula", "Proses jadi bahan mentah", "Hasilkan produk baharu"], "Hebat!", "♻️")
q_pilihan(L, 13, "🌱", "Apakah tindakan PALING berkesan untuk kurangkan jejak karbon?",
          "Kurangkan penggunaan tenaga fosil", ["Kurangkan penggunaan tenaga fosil", "Guna lebih banyak plastik", "Bakar sampah", "Tebang pokok"], "Betul! KBAT cemerlang!")

# ============================================================
# PENGESAHAN (gagal-cepat jika kandungan tidak sah)
# ============================================================
problems = []
seen_order = {}
for (lid_, qtype, story, question, options, correct, success, order) in rows:
    key = (lid_, order)
    if key in seen_order:
        problems.append(f"order_index berulang: {lid_} #{order}")
    seen_order[key] = True

    if qtype == "pilihan":
        if not isinstance(options, list):
            problems.append(f"pilihan bukan senarai: {question[:40]}")
            continue
        if correct not in options:
            problems.append(f"jawapan betul TIADA dalam pilihan: {question[:50]} -> {correct}")
        if len(options) != len(set(options)):
            problems.append(f"pilihan berulang: {question[:50]} -> {options}")
        if len(options) < 2:
            problems.append(f"pilihan terlalu sedikit: {question[:50]}")
    elif qtype == "kategori":
        if len(options.get("buckets", [])) != 2:
            problems.append(f"kategori perlu 2 bakul: {question[:40]}")
        if not options.get("items"):
            problems.append(f"kategori tiada item: {question[:40]}")
        for it in options.get("items", []):
            if it["bucket"] not in (0, 1):
                problems.append(f"bucket tidak sah: {question[:40]}")
    elif qtype == "urutan":
        steps = options.get("steps", [])
        if len(steps) < 2:
            problems.append(f"urutan terlalu pendek: {question[:40]}")
        if len(steps) != len(set(steps)):
            problems.append(f"langkah urutan berulang: {question[:40]}")
    elif qtype == "padanan":
        pairs = options.get("pairs", [])
        if len(pairs) < 2:
            problems.append(f"padanan terlalu sedikit: {question[:40]}")
        lefts = [p["left"] for p in pairs]
        rights = [p["right"] for p in pairs]
        if len(lefts) != len(set(lefts)) or len(rights) != len(set(rights)):
            problems.append(f"padanan tidak unik: {question[:40]}")

    if not question.strip():
        problems.append(f"soalan kosong pada {lid_} #{order}")

if problems:
    print(f"❌ {len(problems)} masalah dijumpai:")
    for p_ in problems[:25]:
        print("   -", p_)
    raise SystemExit(1)
print("✅ Pengesahan lulus — semua soalan sah")

# ============================================================
# JANA SQL
# ============================================================
out = []
out.append("-- ============================================================")
out.append("-- MisiMinda: Seed Subjek SAINS")
out.append("-- Dijana oleh scripts/gen_sains.py — JANGAN EDIT MANUAL")
out.append("-- Silibus: PERMATA (2-5) / KSPK (5-6) / KSSR T1 (7-9) / KSSR T2 (10-12)")
out.append("-- ============================================================\n")

out.append("-- ---------- LEVELS ----------")
out.append("INSERT INTO public.levels (id, age_group, theme, level_number, description, quiz_mode, category, icon, subject) VALUES")
lv = []
for (i, age, theme, num, desc, cat, icon) in LEVELS:
    lv.append(f"('{i}', '{age}', '{esc(theme)}', {num}, '{esc(desc)}', 'sains', '{cat}', '{icon}', 'sains')")
out.append(",\n".join(lv) + ";\n")

out.append("-- ---------- QUESTIONS ----------")
by_level = {}
for r in rows:
    by_level.setdefault(r[0], []).append(r)

total = 0
for lvl_id, qs in by_level.items():
    qs = sorted(qs, key=lambda x: x[7])
    # pastikan order_index unik & berturutan
    vals = []
    for idx, (lid_, qtype, story, question, options, correct, success, _o) in enumerate(qs, 1):
        opts = json.dumps(options, ensure_ascii=False)
        corr = json.dumps(correct, ensure_ascii=False)
        vals.append(
            f"('{lid_}', '{qtype}', '{esc(story)}', '{esc(question)}', "
            f"'{esc(opts)}', '{esc(corr)}', '{esc(success)}', {idx})"
        )
        total += 1
    out.append("INSERT INTO public.questions (level_id, question_type, story_text, question_text, options, correct_answer, success_message, order_index) VALUES")
    out.append(",\n".join(vals) + ";\n")

os.makedirs("supabase", exist_ok=True)
with open("supabase/seed_sains.sql", "w") as f:
    f.write("\n".join(out))

print(f"✅ {len(LEVELS)} level, {total} soalan → supabase/seed_sains.sql")
by_age = {}
for (i, age, *_r) in LEVELS:
    by_age[age] = by_age.get(age, 0) + len(by_level.get(i, []))
for a in ["2-5", "5-6", "7-9", "10-12"]:
    print(f"   {a:>6} : {by_age.get(a,0)} soalan")
types = {}
for r in rows:
    types[r[1]] = types.get(r[1], 0) + 1
print("   jenis :", types)
