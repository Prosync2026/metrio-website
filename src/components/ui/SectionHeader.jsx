import ScrollReveal from './ScrollReveal';

const SectionHeader = ({
  title,
  subtitle,
  align = 'center',
  light = false,
  className = '',
}) => {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <ScrollReveal className={`flex flex-col gap-4 mb-14 ${alignClass} ${className}`}>
      <div className={`gold-line${align === 'center' ? '-center' : ''}`} />
      <h2
        className={`font-display text-4xl md:text-5xl lg:text-[3.25rem] tracking-tight leading-tight ${
          light ? 'text-white' : 'text-dark'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base md:text-lg max-w-2xl leading-relaxed ${
            light ? 'text-white/70' : 'text-warm-gray'
          }`}
        >
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
};

export default SectionHeader;
