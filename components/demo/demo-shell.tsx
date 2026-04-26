"use client";

import { useEffect, useRef, useState } from "react";

import { useAppState } from "@/context/app-state";
import { PanoramaScene } from "@/types";

import { DemoModeSwitcher } from "./blocks/demo-mode-switcher";
import { UniversalArStage } from "./blocks/universal-ar-stage";
import { PanoramaStage } from "./panorama-stage";
import { SofaConfigPanel } from "./sofa-config-panel";
import { SofaViewer } from "./sofa-viewer";

type DemoShellProps = {
  panoramas: PanoramaScene[];
};

export function DemoShell({ panoramas }: DemoShellProps) {
  const { selectedColorId, selectedPanorama, selectedSofa, setSelectedPanoramaId, setViewMode, viewMode } = useAppState();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [nativeArAvailable, setNativeArAvailable] = useState(false);
  const [universalArOpen, setUniversalArOpen] = useState(false);
  const arActionRef = useRef<(() => void | Promise<void>) | null>(null);
  const captureActionRef = useRef<(() => void) | null>(null);

  const selectedColor = selectedSofa.colors.find((color) => color.id === selectedColorId) ?? selectedSofa.colors[0];

  useEffect(() => {
    if (viewMode === "360") {
      arActionRef.current = null;
      captureActionRef.current = null;
    }
  }, [viewMode]);

  function openUniversalAr() {
    setUniversalArOpen(true);
    setStatusMessage("Abriendo preview espacial universal para desktop o equipos sin AR nativa.");
  }

  function handleArRequest() {
    setViewMode("3d");

    window.setTimeout(() => {
      if (nativeArAvailable && arActionRef.current) {
        arActionRef.current();
        return;
      }

      openUniversalAr();
    }, 180);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
      <section className="app-shell overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/5 px-5 py-4 md:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Demo</p>
            <h1 className="mt-1 font-display text-2xl font-semibold text-ink md:text-3xl">Sofa 360</h1>
          </div>
          <div className="flex items-center gap-3">
            <DemoModeSwitcher viewMode={viewMode} onChange={setViewMode} />
            <span className="status-chip">{viewMode === "3d" ? "Producto 3D" : "Interior 360"}</span>
          </div>
        </div>

        <div className="min-h-[560px]">
          {viewMode === "3d" ? (
            <SofaViewer
              sofa={selectedSofa}
              color={selectedColor}
              onCapture={setStatusMessage}
              onStatusChange={setStatusMessage}
              onArAvailabilityChange={setNativeArAvailable}
              registerActions={(actions) => {
                arActionRef.current = actions.activateAr;
                captureActionRef.current = actions.capture;
              }}
            />
          ) : (
            <PanoramaStage
              selectedScene={selectedPanorama}
              scenes={panoramas}
              sofa={selectedSofa}
              selectedColorHex={selectedColor.hex}
              onSelectScene={setSelectedPanoramaId}
            />
          )}
        </div>
      </section>

      <SofaConfigPanel
        panoramas={panoramas}
        onAr={handleArRequest}
        onCapture={() => {
          if (captureActionRef.current) {
            captureActionRef.current();
            return;
          }

          setStatusMessage("La captura binaria esta disponible en la vista 3D.");
        }}
        captureStatus={statusMessage}
      />
      <UniversalArStage isOpen={universalArOpen} sofa={selectedSofa} onClose={() => setUniversalArOpen(false)} />
    </div>
  );
}
