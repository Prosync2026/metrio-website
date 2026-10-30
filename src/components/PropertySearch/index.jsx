import { useState } from 'react';
import { Search, MapPin, Home } from 'lucide-react';
import SearchDropdown from './SearchDropdown';

const locations = [
  { value: 'northern', label: 'Northern Region' },
  { value: 'central', label: 'Central Region' },
];

const propertyTypes = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'industrial', label: 'Industrial' },
];

const PropertySearch = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [locationOpen, setLocationOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);

  return (
    <div className="container-metrio pb-8 md:pb-12">
      <div className="glass-dark rounded-xl md:rounded-2xl p-4 md:p-6 mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center">
          {/* Location Dropdown */}
          <SearchDropdown
            icon={MapPin}
            placeholder="Select Location"
            value={location}
            options={locations}
            isOpen={locationOpen}
            onToggle={() => { setLocationOpen(!locationOpen); setTypeOpen(false); }}
            onSelect={(val) => { setLocation(val); setLocationOpen(false); }}
          />

          {/* Divider */}
          <div className="hidden md:block w-px h-10 bg-white/10" />

          {/* Property Type Dropdown */}
          <SearchDropdown
            icon={Home}
            placeholder="Property Type"
            value={propertyType}
            options={propertyTypes}
            isOpen={typeOpen}
            onToggle={() => { setTypeOpen(!typeOpen); setLocationOpen(false); }}
            onSelect={(val) => { setPropertyType(val); setTypeOpen(false); }}
          />

          {/* Search Button */}
          <button className="btn-primary justify-center cursor-pointer">
            <Search size={18} />
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertySearch;
