import { PanoramaScene } from "@/types";

export const panoramas: PanoramaScene[] = [
  {
    id: "living-node",
    name: "Living",
    description: "Primer nodo interior para entrar directamente a una casa demo y empezar a desplazarte.",
    imageSrc: "https://pannellum.org/images/bma-0.jpg",
    hotspotLabel: "Puntos de avance",
    hfov: 110,
    pitch: 0,
    yaw: 160,
    hotspots: [
      { id: "hs-1", label: "Ir al comedor", pitch: -2, yaw: 25, targetSceneId: "dining-node" },
      { id: "hs-2", label: "Ir al salon", pitch: -5, yaw: 200, targetSceneId: "salon-node" }
    ]
  },
  {
    id: "dining-node",
    name: "Comedor",
    description: "Nodo interior secundario para seguir navegando como un mini Street View dentro de casa.",
    imageSrc: "https://pannellum.org/images/bma-1.jpg",
    hotspotLabel: "Cambio de escena",
    hfov: 110,
    pitch: 0,
    yaw: 210,
    hotspots: [
      { id: "hs-3", label: "Volver al living", pitch: -3, yaw: 225, targetSceneId: "living-node" },
      { id: "hs-4", label: "Ir al salon", pitch: -6, yaw: 120, targetSceneId: "salon-node" }
    ]
  },
  {
    id: "salon-node",
    name: "Salon",
    description: "Tercer nodo interior para completar un recorrido fluido de ambientes enlazados.",
    imageSrc: "https://pannellum.org/images/alma.jpg",
    hotspotLabel: "Hotspots de ambiente",
    hfov: 100,
    pitch: 0,
    yaw: 20,
    hotspots: [
      { id: "hs-5", label: "Volver al comedor", pitch: -8, yaw: 260, targetSceneId: "dining-node" },
      { id: "hs-6", label: "Volver al living", pitch: -4, yaw: 40, targetSceneId: "living-node" }
    ]
  }
];
