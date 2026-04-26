"use client";

import Link from "next/link";

import { useAppState } from "@/context/app-state";
import { formatCurrency } from "@/lib/utils";

export function HomeCartPreview() {
  const { cart } = useAppState();
  const totalItems = cart.reduce((sum, item) => sum + item.draft.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-[32px] bg-[linear-gradient(160deg,#07203a,#11c5bf)] p-7 text-white shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Carrito</p>
        <h3 className="mt-3 font-display text-4xl font-bold tracking-[-0.04em]">Comprá rápido sin perder el diseño</h3>
        <p className="mt-4 max-w-xl text-sm leading-7 text-white/80">
          Cuando agregás un sticker, queda listo para revisar, pagar con Mercado Pago o completar el checkout manual.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/cart" className="rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950">
            Ver carrito
          </Link>
          <Link href="/checkout?payment=mercadopago" className="rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white">
            Pagar con Mercado Pago
          </Link>
        </div>
      </div>

      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-[24px] bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Diseños</p>
            <p className="mt-2 font-display text-3xl font-bold text-slate-950">{cart.length}</p>
          </div>
          <div className="rounded-[24px] bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Unidades</p>
            <p className="mt-2 font-display text-3xl font-bold text-slate-950">{totalItems}</p>
          </div>
          <div className="rounded-[24px] bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Total</p>
            <p className="mt-2 font-display text-3xl font-bold text-slate-950">{formatCurrency(totalPrice)}</p>
          </div>
        </div>
        <div className="mt-5 rounded-[24px] border border-dashed border-slate-300 p-4 text-sm leading-7 text-slate-600">
          {cart.length === 0
            ? "Tu carrito todavía está vacío. Diseñá un sticker o inspeccioná uno del catálogo para empezar."
            : "Tus stickers ya están guardados en el carrito para que puedas revisar cantidades, forma y pago antes de cerrar la compra."}
        </div>
      </div>
    </div>
  );
}
