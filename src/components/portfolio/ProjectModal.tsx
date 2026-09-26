import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Project } from "./data";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      <DialogContent

        className="max-h-[88vh] overflow-y-auto rounded-2xl border-hairline bg-background p-0 sm:max-w-3xl"
      >
        {project && (
          <div>
            <div className="flex flex-wrap items-end justify-between gap-4 px-6 pt-8 pb-6 sm:px-10">
              <div>
                <h2 className="text-2xl font-bold">{project.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{project.category}</p>
              </div>
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                {project.year} — {project.type}
              </p>
            </div>
            <p className="max-w-xl px-6 pb-8 text-sm leading-relaxed text-muted-foreground sm:px-10">
              {project.description}
            </p>
            <div className="grid gap-3 px-6 pb-10 sm:px-10">
              {project.images.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt={project.title}
                  loading="lazy"
                  className="w-full rounded-xl bg-surface object-cover"
                />
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
