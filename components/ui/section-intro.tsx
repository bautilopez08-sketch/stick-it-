type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionIntro({ eyebrow, title, description }: SectionIntroProps) {
  return (
    <div className="max-w-3xl space-y-4">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="headline text-4xl text-ink md:text-5xl">{title}</h2>
      <p className="max-w-2xl text-base leading-7 text-muted md:text-lg">{description}</p>
    </div>
  );
}
