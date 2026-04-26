"use client";

import Script from "next/script";
import { createElement, HTMLAttributes, Ref, useEffect, useMemo, useRef, useState } from "react";

import { downloadTextFile } from "@/lib/utils";
import { Sofa, SofaColor } from "@/types";

type ModelViewerElement = HTMLElement & {
  canActivateAR?: boolean;
  activateAR?: () => Promise<void>;
  toDataURL?: (type?: string, encoderOptions?: number) => string;
  model?: {
    materials?: Array<{
      pbrMetallicRoughness?: {
        setBaseColorFactor?: (color: [number, number, number, number]) => void;
      };
    }>;
  };
};

type ModelViewerProps = HTMLAttributes<HTMLElement> & {
  ref?: Ref<ModelViewerElement>;
  src?: string;
  poster?: string;
  alt?: string;
  loading?: "eager" | "lazy";
  reveal?: "auto" | "interaction" | "manual";
  ar?: boolean;
  "ar-modes"?: string;
  "camera-controls"?: boolean;
  "interaction-prompt"?: string;
  "interaction-prompt-style"?: string;
  "touch-action"?: string;
  "environment-image"?: string;
  exposure?: string;
  "shadow-intensity"?: string;
  "camera-orbit"?: string;
  "camera-target"?: string;
  "field-of-view"?: string;
};

type SofaViewerProps = {
  sofa: Sofa;
  color: SofaColor;
  onCapture: (message: string) => void;
  onStatusChange?: (message: string) => void;
  onArAvailabilityChange?: (available: boolean) => void;
  registerActions?: (actions: { activateAr: () => Promise<void>; capture: () => void }) => void;
};

