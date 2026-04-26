import Link from "next/link";

import { SectionTitle } from "@/components/ui/section-title";
import { BrandLogo } from "@/components/ui/brand-logo";
import { HomeCartPreview } from "@/components/shop/home-cart-preview";
import { HomeCatalogPreview } from "@/components/shop/home-catalog-preview";
import { faqs } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="space-y-16 py-8 md:py-12">
      <section className="section-shell">
        <div className="grid gap-8 rounded-[40px] border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-[1.04fr_0.96fr] lg:p-12">
          <div className="space-y-6">
            <BrandLogo linked={false} />
            <p className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Stickers personalizados en minutos</p>
            <h1 className="font-display text-5xl font-bold tracking-[-0.05em] text-slate-950 md:text-7xl">
              Diseñá stickers únicos para tu marca, tu emprendimiento o tu estilo.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-600">
              Personalizalos fácil, visualizalos en tiempo real y pedilos en minutos con Stick-it.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/create" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white">Crea tu sticker</Link>
              <Link href="/catalog" className="rounded-full border border-slate-200 px-6 py-3 text-sm font-bold text-slate-700">Explorar catálogo</Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[32px] bg-[linear-gradient(160deg,#07203a,#11c5bf)] p-6 text-white sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Subí tu foto</p>
              <h3 className="mt-3 font-display text-4xl font-bold">Editor directo, visual y rápido</h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/80">Mové, deformá, escribí encima y pasá al carrito sin meterte en menús innecesarios.</p>
            </div>
            <div className="rounded-[32px] bg-[linear-gradient(160deg,#fff3b0,#ffb703)] p-6 text-slate-950">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">Visualización</p>
              <h3 className="mt-3 font-display text-3xl font-bold">Mockups reales</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">Termo, notebook y pared para validar el look final.</p>
            </div>
            <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Precio</p>
              <p className="mt-3 font-display text-4xl font-bold text-slate-950">$200 ARS</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">Cada sticker en la versión actual del sitio.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell space-y-8">
        <SectionTitle eyebrow="Cómo funciona" title="Del diseño al pago en tres pasos" description="Menos explicación, más acción: crear, revisar y comprar." />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { title: "Subí tu imagen", copy: "Arrastrá o subí la foto que querés convertir en sticker." },
            { title: "Personalizá", copy: "Mové, deformá, escribí encima y elegí la forma final." },
            { title: "Comprá", copy: "Agregá al carrito, completá el checkout y listo." }
          ].map((item) => (
            <article key={item.title} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-display text-3xl font-bold text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell space-y-8">
        <SectionTitle eyebrow="Carrito" title="Tu compra siempre a un paso" description="Sección pensada para que el usuario entienda rápido cuánto lleva y cómo cerrar el pago." />
        <HomeCartPreview />
      </section>

      <section className="section-shell space-y-8">
        <SectionTitle
          eyebrow="Catalogo vivo"
          title="Stickers publicados por los dueños"
          description="Los productos que se cargan y publican desde el panel interno aparecen automáticamente en la tienda."
          action={<Link href="/catalog" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white">Ver todo</Link>}
        />
        <HomeCatalogPreview />
      </section>

      <section className="section-shell space-y-8">
        <SectionTitle eyebrow="Preguntas frecuentes" title="Todo listo para responder lo básico" description="Sección preparada para orientar al usuario y mejorar conversión." />
        <div className="grid gap-4">
          {faqs.map((item) => (
            <article key={item.question} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-display text-2xl font-bold text-slate-950">{item.question}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="rounded-[40px] bg-[linear-gradient(135deg,#07203a,#11c5bf)] p-8 text-white shadow-sm md:p-12">
          <h2 className="font-display text-4xl font-bold tracking-[-0.04em] md:text-5xl">Empezá a diseñar tu próximo sticker ahora</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80">Subí la imagen, probá cómo queda y compralo sin vueltas.</p>
          <Link href="/create" className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950">Ir al editor</Link>
        </div>
      </section>
    </div>
  );
}
