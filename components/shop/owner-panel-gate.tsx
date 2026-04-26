"use client";

import { FormEvent, useEffect, useState } from "react";

const OWNER_PANEL_PASSWORD = "labestiamerentiel";
const OWNER_PANEL_SESSION_KEY = "stick-it-owner-panel-access";

export function OwnerPanelGate({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedAccess = window.sessionStorage.getItem(OWNER_PANEL_SESSION_KEY);
    setAuthorized(storedAccess === "granted");
    setReady(true);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === OWNER_PANEL_PASSWORD) {
      window.sessionStorage.setItem(OWNER_PANEL_SESSION_KEY, "granted");
      setAuthorized(true);
      setError("");
      setPassword("");
      return;
    }

    setError("La contraseña no es correcta.");
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem(OWNER_PANEL_SESSION_KEY);
    setAuthorized(false);
  };

  if (!ready) {
    return <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm">Cargando acceso al panel...</div>;
  }

  if (!authorized) {
    return (
      <div className="mx-auto max-w-xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
          Acceso protegido
        </p>
        <h2 className="mt-4 font-display text-4xl font-bold text-slate-950">Ingresá la contraseña del panel de dueños</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Este acceso está separado de la web pública de Stick-it. Ingresá la clave para ver pedidos, catálogo interno y gestión.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            placeholder="Contraseña"
            autoFocus
          />
          <button type="submit" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white">
            Entrar al panel
          </button>
          {error ? <p className="rounded-2xl bg-rose-50 p-4 text-sm font-semibold text-rose-700">{error}</p> : null}
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button type="button" onClick={handleLogout} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700">
          Cerrar acceso al panel
        </button>
      </div>
      {children}
    </div>
  );
}
