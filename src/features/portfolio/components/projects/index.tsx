import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { IconCode, IconShieldLock, IconTerminal2, IconDatabase, IconCloud, IconBrowser } from "@tabler/icons-react";

import { PROJECTS } from "../../data/projects";
import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "../panel";

const icons = [
  <IconShieldLock key="1" className="h-4 w-4 text-neutral-500" />,
  <IconBrowser key="2" className="h-4 w-4 text-neutral-500" />,
  <IconDatabase key="3" className="h-4 w-4 text-neutral-500" />,
  <IconDatabase key="4" className="h-4 w-4 text-neutral-500" />,
  <IconCloud key="5" className="h-4 w-4 text-neutral-500" />,
  <IconTerminal2 key="6" className="h-4 w-4 text-neutral-500" />,
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

      <BentoGrid className="max-w-4xl mx-auto my-4">
        {PROJECTS.map((project, i) => (
          <BentoGridItem
            key={project.id}
            title={
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {project.title}
              </a>
            }
            description={project.description?.split("\n")[0] ?? ""}
            header={
              <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-[linear-gradient(to_bottom_right,var(--color-neutral-200),var(--color-neutral-100))] dark:bg-[linear-gradient(to_bottom_right,var(--color-neutral-900),var(--color-neutral-800))] items-center justify-center p-4">
                <div className="flex flex-wrap gap-2 justify-center">
                  {project.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                      {skill}
                    </span>
                  ))}
                  {project.skills.length > 3 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                      +{project.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>
            }
            icon={icons[i % icons.length]}
            className={i === 0 || i === 3 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </Panel>
  );
}
