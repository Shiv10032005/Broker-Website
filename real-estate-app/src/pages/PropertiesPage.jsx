import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './PropertiesPage.css';
import FilterPanel from '../components/FilterPanel';
import PropertyList from '../components/PropertyList';
import PropertyModal from '../components/PropertyModal';
import EmptyState from '../components/EmptyState';
import { loadProperties, filterProperties, getUniqueCities } from '../utils/dataService';

const PropertiesPage = () => {
  const location = useLocation();
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filters, setFilters] = useState({
    city: 'all',
    types: [],
    minPrice: '',
    maxPrice: '',
  });
  const [sortBy, setSortBy] = useState('newest');

  // Load properties on mount
  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      const properties = await loadProperties();
      setAllProperties(properties);
      setFilteredProperties(properties);
      setCities(getUniqueCities(properties));
      setIsLoading(false);
    };

    fetchProperties();
  }, []);

  // Read URL query parameters and apply filters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const typeParam = params.get('type');
    
    if (typeParam) {
      setFilters(prevFilters => ({
        ...prevFilters,
        types: [typeParam]
      }));
    } else {
      // Reset type filter if no type param
      setFilters(prevFilters => ({
        ...prevFilters,
        types: []
      }));
    }
  }, [location.search]);

  // Apply filters whenever filters change
  useEffect(() => {
    const filtered = filterProperties(allProperties, {
      ...filters,
      minPrice: filters.minPrice ? Number(filters.minPrice) : null,
      maxPrice: filters.maxPrice ? Number(filters.maxPrice) : null,
    });
    setFilteredProperties(filtered);
  }, [filters, allProperties]);

  // rerender-functional-setstate: accepts a partial update, merges via prev =>
  // so JSX event handlers don't need to close over stale `filters` snapshot
  const handleFilterChange = (partial) => {
    setFilters(prev => ({ ...prev, ...partial }));
  };

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
    document.body.style.overflow = '';
  };

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'area-large':
        return b.areaSqft - a.areaSqft;
      case 'newest':
      default: {
        // Assume newest means descending ID if IDs are numeric, or fallback to 0 (no sort change)
        const idA = parseInt(a.id) || 0;
        const idB = parseInt(b.id) || 0;
        return idB - idA;
      }
    }
  });

  return (
    <div className="properties-page">
      {/* Property Details Modal */}
      {selectedProperty && (
        <PropertyModal property={selectedProperty} onClose={handleCloseModal} />
      )}

      {/* Page Header */}
      <section className="properties-hero">
        <h1 className="properties-title">Browse All Properties</h1>
        <p className="properties-subtitle">
          Discover your perfect property from our extensive collection of verified listings across India
        </p>
      </section>

      {/* Search & Filter Section */}
      <section className="properties-filters">
        <div className="filters-container">
          <div className="filter-row">
            <div className="filter-group">
              <label>📍 Location</label>
              <select 
                value={filters.city} 
                onChange={(e) => handleFilterChange({ city: e.target.value })}
              >
                <option value="all">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>🏠 Property Type</label>
              <select 
                value={filters.types[0] || ''}
                onChange={(e) => {
                  const type = e.target.value;
                  handleFilterChange({
                    ...filters, 
                    types: type ? [type] : []
                  });
                }}
              >
                <option value="">All Types</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Agricultural">Agricultural</option>
              </select>
            </div>
            <div className="filter-group">
              <label>💰 Budget</label>
              <select 
                onChange={(e) => {
                  const [min, max] = e.target.value.split('-');
                  handleFilterChange({
                    ...filters, 
                    minPrice: min || '',
                    maxPrice: max || ''
                  });
                }}
              >
                <option value="">Any Budget</option>
                <option value="0-5000000">Under ₹50 Lakhs</option>
                <option value="5000000-10000000">₹50L - ₹1 Crore</option>
                <option value="10000000-20000000">₹1Cr - ₹2 Crore</option>
                <option value="20000000-">Above ₹2 Crore</option>
              </select>
            </div>
          </div>
          
          {/* Advanced Filters */}
          <details className="advanced-filter-details">
            <summary className="advanced-filter-toggle">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              More Filters
            </summary>
            {!isLoading && (
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                cities={cities}
              />
            )}
          </details>
        </div>
      </section>

      {/* Results Header */}
      <section className="properties-results">
        <div className="results-header">
          <h2 className="results-title">
            {filteredProperties.length} Properties Found
          </h2>
          <div className="results-sort">
            <label>Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="area-large">Area: Largest First</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading properties...</p>
          </div>
        )}

        {/* Property List or Empty State */}
        {!isLoading && (
          <>
            {sortedProperties.length > 0 ? (
              <PropertyList properties={sortedProperties} onViewDetails={handleViewDetails} />
            ) : (
              <EmptyState />
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default PropertiesPage;
