"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useAppState } from "@/context/app-state";
import { formatCurrency } from "@/lib/utils";

export function CheckoutForm() {
  const { cart, submitOrder } = useAppState();
  const searchParams = useSearchParams();
  const requestedPayment = searchParams.get("payment");
  const [submitted, setSubmitted] = useState(false);
  const [processingMercadoPago, setProcessingMercadoPago] = useState(false);
  const [mercadoPagoMessage, setMercadoPagoMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    shippingMethod: "Envio standard",
    paymentMethod: requestedPayment === "mercadopago" ? "Mercado Pago" : "Tarjeta de credito",
    notes: ""
  });
  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const shipping = cart.length ? 12 : 0;
  const total = subtotal + shipping;
  const paymentStatus = useMemo(() => searchParams.get("status"), [searchParams]);

  const hasRequiredFields = form.name.trim() && form.email.trim() && form.city.trim() && form.address.trim();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitOrder(form);
    setSubmitted(true);
  };

  const handleMercadoPagoCheckout = async () => {
    if (!cart.length) {
      setMercadoPagoMessage("Tu carrito está vacío.");
      return;
    }

    if (!hasRequiredFields) {
      setMercadoPagoMessage("Completá nombre, email, ciudad y dirección antes de pagar con Mercado Pago.");
      return;
    }

    setProcessingMercadoPago(true);
    setMercadoPagoMessage("");

    try {
      const response = await fetch("/api/mercadopago/preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { ...form, paymentMethod: "Mercado Pago" },
          items: cart.map((item) => ({
            title: item.draft.name,
            description: `${item.draft.quantity}u · ${item.draft.shape} · ${item.draft.size}`,
            quantity: 1,
            unit_price: item.totalPrice,
            picture_url: item.draft.images[0]?.src
          }))
        })
      });

      const data = await response.json();

      if (!response.ok || !data?.init_point) {
        setMercadoPagoMessage(data?.message || "No pudimos iniciar Mercado Pago.");
        return;
      }

      submitOrder({ ...form, paymentMethod: "Mercado Pago" });
      window.location.href = data.init_point;
    } catch {
      setMercadoPagoMessage("Hubo un problema al conectar con Mercado Pago.");
    } finally {
      setProcessingMercadoPago(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <form className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm space-y-5" onSubmit={handleSubmit}>
        <h2 className="font-display text-3xl font-bold text-slate-950">Checkout con Mercado Pago Argentina</h2>
        <p className="text-sm leading-7 text-slate-600">Completá tus datos y podés seguir con un pedido mock o pagar por redirección con Checkout Pro de Mercado Pago.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Nombre y apellido" required value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
          <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Email" type="email" required value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
          <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Telefono" value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} />
          <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Ciudad" required value={form.city} onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))} />
        </div>
        <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Direccion de envio" required value={form.address} onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))} />
        <div className="grid gap-4 md:grid-cols-2">
          <select className="rounded-2xl border border-slate-200 px-4 py-3" value={form.shippingMethod} onChange={(event) => setForm((current) => ({ ...current, shippingMethod: event.target.value }))}><option>Envio standard</option><option>Envio express</option><option>Retiro por punto</option></select>
          <select className="rounded-2xl border border-slate-200 px-4 py-3" value={form.paymentMethod} onChange={(event) => setForm((current) => ({ ...current, paymentMethod: event.target.value }))}><option>Tarjeta de credito</option><option>Transferencia</option><option>Mercado Pago</option></select>
        </div>
        {requestedPayment === "mercadopago" ? (
          <p className="rounded-2xl bg-sky-50 p-4 text-sm font-semibold text-sky-700">
            Llegaste desde el carrito con Mercado Pago preseleccionado.
          </p>
        ) : null}
        <textarea className="min-h-32 w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Notas del pedido" value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} />
        <div className="flex flex-wrap gap-3">
          <button type="submit" className="rounded-full border border-slate-200 px-6 py-3 text-sm font-bold text-slate-700">Confirmar pedido mock</button>
          <button type="button" onClick={handleMercadoPagoCheckout} disabled={processingMercadoPago} className="rounded-full bg-[#009ee3] px-6 py-3 text-sm font-bold text-white disabled:opacity-60">
            {processingMercadoPago ? "Conectando con Mercado Pago..." : "Pagar con Mercado Pago"}
          </button>
        </div>
        {submitted ? <p className="rounded-2xl bg-lime-100 p-4 text-sm font-semibold text-slate-950">Pedido simulado generado. Ya aparece en el panel de dueños.</p> : null}
        {mercadoPagoMessage ? <p className="rounded-2xl bg-amber-50 p-4 text-sm font-semibold text-amber-700">{mercadoPagoMessage}</p> : null}
        {paymentStatus === "success" ? <p className="rounded-2xl bg-lime-100 p-4 text-sm font-semibold text-slate-950">Mercado Pago devolvió la compra como aprobada.</p> : null}
        {paymentStatus === "pending" ? <p className="rounded-2xl bg-amber-50 p-4 text-sm font-semibold text-amber-700">Mercado Pago marcó el pago como pendiente.</p> : null}
        {paymentStatus === "failure" ? <p className="rounded-2xl bg-rose-50 p-4 text-sm font-semibold text-rose-700">El pago fue cancelado o rechazado en Mercado Pago.</p> : null}
      </form>

      <aside className="h-fit rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="font-display text-3xl font-bold text-slate-950">Resumen de compra</h3>
        <div className="mt-5 space-y-4">
          {cart.map((item) => <div key={item.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4"><p className="font-semibold text-slate-950">{item.draft.name}</p><p className="mt-1 text-sm text-slate-600">{item.draft.quantity}u · {item.draft.size} · {item.draft.shape}</p><p className="mt-2 text-sm font-bold text-slate-950">{formatCurrency(item.totalPrice)}</p></div>)}
        </div>
        <div className="mt-6 space-y-3 text-sm text-slate-600">
          <div className="flex items-center justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
          <div className="flex items-center justify-between"><span>Envio</span><span>{formatCurrency(shipping)}</span></div>
          <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-base font-bold text-slate-950"><span>Total</span><span>{formatCurrency(total)}</span></div>
        </div>
        <p className="mt-4 text-xs leading-6 text-slate-500">Para activar Mercado Pago necesitás configurar `MERCADOPAGO_ACCESS_TOKEN` y, opcionalmente, `NEXT_PUBLIC_SITE_URL` en este proyecto.</p>
      </aside>
    </div>
  );
}
