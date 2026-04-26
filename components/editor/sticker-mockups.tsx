"use client";

import { PointerEvent, useState } from "react";

import { ImageLayer } from "@/lib/types";
import { cn } from "@/lib/utils";

type SurfaceId = "wall" | "thermos" | "notebook";

const surfaceBounds: Record<SurfaceId, { minX: number; maxX: number; minY: number; maxY: number }> = {
  wall: { minX: 12, maxX: 88, minY: 12, maxY: 88 },
  thermos: { minX: 28, maxX: 64, minY: 28, maxY: 76 },
  notebook: { minX: 18, maxX: 82, minY: 18, maxY: 80 }
};

const surfaces = [
  { id: "wall" as const, title: "Pared", description: "Referencia simple de presencia visual.", shell: "bg-[linear-gradient(135deg,#f0e7dc,#e2d5c5)]" },
  { id: "thermos" as const, title: "Termo", description: "Probá la ubicación sobre tu termo real.", image: "/mockup-thermos.png", shell: "bg-slate-100" },
  { id: "notebook" as const, title: "Notebook", description: "Visualizalo encima de la tapa de la notebook.", image: "/mockup-notebook.png", shell: "bg-slate-100" }
];

function renderStickerPreview(image?: ImageLayer, text?: string) {
  if (!image && !text) {
    return <div className="rounded-[30px] border border-dashed border-slate-300 bg-white/80 px-6 py-10 text-center text-sm font-semibold text-slate-400">Tu sticker aparecera aca</div>;
  }

  return (
    <div className="relative inline-flex min-h-28 min-w-28 items-center justify-center rounded-[34px] bg-white px-6 py-4 shadow-[0_14px_28px_rgba(8,18,31,0.18)]">
      {image ? <img alt={image.name} src={image.src} className="max-h-24 max-w-24 object-contain" /> : null}
      {text ? <span className="absolute -bottom-2 left-1/2 max-w-[90%] -translate-x-1/2 rounded-full bg-slate-950 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">{text}</span> : null}
    </div>
  );
}

function getStickerTransform(surfaceId: SurfaceId) {
  if (surfaceId === "thermos") return "translate(-50%, -50%) perspective(900px) rotateY(-28deg) scaleX(0.72) scaleY(0.94)";
  if (surfaceId === "notebook") return "translate(-50%, -50%) perspective(1000px) rotateX(18deg) rotateZ(-5deg) scale(0.94)";
  return "translate(-50%, -50%)";
}

function getStickerVisualStyle(surfaceId: SurfaceId) {
  if (surfaceId === "thermos") return { opacity: 0.94, filter: "contrast(1.02) saturate(0.98)", mixBlendMode: "multiply" as const };
  if (surfaceId === "notebook") return { opacity: 0.96, filter: "contrast(1.01)", mixBlendMode: "multiply" as const };
  return { opacity: 1, filter: "none", mixBlendMode: "normal" as const };
}

export function StickerMockups({ featuredImage, caption }: { featuredImage?: ImageLayer; caption?: string }) {
  const [positions, setPositions] = useState<Record<SurfaceId, { x: number; y: number }>>({
    wall: { x: 50, y: 50 },
    thermos: { x: 48, y: 54 },
    notebook: { x: 50, y: 55 }
  });
  const [dragging, setDragging] = useState<SurfaceId | null>(null);

  const updatePosition = (surfaceId: SurfaceId, event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    setPositions((current) => ({
      ...current,
      [surfaceId]: {
        x: Math.min(surfaceBounds[surfaceId].maxX, Math.max(surfaceBounds[surfaceId].minX, x)),
        y: Math.min(surfaceBounds[surfaceId].maxY, Math.max(surfaceBounds[surfaceId].minY, y))
      }
    }));
  };

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        <p className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Mockups</p>
        <h3 className="font-display text-3xl font-bold text-slate-950">Asi puede verse pegado</h3>
        <p className="text-sm leading-7 text-slate-600">Arrastrá el sticker dentro del termo, la notebook o la pared para probar distintas ubicaciones.</p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {surfaces.map((surface) => (
          <article key={surface.id} className={cn("rounded-[28px] p-4", surface.shell)}>
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-white/70 bg-white/30 backdrop-blur"
              onPointerDown={() => setDragging(surface.id)}
              onPointerMove={(event) => {
                if (dragging === surface.id) updatePosition(surface.id, event);
              }}
              onPointerUp={() => setDragging(null)}
              onPointerLeave={() => setDragging(null)}
            >
              {surface.image ? <img alt={surface.title} src={surface.image} className="h-full w-full object-cover" /> : <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffffff_0,#efe6db_55%,#dacdbf_100%)]" />}
              {surface.id === "wall" ? <div className="absolute inset-x-0 bottom-0 h-12 bg-[linear-gradient(180deg,transparent,#b28f6b_70%)]" /> : null}
              <div
                role="button"
                tabIndex={0}
                onPointerDown={() => setDragging(surface.id)}
                className="absolute cursor-move touch-none"
                style={{
                  left: `${positions[surface.id].x}%`,
                  top: `${positions[surface.id].y}%`,
                  transform: getStickerTransform(surface.id),
                  ...getStickerVisualStyle(surface.id)
                }}
              >
                {renderStickerPreview(featuredImage, caption)}
              </div>
            </div>
            <h4 className="mt-4 font-display text-2xl font-bold text-slate-950">{surface.title}</h4>
            <p className="mt-2 text-sm leading-6 text-slate-600">{surface.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
