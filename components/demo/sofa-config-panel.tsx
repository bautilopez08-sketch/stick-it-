"use client";

import Link from "next/link";

import { useAppState } from "@/context/app-state";
import { sofas } from "@/data/sofas";
import { formatCurrency } from "@/lib/utils";
import { PanoramaScene } from "@/types";

type SofaConfigPanelProps = {
  panoramas: PanoramaScene[];
  onCapture: () => void;
  onAr: () => void;
  captureStatus: string | null;
};

export function SofaConfigPanel({ panoramas, onCapture, onAr, captureStatus }: SofaConfigPanelProps) {
  const {
    selectedColorId,
    selectedPanoramaId,
    selectedSofa,
    setSelectedColorId,
    setSelectedPanoramaId,
    setSelectedSofaId,
    setViewMode,
    viewMode
  } = useAppState();

  const selectedColor = selectedSofa.colors.find((color) => color.id === selectedColorId) ?? selectedSofa.colors[0];

  return (
    <aside className="app-shell h-full p-6">
      <div className="space-y-5">
        <div className="space-y-2">
          <span className="eyebrow">Configuracion</span>
          <h2 className="font-display text-3xl font-semibold text-ink">{selectedSofa.name}</h2>
          <p className="text-sm leading-6 text-muted">{selectedSofa.description}</p>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-ink">Modelo de sillón</label>
          <select className="field" value={selectedSofa.id} onChange={(event) => setSelectedSofaId(event.target.value)}>
            {sofas.map((sofa) => (
              <option key={sofa.id} value={sofa.id}>
                {sofa.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-ink">Color / tapizado</label>
          <div className="grid grid-cols-1 gap-2">
            {selectedSofa.colors.map((color) => (
              <button
                key={color.id}
                type="button"
                onClick={() => setSelectedColorId(color.id)}
                className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${
                  color.id === selectedColorId ? "border-ink bg-ink text-white" : "border-black/10 bg-white/75 text-slate-700"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="h-4 w-4 rounded-full border border-black/10" style={{ backgroundColor: color.hex }} />
                  <span>
                    {color.name} · {color.material}
                  </span>
                </span>
                <span className="text-xs uppercase tracking-[0.16em] opacity-70">tapizado</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 rounded-[24px] border border-black/5 bg-white/80 p-5 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Ancho</p>
            <p className="mt-2 font-display text-2xl font-semibold text-ink">{selectedSofa.dimensions.widthCm} cm</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Profundidad</p>
            <p className="mt-2 font-display text-2xl font-semibold text-ink">{selectedSofa.dimensions.depthCm} cm</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Alto</p>
            <p className="mt-2 font-display text-2xl font-semibold text-ink">{selectedSofa.dimensions.heightCm} cm</p>
          </div>
        </div>

        <div className="rounded-[24px] border border-black/5 bg-[#111827] p-5 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-white/45">Precio placeholder</p>
          <p className="mt-3 font-display text-4xl font-semibold">{formatCurrency(selectedSofa.priceUsd)}</p>
          <p className="mt-2 text-sm leading-6 text-white/70">{selectedSofa.description}</p>
        </div>

        {viewMode === "360" ? (
          <div className="space-y-3">
            <label className="text-sm font-semibold text-ink">Recorrido interior</label>
            <select className="field" value={selectedPanoramaId} onChange={(event) => setSelectedPanoramaId(event.target.value)}>
              {panoramas.map((panorama) => (
                <option key={panorama.id} value={panorama.id}>
                  {panorama.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setViewMode("3d")}
            className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
              viewMode === "3d" ? "bg-ink text-white" : "border border-black/10 bg-white text-slate-700"
            }`}
          >
            Producto 3D
          </button>
          <button
            type="button"
            onClick={() => setViewMode("360")}
            className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
              viewMode === "360" ? "bg-ink text-white" : "border border-black/10 bg-white text-slate-700"
            }`}
          >
            Interior 360
          </button>
        </div>

        <div className="grid gap-3">
          <button type="button" onClick={onAr} className="button-primary w-full">
            Ver en AR
          </button>
          <button type="button" onClick={onCapture} className="button-secondary w-full">
            Guardar captura
          </button>
          <Link href="/empresas#lead-form" className="button-secondary w-full">
            Solicitar cotizacion
          </Link>
          {captureStatus ? <p className="text-sm leading-6 text-muted">{captureStatus}</p> : null}
        </div>
      </div>
    </aside>
  );
}
