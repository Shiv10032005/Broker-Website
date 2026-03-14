import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1 className="about-title">About RealEstate Pro</h1>
        <p className="about-subtitle">Your Trusted Partner in Property Investment</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2 className="section-title">Our Story</h2>
          <p className="section-text">
            Founded in 2020, RealEstate Pro has grown to become one of India's most trusted 
            property listing platforms. We connect buyers with verified land and property 
            listings across major cities including Mumbai, Pune, Delhi, and Bangalore.
          </p>
          <p className="section-text">
            Our mission is simple: to make property buying transparent, accessible, and 
            hassle-free for everyone. Whether you're looking for residential plots, 
            commercial spaces, or agricultural land, we've got you covered.
          </p>
        </section>

        <section className="about-section">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="feature-title">Verified Listings</h3>
              <p className="feature-text">Every property is verified to ensure authenticity and accurate information.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="feature-title">Transparent Pricing</h3>
              <p className="feature-text">No hidden costs. See price per sq.ft for every listing to make informed decisions.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="feature-title">Pan-India Coverage</h3>
              <p className="feature-text">Properties across major metro cities and emerging real estate hubs.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="feature-title">Expert Support</h3>
              <p className="feature-text">Our team of property experts is always ready to assist you.</p>
            </div>
          </div>
        </section>

        <section className="about-section stats-section">
          <h2 className="section-title">Our Numbers Speak</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Properties Listed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10,000+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Cities Covered</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">₹500 Cr+</span>
              <span className="stat-label">Property Value Transacted</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
