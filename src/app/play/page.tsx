"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useGameData } from "@/hooks/useGameData";
import { KidSelector } from "@/components/game/KidSelector";
import { LevelMap } from "@/components/game/LevelMap";
import { QuizCard } from "@/components/game/QuizCard";
import { ResultScreen } from "@/components/game/ResultScreen";
import type { Kid, Level, Question, QuestionOption } from "@/types";

type Screen = "select-kid" | "level-map" | "quiz" | "result";

function PlayContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const kidParam = searchParams.get("kid");

  const [screen, setScreen] = useState<Screen>(kidParam ? "level-map" : "select-kid");
  const [kids, setKids] = useState<Kid[]>([]);
  const [selectedKid, setSelectedKid] = useState<Kid | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [loadingKids, setLoadingKids] = useState(true);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const supabase = createClient();

  const { levels, loading: levelsLoading, fetchQuestions, saveProgress, getProgress } =
    useGameData(selectedKid?.id, selectedKid?.age_group);

  // Load kids on mount
  useEffect(() => {
    async function loadKids() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace("/auth"); return; }

      const { data: parentData } = await supabase
        .from("parents")
        .select("subscription_status")
        .eq("id", user.id)
        .single();

      if (parentData?.subscription_status !== "active") {
        router.replace("/pricing");
        return;
      }

      const { data: kidsData } = await supabase
        .from("kids")
        .select("*")
        .eq("parent_id", user.id)
        .order("created_at");

      const kidsList = kidsData ?? [];
      setKids(kidsList);

      // If kid param passed, auto-select
      if (kidParam && kidsList.length > 0) {
        const kid = kidsList.find((k) => k.id === kidParam);
        if (kid) {
          setSelectedKid(kid);
          setScreen("level-map");
        }
      }
      setLoadingKids(false);
    }
    loadKids();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSelectKid(kid: Kid) {
    setSelectedKid(kid);
    setScreen("level-map");
  }

  async function handleSelectLevel(level: Level) {
    setSelectedLevel(level);
    setLoadingQuestions(true);
    const qs = await fetchQuestions(level.id);
    setQuestions(qs);
    setCurrentIndex(0);
    setCorrectCount(0);
    setLoadingQuestions(false);
    setScreen("quiz");
  }

  function handleAnswer(correct: boolean, _selected: QuestionOption) {
    const newCorrect = correct ? correctCount + 1 : correctCount;

    if (currentIndex + 1 >= questions.length) {
      // Quiz done — calculate stars and save
      const total = questions.length;
      const pct = newCorrect / total;
      const stars = pct === 1 ? 10 : pct >= 0.7 ? 7 : pct >= 0.5 ? 5 : 3;

      saveProgress(selectedLevel!.id, stars, pct >= 0.7);
      setCorrectCount(newCorrect);
      setScreen("result");
    } else {
      setCorrectCount(newCorrect);
      setCurrentIndex((i) => i + 1);
    }
  }

  function handlePlayAgain() {
    setCurrentIndex(0);
    setCorrectCount(0);
    setScreen("quiz");
  }

  function handleBackToMap() {
    setCurrentIndex(0);
    setCorrectCount(0);
    setSelectedLevel(null);
    setScreen("level-map");
  }

  async function handleNextLevel() {
    if (!selectedLevel) return;
    const currentIdx = levels.findIndex((l) => l.id === selectedLevel.id);
    const next = levels[currentIdx + 1];
    if (!next) return;
    await handleSelectLevel(next);
  }

  // Calculate stars for result
  const pct = questions.length > 0 ? correctCount / questions.length : 0;
  const starsEarned = pct === 1 ? 10 : pct >= 0.7 ? 7 : pct >= 0.5 ? 5 : 3;
  const nextLevel = selectedLevel
    ? levels[levels.findIndex((l) => l.id === selectedLevel.id) + 1]
    : undefined;

  if (loadingKids) {
    return (
      <div className="min-h-screen bg-[#FFFDF2] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="text-6xl"
        >
          🧠
        </motion.div>
      </div>
    );
  }

  if (kids.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFFDF2] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">👶</div>
          <h1 className="font-black text-2xl uppercase mb-2">Tiada Profil Kanak-Kanak</h1>
          <p className="font-semibold text-gray-600 mb-6">
            Tambah profil kanak-kanak dari dashboard ibu bapa dulu.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="border-4 border-black rounded-xl px-6 py-3 bg-[#FFB800] font-black uppercase"
            style={{ boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }}
          >
            Pergi Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {screen === "select-kid" && (
        <motion.div key="select-kid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <KidSelector kids={kids} onSelect={handleSelectKid} />
        </motion.div>
      )}

      {screen === "level-map" && selectedKid && (
        <motion.div key="level-map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {levelsLoading ? (
            <div className="min-h-screen bg-[#FFFDF2] flex items-center justify-center">
              <div className="text-4xl animate-pulse">🗺️</div>
            </div>
          ) : (
            <LevelMap
              kid={selectedKid}
              levels={levels}
              getProgress={getProgress}
              onSelectLevel={handleSelectLevel}
              onBack={() => setScreen("select-kid")}
            />
          )}
        </motion.div>
      )}

      {screen === "quiz" && selectedKid && selectedLevel && (
        <motion.div
          key="quiz"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-[#FFFDF2]"
        >
          {/* Quiz header */}
          <div className="border-b-4 border-black bg-[#FFB800] px-4 py-3">
            <div className="max-w-xl mx-auto flex items-center justify-between">
              <button
                onClick={handleBackToMap}
                className="border-3 border-black rounded-xl px-3 py-1.5 font-black text-sm bg-white hover:bg-gray-100"
              >
                ← Keluar
              </button>
              <div className="font-black text-sm uppercase truncate max-w-[200px]">
                {selectedLevel.theme}
              </div>
              <div className="flex items-center gap-1 bg-white border-2 border-black rounded-xl px-3 py-1">
                <span>⭐</span>
                <span className="font-black text-sm">{selectedKid.total_stars}</span>
              </div>
            </div>
          </div>

          {loadingQuestions ? (
            <div className="flex items-center justify-center h-[80vh]">
              <div className="text-5xl animate-bounce">⏳</div>
            </div>
          ) : questions.length === 0 ? (
            <div className="flex items-center justify-center h-[80vh] text-center px-4">
              <div>
                <p className="text-5xl mb-4">🚧</p>
                <p className="font-black text-xl">Soalan belum tersedia.</p>
                <button onClick={handleBackToMap} className="mt-4 font-bold underline">
                  Kembali
                </button>
              </div>
            </div>
          ) : (
            <div className="px-4 py-8">
              <AnimatePresence mode="wait">
                <QuizCard
                  key={`${selectedLevel.id}-${currentIndex}`}
                  question={questions[currentIndex]}
                  questionNumber={currentIndex + 1}
                  totalQuestions={questions.length}
                  onAnswer={handleAnswer}
                />
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      )}

      {screen === "result" && selectedKid && selectedLevel && (
        <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <ResultScreen
            kid={selectedKid}
            level={selectedLevel}
            correct={correctCount}
            total={questions.length}
            starsEarned={starsEarned}
            nextLevel={nextLevel}
            onPlayAgain={handlePlayAgain}
            onNextLevel={handleNextLevel}
            onBackToMap={handleBackToMap}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function PlayPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FFFDF2] flex items-center justify-center">
        <div className="text-6xl animate-pulse">🧠</div>
      </div>
    }>
      <PlayContent />
    </Suspense>
  );
}
