import { NextResponse } from "next/server";

const CF_HANDLE = "Aviator_Pradyuman";
const LC_USERNAME = "plnq4dc0nx";

export interface RecentProblem {
  id: string;
  platform: "leetcode" | "codeforces";
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  link: string;
  date: string;
  tags?: string[];
}

function cfRatingToDifficulty(rating: number): "Easy" | "Medium" | "Hard" {
  if (rating <= 1000) return "Easy";
  if (rating <= 1600) return "Medium";
  return "Hard";
}

async function fetchCodeforcesProblems(): Promise<RecentProblem[]> {
  try {
    const res = await fetch(
      `https://codeforces.com/api/user.status?handle=${CF_HANDLE}&from=1&count=20`,
      { next: { revalidate: 300 } } // cache for 5 minutes
    );
    const data = await res.json();

    if (data.status !== "OK") return [];

    // Filter only accepted (OK) submissions and deduplicate by problem name
    const seen = new Set<string>();
    const problems: RecentProblem[] = [];

    for (const sub of data.result) {
      if (sub.verdict !== "OK") continue;
      const key = `${sub.problem.contestId}-${sub.problem.index}`;
      if (seen.has(key)) continue;
      seen.add(key);

      problems.push({
        id: `cf-${key}`,
        platform: "codeforces",
        title: sub.problem.name,
        difficulty: cfRatingToDifficulty(sub.problem.rating || 800),
        link: `https://codeforces.com/problemset/problem/${sub.problem.contestId}/${sub.problem.index}`,
        date: new Date(sub.creationTimeSeconds * 1000)
          .toISOString()
          .split("T")[0],
        tags: sub.problem.tags,
      });

      if (problems.length >= 3) break;
    }

    return problems;
  } catch {
    return [];
  }
}

async function fetchLeetCodeProblems(): Promise<RecentProblem[]> {
  try {
    const query = `
      query recentAcSubmissions($username: String!, $limit: Int!) {
        recentAcSubmissionList(username: $username, limit: $limit) {
          id
          title
          titleSlug
          timestamp
        }
      }
    `;

    const res = await fetch("https://leetcode.com/graphql/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables: { username: LC_USERNAME, limit: 10 },
      }),
      next: { revalidate: 300 },
    });

    const data = await res.json();
    const submissions = data?.data?.recentAcSubmissionList;
    if (!submissions) return [];

    // Deduplicate by title
    const seen = new Set<string>();
    const problems: RecentProblem[] = [];

    for (const sub of submissions) {
      if (seen.has(sub.titleSlug)) continue;
      seen.add(sub.titleSlug);

      problems.push({
        id: `lc-${sub.id}`,
        platform: "leetcode",
        title: sub.title,
        difficulty: "Medium", // LeetCode recent submissions API doesn't return difficulty
        link: `https://leetcode.com/problems/${sub.titleSlug}/`,
        date: new Date(parseInt(sub.timestamp) * 1000)
          .toISOString()
          .split("T")[0],
      });

      if (problems.length >= 3) break;
    }

    return problems;
  } catch {
    return [];
  }
}

export async function GET() {
  const [codeforces, leetcode] = await Promise.all([
    fetchCodeforcesProblems(),
    fetchLeetCodeProblems(),
  ]);

  return NextResponse.json(
    { codeforces, leetcode },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    }
  );
}
