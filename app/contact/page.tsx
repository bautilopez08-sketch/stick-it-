import { SectionTitle } from "@/components/ui/section-title";

export default function ContactPage() {
  return (
    <section className="section-shell py-10 md:py-14">
      <div className="space-y-8">
        <SectionTitle eyebrow="Soporte" title="Contacto y soporte base" description="Pantalla lista para evolucionar a soporte real, consultas comerciales y atención post compra." />
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm space-y-4 text-sm text-slate-600">
          <p>Email: hola@stick-it.demo</p>
          <p>WhatsApp: +54 9 11 5555 5555</p>
          <p>Horario de atención: lunes a viernes de 9 a 18 hs.</p>
        </div>
      </div>
    </section>
  );
}
