"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useAntiCheat(submitted: boolean) {
  const [flags, setFlags] = useState<string[]>([]);
  const tabLeaveCount = useRef(0);
  const mouseLeaveTotal = useRef(0);
  const mouseLeaveStart = useRef(0);
  const locked = useRef(false);

  const addFlag = useCallback((flag: string) => {
    if (locked.current) return;
    setFlags((prev) => (prev.includes(flag) ? prev : [...prev, flag]));
  }, []);

  useEffect(() => {
    if (submitted) {
      locked.current = true;
      return;
    }

    function onVisChange() {
      if (document.visibilityState === "hidden") {
        tabLeaveCount.current++;
        if (tabLeaveCount.current > 2) addFlag("tab_leave");
      }
    }
    function onCopy() { addFlag("copy_paste"); }
    function onPaste() { addFlag("copy_paste"); }
    function onContext(e: Event) { e.preventDefault(); addFlag("copy_paste"); }
    function onMouseLeave() { mouseLeaveStart.current = Date.now(); }
    function onMouseEnter() {
      if (mouseLeaveStart.current) {
        mouseLeaveTotal.current += Date.now() - mouseLeaveStart.current;
        if (mouseLeaveTotal.current > 10_000) addFlag("mouse_leave");
        mouseLeaveStart.current = 0;
      }
    }

    document.addEventListener("visibilitychange", onVisChange);
    document.addEventListener("copy", onCopy);
    document.addEventListener("paste", onPaste);
    document.addEventListener("contextmenu", onContext);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.removeEventListener("visibilitychange", onVisChange);
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("paste", onPaste);
      document.removeEventListener("contextmenu", onContext);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [submitted, addFlag]);

  function lock() {
    locked.current = true;
    return flags;
  }

  return { flags, lock };
}
