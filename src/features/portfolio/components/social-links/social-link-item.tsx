import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";

import type { SocialLink } from "@/features/portfolio/types/social-links";
import { cn } from "@/lib/utils";

export function SocialLinkItem({ icon, title, description, href }: SocialLink) {
  return (
    <a
      className={cn(
        "group/link flex cursor-pointer items-center gap-3 p-4 pr-3 transition-[background-color,translate] duration-200 ease-out hover:-translate-y-px hover:bg-accent2",
        "focus-visible:-translate-y-px focus-visible:bg-accent2 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none",
        "max-sm:screen-line-before max-sm:screen-line-after",
        "sm:nth-[2n+1]:screen-line-before sm:nth-[2n+1]:screen-line-after"
      )}
      href={href}
      target="_blank"
      rel="noopener"
    >
      <div className="relative size-11 shrink-0 sm:size-12">
        <Image
          className="rounded-xl select-none corner-squircle supports-corner-shape:rounded-[50%]"
          src={icon}
          alt={title}
          width={48}
          height={48}
          quality={100}
          unoptimized
        />
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10 corner-squircle ring-inset dark:ring-white/15 supports-corner-shape:rounded-[50%]" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-medium underline-offset-4 group-hover/link:underline group-focus-visible/link:underline">
          {title}
        </h3>

        {description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      <ArrowUpRightIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
    </a>
  );
}
