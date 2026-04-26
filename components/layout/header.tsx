"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandLogo } from "@/components/ui/brand-logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/create", label: "Crea tu sticker" },
  { href: "/catalog", label: "Catalogo" },
  { href: "/cart", label: "Carrito" },
  { href: "/contact", label: "Soporte" }
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-[#fffdf8]/85 backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between gap-4 py-4">
        <BrandLogo />
        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                pathname === item.href ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-white hover:text-slate-950"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/catalog/manage" className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 sm:block">
            Panel de dueños
          </Link>
          <Link href="/create" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white">
            Crear ahora
          </Link>
        </div>
      </div>
    </header>
  );
}
