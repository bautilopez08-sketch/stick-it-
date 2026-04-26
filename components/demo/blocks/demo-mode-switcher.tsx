"use client";

import { ViewMode } from "@/types";

type DemoModeSwitcherProps = {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
};

export function DemoModeSwitcher({ viewMode, onChange }: DemoModeSwitcherProps) {
  return (
    <div className="inline-flex rounded-full border border-black/10 bg-white/70 p-1">
      {[
        { id: "3d" as const, label: "Producto 3D" },
        { id: "360" as const, label: "Ambiente 360" }
      ].map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onChange(item.id)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            viewMode === item.id ? "bg-ink text-white" : "text-slate-600 hover:text-ink"
          }`}
          aria-pressed={viewMode === item.id}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
