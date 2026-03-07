"use client";

import { useEffect, useState } from "react";

import { PORTFOLIO_SECTION_LINKS } from "@/features/portfolio/constants/sections";
import { cn } from "@/lib/utils";

export function SectionJumpNav({ className }: { className?: string }) {
  const [activeId, setActiveId] = useState<string>(
    PORTFOLIO_SECTION_LINKS[0].id
  );

  useEffect(() => {
    const sections = PORTFOLIO_SECTION_LINKS.map(({ id }) =>
      document.getElementById(id)
    );
    const availableSections = sections.filter((section) => section !== null);

    if (availableSections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (activeEntry?.target.id) {
          setActiveId(activeEntry.target.id);
        }
      },
      {
        rootMargin: "-32% 0px -52% 0px",
        threshold: [0.15, 0.3, 0.45, 0.6],
      }
    );

    availableSections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={cn(
        "screen-line-after border-x border-edge px-2 py-2",
        className
      )}
    >
      <nav
        aria-label="Section navigation"
        className="no-scrollbar flex snap-x snap-mandatory items-center gap-1 overflow-x-auto sm:flex-wrap sm:justify-center"
      >
        {PORTFOLIO_SECTION_LINKS.map((section) => {
          const isActive = section.id === activeId;

          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              data-active={isActive}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "snap-start rounded-md border border-transparent px-2.5 py-1 font-mono text-xs text-muted-foreground transition-[color,background-color,border-color,translate] duration-200 ease-out",
                "hover:bg-accent2 hover:text-foreground",
                "focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none",
                "data-[active=true]:-translate-y-px data-[active=true]:border-edge data-[active=true]:bg-accent data-[active=true]:text-foreground"
              )}
            >
              {section.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
