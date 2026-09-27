import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import matteoPortrait from "@/assets/matteo-portrait.png";

type Position = { x: number; y: number };
type Positions = Record<string, Position>;

const initialPositions: Positions = {
  presentation: { x: 0, y: 0 },
  note: { x: 0, y: 0 },
  skills: { x: 0, y: 0 },
  journey: { x: 0, y: 0 },
  portrait: { x: 0, y: 0 },
  noteList: { x: 0, y: 0 },
};

const placements: Record<string, string> = {
  presentation: "left-[3%] top-8 w-[78%] sm:w-[48%] lg:w-[42%]",
  note: "right-[4%] top-[238px] w-[48%] sm:right-[35%] sm:top-[210px] sm:w-[25%] lg:top-[190px] lg:w-[21%]",
  portrait: "right-[4%] top-7 w-[42%] sm:w-[25%] lg:w-[22%]",
  skills: "left-[3%] top-[465px] w-[78%] sm:top-[390px] sm:w-[43%] lg:top-[380px] lg:w-[39%]",
  noteList: "left-[10%] top-[785px] w-[72%] sm:left-[8%] sm:top-[675px] sm:w-[34%] lg:w-[31%]",
  journey: "right-[3%] top-[1060px] w-[90%] sm:top-[510px] sm:w-[51%] lg:w-[49%]",
};

function WindowBar() {
  return (
    <div className="flex h-11 cursor-grab items-center gap-2 border-b border-about-line px-4 active:cursor-grabbing">
      <span className="h-3.5 w-3.5 rounded-full bg-about-red" />
      <span className="h-3.5 w-3.5 rounded-full bg-about-dot" />
      <span className="ml-1 h-1.5 w-24 bg-about-line" />
    </div>
  );
}

