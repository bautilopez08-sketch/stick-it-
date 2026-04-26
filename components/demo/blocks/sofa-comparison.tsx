import { Sofa } from "@/types";
import { formatCurrency } from "@/lib/utils";

type SofaComparisonProps = {
  primary: Sofa;
  secondary: Sofa;
};

const metrics = [
  { key: "widthCm", label: "Ancho" },
  { key: "depthCm", label: "Profundidad" },
  { key: "heightCm", label: "Alto" }
] as const;

export function SofaComparison({ primary, secondary }: SofaComparisonProps) {
  return (
    <section className="app-shell p-5 md:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">Comparador</span>
          <h2 className="mt-4 font-display text-2xl font-semibold text-ink md:text-3xl">Comparacion rapida entre dos sillones</h2>
          <p className="mt-2 text-sm leading-7 text-muted">Ayuda a conversar diferencias de escala, categoria y ticket sin salir de la demo.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {[primary, secondary].map((sofa, index) => (
          <article key={sofa.id} className={`rounded-[28px] border p-5 ${index === 0 ? "border-ink/10 bg-[#f7f7f4]" : "border-black/10 bg-white/72"}`}>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{index === 0 ? "Modelo activo" : "Modelo comparado"}</p>
            <h3 className="mt-3 font-display text-3xl font-semibold text-ink">{sofa.name}</h3>
            <p className="mt-2 text-sm leading-7 text-muted">{sofa.description}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.key} className="rounded-2xl border border-black/6 bg-white/84 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{metric.label}</p>
                  <p className="mt-2 font-display text-2xl font-semibold text-ink">{sofa.dimensions[metric.key]} cm</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="status-chip">{sofa.category}</span>
              <span className="rounded-full border border-black/10 px-3 py-1 text-sm text-slate-700">{formatCurrency(sofa.priceUsd)}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
