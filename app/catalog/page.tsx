import Link from "next/link";

import { CatalogGrid } from "@/components/shop/catalog-grid";
import { SectionTitle } from "@/components/ui/section-title";

export default function CatalogPage() {
  return (
    <section className="section-shell py-10 md:py-14">
      <div className="space-y-8">
        <SectionTitle eyebrow="Catalogo" title="Stickers publicados desde el panel de dueños" description="Este catálogo muestra solamente los productos que subís desde la web interna de Stick-it." action={<Link href="/catalog/manage" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white">Ir al panel de dueños</Link>} />
        <CatalogGrid />
      </div>
    </section>
  );
}
