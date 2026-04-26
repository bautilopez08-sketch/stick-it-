import { getScaleAssessment, getScaleBarWidth } from "@/lib/scale";
import { ScalePreset, Sofa } from "@/types";

type ScaleValidatorProps = {
  sofa: Sofa;
  preset: ScalePreset;
};

export function ScaleValidator({ sofa, preset }: ScaleValidatorProps) {
  const assessment = getScaleAssessment(sofa, preset);
  const tone =
    assessment.fit === "good"
      ? "bg-emerald-500"
      : assessment.fit === "tight"
        ? "bg-amber-500"
        : "bg-rose-500";

  return (
    <section className="rounded-[28px] border border-black/6 bg-white/76 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Validacion de escala</p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{preset.name}</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{preset.context}</p>
        </div>
        <span className="rounded-full border border-black/10 px-3 py-1 text-sm text-slate-700">{preset.label}</span>
      </div>

      <div className="mt-5 space-y-3">
        <div className="h-3 overflow-hidden rounded-full bg-[#e9e6de]">
          <div className={`h-full rounded-full ${tone}`} style={{ width: getScaleBarWidth(assessment.score) }} />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="font-semibold text-ink">Indice visual: {assessment.score}/100</span>
          <span className="text-muted">
            Ambiente: {preset.roomWidthCm} x {preset.roomDepthCm} cm
          </span>
        </div>
        <p className="text-sm leading-6 text-muted">{assessment.message}</p>
      </div>
    </section>
  );
}
