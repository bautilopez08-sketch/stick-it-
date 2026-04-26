"use client";

import { FormEvent, useState, useTransition } from "react";

import { BusinessType, LeadPayload } from "@/types";

const initialState: LeadPayload = {
  name: "",
  company: "",
  email: "",
  phone: "",
  businessType: "muebleria",
  message: ""
};

type LeadFormProps = {
  compact?: boolean;
  title?: string;
  description?: string;
};

export function LeadForm({
  compact = false,
  title = "Solicitar demo para empresas",
  description = "Deja tus datos y enviamos una demo guiada para retail de sillones o una adaptacion al flujo inmobiliario."
}: LeadFormProps) {
  const [form, setForm] = useState(initialState);
  const [result, setResult] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function updateField<Key extends keyof LeadPayload>(key: Key, value: LeadPayload[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);

    startTransition(async () => {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        setResult("No pudimos enviar la solicitud. Revisa los datos e intenta nuevamente.");
        return;
      }

      setForm(initialState);
      setResult("Solicitud enviada. El lead quedo registrado en el mock del servidor.");
    });
  }

  return (
    <section id="lead-form" className={compact ? "" : "section-shell py-14 md:py-20"}>
      <div className="app-shell p-6 md:p-8">
        <div className={compact ? "mb-6" : "mb-8 max-w-2xl"}>
          <span className="eyebrow">Lead form</span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink md:text-4xl">{title}</h2>
          <p className="mt-3 text-sm leading-7 text-muted md:text-base">{description}</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <input className="field" placeholder="Nombre" value={form.name} onChange={(event) => updateField("name", event.target.value)} required />
          <input className="field" placeholder="Empresa" value={form.company} onChange={(event) => updateField("company", event.target.value)} required />
          <input className="field" type="email" placeholder="Email" value={form.email} onChange={(event) => updateField("email", event.target.value)} required />
          <input className="field" placeholder="Telefono" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} required />
          <select className="field" value={form.businessType} onChange={(event) => updateField("businessType", event.target.value as BusinessType)}>
            <option value="muebleria">Muebleria</option>
            <option value="inmobiliaria">Inmobiliaria</option>
            <option value="otro">Otro</option>
          </select>
          <div className="rounded-2xl border border-dashed border-black/10 bg-white/55 px-4 py-3 text-sm leading-6 text-muted">
            Endpoint mock: <span className="font-semibold text-ink">POST /api/leads</span>. El backend real puede conectarse mas adelante sin tocar la UI.
          </div>
          <textarea
            className="field md:col-span-2"
            rows={5}
            placeholder="Mensaje"
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            required
          />
          <div className="md:col-span-2 flex flex-wrap items-center gap-3">
            <button className="button-primary" type="submit" disabled={isPending}>
              {isPending ? "Enviando..." : "Solicitar cotizacion"}
            </button>
            {result ? <p className="text-sm text-muted">{result}</p> : null}
          </div>
        </form>
      </div>
    </section>
  );
}
