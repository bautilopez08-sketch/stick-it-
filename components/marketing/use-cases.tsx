import { SectionIntro } from "@/components/ui/section-intro";

const useCases = [
  {
    title: "Retail de muebles y sillones",
    points: ["Visualizacion en casa", "Menos incertidumbre de compra", "Mejor conversion", "Experiencia premium omnicanal"]
  },
  {
    title: "Inmobiliarias y real estate",
    points: ["Recorridos 360", "Hotspots entre ambientes", "Embeds en webs de propiedades", "Base lista para sumar capas inmersivas"]
  }
];

export function UseCases() {
  return (
    <section className="section-shell py-14 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionIntro
          eyebrow="Casos de uso"
          title="Un mismo lenguaje visual para dos verticales con necesidades distintas."
          description="Sofa 360 nace para retail de sillones, pero separa la capa 360 y los hotspots para poder reutilizar la base de producto en recorridos inmobiliarios."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {useCases.map((item) => (
            <article key={item.title} className="app-shell p-6">
              <h3 className="font-display text-2xl font-semibold text-ink">{item.title}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.points.map((point) => (
                  <span key={point} className="rounded-full border border-black/10 bg-white px-3 py-2 text-sm text-slate-700">
                    {point}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
