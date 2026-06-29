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
  { value: "5-6", label: "5 - 6 Tahun", grade: "KSPK", emoji: "🌱" },
  { value: "7-9", label: "7 - 9 Tahun", grade: "KSSR Tahap 1", emoji: "🌿" },
  { value: "10-12", label: "10 - 12 Tahun", grade: "KSSR Tahap 2", emoji: "🌳" },
] as const;

export const LEVEL_THEMES: Record<string, { color: string; bg: string }> = {
  // BoBoiBoy (kuning/oren)
  "BoBoiBoy: Selamatkan Ochobot!": { color: "#FFB800", bg: "#FFF8E1" },
  "BoBoiBoy Galaxy: Perang Angkasa!": { color: "#FF8C00", bg: "#FFF3E0" },
  "BoBoiBoy: Kuasa Elemen!": { color: "#F9A826", bg: "#FFF5E0" },
  // Ejen Ali (merah/biru)
  "Ejen Ali: Tangkap Pencuri!": { color: "#FF4757", bg: "#FFE8EA" },
  "Ejen Ali: Operasi Rahsia!": { color: "#E84393", bg: "#FFE0F2" },
  "Ejen Ali: Misi Mustahil!": { color: "#C0392B", bg: "#FDECEA" },
  // Upin & Ipin (hijau/oren)
  "Upin & Ipin: Hari Raya Gembira!": { color: "#27AE60", bg: "#E0F5E9" },
  "Upin & Ipin: Musim Periksa!": { color: "#16A085", bg: "#E0F5F1" },
  "Upin & Ipin: Juara Sekolah!": { color: "#1ABC9C", bg: "#E0FAF4" },
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