function ComputerWindow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-about-line bg-about-window about-shadow ${className}`}>
      <WindowBar />
      {children}
    </div>
  );
}

export function AboutDesk() {
  const deskRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    id: string;
    pointerId: number;
    startX: number;
    startY: number;
    origin: Position;
    element: HTMLElement;
  } | null>(null);
  const [positions, setPositions] = useState<Positions>(initialPositions);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [topId, setTopId] = useState<string>("portrait");

  const move = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const desk = deskRef.current;
    if (!drag || drag.pointerId !== event.pointerId || !desk) return;

    const deskRect = desk.getBoundingClientRect();
    const elementRect = drag.element.getBoundingClientRect();
    const current = positions[drag.id] ?? { x: 0, y: 0 };
    const baseLeft = elementRect.left - deskRect.left - current.x;
    const baseTop = elementRect.top - deskRect.top - current.y;
    const desiredX = drag.origin.x + event.clientX - drag.startX;
    const desiredY = drag.origin.y + event.clientY - drag.startY;
    const maxX = deskRect.width - baseLeft - elementRect.width;
    const maxY = deskRect.height - baseTop - elementRect.height;

    setPositions((previous) => ({
      ...previous,
      [drag.id]: {
        x: Math.min(Math.max(desiredX, -baseLeft), maxX),
        y: Math.min(Math.max(desiredY, -baseTop), maxY),
      },
    }));
  };

  const stop = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    drag.element.releasePointerCapture(event.pointerId);
    dragRef.current = null;
    setActiveId(null);
  };

  const draggable = (id: string) => ({
    className: `about-draggable absolute ${placements[id]}`,
    style: {
      transform: `translate3d(${positions[id]?.x ?? 0}px, ${positions[id]?.y ?? 0}px, 0) scale(${activeId === id ? 1.05 : 1})`,
      zIndex: topId === id ? 30 : 10,
    },
    onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      dragRef.current = {
        id,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        origin: positions[id] ?? { x: 0, y: 0 },
        element: event.currentTarget,
      };
      setTopId(id);
      setActiveId(id);
    },
    onPointerMove: move,
    onPointerUp: stop,
    onPointerCancel: stop,
  });

  return (
    <section id="about" className="scroll-mt-16 pt-28">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em]">À propos</h2>
        <span className="text-xs text-muted-foreground">Cliquez · déplacez</span>
      </div>

      <div
        ref={deskRef}
        className="about-desk relative h-[1510px] overflow-hidden rounded-2xl border border-about-line sm:h-[980px]"
      >
        <div {...draggable("presentation")}>
          <ComputerWindow>
            <div className="space-y-4 p-5 text-sm leading-relaxed sm:p-6">
              <p>
                Graphiste <strong>passionné</strong>, spécialisé en print / digital / illustration,
                je crée des visuels <strong>adaptés</strong> aux besoins de communication des entreprises.
              </p>
              <p>
                <strong>Curieux et créatif</strong>, je cherche à développer mes compétences au sein de
                <u> projets variés</u>.
              </p>
            </div>
          </ComputerWindow>
        </div>

        <div {...draggable("note")}>
          <ComputerWindow>
            <div className="p-5 text-sm leading-snug">
              <p className="mb-5 text-xs text-muted-foreground">NOTE :</p>
              <p>Matteo</p>
              <p className="font-bold">DOS SANTOS</p>
              <p className="mt-1 text-about-link underline">Graphiste</p>
            </div>
          </ComputerWindow>
        </div>

        <div {...draggable("portrait")}>
          <div className="relative rotate-2 bg-about-window p-2 pb-3 about-photo-shadow">
            <span className="absolute left-1/2 top-0 z-10 h-10 w-32 -translate-x-1/2 -translate-y-1/2 rotate-3 bg-about-tape/80" />
            <img
              src={matteoPortrait}
              alt="Portrait de Matteo Dos Santos"
              width={287}
              height={420}
              draggable={false}
              className="aspect-[287/420] w-full select-none object-cover"
            />
          </div>
        </div>

        <div {...draggable("skills")}>
          <ComputerWindow>
            <div className="space-y-4 p-5 text-sm sm:p-6">
              <h3 className="text-sm font-bold">COMPÉTENCES TECHNIQUES ✓</h3>
              <div>
                <p className="font-bold">Arts graphiques PAO</p>
                <p className="text-xs text-muted-foreground">[Photoshop | Illustrator | InDesign | Premiere Pro]</p>
              </div>
              <div>
                <p className="font-bold">Relation client</p>
                <p className="text-xs text-muted-foreground">[Accueil | Conseil | Vente]</p>
              </div>
              <div>
                <p className="font-bold">Polyvalence</p>
                <p className="text-xs text-muted-foreground">[Créativité | Adaptabilité | Travail d'équipe]</p>
              </div>
            </div>
          </ComputerWindow>
        </div>

        <div {...draggable("noteList")}>
          <div className="-rotate-3 bg-about-note px-7 py-9 about-note-shadow">
            <ul className="space-y-5 font-handwritten text-lg leading-snug">
              <li>– Finir mon recueil de création</li>
              <li>– Passer mon permis moto</li>
              <li>– Réaliser un court-métrage</li>
              <li>– Ne pas oublier l'anniversaire de Mathias !</li>
            </ul>
          </div>
        </div>

        <div {...draggable("journey")}>
          <ComputerWindow>
            <div className="space-y-6 p-5 text-xs leading-relaxed sm:p-7">
              <div>
                <h3 className="text-sm font-bold"><span className="text-about-green">2021-2024</span> : BTS ÉTUDES DE RÉALISATION D'UN PROJET DE COMMUNICATION.</h3>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  <li>• Logiciels de création et de retouche d'images</li>
                  <li>• Outils de mise en page et de typographie.</li>
                  <li>• Élaboration de concepts visuels pour des projets variés</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold"><span className="text-about-green">2018-2021</span> : LYCÉE BAC PROFESSIONNEL DES MÉTIERS D'ART D'ARSONVAL.</h3>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  <li>• Techniques de dessin et d'illustration.</li>
                  <li>• Obtention bac Section Communication visuel.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold"><span className="text-about-green">STAGES</span> : LYCÉE ET BTS.</h3>
                <p className="mt-3 text-muted-foreground">• Axxess GROUPE (37) Graphiste : développement de mes compétences et façonnage de l'identité visuelle de marque.</p>
                <p className="mt-2 text-muted-foreground">• Agglomération Paris vallée de la marne (77) Graphiste : créations de visuels percutants et capture de l'essence dynamique de la ville.</p>
              </div>
              <div>
                <h3 className="text-sm font-bold"><span className="text-about-green">COREP TOURS</span> : IMPRIMERIE</h3>
                <p className="mt-3 text-muted-foreground">• Participation aux différentes étapes de production et de préparation des supports imprimés.</p>
              </div>
            </div>
          </ComputerWindow>
        </div>
      </div>
    </section>
  );
}