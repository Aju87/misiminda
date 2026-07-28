#!/usr/bin/env python3
"""
Perluas Latihan Pantas: 3 level progresif bagi Tambah-Tolak, Sifir (Darab),
dan Bahagi. Soalan setiap level BERBEZA & makin mencabar. Dapat 10/10 untuk
maju (dikawal di app). Menggantikan level tunggal lama.

Menghasilkan supabase/seed_latihan3.sql. Semua jawapan disahkan.
Jalankan: python3 scripts/gen_latihan3.py
"""
import json, random, os

random.seed(20260303)

rows = []   # (level_id, qtext, options[list str], correct str, success, order)
LEVELS = []

def lid(n): return f"50000000-0000-0000-0000-{n:012d}"
_order = {}

def level(n, age, theme, num, desc, cat):
    i = lid(n)
    LEVELS.append((i, age, theme, num, desc, cat))
    return i

def add(level_id, qtext, options, correct, success="Betul! Tepat sekali! 🌟"):
    _order[level_id] = _order.get(level_id, 0) + 1
    rows.append((level_id, qtext, [str(o) for o in options], str(correct), success, _order[level_id]))

def opts_int(correct):
    """3 distraktor unik + jawapan betul, disusun rawak."""
    cands, offsets = set(), [1, -1, 2, -2, 10, -10, 3, -3, 5, -5, 11, 9]
    random.shuffle(offsets)
    for o in offsets:
        v = correct + o
        if v >= 0 and v != correct: cands.add(v)
        if len(cands) >= 3: break
    while len(cands) < 3:
        v = correct + random.randint(-20, 20)
        if v >= 0 and v != correct: cands.add(v)
    o = list(cands)[:3] + [correct]
    random.shuffle(o)
    return o, correct

def opts_dec(correct_tenths):
    """Pilihan untuk nombor 1 titik perpuluhan (dikira dalam persepuluh)."""
    cands, offs = set(), [1, -1, 2, -2, 10, -10, 3, 5]
    random.shuffle(offs)
    for o in offs:
        v = correct_tenths + o
        if v >= 0 and v != correct_tenths: cands.add(v)
        if len(cands) >= 3: break
    while len(cands) < 3:
        v = correct_tenths + random.randint(-15, 15)
        if v >= 0 and v != correct_tenths: cands.add(v)
    o = list(cands)[:3] + [correct_tenths]
    random.shuffle(o)
    fmt = lambda t: f"{t/10:.1f}"
    return [fmt(x) for x in o], fmt(correct_tenths)

def gen(level, n, make):
    seen = set()
    tries = 0
    while _order.get(level, 0) < n and tries < n * 60:
        tries += 1
        item = make()
        if item is None: continue
        qtext, correct = item
        if qtext in seen: continue
        seen.add(qtext)
        if isinstance(correct, tuple):  # (options, correct) untuk perpuluhan
            o, c = correct
        else:
            o, c = opts_int(correct)
        add(level, qtext, o, c)

# ============================================================
# 5-6 TAHUN — Tambah & Tolak (3 level)
# ============================================================
L = level(1, "5-6", "Tambah Dalam 10", 61, "Tambah nombor hingga 10", "tambah-tolak")
def m():
    a, b = random.randint(1, 9), random.randint(1, 9)
    if a + b > 10: return None
    return (f"{a} + {b} = ?", a + b)
gen(L, 10, m)

L = level(2, "5-6", "Tolak Dalam 10", 62, "Tolak nombor hingga 10", "tambah-tolak")
def m():
    a = random.randint(2, 10); b = random.randint(1, a - 1)
    return (f"{a} − {b} = ?", a - b)
gen(L, 10, m)

L = level(3, "5-6", "Tambah & Tolak Dalam 20", 63, "Campuran tambah & tolak hingga 20", "tambah-tolak")
def m():
    if random.random() < 0.5:
        a, b = random.randint(5, 15), random.randint(2, 8)
        if a + b > 20: return None
        return (f"{a} + {b} = ?", a + b)
    a = random.randint(8, 20); b = random.randint(2, a - 1)
    return (f"{a} − {b} = ?", a - b)
gen(L, 10, m)

# ============================================================
# 7-9 TAHUN
# ============================================================
# Tambah-Tolak
L = level(11, "7-9", "Tambah & Tolak Dalam 100", 61, "Nombor 2 digit", "tambah-tolak")
def m():
    if random.random() < 0.5:
        a, b = random.randint(11, 79), random.randint(11, 79)
        if a + b > 100: return None
        return (f"{a} + {b} = ?", a + b)
    a = random.randint(30, 99); b = random.randint(11, a - 5)
    return (f"{a} − {b} = ?", a - b)
gen(L, 10, m)

