import React from "react";

import { SOCIAL_LINKS } from "../../data/social-links";
import { Panel } from "../panel";
import { SocialLinkItem } from "./social-link-item";

export function SocialLinks() {
  return (
    <Panel id="social-links">
      <h2 className="sr-only">Social Links</h2>

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-2 max-sm:hidden sm:grid-cols-2 sm:gap-4">
          <div className="border-r border-edge" />
          <div className="border-l border-edge" />
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
          {SOCIAL_LINKS.map((link, index) => {
            return <SocialLinkItem key={index} {...link} />;
          })}
        </div>
      </div>
    </Panel>
  );
}
