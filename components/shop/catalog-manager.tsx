"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";

import { useAppState } from "@/context/app-state";
import { CatalogDesign } from "@/lib/catalog";
import { Order } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

const categories = ["General", "Logos", "Frases", "Minimalistas", "Urbanos", "Vintage", "Memes", "Gaming", "Musica", "Deportes"];
const orderStatuses: Array<Order["status"]> = ["Nuevo", "En produccion", "Despachado"];

async function resizeCatalogImage(file: File) {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("No se pudo leer la imagen"));
    reader.readAsDataURL(file);
  });

  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const nextImage = new Image();
    nextImage.onload = () => resolve(nextImage);
    nextImage.onerror = () => reject(new Error("No se pudo procesar la imagen"));
    nextImage.src = dataUrl;
  });

  const maxSide = 1400;
  const ratio = Math.min(1, maxSide / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * ratio));
  const height = Math.max(1, Math.round(image.height * ratio));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) return dataUrl;
  context.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL("image/webp", 0.82);
}

function emptyForm() {
  return {
    title: "",
    category: "General",
    description: "",
    tags: "",
    status: "active" as CatalogDesign["status"],
    featured: false,
    image: ""
  };
}

export function CatalogManager() {
  const { orders, catalogItems, addCatalogItem, updateCatalogItem, removeCatalogItem, updateOrderStatus } = useAppState();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [orderFilter, setOrderFilter] = useState<"Todos" | Order["status"]>("Todos");
  const [catalogFilter, setCatalogFilter] = useState<"Todos" | "active" | "draft">("Todos");

  const metrics = useMemo(() => {
    const units = orders.flatMap((order) => order.items).reduce((sum, item) => sum + item.draft.quantity, 0);
    return {
      totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
      newOrders: orders.filter((order) => order.status === "Nuevo").length,
      productionOrders: orders.filter((order) => order.status === "En produccion").length,
      shippedOrders: orders.filter((order) => order.status === "Despachado").length,
      units,
      activeCatalog: catalogItems.filter((item) => item.status !== "draft").length
    };
  }, [catalogItems, orders]);

  const visibleOrders = orderFilter === "Todos" ? orders : orders.filter((order) => order.status === orderFilter);
  const visibleCatalog =
    catalogFilter === "Todos" ? catalogItems : catalogItems.filter((item) => (item.status ?? "active") === catalogFilter);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      const resized = await resizeCatalogImage(file);
      setForm((current) => ({ ...current, image: resized }));
    } catch {
      setUploadError("No pudimos preparar esta imagen. Probá con otra.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const resetForm = () => {
    setForm(emptyForm());
    setEditingId(null);
    setUploadError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.title || !form.image) return;

    const payload: CatalogDesign = {
      id: editingId ?? `catalog-${Date.now()}`,
      title: form.title,
      category: form.category || "General",
      description: form.description,
      image: form.image,
      tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      status: form.status ?? "active",
      featured: form.featured
    };

    if (editingId) {
      updateCatalogItem(editingId, payload);
    } else {
      addCatalogItem(payload);
    }

    resetForm();
  };

  const startEdit = (item: CatalogDesign) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      category: item.category || "General",
      description: item.description || "",
      tags: item.tags?.join(", ") ?? "",
      status: item.status ?? "active",
      featured: Boolean(item.featured),
      image: item.image
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[
          { label: "Pedidos nuevos", value: metrics.newOrders, copy: "Requieren revisión" },
          { label: "En producción", value: metrics.productionOrders, copy: "Listos para imprimir" },
          { label: "Despachados", value: metrics.shippedOrders, copy: "Cerrados" },
          { label: "Unidades", value: metrics.units, copy: "Stickers vendidos" },
          { label: "Facturación", value: formatCurrency(metrics.totalRevenue), copy: "Ingresos mock" }
        ].map((metric) => (
          <article key={metric.label} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{metric.label}</p>
            <p className="mt-3 font-display text-3xl font-bold text-slate-950">{metric.value}</p>
            <p className="mt-2 text-sm text-slate-600">{metric.copy}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-display text-3xl font-bold text-slate-950">Pedidos recibidos</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">Gestioná el estado, revisá datos del cliente y prepará producción.</p>
            </div>
            <select className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold" value={orderFilter} onChange={(event) => setOrderFilter(event.target.value as "Todos" | Order["status"])}>
              <option>Todos</option>
              {orderStatuses.map((status) => <option key={status}>{status}</option>)}
            </select>
          </div>

          <div className="mt-5 space-y-4">
            {visibleOrders.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-slate-300 p-5 text-sm text-slate-500">Todavía no hay pedidos en este filtro.</div>
            ) : (
              visibleOrders.map((order) => (
                <article key={order.id} className="rounded-[28px] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="font-display text-xl font-bold text-slate-950">{order.customer.name}</p>
                      <p className="mt-1 text-sm text-slate-600">{order.customer.email} · {order.customer.phone || "sin teléfono"}</p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">#{order.id.replace("order-", "")}</p>
                    </div>
                    <select className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.12em]" value={order.status} onChange={(event) => updateOrderStatus(order.id, event.target.value as Order["status"])}>
                      {orderStatuses.map((status) => <option key={status}>{status}</option>)}
                    </select>
                  </div>

                  <div className="mt-4 grid gap-3 rounded-[22px] bg-white p-4 text-sm text-slate-600 md:grid-cols-2">
                    <p>Ciudad: {order.customer.city}</p>
                    <p>Dirección: {order.customer.address}</p>
                    <p>Envío: {order.customer.shippingMethod}</p>
                    <p>Pago: {order.customer.paymentMethod}</p>
                    <p>Total: {formatCurrency(order.total)}</p>
                    <p>Fecha: {new Date(order.createdAt).toLocaleString("es-AR")}</p>
                    <p className="md:col-span-2">Notas: {order.customer.notes || "sin notas adicionales"}</p>
                  </div>

                  <div className="mt-4 space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="grid gap-3 rounded-[22px] bg-white p-3 text-sm text-slate-600 md:grid-cols-[96px_1fr_auto] md:items-center">
                        {item.draft.images[0] ? <img alt={item.draft.name} src={item.draft.images[0].src} className="h-24 w-24 rounded-2xl object-contain bg-slate-50 p-2" /> : <div className="h-24 w-24 rounded-2xl bg-slate-100" />}
                        <div>
                          <p className="font-semibold text-slate-950">{item.draft.name}</p>
                          <p>{item.draft.quantity}u · {item.draft.shape} · {item.draft.size} · vinilo</p>
                          <p>{item.draft.text ? `Texto: ${item.draft.text}` : "Sin texto"}</p>
                        </div>
                        <p className="font-bold text-slate-950">{formatCurrency(item.totalPrice)}</p>
                      </div>
                    ))}
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <div className="space-y-5">
          <form onSubmit={handleSubmit} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl font-bold text-slate-950">{editingId ? "Editar sticker" : "Agregar diseño al catálogo"}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">Publicá diseños listos para vender o dejalos en borrador.</p>
              </div>
              {editingId ? <button type="button" onClick={resetForm} className="rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700">Cancelar</button> : null}
            </div>
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Nombre del sticker" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
            <select className="w-full rounded-2xl border border-slate-200 px-4 py-3" value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}>
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
            <textarea className="min-h-28 w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Descripción breve" value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} />
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Tags separados por coma: urbano, logo, mate" value={form.tags} onChange={(event) => setForm((current) => ({ ...current, tags: event.target.value }))} />
            <div className="grid gap-3 sm:grid-cols-2">
              <select className="rounded-2xl border border-slate-200 px-4 py-3" value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as CatalogDesign["status"] }))}>
                <option value="active">Publicado</option>
                <option value="draft">Borrador</option>
              </select>
              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
                <input type="checkbox" checked={form.featured} onChange={(event) => setForm((current) => ({ ...current, featured: event.target.checked }))} />
                Destacado
              </label>
            </div>
            <label className="block rounded-[24px] border border-dashed border-slate-300 p-4 text-sm font-semibold text-slate-700">
              {uploading ? "Procesando imagen..." : "Subir imagen del diseño"}
              <input type="file" accept="image/*" className="mt-3 block w-full text-sm" onChange={handleUpload} />
            </label>
            {uploadError ? <p className="text-sm font-semibold text-rose-500">{uploadError}</p> : null}
            {form.image ? <img alt="Preview del diseño" src={form.image} className="h-44 w-full rounded-[24px] object-contain bg-slate-50 p-3" /> : null}
            <button type="submit" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white">{editingId ? "Guardar cambios" : "Guardar en catálogo"}</button>
          </form>

          <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-bold text-slate-950">Catálogo interno</h3>
                <p className="mt-1 text-sm text-slate-600">{metrics.activeCatalog} publicados · {catalogItems.length} totales</p>
              </div>
              <select className="rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold" value={catalogFilter} onChange={(event) => setCatalogFilter(event.target.value as "Todos" | "active" | "draft")}>
                <option>Todos</option>
                <option value="active">Publicados</option>
                <option value="draft">Borradores</option>
              </select>
            </div>
            <div className="mt-4 space-y-4">
              {visibleCatalog.length === 0 ? (
                <div className="rounded-[24px] border border-dashed border-slate-300 p-5 text-sm text-slate-500">No hay stickers para este filtro.</div>
              ) : (
                visibleCatalog.map((item) => (
                  <article key={item.id} className="grid gap-4 rounded-[24px] border border-slate-200 bg-slate-50 p-3 sm:grid-cols-[112px_1fr]">
                    <img alt={item.title} src={item.image} className="h-28 w-full rounded-2xl object-contain bg-white p-2 sm:w-28" />
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">{item.category}</span>
                        <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">{item.status === "draft" ? "Borrador" : "Publicado"}</span>
                        {item.featured ? <span className="rounded-full bg-[#ffb703] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-950">Destacado</span> : null}
                      </div>
                      <div>
                        <h4 className="font-display text-xl font-bold text-slate-950">{item.title}</h4>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{item.description || "Sin descripción"}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={() => startEdit(item)} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700">Editar</button>
                        <button type="button" onClick={() => updateCatalogItem(item.id, { status: item.status === "draft" ? "active" : "draft" })} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700">{item.status === "draft" ? "Publicar" : "Mandar a borrador"}</button>
                        <button type="button" onClick={() => removeCatalogItem(item.id)} className="rounded-full border border-rose-200 bg-white px-4 py-2 text-xs font-bold text-rose-600">Eliminar</button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
