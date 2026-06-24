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
  "Misi Kedai Kek Cef Cilik": { color: "#FF6B6B", bg: "#FFE8E8" },
  "Pasukan Penyelamat Haiwan Hutan": { color: "#4ECDC4", bg: "#E8FAF9" },
  "Detektif Bandaraya Futuristik": { color: "#45B7D1", bg: "#E8F6FB" },
};
