#!/usr/bin/env python3
"""
Penjana soalan "kira menegak" (pengiraan lajur) untuk semua peringkat umur.
Menghasilkan supabase/seed_kira.sql. Semua jawapan disahkan (dikira sebenar).
Jalankan: python3 scripts/gen_kira.py
"""
import json, random, os

random.seed(20260202)

rows = []   # (level_id, story, question_text, operands[list str], operator, answer str, success, order)
LEVELS = []  # (id, age, theme, num, desc, quiz_mode, category, icon)

def lid(n): return f"40000000-0000-0000-0000-{n:012d}"

def level(n, age, theme, num, desc, mode):
    i = lid(n)
    LEVELS.append((i, age, theme, num, desc, mode, "kira-menegak", "🧮"))
    return i

_order = {}
def add(level_id, qtext, operands, operator, answer, success):
    _order[level_id] = _order.get(level_id, 0) + 1
    rows.append((level_id, "", qtext, [str(o) for o in operands], operator, str(answer), success, _order[level_id]))

# ---- penjana bantuan ----
def add_sum(level_id, a, b, success="Betul! Tepat pengiraan kamu!"):
    add(level_id, "Tambah nombor ini", [a, b], "+", a + b, success)

def add_sub(level_id, a, b, success="Betul! Pandai menolak!"):
    if b > a: a, b = b, a           # elak jawapan negatif
    add(level_id, "Tolak nombor ini", [a, b], "−", a - b, success)

def add_mul(level_id, a, b, success="Hebat! Betul hasil darab!"):
    add(level_id, "Darab nombor ini", [a, b], "×", a * b, success)

def digits(x): return [int(d) for d in str(x)]

def no_carry_pair(lo, hi):
    """Jana dua nombor yang tiada 'mengumpul' pada mana-mana lajur."""
    while True:
        a = random.randint(lo, hi); b = random.randint(lo, hi)
        da, db = str(a)[::-1], str(b)[::-1]
        ok = True
        for i in range(max(len(da), len(db))):
            x = int(da[i]) if i < len(da) else 0
            y = int(db[i]) if i < len(db) else 0
            if x + y > 9: ok = False; break
        if ok: return a, b

# ============================================================
# 2-5 TAHUN (mod prasekolah) — tambah sangat mudah
# ============================================================
L = level(1, "2-5", "Tambah Mudah", 50, "Susun & tambah nombor kecil", "prasekolah")
seen = set()
while _order.get(L, 0) < 8:
    a, b = random.randint(1, 5), random.randint(1, 4)
    if a + b <= 9 and (a, b) not in seen:
        seen.add((a, b)); add_sum(L, a, b, "Yeay! Betul! 🌟")

L = level(2, "2-5", "Tambah Hingga 10", 51, "Tambah nombor sampai 10", "prasekolah")
seen = set()
while _order.get(L, 0) < 8:
    a, b = random.randint(2, 6), random.randint(2, 5)
    if a + b <= 10 and (a, b) not in seen:
        seen.add((a, b)); add_sum(L, a, b, "Hebat! Kamu pandai mengira! 🎉")

# ============================================================
# 5-6 TAHUN (mod latihan)
# ============================================================
L = level(11, "5-6", "Tambah Dalam 100", 50, "Tambah 2 digit tanpa mengumpul", "latihan")
seen = set()
while _order.get(L, 0) < 10:
    a, b = no_carry_pair(11, 88)
    if (a, b) not in seen: seen.add((a, b)); add_sum(L, a, b)

L = level(12, "5-6", "Tambah Dengan Mengumpul", 51, "Tambah 2 digit — ada mengumpul", "latihan")
seen = set()
while _order.get(L, 0) < 10:
    a, b = random.randint(15, 79), random.randint(15, 79)
    if a + b <= 99 and (a, b) not in seen and any(int(x)+int(y) > 9 for x, y in zip(str(a).zfill(2)[::-1], str(b).zfill(2)[::-1])):
        seen.add((a, b)); add_sum(L, a, b)

L = level(13, "5-6", "Tolak Dalam 100", 52, "Tolak nombor 2 digit", "latihan")
seen = set()
while _order.get(L, 0) < 10:
    a, b = random.randint(20, 99), random.randint(10, 60)
    if a >= b and (a, b) not in seen:
        seen.add((a, b)); add_sub(L, a, b)

# ============================================================
# 7-9 TAHUN (mod latihan)
# ============================================================
L = level(21, "7-9", "Tambah 3 Digit", 50, "Tambah nombor 3 digit", "latihan")
seen = set()
while _order.get(L, 0) < 10:
    a, b = random.randint(120, 899), random.randint(100, 700)
    if a + b <= 9999 and (a, b) not in seen:
        seen.add((a, b)); add_sum(L, a, b)

