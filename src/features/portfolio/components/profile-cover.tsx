import { USER } from "@/features/portfolio/data/user";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { cn } from "@/lib/utils";

export function ProfileCover() {
  return (
    <div
      className={cn(
        "aspect-2/1 border-x border-edge select-none sm:aspect-3/1",
        "flex w-full items-center justify-center text-black px-4 text-center dark:text-white",
        "screen-line-before screen-line-after before:-top-px after:-bottom-px",
        "bg-black/0.75 bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center [--pattern-foreground:var(--color-zinc-950)]/5 dark:bg-white/0.75 dark:[--pattern-foreground:var(--color-white)]/5"
      )}
    >
      <TypingAnimation
        texts={[
          `Hello, my name is ${USER.firstName}.`,
          `Hello, my name is a Developer.`,
          `Hello, my name is an Engineer.`,
        ]}
        className="font-mono text-base sm:text-2xl md:text-3xl lg:text-4xl whitespace-pre-wrap break-words"
      />
    </div>
  );
}
