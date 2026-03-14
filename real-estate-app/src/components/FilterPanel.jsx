import React from 'react';
import './FilterPanel.css';

const FilterPanel = ({ filters, onFilterChange, cities }) => {
  const propertyTypes = ['Residential', 'Commercial', 'Agricultural'];

  const handleTypeToggle = (type) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type];
    onFilterChange({ ...filters, types: newTypes });
  };

  const handleClearFilters = () => {
    onFilterChange({
      city: 'all',
      types: [],
      minPrice: '',
      maxPrice: '',
    });
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h2 className="filter-title">
          <svg className="filter-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter Properties
        </h2>
        <button onClick={handleClearFilters} className="clear-filters-btn">
          Clear All
        </button>
      </div>

      <div className="filter-grid">
        {/* City Filter */}
        <div className="filter-group">
          <label className="filter-label">City</label>
          <select
            value={filters.city}
            onChange={(e) => onFilterChange({ ...filters, city: e.target.value })}
            className="filter-select"
          >
            <option value="all">All Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type Filter */}
        <div className="filter-group">
          <label className="filter-label">Property Type</label>
          <div className="checkbox-group">
            {propertyTypes.map((type) => (
              <label key={type} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.types.includes(type)}
                  onChange={() => handleTypeToggle(type)}
                  className="checkbox-input"
                />
                <span className="checkbox-text">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Min Price */}
        <div className="filter-group">
          <label className="filter-label">Min Price (₹)</label>
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => onFilterChange({ ...filters, minPrice: e.target.value })}
            placeholder="e.g., 1000000"
            className="filter-input"
          />
        </div>

        {/* Max Price */}
        <div className="filter-group">
          <label className="filter-label">Max Price (₹)</label>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange({ ...filters, maxPrice: e.target.value })}
            placeholder="e.g., 50000000"
            className="filter-input"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
