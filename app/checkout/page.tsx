import { CheckoutForm } from "@/components/shop/checkout-form";
import { SectionTitle } from "@/components/ui/section-title";

export default function CheckoutPage() {
  return (
    <section className="section-shell py-10 md:py-14">
      <div className="space-y-8">
        <SectionTitle eyebrow="Checkout" title="Cerrá el pedido y mandalo al panel de dueños" description="El flujo está listo para una integración de pago más adelante, pero ya guarda y envía los pedidos dentro del sitio." />
        <CheckoutForm />
      </div>
    </section>
  );
}
