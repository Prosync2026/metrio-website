import { ChevronDown } from 'lucide-react';

const SearchDropdown = ({ icon: Icon, placeholder, value, options, isOpen, onToggle, onSelect }) => (
  <div className="relative flex-1">
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-3 px-4 py-3.5 bg-white/8 hover:bg-white/12 rounded-lg text-white transition-colors text-left"
    >
      <Icon size={18} className="text-gold shrink-0" />
      <span className={`flex-1 text-sm ${value ? 'text-white' : 'text-white/50'}`}>
        {value ? options.find((o) => o.value === value)?.label : placeholder}
      </span>
      <ChevronDown size={16} className={`text-white/40 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    {isOpen && (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl shadow-black/20 overflow-hidden z-50">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className="w-full text-left px-4 py-3 text-sm text-dark hover:bg-cream hover:text-gold transition-colors"
          >
            {opt.label}
          </button>
        ))}
      </div>
    )}
  </div>
);

export default SearchDropdown;