L = level(12, "7-9", "Tambah & Tolak Dalam 1000", 62, "Nombor 3 digit", "tambah-tolak")
def m():
    if random.random() < 0.5:
        a, b = random.randint(120, 700), random.randint(120, 290)
        return (f"{a} + {b} = ?", a + b)
    a = random.randint(400, 999); b = random.randint(120, a - 50)
    return (f"{a} − {b} = ?", a - b)
gen(L, 10, m)

L = level(13, "7-9", "Campuran Mencabar", 63, "Tambah & tolak 3 digit bercampur", "tambah-tolak")
def m():
    a, b, c = random.randint(200, 500), random.randint(100, 300), random.randint(50, 150)
    return (f"{a} + {b} − {c} = ?", a + b - c)
gen(L, 10, m)

# Sifir (Darab)
L = level(14, "7-9", "Sifir 2, 3, 4, 5", 64, "Darab dengan 2, 3, 4, 5", "sifir")
def m():
    a = random.choice([2, 3, 4, 5]); b = random.randint(1, 10)
    return (f"{a} × {b} = ?", a * b)
gen(L, 10, m)

L = level(15, "7-9", "Sifir 6, 7, 8, 9", 65, "Darab dengan 6, 7, 8, 9", "sifir")
def m():
    a = random.choice([6, 7, 8, 9]); b = random.randint(1, 10)
    return (f"{a} × {b} = ?", a * b)
gen(L, 10, m)

L = level(16, "7-9", "Sifir Campur 2–9", 66, "Darab bercampur 2 hingga 9", "sifir")
def m():
    a, b = random.randint(2, 9), random.randint(2, 9)
    return (f"{a} × {b} = ?", a * b)
gen(L, 10, m)

# Bahagi
L = level(17, "7-9", "Bahagi 2, 3, 4, 5", 67, "Bahagi dengan 2, 3, 4, 5", "bahagi")
def m():
    d = random.choice([2, 3, 4, 5]); q = random.randint(1, 10)
    return (f"{d*q} ÷ {d} = ?", q)
gen(L, 10, m)

L = level(18, "7-9", "Bahagi 6, 7, 8, 9", 68, "Bahagi dengan 6, 7, 8, 9", "bahagi")
def m():
    d = random.choice([6, 7, 8, 9]); q = random.randint(1, 10)
    return (f"{d*q} ÷ {d} = ?", q)
gen(L, 10, m)

L = level(19, "7-9", "Bahagi Campur 2–9", 69, "Bahagi bercampur (tiada baki)", "bahagi")
def m():
    d = random.randint(2, 9); q = random.randint(2, 12)
    return (f"{d*q} ÷ {d} = ?", q)
gen(L, 10, m)

# ============================================================
# 10-12 TAHUN
# ============================================================
# Tambah-Tolak
L = level(21, "10-12", "Nombor Besar (4 Digit)", 61, "Tambah & tolak hingga 4 digit", "tambah-tolak")
def m():
    if random.random() < 0.5:
        a, b = random.randint(1200, 5000), random.randint(500, 3000)
        return (f"{a} + {b} = ?", a + b)
    a = random.randint(3000, 9999); b = random.randint(500, a - 200)
    return (f"{a} − {b} = ?", a - b)
gen(L, 10, m)

L = level(22, "10-12", "Perpuluhan Mudah", 62, "Tambah & tolak nombor perpuluhan", "tambah-tolak")
def m():
    if random.random() < 0.5:
        a, b = random.randint(11, 80), random.randint(11, 80)  # persepuluh
        return (f"{a/10:.1f} + {b/10:.1f} = ?", opts_dec(a + b))
    a = random.randint(30, 99); b = random.randint(11, a - 5)
    return (f"{a/10:.1f} − {b/10:.1f} = ?", opts_dec(a - b))
gen(L, 10, m)

L = level(23, "10-12", "Campuran KBAT", 63, "Operasi bercampur nombor besar", "tambah-tolak")
def m():
    a, b, c = random.randint(1000, 4000), random.randint(500, 2000), random.randint(300, 1000)
    return (f"{a} + {b} − {c} = ?", a + b - c)
gen(L, 10, m)

# Sifir
L = level(24, "10-12", "Sifir 6, 7, 8, 9", 64, "Darab dengan 6, 7, 8, 9", "sifir")
def m():
    a = random.choice([6, 7, 8, 9]); b = random.randint(2, 12)
    return (f"{a} × {b} = ?", a * b)
gen(L, 10, m)

L = level(25, "10-12", "Sifir 10, 11, 12", 65, "Darab dengan 10, 11, 12", "sifir")
def m():
    a = random.choice([10, 11, 12]); b = random.randint(2, 12)
    return (f"{a} × {b} = ?", a * b)
gen(L, 10, m)

