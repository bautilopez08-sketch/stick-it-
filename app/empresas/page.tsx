import { LeadForm } from "@/components/forms/lead-form";
import { SectionIntro } from "@/components/ui/section-intro";

const retailPoints = [
  "Visualizacion del sillón en casa",
  "Reduccion de incertidumbre antes de comprar",
  "Mejor conversion comercial",
  "Menos devoluciones",
  "Experiencia premium para showroom, ecommerce y retail"
];

const realEstatePoints = [
  "Recorridos 360 por ambientes",
  "Hotspots entre escenas",
  "Integracion simple en webs de propiedades",
  "Experiencia inmersiva para captar leads",
  "Arquitectura lista para evolucionar a un tour completo"
];

export default function CompaniesPage() {
  return (
    <>
      <section className="section-shell py-10 md:py-14">
        <SectionIntro
          eyebrow="Para empresas"
          title="Dos verticales, una misma base de producto y una historia comercial facil de vender."
          description="La plataforma prioriza retail de muebles desde el primer dia, pero deja desacoplada la capa panoramica para reutilizarla en inmobiliarias y real estate sin rehacer la experiencia."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="app-shell p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Retail de muebles / sillones</p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-ink">Vender producto con mas contexto y menos friccion.</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {retailPoints.map((point) => (
                <span key={point} className="rounded-full border border-black/10 bg-white px-3 py-2 text-sm text-slate-700">
                  {point}
                </span>
              ))}
            </div>
          </article>

          <article className="app-shell p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Inmobiliarias / real estate</p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-ink">Recorridos 360 listos para crecer a una experiencia inmersiva.</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {realEstatePoints.map((point) => (
                <span key={point} className="rounded-full border border-black/10 bg-white px-3 py-2 text-sm text-slate-700">
                  {point}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <LeadForm />
    </>
  );
}
