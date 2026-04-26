import { TourModule } from "@/types";

export const tourModules: TourModule[] = [
  {
    id: "panorama-engine",
    title: "Motor panorama 360",
    description: "La escena demo ya puede migrar a Marzipano o Pannellum sin tocar la capa comercial ni los controles de producto.",
    status: "ready"
  },
  {
    id: "hotspot-routing",
    title: "Ruteo entre ambientes",
    description: "La estructura actual de hotspots y escenas deja preparada la navegacion entre living, cocina o dormitorio.",
    status: "next"
  },
  {
    id: "listing-embed",
    title: "Embeds para propiedades",
    description: "Siguiente capa pensada para inmobiliarias: iframe por propiedad, branding y analytics por tour.",
    status: "future"
  }
];
