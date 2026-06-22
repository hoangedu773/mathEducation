"use client";

import { useEffect, useRef, useState } from "react";

export default function Timer({ startTime, timeLimit }: { startTime: number; timeLimit?: number }) {
  const [elapsed, setElapsed] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    function tick() {
      setElapsed(Date.now() - startTime);
      raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [startTime]);

  const totalSec = Math.floor(elapsed / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  const timeStr = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;

  const remaining = timeLimit ? timeLimit * 60 * 1000 - elapsed : Infinity;
  const isWarning = timeLimit ? remaining < 60_000 : false;

  return (
    <span className={`font-mono text-sm tabular-nums ${isWarning ? "animate-pulse text-[var(--color-danger)]" : "text-[var(--color-text-secondary)]"}`}>
      ⏱ {timeStr}
      {timeLimit && <span className="ml-1 text-xs">/ {timeLimit}:00</span>}
    </span>
  );
}
