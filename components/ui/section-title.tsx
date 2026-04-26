import { ReactNode } from "react";

export function SectionTitle({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl space-y-3">
        <p className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
          {eyebrow}
        </p>
        <h2 className="font-display text-4xl font-bold tracking-[-0.04em] text-slate-950 md:text-5xl">{title}</h2>
        <p className="text-sm leading-7 text-slate-600 md:text-base">{description}</p>
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
