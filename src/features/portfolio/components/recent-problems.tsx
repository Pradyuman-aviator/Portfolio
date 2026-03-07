"use client";

import { useEffect, useState } from "react";

import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "./panel";

interface RecentProblem {
  id: string;
  platform: "leetcode" | "codeforces";
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  link: string;
  date: string;
  tags?: string[];
}

const difficultyColor: Record<RecentProblem["difficulty"], string> = {
  Easy: "text-green-500",
  Medium: "text-yellow-500",
  Hard: "text-red-500",
};

const platformConfig = {
  leetcode: {
    label: "LeetCode",
    icon: "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1767166219/icons8-leetcode-48_oj6sum.png",
    bgClass: "bg-amber-500/10",
  },
  codeforces: {
    label: "Codeforces",
    icon: "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1767166081/icons8-codeforces-100_epat0q.png",
    bgClass: "bg-blue-500/10",
  },
};

function ProblemItem({ problem }: { problem: RecentProblem }) {
  const config = platformConfig[problem.platform];

  return (
    <a
      href={problem.link}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-3 border-b border-edge px-4 py-3 transition-colors last:border-b-0 hover:bg-muted/50"
    >
      <div
        className={`flex size-8 shrink-0 items-center justify-center rounded-md ${config.bgClass}`}
      >
        <img
          src={config.icon}
          alt={config.label}
          className="size-5 object-contain"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-sm font-medium transition-colors group-hover:text-foreground">
          {problem.title}
        </span>
        <div className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
          <span>{problem.date}</span>
          {problem.tags && problem.tags.length > 0 && (
            <>
              <span>/</span>
              <span className="truncate">
                {problem.tags.slice(0, 2).join(", ")}
              </span>
            </>
          )}
        </div>
      </div>

      <span
        className={`shrink-0 text-xs font-semibold ${difficultyColor[problem.difficulty]}`}
      >
        {problem.difficulty}
      </span>
    </a>
  );
}

function SkeletonItem() {
  return (
    <div className="flex animate-pulse items-center gap-3 border-b border-edge px-4 py-3 last:border-b-0">
      <div className="size-8 rounded-md bg-muted/50" />
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="h-4 w-3/4 rounded bg-muted/50" />
        <div className="h-3 w-1/2 rounded bg-muted/30" />
      </div>
      <div className="h-4 w-12 rounded bg-muted/30" />
    </div>
  );
}

function PlatformColumn({
  platform,
  loading,
  items,
}: {
  platform: keyof typeof platformConfig;
  loading: boolean;
  items: RecentProblem[];
}) {
  const config = platformConfig[platform];

  return (
    <div>
      <div className="flex items-center gap-2 border-b border-edge bg-muted/30 px-4 py-2">
        <img
          src={config.icon}
          alt={config.label}
          className="size-4 object-contain"
        />
        <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          {config.label}
        </span>
      </div>

      {loading ? (
        <>
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
        </>
      ) : items.length > 0 ? (
        items.map((problem) => (
          <ProblemItem key={problem.id} problem={problem} />
        ))
      ) : (
        <div className="px-4 py-6 text-center text-xs text-muted-foreground">
          No recent submissions
        </div>
      )}
    </div>
  );
}

export function RecentProblems() {
  const [leetcode, setLeetcode] = useState<RecentProblem[]>([]);
  const [codeforces, setCodeforces] = useState<RecentProblem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProblems() {
      try {
        const res = await fetch("/api/recent-problems");
        const data = (await res.json()) as {
          leetcode?: RecentProblem[];
          codeforces?: RecentProblem[];
        };
        setLeetcode(data.leetcode || []);
        setCodeforces(data.codeforces || []);
      } catch {
        // Silently fail - section just won't show data.
      } finally {
        setLoading(false);
      }
    }

    fetchProblems();
  }, []);

  const totalCount = leetcode.length + codeforces.length;

  return (
    <Panel id="recent-problems">
      <PanelHeader>
        <PanelTitle>
          <span className="flex flex-wrap items-center gap-2">
            Recent Problems Solved
            {!loading && <PanelTitleSup>({totalCount})</PanelTitleSup>}
            <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-500">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-green-500" />
              </span>
              Live
            </span>
          </span>
        </PanelTitle>
      </PanelHeader>

      <div className="grid grid-cols-1 divide-y divide-edge sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <PlatformColumn
          platform="leetcode"
          loading={loading}
          items={leetcode}
        />
        <PlatformColumn
          platform="codeforces"
          loading={loading}
          items={codeforces}
        />
      </div>
    </Panel>
  );
}
