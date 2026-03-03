import { USER } from "@/features/portfolio/data/user";
import type { NavItem } from "@/types/nav";

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.APP_URL || "https://github.com/Pradyuman-aviator",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
};

export const META_THEME_COLORS = {
  light: "#f5f5f5",
  dark: "#1a1a1a",
};

export const MAIN_NAV: NavItem[] = [];

export const GITHUB_USERNAME = "Pradyuman-aviator";

export const SHOW_TESTIMONIALS = false;

export const SOURCE_CODE_GITHUB_REPO = "Pradyuman-aviator/Portfolio";
export const SOURCE_CODE_GITHUB_URL =
  "https://github.com/Pradyuman-aviator/Portfolio";

export const SPONSORSHIP_URL = ""; // not applicable right now

export const UTM_PARAMS = {
  utm_source: "pradyuman-sharma.dev",
  utm_medium: "referral",
  utm_campaign: "portfolio",
};
