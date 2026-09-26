import { useEffect, useState } from "react";
import { projects } from "./data";

const N = projects.length;

const depthStyles: Record<number, string> = {
  0: "translate-y-0 translate-x-0 scale-100 rotate-0 opacity-100 z-30",
  1: "translate-y-4 translate-x-2 scale-[0.95] rotate-[1.5deg] opacity-100 z-20",
  2: "translate-y-8 translate-x-4 scale-[0.9] rotate-[-1.5deg] opacity-100 z-10",
};

export function CardDeck() {
  const [top, setTop] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTop((t) => (t + 1) % N), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative mx-auto aspect-[4/5] w-52 shrink-0 md:w-72"
      aria-hidden
    >
      {projects.map((p, i) => {
        const depth = (i - top + N) % N;
        const style =
          depthStyles[depth] ??
          "translate-y-[-14%] translate-x-[55%] scale-[0.9] rotate-[9deg] opacity-0 z-0";
        return (
          <div
            key={p.id}
            className={`absolute inset-0 overflow-hidden rounded-xl bg-surface hairline transition-all duration-700 ease-in-out ${style}`}
          >
            <img
              src={p.cover}
              alt=""
              width={912}
              height={1104}
              className="h-full w-full object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
