"use client";

import { ChangeEvent, PointerEvent, useMemo, useRef, useState } from "react";

import { StickerMockups } from "@/components/editor/sticker-mockups";
import { useAppState } from "@/context/app-state";
import { fontOptions, starterDraft } from "@/lib/data";
import { getTotalPrice, getUnitPrice } from "@/lib/pricing";
import { DesignDraft, DesignElement, ImageLayer } from "@/lib/types";
import { clamp, cn, formatCurrency, getFontFamily } from "@/lib/utils";

type ActiveLayer = { type: "text" } | { type: "image"; imageId: string };

function createDraft(): DesignDraft {
  return { ...starterDraft, id: `draft-${Date.now()}`, images: [] };
}

function updateLayer(layer: DesignElement, field: keyof DesignElement, value: number) {
  return { ...layer, [field]: value };
}

export function StickerEditor() {
  const [draft, setDraft] = useState<DesignDraft>(() => createDraft());
  const [activeLayer, setActiveLayer] = useState<ActiveLayer>({ type: "text" });
  const dragRef = useRef<{ layer: ActiveLayer; startX: number; startY: number } | null>(null);
  const { addToCart, saveDesign } = useAppState();

  const selectedImage = activeLayer.type === "image" ? draft.images.find((item) => item.id === activeLayer.imageId) : null;
  const unitPrice = getUnitPrice(draft);
  const totalPrice = getTotalPrice(draft);
  const previewImage = useMemo(() => draft.images[draft.images.length - 1], [draft.images]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = () => {
        const imageId = `upload-${Date.now()}-${index}`;
        setDraft((current) => ({
          ...current,
          images: [
            ...current.images,
            {
              id: imageId,
              src: String(reader.result),
              name: file.name,
              origin: "upload",
              element: { x: 36 + ((current.images.length + index) % 3) * 10, y: 40 + ((current.images.length + index) % 2) * 10, scale: 1, rotation: 0 },
              skewX: 0,
              skewY: 0,
              opacity: 100,
              shadow: false,
              tint: 100
            }
          ]
        }));
        setActiveLayer({ type: "image", imageId });
      };
      reader.readAsDataURL(file);
    });
    event.target.value = "";
  };

  const handlePointerDown = (layer: ActiveLayer) => (event: PointerEvent<HTMLDivElement>) => {
    dragRef.current = { layer, startX: event.clientX, startY: event.clientY };
    setActiveLayer(layer);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const deltaX = event.clientX - dragRef.current.startX;
    const deltaY = event.clientY - dragRef.current.startY;
    const layer = dragRef.current.layer;

    setDraft((current) => {
      if (layer.type === "text") {
        return {
          ...current,
          textElement: { ...current.textElement, x: clamp(current.textElement.x + deltaX / 3, 10, 90), y: clamp(current.textElement.y + deltaY / 3, 10, 90) }
        };
      }

      return {
        ...current,
        images: current.images.map((item) =>
          item.id === layer.imageId
            ? { ...item, element: { ...item.element, x: clamp(item.element.x + deltaX / 3, 10, 90), y: clamp(item.element.y + deltaY / 3, 10, 90) } }
            : item
        )
      };
    });

    dragRef.current = { ...dragRef.current, startX: event.clientX, startY: event.clientY };
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const applyElementControl = (field: keyof DesignElement, value: number) => {
    setDraft((current) => {
      if (activeLayer.type === "text") return { ...current, textElement: updateLayer(current.textElement, field, value) };
      return { ...current, images: current.images.map((item) => (item.id === activeLayer.imageId ? { ...item, element: updateLayer(item.element, field, value) } : item)) };
    });
  };

  const updateSelectedImage = (patch: Partial<ImageLayer>) => {
    if (activeLayer.type !== "image") return;
    setDraft((current) => ({ ...current, images: current.images.map((item) => (item.id === activeLayer.imageId ? { ...item, ...patch } : item)) }));
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[32px] border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="border-b border-slate-100 p-6">
            <p className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Editor simple</p>
            <h1 className="mt-3 font-display text-4xl font-bold text-slate-950 md:text-5xl">Subi tu imagen y armá el sticker</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Enfocado en lo esencial: subir imagen, mover, distorsionar, escribir encima, guardar y comprar.</p>
          </div>

          <div className="grid xl:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6 border-b border-slate-100 p-5 xl:border-b-0 xl:border-r">
              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold text-slate-950">Tu imagen</h2>
                <label className="block rounded-[24px] border border-dashed border-slate-300 p-4 text-sm font-semibold text-slate-700">
                  Subir imagenes propias
                  <input type="file" multiple accept="image/*" className="mt-3 block w-full text-sm" onChange={handleImageUpload} />
                </label>

                <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl font-bold text-slate-950">Capas</h3>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{draft.images.length} imagenes</span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {draft.images.length === 0 ? (
                      <p className="text-sm text-slate-500">Subí una imagen para empezar.</p>
                    ) : (
                      draft.images.map((image) => (
                        <div key={image.id} className={cn("flex items-center gap-3 rounded-2xl border p-3", activeLayer.type === "image" && activeLayer.imageId === image.id ? "border-slate-950 bg-white" : "border-slate-200 bg-white/80")}>
                          <img alt={image.name} src={image.src} className="h-12 w-12 rounded-xl object-cover" />
                          <button type="button" onClick={() => setActiveLayer({ type: "image", imageId: image.id })} className="flex-1 text-left">
                            <p className="text-sm font-semibold text-slate-950">{image.name}</p>
                            <p className="text-xs uppercase tracking-[0.15em] text-slate-400">imagen</p>
                          </button>
                          <button type="button" onClick={() => setDraft((current) => ({ ...current, images: current.images.filter((item) => item.id !== image.id) }))} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-bold text-slate-600">
                            Eliminar
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold text-slate-950">Texto encima</h2>
                <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" value={draft.text} onChange={(event) => setDraft((current) => ({ ...current, text: event.target.value }))} placeholder="Escribí una frase o nombre" />
                <button type="button" onClick={() => setDraft((current) => ({ ...current, text: "" }))} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700">Eliminar texto</button>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    Tipografia
                    <select className="w-full rounded-2xl border border-slate-200 px-4 py-3" value={draft.font} onChange={(event) => setDraft((current) => ({ ...current, font: event.target.value as DesignDraft["font"] }))}>
                      {fontOptions.map((font) => <option key={font.key} value={font.key}>{font.label}</option>)}
                    </select>
                  </label>
                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    Color
                    <input className="h-12 w-full rounded-2xl border border-slate-200 p-2" type="color" value={draft.textColor} onChange={(event) => setDraft((current) => ({ ...current, textColor: event.target.value }))} />
                  </label>
                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    Tamaño
                    <input className="w-full" type="range" min={24} max={110} value={draft.textSize} onChange={(event) => setDraft((current) => ({ ...current, textSize: Number(event.target.value) }))} />
                  </label>
                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    Espaciado
                    <input className="w-full" type="range" min={-1} max={10} value={draft.letterSpacing} onChange={(event) => setDraft((current) => ({ ...current, letterSpacing: Number(event.target.value) }))} />
                  </label>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    ["bold", "Negrita"],
                    ["italic", "Cursiva"],
                    ["shadow", "Sombra"],
                    ["outline", "Contorno"],
                    ["uppercase", "Mayusculas"]
                  ].map(([field, label]) => (
                    <button key={field} type="button" onClick={() => setDraft((current) => ({ ...current, [field]: !current[field as keyof DesignDraft] }))} className={cn("rounded-full px-4 py-2 text-sm font-bold transition", draft[field as keyof DesignDraft] ? "bg-[#ffb703] text-slate-950" : "bg-slate-100 text-slate-600")}>
                      {label}
                    </button>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold text-slate-950">Sticker</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Material</p>
                    <p className="mt-2 font-display text-2xl font-bold text-slate-950">Vinilo</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">Dejamos un solo material para simplificar el flujo.</p>
                  </div>
                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    Forma
                    <select className="w-full rounded-2xl border border-slate-200 px-4 py-3" value={draft.shape} onChange={(event) => setDraft((current) => ({ ...current, shape: event.target.value as DesignDraft["shape"] }))}>
                      <option value="circle">Circular</option>
                      <option value="square">Cuadrado</option>
                      <option value="rectangle">Rectangular</option>
                      <option value="rounded">Rounded</option>
                      <option value="die-cut">Troquelado</option>
                    </select>
                  </label>
                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    Tamaño
                    <select className="w-full rounded-2xl border border-slate-200 px-4 py-3" value={draft.size} onChange={(event) => setDraft((current) => ({ ...current, size: event.target.value as DesignDraft["size"] }))}>
                      <option value="S">S · 5 cm</option>
                      <option value="M">M · 8 cm</option>
                      <option value="L">L · 12 cm</option>
                    </select>
                  </label>
                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    Cantidad
                    <input className="w-full" type="range" min={10} max={300} step={10} value={draft.quantity} onChange={(event) => setDraft((current) => ({ ...current, quantity: Number(event.target.value) }))} />
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{draft.quantity} unidades</span>
                  </label>
                </div>
              </section>
            </div>

            <div className="space-y-5 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Vista previa</p>
                  <h2 className="mt-3 font-display text-3xl font-bold text-slate-950">Preview del sticker</h2>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500">Unitario {formatCurrency(unitPrice)}</p>
                  <p className="font-display text-3xl font-bold text-slate-950">{formatCurrency(totalPrice)}</p>
                </div>
              </div>

              <div className={cn("relative overflow-hidden border border-white/60 bg-[linear-gradient(135deg,#ffffff,#eef4ff)] shadow-[0_20px_60px_rgba(15,23,42,0.08)]", draft.shape === "circle" && "aspect-square rounded-full", draft.shape === "square" && "aspect-square rounded-[26px]", draft.shape === "rectangle" && "aspect-[4/3] rounded-[30px]", draft.shape === "rounded" && "aspect-square rounded-[38px]", draft.shape === "die-cut" && "aspect-square rounded-[40%_34%_38%_30%/30%_40%_28%_42%]")} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}>
                {draft.images.length ? draft.images.map((image) => (
                  <div
                    key={image.id}
                    role="button"
                    tabIndex={0}
                    onPointerDown={handlePointerDown({ type: "image", imageId: image.id })}
                    className={cn("absolute h-36 w-36 cursor-move overflow-hidden rounded-[24px] bg-white/70 p-2 shadow-lg", activeLayer.type === "image" && activeLayer.imageId === image.id ? "ring-2 ring-[#ffb703]" : "ring-1 ring-transparent")}
                    style={{ left: `${image.element.x}%`, top: `${image.element.y}%`, opacity: image.opacity / 100, transform: `translate(-50%, -50%) rotate(${image.element.rotation}deg) scale(${image.element.scale}) skew(${image.skewX}deg, ${image.skewY}deg)`, boxShadow: image.shadow ? "0 18px 35px rgba(8,18,31,0.24)" : "none", filter: `saturate(${image.tint}%)` }}
                  >
                    <img alt={image.name} src={image.src} className="h-full w-full rounded-[18px] object-cover" />
                  </div>
                )) : <div className="absolute inset-x-0 bottom-7 flex justify-center"><div className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Subí una imagen para empezar</div></div>}

                {draft.text.trim() ? (
                  <div
                    role="button"
                    tabIndex={0}
                    onPointerDown={handlePointerDown({ type: "text" })}
                    className={cn("absolute max-w-[78%] cursor-move select-none rounded-2xl px-3 py-2 text-center", activeLayer.type === "text" ? "ring-2 ring-slate-950/70" : "ring-1 ring-transparent")}
                    style={{ left: `${draft.textElement.x}%`, top: `${draft.textElement.y}%`, transform: `translate(-50%, -50%) rotate(${draft.textElement.rotation + draft.curved / 5}deg) scale(${draft.textElement.scale})`, color: draft.textColor, fontSize: draft.textSize, fontFamily: getFontFamily(draft.font), fontWeight: draft.bold ? 800 : 500, fontStyle: draft.italic ? "italic" : "normal", letterSpacing: `${draft.letterSpacing}px`, textTransform: draft.uppercase ? "uppercase" : "none", textShadow: draft.shadow ? "0 10px 22px rgba(8,18,31,0.18)" : "none", WebkitTextStroke: draft.outline ? "1px white" : "0px transparent" }}
                  >
                    {draft.text}
                  </div>
                ) : null}
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-bold text-slate-950">Editar capa</h3>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{activeLayer.type === "text" ? "Texto" : selectedImage?.name ?? "Imagen"}</span>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm font-semibold text-slate-700">Escala<input className="w-full" type="range" min={0.4} max={2.2} step={0.05} value={activeLayer.type === "text" ? draft.textElement.scale : selectedImage?.element.scale ?? 1} onChange={(event) => applyElementControl("scale", Number(event.target.value))} /></label>
                  <label className="space-y-2 text-sm font-semibold text-slate-700">Rotacion<input className="w-full" type="range" min={-60} max={60} value={activeLayer.type === "text" ? draft.textElement.rotation : selectedImage?.element.rotation ?? 0} onChange={(event) => applyElementControl("rotation", Number(event.target.value))} /></label>
                  <label className="space-y-2 text-sm font-semibold text-slate-700">Posicion vertical<input className="w-full" type="range" min={10} max={90} value={activeLayer.type === "text" ? draft.textElement.y : selectedImage?.element.y ?? 50} onChange={(event) => applyElementControl("y", Number(event.target.value))} /></label>
                  <label className="space-y-2 text-sm font-semibold text-slate-700">Posicion horizontal<input className="w-full" type="range" min={10} max={90} value={activeLayer.type === "text" ? draft.textElement.x : selectedImage?.element.x ?? 50} onChange={(event) => applyElementControl("x", Number(event.target.value))} /></label>
                  {activeLayer.type === "image" ? (
                    <>
                      <label className="space-y-2 text-sm font-semibold text-slate-700">Distorsion X<input className="w-full" type="range" min={-30} max={30} value={selectedImage?.skewX ?? 0} onChange={(event) => updateSelectedImage({ skewX: Number(event.target.value) })} /></label>
                      <label className="space-y-2 text-sm font-semibold text-slate-700">Distorsion Y<input className="w-full" type="range" min={-30} max={30} value={selectedImage?.skewY ?? 0} onChange={(event) => updateSelectedImage({ skewY: Number(event.target.value) })} /></label>
                      <label className="space-y-2 text-sm font-semibold text-slate-700">Opacidad<input className="w-full" type="range" min={20} max={100} value={selectedImage?.opacity ?? 100} onChange={(event) => updateSelectedImage({ opacity: Number(event.target.value) })} /></label>
                      <label className="space-y-2 text-sm font-semibold text-slate-700">Color / saturacion<input className="w-full" type="range" min={30} max={180} value={selectedImage?.tint ?? 100} onChange={(event) => updateSelectedImage({ tint: Number(event.target.value) })} /></label>
                      <button type="button" onClick={() => updateSelectedImage({ shadow: !selectedImage?.shadow })} className={cn("rounded-full px-4 py-2 text-sm font-bold", selectedImage?.shadow ? "bg-[#ffb703] text-slate-950" : "bg-white text-slate-700")}>Sombra</button>
                    </>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => saveDesign(draft)} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700">Guardar diseño</button>
                <button type="button" onClick={() => addToCart(draft)} className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white">Agregar al carrito</button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-display text-3xl font-bold text-slate-950">Flujo rápido</h3>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
              <p>1. Subí la foto que querés convertir en sticker.</p>
              <p>2. Movela, deformala y agregale texto si querés.</p>
              <p>3. Elegí forma, tamaño y cantidad.</p>
              <p>4. Guardá o agregá al carrito para cerrar la compra.</p>
            </div>
          </div>
          <StickerMockups featuredImage={previewImage} caption={draft.text} />
        </div>
      </div>
    </div>
  );
}
