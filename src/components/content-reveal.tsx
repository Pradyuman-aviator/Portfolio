"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

export function ContentReveal({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(() => {
    if (typeof window !== "undefined") {
      return !!sessionStorage.getItem("intro-seen");
    }
    return false;
  });

  const checkIntro = useCallback(() => {
    if (sessionStorage.getItem("intro-seen")) {
      setIsReady(true);
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    if (isReady) return;

    const interval = setInterval(() => {
      if (checkIntro()) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isReady, checkIntro]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isReady ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ visibility: isReady ? "visible" : "hidden" }}
    >
      {children}
    </motion.div>
  );
}
