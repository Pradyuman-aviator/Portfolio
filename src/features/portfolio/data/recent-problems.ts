export interface RecentProblem {
  id: string;
  platform: "leetcode" | "codeforces";
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  link: string;
  date: string; // YYYY-MM-DD
}

export const RECENT_PROBLEMS: RecentProblem[] = [
  // LeetCode
  {
    id: "lc-1",
    platform: "leetcode",
    title: "Two Sum",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/two-sum/",
    date: "2026-03-02",
  },
  {
    id: "lc-2",
    platform: "leetcode",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    date: "2026-03-01",
  },
  {
    id: "lc-3",
    platform: "leetcode",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    date: "2026-02-28",
  },
  // Codeforces
  {
    id: "cf-1",
    platform: "codeforces",
    title: "Watermelon",
    difficulty: "Easy",
    link: "https://codeforces.com/problemset/problem/4/A",
    date: "2026-03-03",
  },
  {
    id: "cf-2",
    platform: "codeforces",
    title: "Theatre Square",
    difficulty: "Medium",
    link: "https://codeforces.com/problemset/problem/1/A",
    date: "2026-03-02",
  },
  {
    id: "cf-3",
    platform: "codeforces",
    title: "Way Too Long Words",
    difficulty: "Easy",
    link: "https://codeforces.com/problemset/problem/71/A",
    date: "2026-03-01",
  },
];
