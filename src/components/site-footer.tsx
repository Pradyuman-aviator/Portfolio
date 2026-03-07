import { SOURCE_CODE_GITHUB_URL } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="max-w-screen overflow-x-hidden px-2 sm:px-3">
      <div className="screen-line-before mx-auto border-x border-edge pt-4 md:max-w-3xl">
        <p className="mb-1 px-4 text-center font-mono text-xs text-balance text-muted-foreground sm:text-sm">
          Built with inspiration from{" "}
          <a
            className="link"
            href="https://github.com/ncdai/chanhdai.com"
            target="_blank"
            rel="noopener"
          >
            ncdai
          </a>
        </p>

        <p className="mb-4 px-4 text-center font-mono text-xs text-balance text-muted-foreground sm:text-sm">
          Designed and developed by{" "}
          <a className="link" href="#" target="_blank" rel="noopener">
            Pradyuman Sharma
          </a>
          . The source code is available on{" "}
          <a
            className="link"
            href={SOURCE_CODE_GITHUB_URL}
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
          .
        </p>
      </div>
      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex h-2" />
      </div>
    </footer>
  );
}
