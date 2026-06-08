type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({ eyebrow, title, description, align = "left" }: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-leaf-600">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 font-display text-3xl text-leaf-900 sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-leaf-800/80">{description}</p> : null}
    </div>
  );
}
