import { CatalogManager } from "@/components/shop/catalog-manager";
import { OwnerPanelGate } from "@/components/shop/owner-panel-gate";
import { SectionTitle } from "@/components/ui/section-title";

export default function CatalogManagePage() {
  return (
    <section className="section-shell py-10 md:py-14">
      <div className="space-y-8">
        <SectionTitle eyebrow="Panel de dueños" title="Recibí pedidos de Stick-it y cargá diseños para el catálogo" description="Esta segunda web funciona como escritorio interno: primero ves los pedidos que entran desde la tienda y, además, podés subir stickers para vender desde el catálogo." />
        <OwnerPanelGate>
          <CatalogManager />
        </OwnerPanelGate>
      </div>
    </section>
  );
}