L = level(22, "7-9", "Tolak 3 Digit", 51, "Tolak nombor 3 digit", "latihan")
seen = set()
while _order.get(L, 0) < 10:
    a, b = random.randint(300, 999), random.randint(100, 700)
    if a >= b and (a, b) not in seen:
        seen.add((a, b)); add_sub(L, a, b)

L = level(23, "7-9", "Darab Satu Digit", 52, "Darab 2 digit dengan 1 digit", "latihan")
seen = set()
while _order.get(L, 0) < 10:
    a, b = random.randint(12, 49), random.randint(2, 9)
    if (a, b) not in seen: seen.add((a, b)); add_mul(L, a, b)

# ============================================================
# 10-12 TAHUN (mod latihan)
# ============================================================
L = level(31, "10-12", "Tambah Nombor Besar", 50, "Tambah nombor hingga 4 digit", "latihan")
seen = set()
while _order.get(L, 0) < 10:
    a, b = random.randint(1200, 8999), random.randint(500, 5000)
    if (a, b) not in seen: seen.add((a, b)); add_sum(L, a, b)

L = level(32, "10-12", "Tolak Nombor Besar", 51, "Tolak nombor besar", "latihan")
seen = set()
while _order.get(L, 0) < 10:
    a, b = random.randint(3000, 9999), random.randint(1000, 5000)
    if a >= b and (a, b) not in seen:
        seen.add((a, b)); add_sub(L, a, b)

L = level(33, "10-12", "Darab Nombor", 52, "Darab 3 digit dengan 1 digit", "latihan")
seen = set()
while _order.get(L, 0) < 10:
    a, b = random.randint(112, 499), random.randint(3, 9)
    if (a, b) not in seen: seen.add((a, b)); add_mul(L, a, b)

# ============================================================
# PENGESAHAN
# ============================================================
problems = []
for (lvl, story, qt, ops, op, ans, succ, order) in rows:
    nums = [int(x) for x in ops]
    if op == "+": expect = sum(nums)
    elif op == "−": expect = nums[0] - nums[1]
    elif op == "×": expect = nums[0] * nums[1]
    else: expect = None
    if str(expect) != ans:
        problems.append(f"{lvl} #{order}: {ops} {op} = {ans} (sepatutnya {expect})")
    if op == "−" and expect < 0:
        problems.append(f"{lvl} #{order}: jawapan negatif")
    if len(ops) != 2:
        problems.append(f"{lvl} #{order}: perlu 2 operand")

if problems:
    print(f"❌ {len(problems)} masalah:")
    for p in problems[:20]: print("  -", p)
    raise SystemExit(1)
print("✅ Pengesahan lulus — semua pengiraan betul")

# ============================================================
# JANA SQL
# ============================================================
def esc(t): return str(t).replace("'", "''")
out = ["-- ============================================================",
       "-- MisiMinda: Seed 'Kira Menegak' (pengiraan lajur)",
       "-- Dijana oleh scripts/gen_kira.py — JANGAN EDIT MANUAL",
       "-- Jenis soalan baru 'kira' untuk semua peringkat umur",
       "-- ============================================================\n",
       "INSERT INTO public.levels (id, age_group, theme, level_number, description, quiz_mode, category, icon, subject) VALUES"]
lv = [f"('{i}', '{age}', '{esc(theme)}', {num}, '{esc(desc)}', '{mode}', '{cat}', '{icon}', 'matematik')"
      for (i, age, theme, num, desc, mode, cat, icon) in LEVELS]
out.append(",\n".join(lv) + ";\n")

by_level = {}
for r in rows: by_level.setdefault(r[0], []).append(r)

total = 0
for lvl, qs in by_level.items():
    qs = sorted(qs, key=lambda x: x[7])
    vals = []
    for idx, (lid_, story, qt, ops, op, ans, succ, _o) in enumerate(qs, 1):
        opts = json.dumps({"operands": ops, "operator": op}, ensure_ascii=False)
        corr = json.dumps(ans, ensure_ascii=False)
        vals.append(f"('{lid_}', 'kira', '{esc(story)}', '{esc(qt)}', '{esc(opts)}', '{esc(corr)}', '{esc(succ)}', {idx})")
        total += 1
    out.append("INSERT INTO public.questions (level_id, question_type, story_text, question_text, options, correct_answer, success_message, order_index) VALUES")
    out.append(",\n".join(vals) + ";\n")

os.makedirs("supabase", exist_ok=True)
with open("supabase/seed_kira.sql", "w") as f:
    f.write("\n".join(out))

print(f"✅ {len(LEVELS)} level, {total} soalan → supabase/seed_kira.sql")
by_age = {}
for (i, age, *_r) in LEVELS:
    by_age[age] = by_age.get(age, 0) + len(by_level.get(i, []))
for a in ["2-5", "5-6", "7-9", "10-12"]:
    print(f"   {a:>6}: {by_age.get(a,0)} soalan")
