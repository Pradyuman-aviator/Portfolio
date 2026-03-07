"use client";

import { useState } from "react";

import { ElectricBorder } from "@/components/ui/electric-border";
import { USER } from "@/features/portfolio/data/user";
import { FlipSentences } from "@/registry/flip-sentences";
import {
  TestimonialAvatar,
  TestimonialAvatarRing,
} from "@/registry/testimonials-marquee/testimonials-marquee";

import { PronounceMyName } from "./pronounce-my-name";
import { VerifiedIcon } from "./verified-icon";

export function ProfileHeader() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="screen-line-after flex border-x border-edge">
      <div className="relative shrink-0 border-r border-edge">
        <div className="mx-0.5 my-0.75 p-1">
          <ElectricBorder
            color="#3b82f6"
            speed={1.2}
            chaos={0.15}
            borderRadius={9999}
            active={isHovered}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="transition-transform duration-300 ease-out hover:scale-[1.01]"
          >
            <TestimonialAvatar className="size-28 sm:size-40">
              <img
                className="size-full rounded-full object-cover select-none"
                alt={`${USER.displayName}'s avatar`}
                src={USER.avatar}
                fetchPriority="high"
              />
              <TestimonialAvatarRing className="ring-blue-500 dark:ring-blue-400" />
            </TestimonialAvatar>
          </ElectricBorder>
        </div>

        <a
          href="https://www.india.gov.in/"
          target="_blank"
          rel="noreferrer"
          className="absolute top-0 -left-px"
          aria-label="Visit India government portal"
        >
          {/* Flag of India */}
          <svg
            className="h-7 sm:h-9"
            viewBox="0 0 30 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Flag of India</title>

            {/* Saffron */}
            <rect width="30" height="6.67" y="0" fill="#FF9933" />
            {/* White */}
            <rect width="30" height="6.67" y="6.67" fill="#FFFFFF" />
            {/* Green */}
            <rect width="30" height="6.67" y="13.33" fill="#138808" />

            {/* Ashoka Chakra */}
            <g transform="translate(15 10)">
              {/* Outer circle */}
              <circle r="2.2" fill="none" stroke="#000080" strokeWidth="0.35" />

              {/* Center dot */}
              <circle r="0.25" fill="#000080" />

              {/* 24 spokes */}
              {Array.from({ length: 24 }).map((_, i) => (
                <line
                  key={i}
                  x1="0"
                  y1="-0.25"
                  x2="0"
                  y2="-2.2"
                  stroke="#000080"
                  strokeWidth="0.2"
                  transform={`rotate(${(360 / 24) * i})`}
                />
              ))}
            </g>
          </svg>
        </a>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex grow items-end pb-1 pl-3 sm:pl-4">
          <div className="line-clamp-1 font-mono text-[11px] text-zinc-300 select-none max-sm:hidden dark:text-zinc-800">
            {"text-3xl "}
            <span className="inline dark:hidden">text-zinc-950</span>
            <span className="hidden dark:inline">text-zinc-50</span>
            {" font-medium"}
          </div>
        </div>

        <div className="border-t border-edge">
          <div className="flex min-w-0 items-center gap-2 pl-3 sm:pl-4">
            <h1 className="min-w-0 -translate-y-px truncate text-2xl font-semibold sm:text-3xl">
              {USER.displayName}
            </h1>

            <VerifiedIcon
              className="size-4.5 shrink-0 text-info select-none"
              aria-label="Verified"
            />

            {USER.namePronunciationUrl && (
              <PronounceMyName
                namePronunciationUrl={USER.namePronunciationUrl}
              />
            )}
          </div>

          <div className="h-12 border-t border-edge py-1 pl-3 sm:h-9 sm:pl-4">
            <FlipSentences
              className="font-mono text-sm text-balance text-muted-foreground"
              variants={{
                initial: { y: -10, opacity: 0 },
                animate: { y: -1, opacity: 1 },
                exit: { y: 10, opacity: 0 },
              }}
            >
              {USER.flipSentences}
            </FlipSentences>
          </div>
        </div>
      </div>
    </div>
  );
}
