import dynamic from "next/dynamic";

import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const ScrollToTop = dynamic(() =>
  import("@/components/scroll-to-top").then((mod) => mod.ScrollToTop)
);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only fixed top-3 left-3 z-[70] rounded-md border border-edge bg-background px-3 py-2 font-mono text-xs text-foreground focus:not-sr-only focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <SiteHeader />

      <main
        id="main-content"
        className="mx-auto w-full max-w-screen overflow-x-clip px-2 sm:px-3"
      >
        {children}
      </main>

      <SiteFooter />
      <ScrollToTop />
    </>
  );
}
