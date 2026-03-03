"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

interface FallingTextProps {
    text: string;
    className?: string;
}

function FallingWord({
    word,
    index,
    totalWords,
    scrollProgress,
}: {
    word: string;
    index: number;
    totalWords: number;
    scrollProgress: ReturnType<typeof useTransform<number, number>>;
}) {
    // Stagger: each word starts and ends its animation at a slightly offset scroll range
    const wordStart = index / (totalWords + 4);
    const wordEnd = (index + 3) / (totalWords + 4);

    const y = useTransform(scrollProgress, [wordStart, wordEnd], [-100, 0]);
    const opacity = useTransform(scrollProgress, [wordStart, wordEnd], [0, 1]);
    const rotateX = useTransform(scrollProgress, [wordStart, wordEnd], [90, 0]);
    const blur = useTransform(scrollProgress, [wordStart, wordEnd], [12, 0]);
    const filterBlur = useTransform(blur, (v) => `blur(${v}px)`);

    return (
        <motion.span
            className={cn(
                "inline-block font-bold tracking-tighter text-foreground",
                "text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
            )}
            style={{
                y,
                opacity,
                rotateX,
                filter: filterBlur,
                perspective: "500px",
            }}
        >
            {word}
        </motion.span>
    );
}

export function FallingText({ text, className }: FallingTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const words = text.split(" ");

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end 0.7"],
    });

    return (
        <div ref={containerRef} className={cn("overflow-hidden py-16 px-4", className)}>
            <div className="flex flex-wrap items-center justify-center gap-x-[0.5em] gap-y-[0.3em]">
                {words.map((word, i) => (
                    <FallingWord
                        key={i}
                        word={word}
                        index={i}
                        totalWords={words.length}
                        scrollProgress={scrollYProgress}
                    />
                ))}
            </div>
        </div>
    );
}

