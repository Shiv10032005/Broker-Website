// Data service for loading and processing property data

export const loadProperties = async () => {
  try {
    const response = await fetch('/data/properties.json');
    if (!response.ok) {
      throw new Error('Failed to load properties');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading properties:', error);
    return [];
  }
};

export const calculatePricePerSqft = (price, areaSqft) => {
  if (areaSqft === 0) return 0;
  return Math.round(price / areaSqft);
};

export const formatPrice = (price) => {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
};

export const filterProperties = (properties, filters) => {
  return properties.filter((property) => {
    // City filter
    if (filters.city && filters.city !== 'all' && property.city !== filters.city) {
      return false;
    }

    // Type filter
    if (filters.types.length > 0 && !filters.types.includes(property.type)) {
      return false;
    }

    // Price range filter
    if (filters.minPrice && property.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && property.price > filters.maxPrice) {
      return false;
    }

    return true;
  });
};

export const getUniqueCities = (properties) => {
  const cities = properties.map(p => p.city);
  return [...new Set(cities)].sort();
};
