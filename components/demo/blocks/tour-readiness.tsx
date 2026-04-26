import { tourModules } from "@/data/tour-modules";

const toneMap = {
  ready: "bg-emerald-50 text-emerald-700 border-emerald-200",
  next: "bg-amber-50 text-amber-700 border-amber-200",
  future: "bg-slate-100 text-slate-700 border-slate-200"
} as const;

export function TourReadiness() {
  return (
    <section className="app-shell p-5 md:p-6">
      <div className="max-w-3xl">
        <span className="eyebrow">Ruta 360</span>
        <h2 className="mt-4 font-display text-2xl font-semibold text-ink md:text-3xl">Capa preparada para tours 360 de inmobiliaria</h2>
        <p className="mt-2 text-sm leading-7 text-muted">
          La demo ya separa producto, escena y hotspots. Eso permite evolucionar a recorridos inmobiliarios con menor riesgo tecnico y comercial.
        </p>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {tourModules.map((module) => (
          <article key={module.id} className="rounded-[24px] border border-black/8 bg-white/72 p-5">
            <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${toneMap[module.status]}`}>
              {module.status}
            </span>
            <h3 className="mt-4 font-display text-2xl font-semibold text-ink">{module.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{module.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
