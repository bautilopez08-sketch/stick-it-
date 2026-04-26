import { CartSummary } from "@/components/shop/cart-summary";
import { SectionTitle } from "@/components/ui/section-title";

export default function CartPage() {
  return (
    <section className="section-shell py-10 md:py-14">
      <div className="space-y-8">
        <SectionTitle eyebrow="Carrito" title="Revisá tus diseños antes de pasar al checkout" description="Cada item conserva cantidad, tamaño, forma y texto para que el pedido sea claro." />
        <CartSummary />
      </div>
    </section>
  );
}