L = level(26, "10-12", "Sifir Campur 6–12", 66, "Darab bercampur 6 hingga 12", "sifir")
def m():
    a, b = random.randint(6, 12), random.randint(6, 12)
    return (f"{a} × {b} = ?", a * b)
gen(L, 10, m)

# Bahagi
L = level(27, "10-12", "Bahagi Nombor Besar", 67, "Bahagi 3 digit dengan 1 digit", "bahagi")
def m():
    d = random.randint(3, 9); q = random.randint(20, 120)
    return (f"{d*q} ÷ {d} = ?", q)
gen(L, 10, m)

L = level(28, "10-12", "Bahagi 2 Digit", 68, "Bahagi dengan nombor 2 digit", "bahagi")
def m():
    d = random.randint(11, 25); q = random.randint(3, 20)
    return (f"{d*q} ÷ {d} = ?", q)
gen(L, 10, m)

L = level(29, "10-12", "Bahagi Campur", 69, "Bahagi bercampur (tiada baki)", "bahagi")
def m():
    d = random.randint(4, 20); q = random.randint(5, 30)
    return (f"{d*q} ÷ {d} = ?", q)
gen(L, 10, m)

# ============================================================
# PENGESAHAN
# ============================================================
problems = []
for (lvl, qt, opts, correct, succ, order) in rows:
    if correct not in opts:
        problems.append(f"{lvl} #{order}: jawapan '{correct}' tiada dalam pilihan {opts}")
    if len(set(opts)) != 4:
        problems.append(f"{lvl} #{order}: pilihan tidak unik {opts}")
    if len(opts) != 4:
        problems.append(f"{lvl} #{order}: perlu 4 pilihan")
# semak jumlah soalan setiap level
for (i, *_r) in LEVELS:
    if _order.get(i, 0) != 10:
        problems.append(f"{i}: {_order.get(i,0)} soalan (perlu 10)")

if problems:
    print(f"❌ {len(problems)} masalah:")
    for p in problems[:20]: print("  -", p)
    raise SystemExit(1)
print("✅ Pengesahan lulus — semua soalan sah")

# ============================================================
# JANA SQL
# ============================================================
def esc(t): return str(t).replace("'", "''")
OLD = [f"10000000-0000-0000-0000-{n:012d}" for n in (1, 2, 10, 11, 12, 20, 21, 22, 23)]

out = ["-- ============================================================",
       "-- MisiMinda: Latihan Pantas 3-Level (Tambah / Darab / Bahagi)",
       "-- Dijana oleh scripts/gen_latihan3.py — JANGAN EDIT MANUAL",
       "-- Ganti level tunggal lama; kekal Pecahan, Wang & expansion.",
       "-- ============================================================\n",
       "-- Padam level tunggal lama (soalannya turut terpadam - cascade)"]
out.append("DELETE FROM public.levels WHERE id IN (\n  " + ",\n  ".join(f"'{o}'" for o in OLD) + "\n);\n")

out.append("INSERT INTO public.levels (id, age_group, theme, level_number, description, quiz_mode, category, icon, subject) VALUES")
icons = {"tambah-tolak": "➕", "sifir": "✖️", "bahagi": "➗"}
lv = [f"('{i}', '{age}', '{esc(theme)}', {num}, '{esc(desc)}', 'latihan', '{cat}', '{icons[cat]}', 'matematik')"
      for (i, age, theme, num, desc, cat) in LEVELS]
out.append(",\n".join(lv) + ";\n")

by_level = {}
for r in rows: by_level.setdefault(r[0], []).append(r)
total = 0
for lvl, qs in by_level.items():
    qs = sorted(qs, key=lambda x: x[5])
    vals = []
    for idx, (lid_, qt, opts, correct, succ, _o) in enumerate(qs, 1):
        o = json.dumps(opts, ensure_ascii=False)
        c = json.dumps(correct, ensure_ascii=False)
        vals.append(f"('{lid_}', 'pilihan', '', '{esc(qt)}', '{esc(o)}', '{esc(c)}', '{esc(succ)}', {idx})")
        total += 1
    out.append("INSERT INTO public.questions (level_id, question_type, story_text, question_text, options, correct_answer, success_message, order_index) VALUES")
    out.append(",\n".join(vals) + ";\n")

os.makedirs("supabase", exist_ok=True)
with open("supabase/seed_latihan3.sql", "w") as f:
    f.write("\n".join(out))

print(f"✅ {len(LEVELS)} level, {total} soalan → supabase/seed_latihan3.sql")
by_cat = {}
for r in rows:
    lvl = r[0]
    cat = next(c for (i, a, t, n, d, c) in LEVELS if i == lvl)
    by_cat[cat] = by_cat.get(cat, 0) + 1
print("   ", by_cat)
