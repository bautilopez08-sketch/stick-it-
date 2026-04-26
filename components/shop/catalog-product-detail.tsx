"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { useAppState } from "@/context/app-state";
import { starterDraft } from "@/lib/data";
import { DesignDraft } from "@/lib/types";
import { getTotalPrice, getUnitPrice } from "@/lib/pricing";
import { formatCurrency } from "@/lib/utils";

export function CatalogProductDetail({ productId }: { productId: string }) {
  const { catalogItems, addToCart } = useAppState();
  const [shape, setShape] = useState<DesignDraft["shape"]>("rounded");
  const [size, setSize] = useState<DesignDraft["size"]>("M");
  const [quantity, setQuantity] = useState(50);
  const [added, setAdded] = useState(false);
  const item = catalogItems.find((entry) => entry.id === productId && entry.status !== "draft");

  const draft = useMemo(() => {
    if (!item) return null;
    return {
      ...starterDraft,
      id: `catalog-draft-${item.id}`,
      name: item.title,
      shape,
      size,
      quantity,
      images: [
        {
          id: `catalog-image-${item.id}`,
          src: item.image,
          name: item.title,
          origin: "catalog" as const,
          element: { x: 50, y: 50, scale: 1.2, rotation: 0 },
          skewX: 0,
          skewY: 0,
          opacity: 100,
          shadow: false,
          tint: 100
        }
      ]
    };
  }, [item, quantity, shape, size]);

  if (!item || !draft) {
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="font-display text-3xl font-bold text-slate-950">Sticker no encontrado</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">Este producto no está disponible en el catálogo actual.</p>
        <Link href="/catalog" className="mt-5 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="rounded-[32px] bg-[linear-gradient(135deg,#ffffff,#eef4ff)] p-6">
          <div className="mx-auto flex aspect-square max-w-[520px] items-center justify-center overflow-hidden rounded-[38px] border border-white/70 bg-white shadow-sm">
            <img alt={item.title} src={item.image} className="h-full w-full object-contain p-8" />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{item.category || "General"}</p>
          <h1 className="mt-3 font-display text-4xl font-bold text-slate-950">{item.title}</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">{item.description || "Sticker publicado desde el panel de dueños."}</p>
          {item.tags?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">#{tag}</span>)}
            </div>
          ) : null}
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[22px] bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Material</p><p className="mt-2 font-semibold text-slate-950">Vinilo</p></div>
            <div className="rounded-[22px] bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Uso</p><p className="mt-2 font-semibold text-slate-950">Termo, notebook, pared</p></div>
            <div className="rounded-[22px] bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Pedido</p><p className="mt-2 font-semibold text-slate-950">A demanda</p></div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm font-semibold text-slate-700">Forma<select className="w-full rounded-2xl border border-slate-200 px-4 py-3" value={shape} onChange={(event) => setShape(event.target.value as DesignDraft["shape"])}><option value="circle">Circular</option><option value="square">Cuadrado</option><option value="rectangle">Rectangular</option><option value="rounded">Rounded</option><option value="die-cut">Troquelado</option></select></label>
            <label className="space-y-2 text-sm font-semibold text-slate-700">Tamaño<select className="w-full rounded-2xl border border-slate-200 px-4 py-3" value={size} onChange={(event) => setSize(event.target.value as DesignDraft["size"])}><option value="S">S · 5 cm</option><option value="M">M · 8 cm</option><option value="L">L · 12 cm</option></select></label>
            <label className="space-y-2 text-sm font-semibold text-slate-700 md:col-span-2">Cantidad<input className="w-full" type="range" min={10} max={300} step={10} value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} /><span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{quantity} unidades</span></label>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-slate-100 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Precio unitario</p><p className="mt-2 font-display text-2xl font-bold text-slate-950">{formatCurrency(getUnitPrice(draft))}</p></div>
            <div className="rounded-[24px] border border-slate-100 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Total</p><p className="mt-2 font-display text-2xl font-bold text-slate-950">{formatCurrency(getTotalPrice(draft))}</p></div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={() => { addToCart(draft); setAdded(true); }} className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white">Añadir al carrito</button>
            <Link href="/cart" className="rounded-full border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700">Ir al carrito</Link>
            <Link href="/create" className="rounded-full border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700">Crear uno propio</Link>
            <Link href="/catalog" className="rounded-full border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700">Volver al catálogo</Link>
          </div>
          {added ? <p className="mt-4 rounded-2xl bg-lime-100 p-4 text-sm font-semibold text-slate-950">Sticker agregado al carrito.</p> : null}
        </div>
      </div>
    </div>
  );
}
