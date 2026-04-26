"use client";

import Script from "next/script";
import { useEffect, useMemo, useRef, useState } from "react";

import { PanoramaScene, Sofa } from "@/types";

type PanoramaStageProps = {
  selectedScene: PanoramaScene;
  scenes: PanoramaScene[];
  sofa: Sofa;
  selectedColorHex: string;
  onSelectScene: (sceneId: string) => void;
};

type PannellumViewer = {
  destroy: () => void;
  loadScene: (sceneId: string) => void;
  on?: (event: string, callback: (sceneId: string) => void) => void;
};

declare global {
  interface Window {
    pannellum?: {
      viewer: (container: HTMLElement, config: Record<string, unknown>) => PannellumViewer;
    };
  }
}

export function PanoramaStage({
  selectedScene,
  scenes,
  sofa,
  selectedColorHex,
  onSelectScene
}: PanoramaStageProps) {
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const pannellumRef = useRef<PannellumViewer | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [scale, setScale] = useState(100);

  const sceneMap = useMemo(() => {
    const entries = scenes.map((scene) => [
      scene.id,
      {
        title: scene.name,
        type: "equirectangular",
        panorama: scene.imageSrc,
        autoLoad: true,
        showZoomCtrl: true,
        showFullscreenCtrl: false,
        compass: false,
        hfov: scene.hfov ?? 110,
        pitch: scene.pitch ?? 0,
        yaw: scene.yaw ?? 0,
        hotSpots: scene.hotspots.map((hotspot) => ({
          pitch: hotspot.pitch,
          yaw: hotspot.yaw,
          type: "scene",
          text: hotspot.label,
          sceneId: hotspot.targetSceneId ?? scene.id
        }))
      }
    ]);

    return Object.fromEntries(entries);
  }, [scenes]);

  useEffect(() => {
    if (document.getElementById("pannellum-styles")) return;

    const link = document.createElement("link");
    link.id = "pannellum-styles";
    link.rel = "stylesheet";
    link.href = "https://cdn.pannellum.org/2.5/pannellum.css";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    if (!scriptReady || !viewerRef.current || !window.pannellum) return;

    pannellumRef.current?.destroy();
    pannellumRef.current = window.pannellum.viewer(viewerRef.current, {
      default: {
        firstScene: selectedScene.id,
        sceneFadeDuration: 550,
        autoLoad: true
      },
      scenes: sceneMap
    });
    pannellumRef.current.on?.("scenechange", onSelectScene);

    return () => {
      pannellumRef.current?.destroy();
      pannellumRef.current = null;
    };
  }, [onSelectScene, sceneMap, scriptReady, selectedScene.id]);

  useEffect(() => {
    pannellumRef.current?.loadScene(selectedScene.id);
  }, [selectedScene.id]);

  return (
    <>
      <Script src="https://cdn.pannellum.org/2.5/pannellum.js" onLoad={() => setScriptReady(true)} />
      <div className="flex h-full flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 px-5 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Interior 360</p>
            <p className="mt-1 font-display text-xl font-semibold text-ink">{selectedScene.name}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {scenes.map((scene) => (
              <button
                key={scene.id}
                type="button"
                onClick={() => onSelectScene(scene.id)}
                className={`rounded-full px-3 py-2 text-sm transition ${
                  scene.id === selectedScene.id ? "bg-ink text-white" : "border border-black/10 bg-white text-slate-700"
                }`}
              >
                {scene.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid min-h-[420px] flex-1 gap-0 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="relative min-h-[420px] border-b border-black/5 xl:border-b-0 xl:border-r">
            <div ref={viewerRef} className="h-full min-h-[420px] w-full bg-[#d9d4c9]" />
            <div className="absolute left-4 top-4 rounded-full border border-white/35 bg-black/30 px-3 py-2 text-xs uppercase tracking-[0.18em] text-white backdrop-blur-md">
              Mover entre ambientes
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 p-5 md:p-6">
            <div className="rounded-[24px] border border-black/8 bg-white/76 p-5">
              <p className="text-sm font-semibold text-ink">Sofa en ambiente</p>
              <div className="mt-4 rounded-[24px] border border-black/8 bg-[linear-gradient(180deg,#f4f2ec_0%,#e7e0d5_100%)] p-4">
                <div
                  className="mx-auto h-44 max-w-[360px] rounded-[28px] bg-contain bg-center bg-no-repeat transition"
                  style={{
                    backgroundImage: `url(${sofa.posterSrc})`,
                    transform: `translate(${offsetX}px, ${offsetY}px) scale(${(sofa.scaleMultiplier ?? 1) * (scale / 100)})`
                  }}
                />
              </div>
            </div>

            <div className="rounded-[24px] border border-black/8 bg-white/76 p-5">
              <div className="space-y-4">
                <Slider label="Horizontal" value={offsetX} min={-100} max={100} onChange={setOffsetX} />
                <Slider label="Vertical" value={offsetY} min={-70} max={70} onChange={setOffsetY} />
                <Slider label="Escala" value={scale} min={70} max={145} onChange={setScale} suffix="%" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  suffix?: string;
};

function Slider({ label, value, min, max, onChange, suffix = "px" }: SliderProps) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-ink">{label}</span>
        <span className="text-muted">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-[var(--accent)]"
      />
    </label>
  );
}
