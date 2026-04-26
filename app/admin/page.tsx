import { IntegrationSnippet } from "@/components/admin/integration-snippet";
import { getIntegrationSnippet, getPanoramas, getSofas } from "@/lib/catalog";

export default function AdminPage() {
  const sofaCount = getSofas().length;
  const panoramaCount = getPanoramas().length;
  const snippet = getIntegrationSnippet();

  return (
    <section className="section-shell py-8 md:py-10">
      <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="app-shell p-6 md:p-8">
          <span className="eyebrow">Admin mock</span>
          <h1 className="mt-4 font-display text-4xl font-semibold text-ink">Dashboard demo para equipos comerciales y de contenido.</h1>
          <p className="mt-4 text-sm leading-7 text-muted">
            No hay backend persistente todavia, pero la UI ya separa modelos 3D, variantes, panoramas y snippet de integracion para futuras APIs reales.
          </p>

          <div className="mt-8 grid gap-3">
            <div className="rounded-[24px] border border-black/5 bg-white/80 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Modelos cargados</p>
              <p className="mt-2 font-display text-4xl font-semibold text-ink">{sofaCount}</p>
            </div>
            <div className="rounded-[24px] border border-black/5 bg-white/80 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Panoramas mock</p>
              <p className="mt-2 font-display text-4xl font-semibold text-ink">{panoramaCount}</p>
            </div>
          </div>
        </aside>

        <div className="grid gap-6">
          <section className="app-shell p-6 md:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] border border-dashed border-black/10 bg-white/55 p-5">
                <p className="text-sm font-semibold text-ink">Subir modelos 3D</p>
                <p className="mt-2 text-sm leading-6 text-muted">UI mock para cargar `.glb` o `.gltf`, poster e informacion base del sillón.</p>
                <button className="button-secondary mt-5 w-full">Seleccionar archivo 3D</button>
              </div>
              <div className="rounded-[24px] border border-dashed border-black/10 bg-white/55 p-5">
                <p className="text-sm font-semibold text-ink">Cargar panoramas 360</p>
                <p className="mt-2 text-sm leading-6 text-muted">Vista preparada para equirectangulares y futura integracion con motor especializado.</p>
                <button className="button-secondary mt-5 w-full">Subir panorama</button>
              </div>
            </div>
          </section>

          <section className="app-shell p-6 md:p-8">
            <div className="grid gap-4 md:grid-cols-[1fr_0.9fr]">
              <div className="space-y-4">
                <h2 className="font-display text-3xl font-semibold text-ink">Variantes y snippet de integracion</h2>
                <p className="text-sm leading-7 text-muted">
                  Esta capa mock anticipa como una marca podria publicar sus colores y copiar un embed para ecommerce, landing o micrositio comercial.
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {["Stone", "Forest", "Graphite"].map((variant) => (
                    <div key={variant} className="rounded-[20px] border border-black/10 bg-white/80 p-4 text-sm text-slate-700">
                      {variant}
                    </div>
                  ))}
                </div>
              </div>
              <IntegrationSnippet snippet={snippet} />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
