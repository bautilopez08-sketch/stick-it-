"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { useAppState } from "@/context/app-state";

export function CatalogGrid() {
  const { catalogItems } = useAppState();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");

  const publicItems = useMemo(
    () => catalogItems.filter((item) => item.status !== "draft").sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))),
    [catalogItems]
  );

  const categories = ["Todos", ...Array.from(new Set(publicItems.map((item) => item.category || "General")))];
  const filtered = publicItems.filter((item) => {
    const matchesCategory = category === "Todos" || item.category === category;
    const search = `${item.title} ${item.category} ${item.description} ${(item.tags ?? []).join(" ")}`.toLowerCase();
    return matchesCategory && search.includes(query.toLowerCase());
  });

  if (publicItems.length === 0) {
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <h3 className="font-display text-3xl font-bold text-slate-950">Todavía no hay stickers publicados</h3>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Este catálogo muestra únicamente los diseños publicados desde el panel de dueños. Los borradores no aparecen en la tienda.
        </p>
        <Link href="/catalog/manage" className="mt-5 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white">
          Ir al panel de dueños
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            placeholder="Buscar por nombre, categoría o tag"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold" value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-[32px] border border-dashed border-slate-300 bg-white p-8 text-sm text-slate-500 shadow-sm">No encontramos stickers con esos filtros.</div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
              <div className="relative">
                <img alt={item.title} src={item.image} className="h-60 w-full object-contain bg-slate-50 p-4" />
                {item.featured ? <span className="absolute left-4 top-4 rounded-full bg-[#ffb703] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-950">Destacado</span> : null}
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{item.category || "General"}</p>
                    <h3 className="mt-2 font-display text-2xl font-bold text-slate-950">{item.title}</h3>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600">Vinilo</span>
                </div>
                <p className="text-sm leading-7 text-slate-600">{item.description || "Diseño cargado desde el panel de dueños."}</p>
                {item.tags?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.slice(0, 4).map((tag) => <span key={tag} className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">#{tag}</span>)}
                  </div>
                ) : null}
                <div className="flex gap-3">
                  <Link href={`/catalog/${item.id}`} className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white">Inspeccionar</Link>
                  <Link href="/create" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700">Crear propio</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
