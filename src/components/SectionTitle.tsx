type Props = { eyebrow?: string; title: string; subtitle?: string; light?: boolean };

export default function SectionTitle({ eyebrow, title, subtitle, light = false }: Props) {
  return (
    <div>
      {eyebrow && (
        <p className={`mb-2 text-xs font-semibold tracking-[0.3em] ${light ? "text-rose-soft" : "text-bordeaux"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-serif text-3xl font-bold sm:text-4xl ${light ? "text-white" : "text-bordeaux-deep"}`}>
        {title}
      </h2>
      {subtitle && <p className={`mt-3 max-w-md ${light ? "text-white/80" : "text-ink/75"}`}>{subtitle}</p>}
    </div>
  );
}