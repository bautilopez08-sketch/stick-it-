"use client";

import { useMemo, useState } from "react";

import { spatialBackdrops } from "@/data/spatial-backdrops";
import { cn } from "@/lib/utils";
import { Sofa } from "@/types";

type UniversalArStageProps = {
  isOpen: boolean;
  sofa: Sofa;
  onClose: () => void;
};

export function UniversalArStage({ isOpen, sofa, onClose }: UniversalArStageProps) {
  const [sceneId, setSceneId] = useState(spatialBackdrops[0].id);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(10);
  const [scale, setScale] = useState(100);
  const [rotation, setRotation] = useState(0);

  const scene = useMemo(
    () => spatialBackdrops.find((item) => item.id === sceneId) ?? spatialBackdrops[0],
    [sceneId]
  );

  if (!isOpen) {
    return null;
  }

  const sofaScale = (sofa.scaleMultiplier ?? 1) * (scale / 100);

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-[rgba(12,18,28,0.62)] p-3 md:items-center md:p-6">
      <div className="app-shell max-h-[92vh] w-full max-w-7xl overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/6 px-5 py-4 md:px-6">
          <div>
            <span className="eyebrow">Vista espacial</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">Preview compatible</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">Mueve el sillón sobre un ambiente real y ajusta escala o rotación.</p>
          </div>
          <button type="button" onClick={onClose} className="button-secondary">
            Cerrar
          </button>
        </div>

        <div className="grid gap-0 xl:grid-cols-[1.3fr_0.7fr]">
          <section className="border-b border-black/6 p-4 xl:border-b-0 xl:border-r">
            <div className="mb-4 flex flex-wrap gap-2">
              {spatialBackdrops.map((backdrop) => (
                <button
                  key={backdrop.id}
                  type="button"
                  onClick={() => setSceneId(backdrop.id)}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm transition",
                    backdrop.id === scene.id ? "bg-ink text-white" : "border border-black/10 bg-white text-slate-700"
                  )}
                >
                  {backdrop.name}
                </button>
              ))}
            </div>

            <div className="relative min-h-[420px] overflow-hidden rounded-[28px] border border-black/8 bg-[#ebe7df] md:min-h-[560px]">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${scene.imageSrc})` }} />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,18,28,0.06),rgba(12,18,28,0.2))]" />

              <div
                className="absolute left-1/2 top-[60%] w-[42%] max-w-[460px] -translate-x-1/2 rounded-[28px] bg-contain bg-center bg-no-repeat transition"
                style={{
                  height: `${210 * sofaScale}px`,
                  backgroundImage: `url(${sofa.posterSrc})`,
                  transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) rotate(${rotation}deg)`
                }}
                aria-label={`Preview de ${sofa.name} sobre ambiente`}
              />

              <div className="absolute bottom-4 left-4 right-4 rounded-[24px] border border-white/25 bg-black/28 px-4 py-3 text-sm leading-6 text-white/86 backdrop-blur-md">
                <p className="font-semibold">{scene.name}</p>
                <p>{scene.description}</p>
              </div>
            </div>
          </section>

          <aside className="p-5 md:p-6">
            <div className="space-y-6">
              <div className="rounded-[24px] border border-black/8 bg-white/76 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Modelo activo</p>
                <h3 className="mt-3 font-display text-3xl font-semibold text-ink">{sofa.name}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{sofa.arLabel}</p>
              </div>

              <div className="rounded-[24px] border border-black/8 bg-white/76 p-5">
                <p className="text-sm font-semibold text-ink">Mover y ajustar</p>
                <div className="mt-4 space-y-4">
                  <Slider label="Horizontal" value={offsetX} min={-220} max={220} onChange={setOffsetX} />
                  <Slider label="Vertical" value={offsetY} min={-140} max={180} onChange={setOffsetY} />
                  <Slider label="Escala" value={scale} min={60} max={155} onChange={setScale} suffix="%" />
                  <Slider label="Rotacion" value={rotation} min={-18} max={18} onChange={setRotation} suffix="°" />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOffsetX(0);
                    setOffsetY(10);
                    setScale(100);
                    setRotation(0);
                  }}
                  className="button-secondary mt-5 w-full"
                >
                  Resetear posicion
                </button>
              </div>

              <div className="rounded-[24px] border border-black/8 bg-white/76 p-5">
                <p className="text-sm font-semibold text-ink">Referencia real</p>
                {sofa.referencePhotoSrc ? (
                  <img
                    src={sofa.referencePhotoSrc}
                    alt={`Referencia real de ${sofa.name}`}
                    className="mt-4 h-48 w-full rounded-[20px] object-cover"
                  />
                ) : null}
              </div>

              <div className="rounded-[24px] border border-dashed border-black/10 bg-white/60 p-4 text-sm leading-7 text-muted">
                Esta vista se usa cuando el equipo no expone AR nativa.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  suffix?: string;
};

function Slider({ label, value, min, max, onChange, suffix = "px" }: SliderProps) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-ink">{label}</span>
        <span className="text-muted">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-[var(--accent)]"
      />
    </label>
  );
}
