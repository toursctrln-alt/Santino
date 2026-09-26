import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import avatar from "@/assets/avatar.jpg";
import { projects, type Project } from "@/components/portfolio/data";
import { ProjectModal } from "@/components/portfolio/ProjectModal";
import { SplineBackground } from "@/components/portfolio/SplineBackground";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const EMAIL = "hello@claramorel.studio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clara Morel — Graphic Designer & Creative" },
      {
        name: "description",
        content:
          "Portfolio of Clara Morel, a Paris-based graphic designer working across identity, packaging and editorial.",
      },
      { property: "og:title", content: "Clara Morel — Graphic Designer & Creative" },
      {
        property: "og:description",
        content: "Identity, packaging and editorial design from Paris.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Arrow() {
  return <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5">↘</span>;
}

function Index() {
  const [active, setActive] = useState<Project | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast("Email copied");
    } catch {
      toast("Copy failed — " + EMAIL);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 pb-24">
        <header className="flex justify-center py-10">
          <span className="text-sm font-bold tracking-[0.35em] uppercase">Morel</span>
        </header>

        <section className="relative isolate grid gap-12 py-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
          <SplineBackground />
          <div className="relative">

            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={avatar}
                  alt="Clara Morel"
                  width={816}
                  height={816}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <span className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-background bg-status" />
              </div>
              <span className="text-xs text-muted-foreground">Available for projects</span>
            </div>

            <h1 className="mt-8 text-4xl font-bold sm:text-5xl">Clara Morel</h1>
            <p className="mt-2 text-lg text-muted-foreground">Graphic Designer &amp; Creative</p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              I build quiet identity systems that hold up in print and on screen.
              Ten years of work, still subtracting.
            </p>
            <p className="mt-6 inline-flex rounded-full bg-surface px-3 py-1 text-xs text-muted-foreground hairline">
              France / Paris
            </p>

            <nav className="mt-10 flex flex-wrap gap-6 text-sm font-medium">
              <a
                href="#work"
                className="group inline-flex items-center gap-1 transition-opacity hover:opacity-60"
              >
                Work <Arrow />
              </a>
              <button
                onClick={() => setAboutOpen(true)}
                className="group inline-flex items-center gap-1 transition-opacity hover:opacity-60"
              >
                À propos <Arrow />
              </button>
              <a
                href="#contact"
                className="group inline-flex items-center gap-1 transition-opacity hover:opacity-60"
              >
                Contact <Arrow />
              </a>
            </nav>
          </div>

        </section>

        <section id="work" className="scroll-mt-16 pt-24">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase">Selected work</h2>
            <span className="text-xs text-muted-foreground">{projects.length} projects</span>
          </div>
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <button key={p.id} onClick={() => setActive(p)} className="group text-left">
                <div className="overflow-hidden rounded-xl bg-surface hairline">
                  <img
                    src={p.cover}
                    alt={p.title}
                    loading="lazy"
                    width={912}
                    height={1104}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold">{p.title}</p>
                    <p className="text-xs text-muted-foreground">{p.category}</p>
                  </div>
                  <p className="text-xs whitespace-nowrap text-muted-foreground">
                    {p.year} — {p.type}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-16 pt-28">
          <div className="grid gap-10 rounded-2xl bg-surface p-8 sm:p-12 lg:grid-cols-2 hairline">
            <div>
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase">Contact</h2>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Open to identity, packaging and editorial work from early 2026.
              </p>
              <button
                onClick={copyEmail}
                className="mt-6 inline-flex items-center gap-3 rounded-full bg-background px-4 py-2 text-sm transition-colors hover:bg-secondary hairline"
              >
                {EMAIL}
                <span className="text-xs text-muted-foreground">Copy</span>
              </button>
            </div>
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                e.currentTarget.reset();
                toast("Message sent");
              }}
            >
              <Input required placeholder="Name" className="rounded-xl bg-background" />
              <Input
                required
                type="email"
                placeholder="Email"
                className="rounded-xl bg-background"
              />
              <Textarea
                required
                rows={4}
                placeholder="A few lines about the project"
                className="rounded-xl bg-background"
              />
              <Button type="submit" className="w-full rounded-xl">
                Send
              </Button>
            </form>
          </div>
        </section>

        <footer className="pt-16 text-xs text-muted-foreground">© 2026 Clara Morel</footer>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />

      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <DialogContent className="rounded-2xl border-hairline bg-background p-8 sm:max-w-lg">
          <h2 className="text-2xl font-bold">À propos</h2>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <li>— Brand identity, packaging, editorial design and signage.</li>
            <li>— Systems first: grids, type scales, one rule per decision.</li>
            <li>— Print production from spec sheet to press check.</li>
            <li>— Based in Paris, working with studios and brands across Europe.</li>
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
}
