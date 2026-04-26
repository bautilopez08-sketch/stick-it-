import { Sofa } from "@/types";

// Placeholder de demo: reemplazar por los .glb/.gltf finales de la marca para la etapa comercial.
const models = {
  nordic: "/models/sofa-real.glb",
  atlas: "/models/sofa-real.glb",
  orbit: "/models/sofa-real.glb",
  pulse: "/models/sofa-real.glb"
};

export const sofas: Sofa[] = [
  {
    id: "sofa-nordic",
    name: "Nordic Curve",
    description: "Sillon modular de demo para living contemporaneo con perfil bajo y presencia premium.",
    category: "Living premium",
    priceUsd: 1890,
    dimensions: { widthCm: 228, depthCm: 98, heightCm: 84 },
    colors: [
      { id: "stone", name: "Stone", hex: "#c6b8a7", material: "Boucle" },
      { id: "forest", name: "Forest", hex: "#5f6b57", material: "Lino tecnico" },
      { id: "graphite", name: "Graphite", hex: "#4d5257", material: "Microfibra" }
    ],
    modelSrc: models.nordic,
    posterSrc: "/sofas/nordic-poster.svg",
    arEnabled: true,
    arLabel: "AR lista para validar presencia general en living residencial",
    scaleMultiplier: 1.14,
    referencePhotoSrc:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "sofa-atlas",
    name: "Atlas Lounge",
    description: "Sillon recto de gran profundidad pensado para showrooms y propuestas contract.",
    category: "Contract",
    priceUsd: 2140,
    dimensions: { widthCm: 246, depthCm: 104, heightCm: 82 },
    colors: [
      { id: "sand", name: "Sand", hex: "#d7c5aa", material: "Chenille" },
      { id: "ocean", name: "Ocean", hex: "#557c8f", material: "Twill" },
      { id: "ink", name: "Ink", hex: "#202a39", material: "Gamuza sintetica" }
    ],
    modelSrc: models.atlas,
    posterSrc: "/sofas/atlas-poster.svg",
    arEnabled: true,
    arLabel: "AR lista para propuestas contract y espacios amplios",
    scaleMultiplier: 1.22,
    referencePhotoSrc:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "sofa-orbit",
    name: "Orbit Soft",
    description: "Sillon curvo para proyectos residenciales con enfoque en visualizacion inmersiva.",
    category: "Residencial",
    priceUsd: 2390,
    dimensions: { widthCm: 260, depthCm: 112, heightCm: 78 },
    colors: [
      { id: "ivory", name: "Ivory", hex: "#eee6da", material: "Boucle premium" },
      { id: "terracotta", name: "Terracotta", hex: "#b96a53", material: "Velvet" },
      { id: "moss", name: "Moss", hex: "#66705d", material: "Lino" }
    ],
    modelSrc: models.orbit,
    posterSrc: "/sofas/orbit-poster.svg",
    arEnabled: true,
    arLabel: "AR lista para validar formas curvas y ocupacion del espacio",
    scaleMultiplier: 1.28,
    referencePhotoSrc:
      "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "sofa-pulse",
    name: "Pulse Studio",
    description: "Sillon compacto para departamentos y configuradores omnicanal con foco comercial.",
    category: "Compactos",
    priceUsd: 1520,
    dimensions: { widthCm: 198, depthCm: 92, heightCm: 81 },
    colors: [
      { id: "clay", name: "Clay", hex: "#b38e76", material: "Panama" },
      { id: "mist", name: "Mist", hex: "#cfd6d8", material: "Performance fabric" },
      { id: "night", name: "Night", hex: "#1d2532", material: "Lino mezclado" }
    ],
    modelSrc: models.pulse,
    posterSrc: "/sofas/pulse-poster.svg",
    arEnabled: true,
    arLabel: "AR lista para validar escala en departamentos compactos",
    scaleMultiplier: 0.98,
    referencePhotoSrc:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
  }
];
