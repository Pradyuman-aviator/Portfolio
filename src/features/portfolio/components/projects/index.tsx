import {
  IconBrowser,
  IconCloud,
  IconCode,
  IconDatabase,
  IconShieldLock,
  IconTerminal2,
} from "@tabler/icons-react";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

import { PROJECTS } from "../../data/projects";
import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "../panel";

const ICONS = [
  IconShieldLock,
  IconBrowser,
  IconDatabase,
  IconCode,
  IconCloud,
  IconTerminal2,
];

export function Projects() {
  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitle>
          Projects
          <PanelTitleSup>({PROJECTS.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <BentoGrid className="mx-auto w-full max-w-4xl">
        {PROJECTS.map((project, index) => {
          const Icon = ICONS[index % ICONS.length];

          return (
            <BentoGridItem
              key={project.id}
              title={
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:underline"
                >
                  {project.title}
                </a>
              }
              description={project.description?.split("\n")[0] ?? ""}
              header={
                <div className="relative flex min-h-[6.25rem] w-full items-center justify-center overflow-hidden rounded-lg border border-edge bg-muted/40 p-4">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,color-mix(in_oklab,var(--color-border)_35%,transparent),transparent_55%)]" />
                  <div className="relative z-1 flex flex-wrap justify-center gap-2">
                    {project.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-edge bg-background/90 px-2 py-1 font-mono text-[11px] text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                    {project.skills.length > 3 && (
                      <span className="rounded-full border border-edge bg-background/90 px-2 py-1 font-mono text-[11px] text-muted-foreground">
                        +{project.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              }
              icon={<Icon className="text-muted-foreground" />}
              className={index === 0 || index === 3 ? "md:col-span-2" : ""}
            />
          );
        })}
      </BentoGrid>
    </Panel>
  );
}
