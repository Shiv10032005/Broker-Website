import React from 'react';
import { calculatePricePerSqft, formatPrice } from '../utils/dataService';
import './PropertyCard.css';

const PropertyCard = ({ property, onViewDetails }) => {
  const pricePerSqft = calculatePricePerSqft(property.price, property.areaSqft);

  const getTypeBadgeClass = (type) => {
    switch (type) {
      case 'Residential':
        return 'badge-residential';
      case 'Commercial':
        return 'badge-commercial';
      case 'Agricultural':
        return 'badge-agricultural';
      default:
        return 'badge-default';
    }
  };

  // Generate amenities based on type
  const getAmenities = (type) => {
    if (type === 'Residential') {
      return [
        { icon: '🛏️', label: '4 Bed', value: 'bedrooms' },
        { icon: '🚿', label: '2 Bath', value: 'bathrooms' },
        { icon: '🚗', label: '1 Parking', value: 'parking' }
      ];
    } else if (type === 'Commercial') {
      return [
        { icon: '📐', label: 'Open Floor', value: 'layout' },
        { icon: '🚗', label: '5 Parking', value: 'parking' },
        { icon: '🔌', label: '3-Phase', value: 'power' }
      ];
    } else {
      return [
        { icon: '💧', label: 'Water', value: 'water' },
        { icon: '🌾', label: 'Fertile', value: 'soil' },
        { icon: '🚜', label: 'Road Access', value: 'access' }
      ];
    }
  };

  const amenities = getAmenities(property.type);

  // js-early-exit: guard at top, no unnecessary nesting
  const handleClick = () => {
    if (!onViewDetails) return;
    onViewDetails(property);
  };

  return (
    <div className="property-card" onClick={handleClick}>
      {/* Image Container */}
      <div className="property-image-container">
        <img
          src={property.images[0]}
          alt={property.title}
          className="property-image"
        />
        <div className="property-badge-container">
          <span className={`property-badge ${getTypeBadgeClass(property.type)}`}>
            {property.type}
          </span>
        </div>
        <div className="property-price-tag">
          <span className="price-value">{formatPrice(property.price)}</span>
        </div>
        <div className="property-overlay" />
      </div>

      {/* Content */}
      <div className="property-content">
        <h3 className="property-title">{property.title}</h3>

        <div className="property-location">
          <svg className="location-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="location-text">{property.city}, {property.state}</span>
        </div>

        {/* Amenities */}
        <div className="property-amenities">
          {amenities.map((amenity, index) => (
            <div key={index} className="amenity-item">
              <span className="amenity-icon">{amenity.icon}</span>
              <span className="amenity-label">{amenity.label}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="property-divider"></div>

        {/* Price Details Row */}
        <div className="price-details-row">
          <div className="detail-item">
            <span className="detail-label">Area</span>
            <span className="detail-value">{property.areaSqft.toLocaleString()} sq.ft</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Price/sq.ft</span>
            <span className="detail-value highlight">{formatPrice(pricePerSqft)}</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="view-details-btn" onClick={(e) => { e.stopPropagation(); handleClick(); }}>
          View Details
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// rerender-memo: skip re-renders when property prop reference hasn't changed
export default React.memo(PropertyCard);
