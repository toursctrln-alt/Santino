import { useEffect, useState } from "react";

const SCRIPT_SRC =
  "https://cdn.spline.design/@splinetool/viewer@2.0.58/build/spline-viewer.js";
const SCENE_URL = "https://prod.spline.design/SUExJvgS4L8TwcuU/scene.splinecode";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & { url?: string };
    }
  }
}

export function SplineBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      setReady(true);
      return;
    }
    const script = document.createElement("script");
    script.type = "module";
    script.src = SCRIPT_SRC;
    script.onload = () => setReady(true);
    document.head.appendChild(script);
  }, []);

  if (!ready) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_85%)]"
    >
      {/* @ts-expect-error web component */}
      <spline-viewer url={SCENE_URL} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
