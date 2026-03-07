import Link from "next/link";

import { CommandMenu } from "@/components/command-menu";
import { DesktopNav } from "@/components/desktop-nav";
import { NavItemGitHub } from "@/components/nav-item-github";
import { MAIN_NAV } from "@/config/site";
import { cn } from "@/lib/utils";

import { SiteHeaderMark } from "./site-header-mark";
import { SiteHeaderWrapper } from "./site-header-wrapper";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const hasMainNav = MAIN_NAV.length > 0;

  return (
    <SiteHeaderWrapper
      className={cn(
        "sticky top-0 z-50 max-w-screen overflow-x-hidden bg-background px-2 pt-2 sm:px-3",
        "data-[affix=true]:shadow-[0_0_16px_0_black]/8 dark:data-[affix=true]:shadow-[0_0_16px_0_black]",
        "supports-[backdrop-filter]:data-[affix=true]:bg-background/90 supports-[backdrop-filter]:data-[affix=true]:backdrop-blur-md",
        "not-dark:data-[affix=true]:**:data-header-container:after:bg-border",
        "transition-[box-shadow,background-color] duration-300"
      )}
    >
      <div
        className="screen-line-before screen-line-after mx-auto flex h-11 items-center justify-between gap-2 border-x border-edge px-2 after:z-1 after:transition-[background-color] sm:h-12 sm:gap-4 md:max-w-3xl"
        data-header-container
      >
        <Link
          className="has-data-[visible=false]:pointer-events-none [&_svg]:h-7 sm:[&_svg]:h-8"
          href="/"
          aria-label="Home"
        >
          <SiteHeaderMark />
        </Link>

        <div className="flex-1" />

        {hasMainNav && <DesktopNav items={MAIN_NAV} />}

        <div className="flex items-center gap-1.5 sm:gap-2">
          <CommandMenu />
          <span className="mx-1 h-4 w-px bg-border sm:mx-2" />
          <NavItemGitHub />
          <span
            className={cn(
              "mx-1 h-4 w-px bg-border sm:mx-2",
              !hasMainNav && "hidden"
            )}
          />
          <ThemeToggle />
        </div>
      </div>
    </SiteHeaderWrapper>
  );
}
