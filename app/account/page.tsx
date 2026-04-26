"use client";

import { useAppState } from "@/context/app-state";
import { SectionTitle } from "@/components/ui/section-title";

export default function AccountPage() {
  const { savedDesigns } = useAppState();

  return (
    <section className="section-shell py-10 md:py-14">
      <div className="space-y-8">
        <SectionTitle eyebrow="Mi panel" title="Diseños guardados y recientes" description="Espacio básico para volver rápido a ideas que ya trabajaste." />
        {savedDesigns.length === 0 ? (
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-sm text-slate-600 shadow-sm">Todavía no guardaste diseños. Desde el editor podés usar “Guardar diseño”.</div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {savedDesigns.map((item) => (
              <article key={item.id} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-display text-2xl font-bold text-slate-950">{item.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.quantity}u · {item.shape} · {item.size}</p>
                <p className="mt-2 text-sm text-slate-600">{item.text ? `Texto: ${item.text}` : "Sin texto"}</p>
                {item.images[0] ? <img alt={item.name} src={item.images[0].src} className="mt-4 h-40 w-full rounded-[24px] object-contain bg-slate-50 p-4" /> : null}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
