"use client";

import Link from "next/link";

import { useAppState } from "@/context/app-state";

export function HomeCatalogPreview() {
  const { catalogItems } = useAppState();
  const items = catalogItems.filter((item) => item.status !== "draft").sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))).slice(0, 4);

  if (items.length === 0) {
    return (
      <div className="rounded-[32px] border border-dashed border-slate-300 bg-white p-8 text-sm leading-7 text-slate-600 shadow-sm">
        Cuando cargues stickers desde el panel de dueños, los productos publicados aparecerán también en esta sección de la home.
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Link key={item.id} href={`/catalog/${item.id}`} className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
          <img alt={item.title} src={item.image} className="h-48 w-full object-contain bg-slate-50 p-4" />
          <div className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{item.category}</p>
            <h3 className="mt-2 font-display text-xl font-bold text-slate-950">{item.title}</h3>
            <p className="mt-3 text-sm font-bold text-slate-950 group-hover:underline">Inspeccionar</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
