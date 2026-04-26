import Link from "next/link";

import { BrandLogo } from "@/components/ui/brand-logo";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/70">
      <div className="section-shell grid gap-10 py-12 md:grid-cols-[1.3fr_0.7fr_0.8fr]">
        <div className="space-y-4">
          <BrandLogo linked={false} />
          <h3 className="font-display text-2xl font-bold text-slate-950">
            Diseñá stickers únicos para tu marca, tu emprendimiento o tu estilo.
          </h3>
          <p className="max-w-xl text-sm leading-7 text-slate-600">
            Personalizalos fácil, visualizalos en tiempo real y pedilos en minutos con Stick-it.
          </p>
        </div>
        <div className="space-y-3 text-sm text-slate-600">
          <p className="font-display text-lg font-bold text-slate-950">Producto</p>
          <Link href="/create">Editor</Link>
          <Link href="/catalog">Catálogo</Link>
          <Link href="/cart">Carrito</Link>
          <Link href="/checkout">Checkout</Link>
        </div>
        <div className="space-y-3 text-sm text-slate-600">
          <p className="font-display text-lg font-bold text-slate-950">Contacto</p>
          <p>hola@stick-it.demo</p>
          <p>Soporte para marcas, emprendimientos y creadores</p>
          <p>Panel de dueños listo para recibir pedidos</p>
        </div>
      </div>
    </footer>
  );
}
