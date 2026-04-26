"use client";

import Link from "next/link";

import { useAppState } from "@/context/app-state";
import { formatCurrency } from "@/lib/utils";

export function CartSummary() {
  const { cart, removeFromCart, clearCart } = useAppState();
  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const shipping = cart.length ? 12 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-sm text-slate-600 shadow-sm">Tu carrito está vacío. Creá o inspeccioná un sticker para agregarlo.</div>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4">
        {cart.map((item) => (
          <article key={item.id} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-bold text-slate-950">{item.draft.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.draft.quantity}u · {item.draft.shape} · {item.draft.size} · vinilo</p>
                <p className="mt-2 text-sm text-slate-600">{item.draft.text ? `Texto: ${item.draft.text}` : "Sin texto"}</p>
              </div>
              <button type="button" onClick={() => removeFromCart(item.id)} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700">Eliminar</button>
            </div>
            {item.draft.images[0] ? <img alt={item.draft.name} src={item.draft.images[0].src} className="mt-4 h-40 w-full rounded-[24px] object-contain bg-slate-50 p-4" /> : null}
          </article>
        ))}
      </div>
      <aside className="h-fit rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="font-display text-3xl font-bold text-slate-950">Resumen</h3>
        <div className="mt-6 space-y-3 text-sm text-slate-600">
          <div className="flex items-center justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
          <div className="flex items-center justify-between"><span>Envio</span><span>{formatCurrency(shipping)}</span></div>
          <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-base font-bold text-slate-950"><span>Total</span><span>{formatCurrency(total)}</span></div>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <Link href="/checkout" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Ir al checkout</Link>
          <Link href="/checkout?payment=mercadopago" className="rounded-full bg-[#009ee3] px-5 py-3 text-center text-sm font-bold text-white">
            Pagar con Mercado Pago
          </Link>
          <button type="button" onClick={clearCart} className="rounded-full border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700">Vaciar carrito</button>
        </div>
        <p className="mt-4 text-xs leading-6 text-slate-500">
          Si elegís Mercado Pago desde acá, te llevamos al checkout con ese medio de pago preseleccionado para completar tus datos y crear la preferencia.
        </p>
      </aside>
    </div>
  );
}
