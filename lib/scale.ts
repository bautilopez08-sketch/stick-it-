import { ScaleAssessment, ScalePreset, Sofa } from "@/types";
import { clamp } from "@/lib/utils";

export function getScaleAssessment(sofa: Sofa, preset: ScalePreset): ScaleAssessment {
  const widthRatio = sofa.dimensions.widthCm / preset.roomWidthCm;
  const depthRatio = sofa.dimensions.depthCm / preset.roomDepthCm;
  const ratio = Math.max(widthRatio, depthRatio);

  if (ratio <= 0.62) {
    return {
      fit: "good",
      score: clamp(Math.round((1 - ratio) * 100), 72, 96),
      message: "Escala comoda para este ambiente. Buen margen de circulacion."
    };
  }

  if (ratio <= 0.76) {
    return {
      fit: "tight",
      score: clamp(Math.round((1 - ratio) * 100), 48, 71),
      message: "El sillón entra bien, pero conviene revisar paso lateral y composicion."
    };
  }

  return {
    fit: "oversized",
    score: clamp(Math.round((1 - ratio) * 100), 18, 47),
    message: "La escala se ve exigida. Conviene validar una opcion mas compacta o un ambiente mayor."
  };
}

export function getScaleBarWidth(score: number) {
  return `${clamp(score, 0, 100)}%`;
}
