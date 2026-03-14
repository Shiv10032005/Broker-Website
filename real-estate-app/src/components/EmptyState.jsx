import React from 'react';
import './EmptyState.css';

const EmptyState = () => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon-wrapper">
        <svg
          className="empty-state-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <h3 className="empty-state-title">No Properties Found</h3>
      <p className="empty-state-description">
        We couldn't find any properties matching your filters. Try adjusting your search criteria.
      </p>
      <div className="empty-state-hint">
        <svg className="hint-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Try selecting different cities or adjusting price ranges</span>
      </div>
    </div>
  );
};

export default EmptyState;
