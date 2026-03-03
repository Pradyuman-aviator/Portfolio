"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
    { text: "> Initializing system...", delay: 0 },
    { text: "> Loading core modules...", delay: 400 },
    { text: "> Mounting neural interface...", delay: 800 },
    { text: "> Compiling portfolio assets...", delay: 1200 },
    { text: "> Establishing connection...", delay: 1600 },
    { text: "> Calibrating display matrix...", delay: 2000 },
    { text: "> System online.", delay: 2400 },
];

const GREETING = "Hello, my name is Pradyuman.";

type Phase = "boot" | "dots" | "greeting" | "reveal" | "done";

export function CinematicIntro() {
    const [phase, setPhase] = useState<Phase | "check">("check");
    const [visibleLines, setVisibleLines] = useState<number>(0);
    const [typedText, setTypedText] = useState("");
    const [showCursor, setShowCursor] = useState(true);
    const [targetPosition, setTargetPosition] = useState<{ x: number; y: number } | null>(null);

    // Check sessionStorage on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const seen = sessionStorage.getItem("intro-seen");
            if (seen) {
                setPhase("done");
            } else {
                setPhase("boot");
                // Prevent scroll during intro
                document.body.style.overflow = "hidden";
            }
        }
    }, []);

    // Phase transitions
    useEffect(() => {
        if (phase === "boot") {
            // Reveal boot lines one by one
            const timers = BOOT_LINES.map((line, i) =>
                setTimeout(() => setVisibleLines(i + 1), line.delay)
            );
            // Move to dots phase after all lines shown
            const nextTimer = setTimeout(() => setPhase("dots"), 3000);
            return () => {
                timers.forEach(clearTimeout);
                clearTimeout(nextTimer);
            };
        }

        if (phase === "dots") {
            const timer = setTimeout(() => setPhase("greeting"), 1500);
            return () => clearTimeout(timer);
        }

        if (phase === "greeting") {
            let i = 0;
            const interval = setInterval(() => {
                i++;
                setTypedText(GREETING.slice(0, i));
                if (i >= GREETING.length) {
                    clearInterval(interval);
                    // Hold the greeting for a moment, then reveal
                    setTimeout(() => setPhase("reveal"), 1200);
                }
            }, 65);
            return () => clearInterval(interval);
        }

        if (phase === "reveal") {
            // Find the avatar to animate towards it
            const avatarImg = document.querySelector('img[alt*="avatar"]');
            if (avatarImg) {
                const rect = avatarImg.getBoundingClientRect();
                // Calculate center of the avatar relative to the viewport center
                const x = rect.left + rect.width / 2 - window.innerWidth / 2;
                const y = rect.top + rect.height / 2 - window.innerHeight / 2;
                setTargetPosition({ x, y });
            }

            const timer = setTimeout(() => {
                setPhase("done");
                sessionStorage.setItem("intro-seen", "true");
                document.body.style.overflow = "";
            }, 1200);
            return () => clearTimeout(timer);
        }
    }, [phase]);

    // Blinking cursor
    useEffect(() => {
        if (phase === "done") return;
        const interval = setInterval(() => setShowCursor((v) => !v), 500);
        return () => clearInterval(interval);
    }, [phase]);

    if (phase === "done" || phase === "check") return null;

    return (
        <AnimatePresence>
            {phase !== ("done" as Phase) && (
                <motion.div
                    key="cinematic-intro"
                    className="fixed inset-0 z-[100] flex items-center justify-center"
                    animate={
                        phase === "reveal"
                            ? {
                                scale: 0.05,
                                x: targetPosition ? targetPosition.x : 0,
                                y: targetPosition ? targetPosition.y : "-60vh",
                                opacity: 0,
                                borderRadius: "50%",
                            }
                            : { scale: 1, x: 0, y: 0, opacity: 1, borderRadius: "0%" }
                    }
                    transition={
                        phase === "reveal"
                            ? { duration: 1.1, ease: [0.76, 0, 0.24, 1] }
                            : { duration: 0.3 }
                    }
                    style={{ transformOrigin: "center center" }}
                >
                    {/* Background layers */}
                    <div className="absolute inset-0 bg-black" />

                    {/* Scanline effect */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.03]"
                        style={{
                            backgroundImage:
                                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
                        }}
                    />

                    {/* Dot matrix layer — fades in during dots/greeting/reveal */}
                    <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: phase === "dots" || phase === "greeting" || phase === "reveal" ? 1 : 0,
                        }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        {/* Dot pattern */}
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage:
                                    "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
                                backgroundSize: "24px 24px",
                            }}
                        />
                        {/* Radial glow pulse from center */}
                        <motion.div
                            className="absolute inset-0"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={
                                phase === "dots" || phase === "greeting" || phase === "reveal"
                                    ? { opacity: 1, scale: 1 }
                                    : {}
                            }
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            style={{
                                background:
                                    "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 70%)",
                            }}
                        />
                    </motion.div>

                    {/* Boot text */}
                    <AnimatePresence>
                        {phase === "boot" && (
                            <motion.div
                                key="boot-text"
                                className="relative z-10 flex flex-col gap-1.5 px-6 max-w-xl w-full"
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="font-mono text-sm sm:text-base"
                                        style={{
                                            color:
                                                i === BOOT_LINES.length - 1 && visibleLines === BOOT_LINES.length
                                                    ? "#4ade80"
                                                    : "#22c55e80",
                                            textShadow:
                                                i === BOOT_LINES.length - 1 && visibleLines === BOOT_LINES.length
                                                    ? "0 0 10px rgba(74, 222, 128, 0.5)"
                                                    : "0 0 6px rgba(34, 197, 94, 0.2)",
                                        }}
                                    >
                                        {line.text}
                                        {i === visibleLines - 1 && (
                                            <span
                                                className="inline-block w-2 h-4 ml-1 align-middle"
                                                style={{
                                                    backgroundColor: showCursor ? "#4ade80" : "transparent",
                                                    boxShadow: showCursor ? "0 0 8px rgba(74, 222, 128, 0.6)" : "none",
                                                }}
                                            />
                                        )}
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Greeting text */}
                    <AnimatePresence>
                        {(phase === "greeting" || phase === "reveal") && (
                            <motion.div
                                key="greeting-text"
                                className="relative z-10 flex flex-col items-center justify-center px-6"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                <div className="font-mono text-xl sm:text-3xl md:text-4xl lg:text-5xl text-white text-center tracking-tight">
                                    {typedText.split("Pradyuman").map((part, i, arr) => (
                                        <span key={i}>
                                            {part}
                                            {i < arr.length - 1 && (
                                                <span
                                                    className="font-bold"
                                                    style={{
                                                        color: "#e2e8f0",
                                                        textShadow: "0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.1)",
                                                    }}
                                                >
                                                    Pradyuman
                                                </span>
                                            )}
                                        </span>
                                    ))}
                                    <span
                                        className="inline-block w-[3px] h-[0.9em] ml-1 align-middle rounded-full"
                                        style={{
                                            backgroundColor: showCursor ? "#ffffff" : "transparent",
                                            boxShadow: showCursor ? "0 0 8px rgba(255,255,255,0.5)" : "none",
                                        }}
                                    />
                                </div>

                                {/* Subtle subtitle */}
                                <motion.p
                                    className="mt-4 font-mono text-xs sm:text-sm text-zinc-500 tracking-widest uppercase"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8, duration: 0.6 }}
                                >
                                    Developer · Engineer · Creator
                                </motion.p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Dot matrix pulse ring (during dots phase) */}
                    <AnimatePresence>
                        {phase === "dots" && (
                            <motion.div
                                key="pulse-ring"
                                className="absolute z-5"
                                initial={{ width: 0, height: 0, opacity: 0.8 }}
                                animate={{ width: "150vmax", height: "150vmax", opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                style={{
                                    borderRadius: "50%",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    boxShadow: "0 0 40px rgba(255,255,255,0.05), inset 0 0 40px rgba(255,255,255,0.02)",
                                }}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