export function SofaViewer({ sofa, color, onCapture, onStatusChange, onArAvailabilityChange, registerActions }: SofaViewerProps) {
  const viewerRef = useRef<ModelViewerElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [canUseAr, setCanUseAr] = useState(false);
  const [loadingStep, setLoadingStep] = useState("Preparando poster premium...");

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    setIsLoaded(false);
    setHasError(false);
    setLoadingStep("Inicializando visor 3D...");

    const handleLoad = () => {
      setIsLoaded(true);
      const arAvailable = Boolean(viewer.canActivateAR);
      setCanUseAr(arAvailable);
      onArAvailabilityChange?.(arAvailable);
      onStatusChange?.("Modelo 3D listo. Puedes rotar, comparar y abrir AR si el dispositivo lo soporta.");
    };
    const handleError = () => {
      setHasError(true);
      onArAvailabilityChange?.(false);
      onStatusChange?.("No pudimos cargar el modelo 3D. La estructura queda lista para reemplazar el asset.");
    };

    viewer.addEventListener("load", handleLoad);
    viewer.addEventListener("error", handleError);

    return () => {
      viewer.removeEventListener("load", handleLoad);
      viewer.removeEventListener("error", handleError);
    };
  }, [onArAvailabilityChange, onStatusChange, sofa.id]);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setLoadingStep("Descargando activo 3D..."), 220),
      window.setTimeout(() => setLoadingStep("Aplicando materiales y escala visual..."), 860)
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [sofa.id]);

  const surfaceStyle = useMemo(
    () => ({
      boxShadow: `inset 0 0 0 1px rgba(16,24,38,0.06), 0 24px 60px rgba(16,24,38,0.08), 0 0 0 12px ${color.hex}12`
    }),
    [color.hex]
  );

  async function handleAr() {
    if (!viewerRef.current?.activateAR) {
      onStatusChange?.("AR disponible solo en vista 3D y en dispositivos compatibles.");
      return;
    }

    onStatusChange?.("Intentando abrir modo AR...");
    await viewerRef.current.activateAR();
  }

  function handleCapture() {
    const viewer = viewerRef.current;

    if (viewer?.toDataURL) {
      const dataUrl = viewer.toDataURL("image/png");
      const anchor = document.createElement("a");
      anchor.href = dataUrl;
      anchor.download = `${sofa.id}-${color.id}.png`;
      anchor.click();
      onCapture("Captura exportada desde model-viewer.");
      return;
    }

    downloadTextFile(
      `${sofa.id}-${color.id}-view.txt`,
      `Mock capture\nSofa: ${sofa.name}\nColor: ${color.name}\nModel: ${sofa.modelSrc}\nTimestamp: ${new Date().toISOString()}`
    );
    onCapture("El navegador no expuso captura binaria; se guardo un mock de vista con metadata.");
  }

  useEffect(() => {
    registerActions?.({ activateAr: handleAr, capture: handleCapture });
  }, [registerActions, sofa.id, color.id]);

  return (
    <>
      <Script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" />
      <div className="flex h-full flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 px-5 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Demo 3D real</p>
            <p className="mt-1 font-display text-xl font-semibold text-ink">{sofa.name}</p>
            <p className="mt-1 text-sm text-muted">{sofa.arLabel}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="status-chip">{color.name}</span>
            {canUseAr ? (
              <button type="button" onClick={handleAr} className="button-secondary !px-4 !py-2">
                Ver en AR
              </button>
            ) : (
              <span className="rounded-full border border-black/10 px-3 py-2 text-xs text-slate-500">AR segun dispositivo</span>
            )}
            <button type="button" onClick={handleCapture} className="button-secondary !px-4 !py-2">
              Guardar captura
            </button>
          </div>
        </div>

        <div className="relative min-h-[420px] flex-1 p-4 md:p-5">
          <div className="relative h-full min-h-[420px] overflow-hidden rounded-[28px]" style={surfaceStyle}>
            {createElement("model-viewer", {
              ref: viewerRef,
              src: sofa.modelSrc,
              poster: sofa.referencePhotoSrc ?? sofa.posterSrc,
              alt: sofa.description,
              loading: "eager",
              reveal: "auto",
              ar: sofa.arEnabled,
              "ar-modes": "webxr scene-viewer quick-look",
              "camera-controls": true,
              "interaction-prompt": "auto",
              "interaction-prompt-style": "wiggle",
              "touch-action": "pan-y",
              "environment-image": "neutral",
              exposure: "1.22",
              "shadow-intensity": "1",
              "camera-orbit": "18deg 78deg 2.7m",
              "camera-target": "0m 0.5m 0m",
              "field-of-view": "24deg"
            } satisfies ModelViewerProps)}

            {!isLoaded && !hasError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(246,245,240,0.8))] backdrop-blur-sm">
                <div className="w-full max-w-sm space-y-5 rounded-[28px] border border-white/60 bg-white/72 p-6 text-center shadow-card">
                  <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-accent/20 border-t-accent" />
                  <div className="space-y-2">
                    <p className="font-display text-2xl font-semibold text-ink">Cargando activo 3D</p>
                    <p className="text-sm text-muted">{loadingStep}</p>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#ebe7dc]">
                    <div className="h-full w-2/3 animate-pulse rounded-full bg-accent" />
                  </div>
                </div>
              </div>
            ) : null}

            <div className="absolute bottom-4 left-4 rounded-2xl border border-white/50 bg-white/75 px-4 py-3 text-sm leading-6 text-slate-700 backdrop-blur-md">
              Sofa 3D real. El selector de color funciona como referencia comercial mientras mantenemos intactos los materiales del modelo.
            </div>

            {hasError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white/75 p-8 text-center">
                <div className="max-w-md space-y-3">
                  <p className="font-display text-2xl font-semibold text-ink">No se pudo cargar el modelo 3D</p>
                  <p className="text-sm leading-6 text-muted">
                    El MVP queda preparado para reemplazar el asset por un `.glb` propio de la marca. Mientras tanto, verifica conectividad o actualiza la ruta en `data/sofas.ts`.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
