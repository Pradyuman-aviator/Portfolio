import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid w-full grid-cols-1 gap-3 px-4 pb-4 sm:gap-4 md:grid-cols-2",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <article
      className={cn(
        "group/bento relative row-span-1 flex h-full flex-col justify-between overflow-hidden rounded-xl border border-edge bg-card p-4",
        "transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:bg-accent2 hover:shadow-[0_12px_30px_-24px_rgba(0,0,0,0.65)]",
        "motion-reduce:transition-none",
        className
      )}
    >
      <div className="mb-3">{header}</div>

      <div className="flex flex-1 flex-col gap-2">
        <div className="text-muted-foreground [&_svg]:size-4">{icon}</div>
        <div className="font-sans text-lg leading-snug font-semibold text-balance text-foreground">
          {title}
        </div>
        <div className="text-sm leading-relaxed text-pretty text-muted-foreground">
          {description}
        </div>
      </div>
    </article>
  );
};
