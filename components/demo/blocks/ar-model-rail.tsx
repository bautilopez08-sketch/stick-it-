"use client";

import { Sofa } from "@/types";

type ArModelRailProps = {
  sofas: Sofa[];
  selectedSofaId: string;
  onSelectSofa: (sofaId: string) => void;
  onOpenAr: () => void;
};

export function ArModelRail({ sofas, selectedSofaId, onSelectSofa, onOpenAr }: ArModelRailProps) {
  return (
    <section className="app-shell p-5 md:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">AR ready</span>
          <h2 className="mt-4 font-display text-2xl font-semibold text-ink md:text-3xl">Modelos genericos listos para realidad aumentada</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
            Esta banda sirve para demo comercial: elige un modelo, abre AR desde un dispositivo compatible y valida presencia general, escala y lenguaje de producto.
          </p>
        </div>
        <button type="button" onClick={onOpenAr} className="button-primary">
          Abrir AR o preview del modelo activo
        </button>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {sofas.map((sofa) => (
          <button
            key={sofa.id}
            type="button"
            onClick={() => onSelectSofa(sofa.id)}
            className={`rounded-[24px] border p-4 text-left transition ${
              selectedSofaId === sofa.id ? "border-ink bg-ink text-white" : "border-black/10 bg-white/72 text-ink"
            }`}
          >
            <p className="text-xs uppercase tracking-[0.18em] opacity-60">{sofa.category}</p>
            <p className="mt-3 font-display text-xl font-semibold">{sofa.name}</p>
            <p className={`mt-2 text-sm leading-6 ${selectedSofaId === sofa.id ? "text-white/72" : "text-muted"}`}>{sofa.arLabel}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
