import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import FilterPanel from '../components/FilterPanel';
import PropertyList from '../components/PropertyList';
import PropertyModal from '../components/PropertyModal';
import EmptyState from '../components/EmptyState';
import { loadProperties, filterProperties, getUniqueCities } from '../utils/dataService';
import ScrollTriggeredFeatures from '../components/ScrollTriggeredFeatures';

// rendering-hoist-jsx: static data hoisted outside component — created once, never recreated
// Note: stats section uses <ScrollTriggeredFeatures/>, so no STATS array needed here

const TESTIMONIALS = [
  {
    name: 'Rahul Sharma',
    role: 'Property Buyer',
    text: 'Found my dream plot in Bangalore within 2 weeks! The filtering options made it so easy to find exactly what I was looking for.',
    avatar: 'RS'
  },
  {
    name: 'Priya Patel',
    role: 'Real Estate Investor',
    text: 'Best platform for land investment in India. Transparent pricing and verified listings gave me complete confidence.',
    avatar: 'PP'
  },
  {
    name: 'Amit Kumar',
    role: 'First-time Buyer',
    text: 'The price per sq.ft feature helped me compare properties easily. Excellent experience from start to finish!',
    avatar: 'AK'
  }
];

const HomePage = ({ preloadedProperties = [] }) => {
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

  // Load properties on mount or use preloaded data
  useEffect(() => {
    const fetchProperties = async () => {
      // If we have preloaded properies, use them immediately
      if (preloadedProperties && preloadedProperties.length > 0) {
        setAllProperties(preloadedProperties);
        setFilteredProperties(preloadedProperties);
        setCities(getUniqueCities(preloadedProperties));
        setIsLoading(false);
        return;
      }

      // Fallback fetch if no preloaded data
      setIsLoading(true);
      const properties = await loadProperties();
      setAllProperties(properties);
      setFilteredProperties(properties);
      setCities(getUniqueCities(properties));
      setIsLoading(false);
    };

    fetchProperties();
  }, [preloadedProperties]);

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

  // Stats and testimonials are now module-level constants (STATS, TESTIMONIALS)
  // — removed from component body per rendering-hoist-jsx rule

  return (
    <div className="home-page">
      {/* Property Details Modal */}
      {selectedProperty && (
        <PropertyModal property={selectedProperty} onClose={handleCloseModal} />
      )}

      {/* Hero Section - Enhanced */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">🏆 #1 Property Platform in India</span>
          <h1 className="hero-title">
            Investing In Your
            <span className="hero-highlight"> Future</span>
            <br />One Land At A Time
          </h1>
          <p className="hero-subtitle">
            We'll help you find the key to your dream property. Experience the joy of land ownership. 
            Let us make your property buying journey simple and transparent.
          </p>
          <div className="hero-buttons">
            <a href="#listings" className="btn-primary">
              <span>Explore Properties</span>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <Link to="/contact" className="btn-secondary">
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800" alt="Modern Property" />
          <div className="hero-floating-card">
            <div className="floating-stat">
              <span className="floating-number">22K+</span>
              <span className="floating-label">Properties Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search Bar */}
      <section className="quick-search" id="listings">
        <div className="search-card">
          <div className="search-group">
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
          <div className="search-divider"></div>
          <div className="search-group">
            <label>🏠 Property Type</label>
            <select 
              onChange={(e) => {
                const type = e.target.value;
                handleFilterChange({ types: type ? [type] : [] });
              }}
            >
              <option value="">All Types</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Agricultural">Agricultural</option>
            </select>
          </div>
          <div className="search-divider"></div>
          <div className="search-group">
            <label>💰 Budget</label>
            <select 
              onChange={(e) => {
                const [min, max] = e.target.value.split('-');
                handleFilterChange({ minPrice: min || '', maxPrice: max || '' });
              }}
            >
              <option value="">Any Budget</option>
              <option value="0-5000000">Under ₹50 Lakhs</option>
              <option value="5000000-10000000">₹50L - ₹1 Crore</option>
              <option value="10000000-20000000">₹1Cr - ₹2 Crore</option>
              <option value="20000000-">Above ₹2 Crore</option>
            </select>
          </div>
          <button 
            className="search-btn"
            onClick={() => {
              document.querySelector('.properties-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </button>
        </div>
      </section>

      {/* Statistics / Journey Section (Animated) */}
      <section className="stats-section">
        <h2 className="section-title text-center">Navigating Your Real Estate Journey</h2>
        <p className="section-subtitle text-center">
          Look for an agency with a proven track record of success in buying, selling, or renting properties.
        </p>
        <ScrollTriggeredFeatures />
      </section>



      {/* Advanced Filters - Hidden initially */}
      <section className="advanced-filters">
        <details className="filter-details">
          <summary className="filter-toggle">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Advanced Filters
          </summary>
          {!isLoading && (
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              cities={cities}
            />
          )}
        </details>
      </section>

      {/* Popular Properties */}
      <section className="properties-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">All Properties</h2>
            <p className="section-subtitle">
              Discover premium land options across India's top cities
            </p>
          </div>
          <span className="property-count">
            {filteredProperties.length} Properties Found
          </span>
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
            {filteredProperties.length > 0 ? (
              <PropertyList properties={filteredProperties} onViewDetails={handleViewDetails} />
            ) : (
              <EmptyState />
            )}
          </>
        )}
      </section>

      {/* Where Comfort Meets Convenience */}
      <section className="comfort-section">
        <div className="comfort-content">
          <h2 className="comfort-title">Where Comfort Meets Convenience</h2>
          <p className="comfort-text">
            We understand that finding the perfect property is about more than just square footage. 
            It's about finding a place that feels like home, in a location that fits your lifestyle.
          </p>
          <ul className="comfort-features">
            <li>✓ Verified property listings</li>
            <li>✓ Transparent pricing with price/sq.ft</li>
            <li>✓ Expert guidance throughout</li>
            <li>✓ Pan-India coverage</li>
          </ul>
          <Link to="/about" className="btn-primary">
            Learn More About Us
          </Link>
        </div>
        <div className="comfort-image">
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600" alt="Luxury Property" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2 className="section-title">Kind Words From Our Happy Customers</h2>
        <p className="section-subtitle">
          See what our clients have to say about their experience with us
        </p>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonial.avatar}</div>
                <div>
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-role">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Find Your Dream Property?</h2>
          <p className="cta-text">Start your journey today and discover the perfect land for your future.</p>
          <div className="cta-buttons">
            <a href="#listings" className="btn-primary btn-white">Browse Properties</a>
            <Link to="/contact" className="btn-secondary btn-outline">Get in Touch</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
