import { SpatialBackdrop } from "@/types";

export const spatialBackdrops: SpatialBackdrop[] = [
  {
    id: "loft-pano",
    name: "Loft abierto",
    roomType: "Casa demo 360",
    description: "Backdrop panoramico de living amplio para prueba universal de colocacion.",
    imageSrc:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80"
  },
  {
    id: "minimal-home",
    name: "Living minimal",
    roomType: "Interior residencial",
    description: "Escena luminosa para validar escala general del sillón en ambiente domestico.",
    imageSrc:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=80"
  },
  {
    id: "warm-house",
    name: "Casa calida",
    roomType: "Ambiente familiar",
    description: "Backdrop amplio de casa real para mover el sillón y simular posicionamiento.",
    imageSrc:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1800&q=80"
  }
];
