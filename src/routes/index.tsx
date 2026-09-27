import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import ninoPortrait from "@/assets/nino-portrait.png";
import { projects, type Project } from "@/components/portfolio/data";
import { ProjectModal } from "@/components/portfolio/ProjectModal";
import { AboutDesk } from "@/components/portfolio/AboutDesk";
import santinoLogo from "@/assets/santino-logo.png";


import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const EMAIL = "hello@claramorel.studio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Matteo Dos Santos — Graphiste & Créatif" },
      {
        name: "description",
        content:
          "J'imagine, je compose et je donne forme aux idées pour créer des visuels qui ont du sens.",
      },
      { property: "og:title", content: "Matteo Dos Santos — Graphiste & Créatif" },
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

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast("Email copied");
    } catch {
      toast("Copy failed — " + EMAIL);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, var(--surface) 0%, var(--background) 45%, var(--background) 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 pb-24">
        <header className="flex justify-center py-10">
          <img
            src={santinoLogo}
            alt="Santino"
            className="h-8 w-auto rounded-none object-contain sm:h-8"
          />
        </header>


        <section className="relative isolate py-8">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-surface hairline">
            <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
              <div className="p-8 sm:p-12">
                <h1 className="text-5xl font-bold sm:text-6xl">Nino</h1>
                <p className="mt-1 inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-sonar rounded-full bg-status" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-status" />
                  </span>
                  Disponible
                </p>

                <p className="mt-8 text-2xl font-medium">Graphiste et créatif</p>

                <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  J'imagine, je compose et je donne forme aux idées pour créer des visuels qui ont
                  du sens. Chaque projet est une histoire à raconter, chaque détail compte.
                </p>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Mon objectif : transformer une idée en une image qui marque durablement.
                </p>

                <nav className="mt-10 flex flex-wrap gap-3 text-sm">
                  <a
                    href="#work"
                    className="pill-hover rounded-full bg-background px-6 py-2 hairline"
                  >
                    créations
                  </a>
                  <a
                    href="#contact"
                    className="pill-hover rounded-full bg-background px-6 py-2 hairline"
                  >
                    contact
                  </a>
                  <a
                    href="#about"
                    className="pill-hover rounded-full bg-background px-6 py-2 hairline"
                  >
                    à propos
                  </a>
                </nav>
              </div>

              <div className="flex items-end justify-center md:justify-end">
                <img
                  src={ninoPortrait}
                  alt="Nino, graphiste et créatif"
                  width={660}
                  height={772}
                  className="w-64 animate-float-soft object-contain sm:w-80"
                />
              </div>
            </div>
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

        <AboutDesk />

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

    </div>
  );
}
