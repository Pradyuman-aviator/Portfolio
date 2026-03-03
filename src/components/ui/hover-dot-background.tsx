"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

export const HoverDotBackground = ({
  className,
  children,
  containerClassName,
}: {
  className?: string;
  children?: React.ReactNode;
  containerClassName?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  function handleInput({
    currentTarget,
    clientX,
    clientY,
  }: {
    currentTarget: EventTarget & HTMLDivElement;
    clientX: number;
    clientY: number;
  }) {
    if (!currentTarget) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group relative flex h-full w-full items-center justify-center bg-white bg-dot-black pt-2 dark:bg-black dark:bg-dot-white",
        containerClassName
      )}
      onMouseMove={(e) =>
        handleInput({
          currentTarget: e.currentTarget,
          clientX: e.clientX,
          clientY: e.clientY,
        })
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchMove={(e) => {
        if (e.touches.length > 0) {
          handleInput({
            currentTarget: e.currentTarget,
            clientX: e.touches[0].clientX,
            clientY: e.touches[0].clientY,
          });
        }
      }}
      onTouchStart={(e) => {
        if (e.touches.length > 0) {
          handleInput({
            currentTarget: e.currentTarget,
            clientX: e.touches[0].clientX,
            clientY: e.touches[0].clientY,
          });
        }
        setIsHovered(true);
      }}
      onTouchEnd={() => setIsHovered(false)}
      onTouchCancel={() => setIsHovered(false)}
    >
      <div className="pointer-events-none absolute inset-0 bg-white dark:bg-black" />
      <motion.div
        className={cn(
          "pointer-events-none absolute inset-0 bg-dot-thick-white transition duration-300 dark:bg-dot-thick-white",
          isHovered ? "opacity-100" : "opacity-0"
        )}
        style={{
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      />

      <div className={cn("relative z-20 w-full", className)}>{children}</div>
    </div>
  );
};
