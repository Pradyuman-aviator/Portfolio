export type PortfolioSectionLink = {
  id: string;
  label: string;
};

export const PORTFOLIO_SECTION_LINKS: PortfolioSectionLink[] = [
  { id: "overview", label: "Overview" },
  { id: "social-links", label: "Links" },
  { id: "about", label: "About" },
  { id: "github-contributions", label: "GitHub" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "awards", label: "Awards" },
  { id: "recent-problems", label: "Problems" },
  { id: "last-played", label: "Music" },
];
