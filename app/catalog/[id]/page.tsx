import { CatalogProductDetail } from "@/components/shop/catalog-product-detail";
import { SectionTitle } from "@/components/ui/section-title";

export default async function CatalogProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <section className="section-shell py-10 md:py-14">
      <div className="space-y-8">
        <SectionTitle eyebrow="Inspeccionar" title="Revisá el sticker antes de comprarlo" description="Elegí forma, tamaño y cantidad, y después agregalo al carrito desde esta ficha de producto." />
        <CatalogProductDetail productId={id} />
      </div>
    </section>
  );
}
