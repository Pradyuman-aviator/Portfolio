"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function SectionReveal({
  children,
  className,
  delay = 0,
}: SectionRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("motion-reduce:transform-none", className)}
      initial={{ opacity: 0, y: 14, filter: "blur(2px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -12% 0px" }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
