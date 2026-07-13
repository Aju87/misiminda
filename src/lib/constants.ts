export const SUBSCRIPTION_PLANS = {
  lifetime: {
    id: "lifetime",
    name: "Seumur Hidup",
    price: 2900, // in sen (RM29.00)
    displayPrice: "RM29.00",
    badge: "Bayar Sekali, Guna Selamanya",
    features: [
      "Akses semua 3 peringkat umur",
      "Sehingga 4 profil kanak-kanak",
      "Sistem Ganjaran Ibu Bapa",
      "Penjejak kemajuan terperinci",
      "Semua tahap & misi akan datang",
      "Tiada bayaran bulanan",
    ],
  },
} as const;

// Email admin — hanya akaun ini nampak tab "Ads" dalam dashboard
export const ADMIN_EMAIL =
  process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "hnrichhq@gmail.com";

export const AVATARS = [
  { id: "rocket", emoji: "🚀", color: "#FFB800" },
  { id: "star", emoji: "⭐", color: "#FF6B6B" },
  { id: "brain", emoji: "🧠", color: "#4ECDC4" },
  { id: "robot", emoji: "🤖", color: "#45B7D1" },
  { id: "lion", emoji: "🦁", color: "#F9A826" },
  { id: "unicorn", emoji: "🦄", color: "#FF6B6B" },
  { id: "dragon", emoji: "🐉", color: "#4ECDC4" },
  { id: "owl", emoji: "🦉", color: "#FFB800" },
] as const;

export const AGE_GROUPS = [
  { value: "2-5", label: "2 - 5 Tahun", grade: "Prasekolah · Si Kecil", emoji: "🐣" },
  { value: "5-6", label: "5 - 6 Tahun", grade: "KSPK", emoji: "🌱" },
  { value: "7-9", label: "7 - 9 Tahun", grade: "KSSR Tahap 1", emoji: "🌿" },
  { value: "10-12", label: "10 - 12 Tahun", grade: "KSSR Tahap 2", emoji: "🌳" },
] as const;

// Modul prasekolah (umur 2-5) untuk "Kuiz Si Kecil"
export const PRESCHOOL_MODULES = [
  {
    id: "kenal-huruf",
    emoji: "🔤",
    title: "Mengenal Huruf",
    desc: "Kenal & sebut huruf A hingga Z sambil main.",
    color: "#FF6B6B",
    bg: "#FFE8E8",
  },
  {
    id: "eja",
    emoji: "✏️",
    title: "Belajar Mengeja",
    desc: "Susun huruf jadi perkataan mudah.",
    color: "#4ECDC4",
    bg: "#E8FAF9",
  },
  {
    id: "padanan",
    emoji: "🧩",
    title: "Kuiz Si Kecil",
    desc: "Padankan gambar, huruf & perkataan.",
    color: "#9B59B6",
    bg: "#F3E8FF",
  },
] as const;

export const LEVEL_THEMES: Record<string, { color: string; bg: string }> = {
  // RAGA (kuning/oren)
  "RAGA: Selamatkan OBI!": { color: "#FFB800", bg: "#FFF8E1" },
  "RAGA: Perang Angkasa!": { color: "#FF8C00", bg: "#FFF3E0" },
  "RAGA: Kuasa Elemen!": { color: "#F9A826", bg: "#FFF5E0" },
  // Agen Nur (merah/biru)
  "Agen Nur: Tangkap Pencuri!": { color: "#FF4757", bg: "#FFE8EA" },
  "Agen Nur: Operasi Rahsia!": { color: "#E84393", bg: "#FFE0F2" },
  "Agen Nur: Misi Mustahil!": { color: "#C0392B", bg: "#FDECEA" },
  // Kembar Ria (hijau/oren)
  "Kembar Ria: Hari Raya Gembira!": { color: "#27AE60", bg: "#E0F5E9" },
  "Kembar Ria: Musim Periksa!": { color: "#16A085", bg: "#E0F5F1" },
  "Kembar Ria: Juara Sekolah!": { color: "#1ABC9C", bg: "#E0FAF4" },
  // Latihan themes (sebelum)
  "Tambah dalam 10": { color: "#FF6B6B", bg: "#FFE8E8" },
  "Tolak dalam 10": { color: "#F9A826", bg: "#FFF5E1" },
  "Tambah & Tolak dalam 100": { color: "#4ECDC4", bg: "#E8FAF9" },
  "Sifir Darab 2, 3, 4, 5": { color: "#FFB800", bg: "#FFF8E1" },
  "Bahagi dengan 2, 3, 4, 5": { color: "#26D182", bg: "#E0FFF0" },
  "Tambah & Tolak Nombor Besar": { color: "#45B7D1", bg: "#E8F6FB" },
  "Sifir Darab 6, 7, 8, 9": { color: "#9B59B6", bg: "#F3E8FF" },
  "Sifir Darab 10, 11, 12": { color: "#1E90FF", bg: "#E0F0FF" },
  "Bahagi Nombor Besar": { color: "#27AE60", bg: "#E0F5E9" },
  "Pecahan Asas": { color: "#E84393", bg: "#FFE0F2" },
  "Wang & Harga": { color: "#FF8C00", bg: "#FFF3E0" },
};
