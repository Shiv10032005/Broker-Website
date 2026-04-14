// Data service for loading and processing property data

// Module-level cache: avoids re-fetching when navigating between pages
let _propertiesCache = null;

export const loadProperties = async () => {
  if (_propertiesCache) return _propertiesCache;
  try {
    const response = await fetch('/data/properties.json');
    if (!response.ok) {
      throw new Error(`Failed to load properties: HTTP ${response.status}`);
    }
    _propertiesCache = await response.json();
    return _propertiesCache;
  } catch (error) {
    console.error('Error loading properties:', error);
    return [];
  }
};

export const calculatePricePerSqft = (price, areaSqft) => {
  if (!areaSqft || areaSqft <= 0) return 0;
  if (!price || price <= 0) return 0;
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
  // js-combine-iterations: single pass into Set, no intermediate array
  const citySet = new Set();
  for (const p of properties) citySet.add(p.city);
  return [...citySet].sort();
};
