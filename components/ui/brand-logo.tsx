import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function BrandLogo({ linked = true, className = "" }: { linked?: boolean; className?: string }) {
  const content = (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <Image src="/stick-it-logo.png" alt="Stick-it" fill className="object-cover" />
      </div>
      <div>
        <p className="font-display text-xl font-bold tracking-[-0.04em] text-slate-950">Stick-it</p>
        <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">stickers & mas</p>
      </div>
    </div>
  );

  return linked ? <Link href="/">{content}</Link> : content;
}
