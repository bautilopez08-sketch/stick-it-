import { ScalePreset } from "@/types";

export const scalePresets: ScalePreset[] = [
  {
    id: "compact-living",
    name: "Depto compacto",
    roomWidthCm: 310,
    roomDepthCm: 360,
    label: "Escala exigente",
    context: "Ideal para validar sillones en espacios reducidos y decisiones de compra sensibles al tamaño."
  },
  {
    id: "family-living",
    name: "Living familiar",
    roomWidthCm: 420,
    roomDepthCm: 520,
    label: "Escala equilibrada",
    context: "Referencia comercial mas comun para retail de sillones de dos y tres cuerpos."
  },
  {
    id: "premium-showroom",
    name: "Showroom premium",
    roomWidthCm: 560,
    roomDepthCm: 700,
    label: "Escala amplia",
    context: "Sirve para exhibicion, espacios contract y validacion de composicion general."
  }
];
