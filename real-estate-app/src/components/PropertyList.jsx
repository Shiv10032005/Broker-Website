import React from 'react';
import PropertyCard from './PropertyCard';
import './PropertyList.css';

const PropertyList = ({ properties, onViewDetails }) => {
  return (
    <div className="property-list">
      {properties.map((property) => (
        <PropertyCard 
          key={property.id} 
          property={property} 
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default PropertyList;
