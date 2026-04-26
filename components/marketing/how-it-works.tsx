import { SectionIntro } from "@/components/ui/section-intro";

const steps = [
  {
    title: "Catalogo 3D curado",
    description: "Cada sillón se publica como activo 3D reutilizable, con dimensiones, variantes y precio comercial."
  },
  {
    title: "Demo comercial guiada",
    description: "El asesor cambia modelo, tapizado y vista entre 3D limpio, AR y ambiente 360 desde una sola interfaz."
  },
  {
    title: "Escalado por vertical",
    description: "La capa de panoramas queda separada para evolucionar hacia recorridos 360 de inmobiliarias."
  }
];

export function HowItWorks() {
  return (
    <section className="section-shell py-14 md:py-20">
      <SectionIntro
        eyebrow="Como funciona"
        title="Una base tecnica correcta para vender, medir interes y evolucionar sin rehacer todo."
        description="El MVP prioriza una narrativa comercial clara y una arquitectura preparada para crecer. No pega una foto encima de otra: parte de un visor 3D real, suma AR cuando el dispositivo lo permite y usa escenas 360 como capa demostrativa desacoplada."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <article key={step.title} className="app-shell p-6">
            <p className="text-sm font-semibold text-accent">0{index + 1}</p>
            <h3 className="mt-5 font-display text-2xl font-semibold text-ink">{step.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
