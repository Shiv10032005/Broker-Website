import React from 'react';
import ReactDOM from 'react-dom';
import { formatPrice, calculatePricePerSqft } from '../utils/dataService';
import './PropertyModal.css';

const PropertyModal = ({ property, onClose }) => {
  // Pro Tip (Overlay Close Support) - Vanilla JS fallback
  React.useEffect(() => {
    const handleWindowClick = (e) => {
      const modal = document.querySelector('.modal-overlay');
      if (modal && e.target === modal) {
        onClose();
      }
    };
    window.addEventListener("click", handleWindowClick);
    return () => window.removeEventListener("click", handleWindowClick);
  }, [onClose]);

  if (!property) return null;

  const pricePerSqft = calculatePricePerSqft(property.price, property.areaSqft);

  // Property features based on type
  const getFeatures = (type) => {
    if (type === 'Residential') {
      return [
        { icon: '🛏️', label: '4 Bedrooms' },
        { icon: '🚿', label: '2 Bathrooms' },
        { icon: '🚗', label: '1 Parking' },
        { icon: '🌳', label: 'Garden Space' },
        { icon: '🔒', label: 'Gated Community' },
        { icon: '💡', label: 'Power Backup' }
      ];
    } else if (type === 'Commercial') {
      return [
        { icon: '📐', label: 'Open Floor Plan' },
        { icon: '🚗', label: '5 Parking Spots' },
        { icon: '🔌', label: '3-Phase Power' },
        { icon: '🏢', label: 'Lift Access' },
        { icon: '🔥', label: 'Fire Safety' },
        { icon: '📶', label: 'High-Speed Internet' }
      ];
    } else {
      return [
        { icon: '💧', label: 'Water Source' },
        { icon: '🌾', label: 'Fertile Soil' },
        { icon: '🚜', label: 'Road Access' },
        { icon: '⚡', label: 'Electricity' },
        { icon: '🌲', label: 'Tree Plantation' },
        { icon: '📜', label: 'Clear Title' }
      ];
    }
  };

  const features = getFeatures(property.type);

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Close Button */}
        <button id="closeModal" className="modal-close" onClick={onClose}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Gallery */}
        <div className="modal-gallery">
          <img src={property.images[0]} alt={property.title} className="modal-image" />
          <div className="modal-badge-row">
            <span className={`modal-badge badge-${property.type.toLowerCase()}`}>
              {property.type}
            </span>
            <span className="modal-price">{formatPrice(property.price)}</span>
          </div>
        </div>

        {/* Property Details */}
        <div className="modal-body">
          <h2 className="modal-title">{property.title}</h2>
          
          <div className="modal-location">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{property.city}, {property.state}</span>
          </div>

          {/* Description */}
          <p className="modal-description">
            {property.description || `Beautiful ${property.type.toLowerCase()} property located in the prime area of ${property.city}. This ${property.areaSqft.toLocaleString()} sq.ft land offers excellent investment potential with clear titles and all necessary approvals in place.`}
          </p>

          {/* Stats Grid */}
          <div className="modal-stats">
            <div className="stat-box">
              <span className="stat-label">Total Area</span>
              <span className="stat-value">{property.areaSqft.toLocaleString()} sq.ft</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Price</span>
              <span className="stat-value">{formatPrice(property.price)}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Price per sq.ft</span>
              <span className="stat-value highlight">{formatPrice(pricePerSqft)}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Property Type</span>
              <span className="stat-value">{property.type}</span>
            </div>
          </div>

          {/* Features */}
          <h3 className="modal-section-title">Features & Amenities</h3>
          <div className="modal-features">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <span className="feature-icon">{feature.icon}</span>
                <span className="feature-label">{feature.label}</span>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="modal-contact">
            <h3 className="modal-section-title">Interested in this property?</h3>
            <div className="contact-buttons">
              <button className="btn-call">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </button>
              <button className="btn-enquire">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Enquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PropertyModal;
