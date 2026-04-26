import { DemoShell } from "@/components/demo/demo-shell";
import { MvpNote } from "@/components/marketing/mvp-note";
import { getPanoramas } from "@/lib/catalog";

export default function DemoPage() {
  const panoramas = getPanoramas();

  return (
    <div className="section-shell py-8 md:py-10">
      <DemoShell panoramas={panoramas} />
      <MvpNote />
    </div>
  );
}
