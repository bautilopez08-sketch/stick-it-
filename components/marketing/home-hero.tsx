import Link from "next/link";

export function HomeHero() {
  return (
    <section className="section-shell pb-10 pt-8 md:pb-16 md:pt-14">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div className="space-y-7">
          <span className="eyebrow">MVP listo para demo comercial</span>
          <div className="space-y-5">
            <h1 className="headline max-w-3xl text-5xl text-ink md:text-7xl">
              Sillones 3D, AR y experiencias 360 para vender mejor desde la primera demo.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted">
              Sofa 360 es una plataforma B2B para marcas de sillones que necesitan mostrar producto real en 3D, activar AR en dispositivos compatibles y sumar una capa de ambiente 360 sin prometer precision espacial que el MVP todavia no entrega.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/demo" className="button-primary">
              Probar demo
            </Link>
            <Link href="/empresas#lead-form" className="button-secondary">
              Solicitar demo para empresas
            </Link>
          </div>
        </div>

        <div className="app-shell relative overflow-hidden p-6 md:p-8">
          <div className="grid-lines absolute inset-0 opacity-30" />
          <div className="relative grid gap-6 md:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-[28px] border border-black/5 bg-[linear-gradient(160deg,#ffffff_0%,#f3efe7_100%)] p-6 shadow-card">
              <div className="flex items-center justify-between">
                <span className="status-chip">Demo 3D real</span>
                <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Retail ready</span>
              </div>
              <div className="mt-8 h-[320px] rounded-[24px] border border-black/5 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.96),transparent_34%),linear-gradient(180deg,#fefefe_0%,#ebe4d7_100%)]">
                <div className="flex h-full flex-col justify-between p-6">
                  <div className="h-32 rounded-[20px] bg-[linear-gradient(180deg,#d8c6b2_0%,#b8a28a_100%)] shadow-[0_30px_55px_rgba(60,40,24,0.18)]" />
                  <div className="grid grid-cols-[1fr_auto] gap-4">
                    <div className="space-y-2">
                      <p className="font-display text-2xl font-semibold text-ink">Nordic Curve</p>
                      <p className="text-sm leading-6 text-muted">Modelo 3D real + boton AR + modo ambiente 360 desacoplado.</p>
                    </div>
                    <div className="h-12 w-12 rounded-full border border-black/10 bg-white" />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-[28px] border border-black/5 bg-white/90 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Modo ambiente</p>
                <p className="mt-3 font-display text-2xl font-semibold text-ink">Escena 360 complementaria</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Arquitectura lista para integrar Marzipano o Pannellum sin reescribir la capa comercial.
                </p>
              </div>
              <div className="rounded-[28px] border border-black/5 bg-[#0f1721] p-5 text-white">
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">Uso B2B</p>
                <p className="mt-3 font-display text-2xl font-semibold">Retail hoy. Real estate despues.</p>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  El mismo stack soporta demos de producto y recorridos 360 con hotspots entre ambientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
