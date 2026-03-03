"use client";

import { FallingText } from "@/components/ui/falling-text";
import { cn } from "@/lib/utils";

export function EngineerVow() {
    return (
        <section
            className={cn(
                "relative border-x border-edge",
                "screen-line-before screen-line-after before:-top-px after:-bottom-px",
                "bg-black/0.75 bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center [--pattern-foreground:var(--color-zinc-950)]/5 dark:bg-white/0.75 dark:[--pattern-foreground:var(--color-white)]/5"
            )}
        >
            <FallingText
                text="An engineer who remembers his vows."
                className="py-20 sm:py-28"
            />
            <div className="pb-6 text-center">
                <p className="font-mono text-xs sm:text-sm text-muted-foreground/60 tracking-widest uppercase">
                    — The Engineer&apos;s Creed
                </p>
            </div>
        </section>
    );
}
