"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface TypingAnimationProps {
    texts: string[];
    className?: string;
    typingDelay?: number;
    erasingDelay?: number;
    pauseDelay?: number;
}

export function TypingAnimation({
    texts,
    className,
    typingDelay = 80,
    erasingDelay = 40,
    pauseDelay = 1500,
}: TypingAnimationProps) {
    const prefix = "Hello, my name is ";
    const [displayedText, setDisplayedText] = useState(prefix);
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const i = loopNum % texts.length;
        const fullText = texts[i];

        if (isDeleting) {
            if (displayedText === prefix) {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            } else {
                timeout = setTimeout(() => {
                    setDisplayedText(fullText.substring(0, displayedText.length - 1));
                }, erasingDelay);
            }
        } else {
            if (displayedText === fullText) {
                timeout = setTimeout(() => {
                    setIsDeleting(true);
                }, pauseDelay);
            } else {
                timeout = setTimeout(() => {
                    setDisplayedText(fullText.substring(0, displayedText.length + 1));
                }, typingDelay);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, loopNum, texts, typingDelay, erasingDelay, pauseDelay, prefix]);

    return (
        <div className={cn("text-2xl sm:text-4xl font-semibold tracking-tight text-foreground flex items-center justify-center", className)}>
            <span>{displayedText}</span>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 0.5,
                    ease: "easeInOut",
                }}
                className={cn(
                    "inline-block w-[3px] h-[1em] bg-current ml-[2px] rounded-full"
                )}
            />
        </div>
    );
}
