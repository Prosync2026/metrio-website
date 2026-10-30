import ScrollReveal from '../ui/ScrollReveal';

const RegionTabs = ({ regions, activeRegion, onSelect }) => (
  <ScrollReveal className="flex justify-center gap-4 mb-14">
    {Object.entries(regions).map(([key, val]) => (
      <button
        key={key}
        onClick={() => onSelect(key)}
        className={`px-8 py-3.5 text-[13px] tracking-[0.15em] uppercase font-medium transition-all cursor-pointer ${
          activeRegion === key
            ? 'bg-forest text-white shadow-lg shadow-forest/20'
            : 'bg-white text-dark/60 hover:text-dark hover:shadow-md'
        }`}
      >
        {val.label}
      </button>
    ))}
  </ScrollReveal>
);

export default RegionTabs;
