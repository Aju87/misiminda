export type SubscriptionStatus = "active" | "inactive" | "trial";

export interface Parent {
  id: string;
  email: string;
  name: string;
  subscription_status: SubscriptionStatus;
  pin?: string;
  created_at: string;
}

export type AgeGroup = "2-5" | "5-6" | "7-9" | "10-12";

export interface Kid {
  id: string;
  parent_id: string;
  name: string;
  age_group: AgeGroup;
  avatar_url: string;
  total_stars: number;
  created_at: string;
}

export type QuizMode = "misi" | "latihan" | "prasekolah";
export type DrillCategory = "tambah-tolak" | "sifir" | "bahagi" | "pecahan" | "wang" | "masa-ukuran" | "geometri" | "data";
export type PreschoolModule = "kenal-huruf" | "eja" | "padanan";

export interface Level {
  id: string;
  age_group: AgeGroup;
  theme: string;
  level_number: number;
  description?: string;
  quiz_mode: QuizMode;
  category?: DrillCategory | PreschoolModule;
  icon?: string;
}

export type QuestionOption = string | number;

// Jenis interaksi soalan:
//  "pilihan" = tekan satu jawapan betul (kenal huruf / pilih perkataan)
//  "susun"   = susun huruf jadi perkataan (mengeja)
//  "padanan" = padan sisi A ke B dengan garisan
export type QuestionType = "pilihan" | "susun" | "padanan";

export interface MatchPair {
  left: string;
  right: string;
}

export interface Question {
  id: string;
  level_id: string;
  story_text: string;
  question_text: string;
  // untuk pilihan/susun: senarai pilihan; untuk padanan: { pairs }
  options: QuestionOption[] | { pairs: MatchPair[] };
  // untuk pilihan/susun: jawapan tunggal; untuk padanan: senarai pasangan betul
  correct_answer: QuestionOption | MatchPair[];
  success_message: string;
  order_index: number;
  question_type?: QuestionType;
}

export interface Reward {
  id: string;
  parent_id: string;
  kid_id: string;
  reward_name: string;
  stars_required: number;
  is_redeemed: boolean;
  created_at: string;
}

export interface KidProgress {
  kid_id: string;
  level_id: string;
  questions_answered: number;
  stars_earned: number;
  completed: boolean;
  completed_at?: string;
}

export interface CHIPPaymentPayload {
  amount: number;
  currency: "MYR";
  due_at: number;
  client: {
    email: string;
    name: string;
    phone?: string;
  };
  products: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  send_email: boolean;
  callback_url: string;
  success_redirect: string;
  failure_redirect: string;
  reference: string;
}

export interface CHIPPurchase {
  id: string;
  status: "pending" | "paid" | "expired" | "cancelled";
  checkout_url: string;
  amount: number;
  reference: string;
}
