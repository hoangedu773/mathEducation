"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { QuizData } from "@/lib/data";
import { calculateScore } from "@/lib/quiz";
import { getClientIP, getGeoData } from "@/lib/ip";
import { checkBannedIP, submitScore, logIP } from "@/lib/supabase-queries";
import { useAntiCheat } from "@/lib/anti-cheat";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";
import QuestionDisplay from "./QuestionDisplay";
import OptionList from "./OptionList";
import QuizNavigation from "./QuizNavigation";
import ResultModal from "./ResultModal";
import NameInput from "./NameInput";
import BannedOverlay from "./BannedOverlay";
import AntiCheatOverlay from "./AntiCheatOverlay";

interface Props {
  date: string;
  quizData: QuizData;
  playerNameCookie: string | null;
}

export default function QuizClient({ date, quizData, playerNameCookie }: Props) {
  const router = useRouter();
  const totalQuestions = quizData.cauHoi.length;

  // --- name ---
  const [playerName, setPlayerName] = useState<string | null>(playerNameCookie);
  const [showNameInput, setShowNameInput] = useState(!playerNameCookie);

  function handleSaveName(name: string) {
    document.cookie = `player_name=${encodeURIComponent(name)};path=/;max-age=${30 * 24 * 60 * 60};SameSite=Lax`;
    setPlayerName(name);
    setShowNameInput(false);
  }

  // --- IP & banned ---
  const [banned, setBanned] = useState(false);
  const [ipChecked, setIpChecked] = useState(false);
  const [clientIP, setClientIP] = useState("");

  useEffect(() => {
    if (!playerName) return;
    (async () => {
      const ip = await getClientIP();
      setClientIP(ip);
      const isBanned = await checkBannedIP(ip);
      if (isBanned) {
        setBanned(true);
        logIP({ ip_address: ip, city: null, country: null, lat: null, lon: null, player_name: playerName, score: null, action: "banned_block" });
      }
      setIpChecked(true);
    })();
  }, [playerName]);

  // --- quiz state ---
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => new Array(totalQuestions).fill(null));
  const [startTime, setStartTime] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; duration: number; flags: string[] } | null>(null);

  useEffect(() => {
    if (ipChecked && !banned) {
      setStartTime(Date.now());
    }
  }, [ipChecked, banned]);

  // --- anti-cheat ---
  const { flags, lock } = useAntiCheat(submitted);

  // --- submit ---
  async function handleSubmit() {
    setSubmitting(true);
    const finalFlags = lock();
    const duration = Date.now() - startTime;
    if (duration < 60_000) finalFlags.push("fast_submit");

    const correctAnswers = quizData.cauHoi.map((q) => q.dung);
    const score = calculateScore(answers, correctAnswers);

    const geo = await getGeoData(clientIP);
    const vnNow = new Date(Date.now() + 7 * 60 * 60 * 1000);
    const vnDate = vnNow.toISOString().slice(0, 10);

    await submitScore({
      player_name: playerName!,
      score,
      duration,
      quiz_date: vnDate,
      ip_address: clientIP,
      city: geo.city,
      country: geo.country,
      lat: geo.lat,
      lon: geo.lon,
      flags: finalFlags,
    });

    await logIP({
      ip_address: clientIP,
      city: geo.city,
      country: geo.country,
      lat: geo.lat,
      lon: geo.lon,
      player_name: playerName!,
      score,
      action: "quiz_submit",
    });

    setResult({ score, duration, flags: finalFlags });
    setSubmitted(true);
  }

  // --- edge cases ---
  if (banned) return <BannedOverlay />;

  if (!ipChecked || !quizData) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-primary)]" />
      </div>
    );
  }

  const currentQuestion = quizData.cauHoi[currentIdx];
  const isLast = currentIdx === totalQuestions - 1;
  const allAnswered = answers.every((a) => a !== null);

  function selectOption(idx: number) {
    const next = [...answers];
    next[currentIdx] = idx;
    setAnswers(next);
  }

  // --- keyboard shortcuts ---
  useEffect(() => {
    if (showNameInput || result || submitted) return;
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const key = e.key.toLowerCase();
      if (key === "1" || key === "a") selectOption(0);
      else if (key === "2" || key === "b") selectOption(1);
      else if (key === "3" || key === "c") selectOption(2);
      else if (key === "4" || key === "d") selectOption(3);
      else if (key === "arrowleft" || key === "arrowup") { if (currentIdx > 0) setCurrentIdx((i) => i - 1); }
      else if (key === "arrowright" || key === "arrowdown") { if (currentIdx < totalQuestions - 1) setCurrentIdx((i) => i + 1); }
      else if (key === "enter") {
        if (isLast && allAnswered) handleSubmit();
        else if (currentIdx < totalQuestions - 1) setCurrentIdx((i) => i + 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showNameInput, result, submitted, currentIdx, answers, isLast, allAnswered, totalQuestions]);

  // escape key for modal
  useEffect(() => {
    if (!result) return;
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") { setResult(null); setSubmitted(false); } }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [result]);

  return (
    <>
      {showNameInput && <NameInput onSave={handleSaveName} />}

      <AntiCheatOverlay flags={flags} />

      {result && (
        <ResultModal
          score={result.score}
          total={totalQuestions}
          duration={result.duration}
          flags={result.flags}
          onClose={() => {}}
          onViewRanking={() => router.push("/ranking")}
          onRetry={() => {
            setAnswers(new Array(totalQuestions).fill(null));
            setCurrentIdx(0);
            setStartTime(Date.now());
            setSubmitted(false);
            setResult(null);
          }}
        />
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <ProgressBar current={currentIdx + 1} total={totalQuestions} />
          <Timer startTime={startTime} timeLimit={quizData.thoiGian} />
        </div>

        <QuestionDisplay question={currentQuestion.cau} />

        <OptionList
          options={currentQuestion.dapAn}
          selected={answers[currentIdx]}
          onSelect={selectOption}
        />

        <QuizNavigation
          onPrev={() => setCurrentIdx((i) => i - 1)}
          onNext={() => setCurrentIdx((i) => i + 1)}
          canGoPrev={currentIdx > 0}
          canGoNext={currentIdx < totalQuestions - 1}
          isLast={isLast}
          onSubmit={handleSubmit}
          allAnswered={allAnswered}
          submitting={submitting}
        />
      </div>
    </>
  );
}
