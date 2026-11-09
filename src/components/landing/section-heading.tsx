export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}>
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-brass">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-paper sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-pretty leading-relaxed text-muted">{description}</p> : null}
    </div>
  );
}
