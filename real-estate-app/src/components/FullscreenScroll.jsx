import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import Observer from 'gsap/Observer';
import './FullscreenScroll.css';

// Register GSAP plugins
gsap.registerPlugin(Observer);

const FullscreenScroll = ({ onComplete }) => {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const imagesRef = useRef([]);
  const outerWrappersRef = useRef([]);
  const innerWrappersRef = useRef([]);
  const headingsRef = useRef([]);
  const currentIndexRef = useRef(-1);
  const animatingRef = useRef(false);

  const sections = [
    {
      title: "Find Your Dream Land",
      subtitle: "Discover premium properties across India with transparent pricing",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920",
      cta: { text: "Explore Properties", link: "/listings" }
    },
    {
      title: "Trusted by 10,000+",
      subtitle: "Happy customers who found their perfect property with us",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920",
      cta: { text: "View Testimonials", link: "/about" }
    },
    {
      title: "500+ Properties",
      subtitle: "Verified listings in 15+ cities with clear title documents",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920",
      cta: { text: "Browse All", link: "/listings" }
    },
    {
      title: "Expert Guidance",
      subtitle: "Get personalized support throughout your property journey",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920",
      cta: { text: "Contact Us", link: "/contact" }
    }
  ];

  useEffect(() => {
    const wrap = gsap.utils.wrap(0, sections.length);
    
    // Set initial states
    gsap.set(outerWrappersRef.current, { yPercent: 100 });
    gsap.set(innerWrappersRef.current, { yPercent: -100 });

    const gotoSection = (index, direction) => {
      index = wrap(index);
      animatingRef.current = true;
      
      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;
      
      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power1.inOut" },
        onComplete: () => { animatingRef.current = false; }
      });

      if (currentIndexRef.current >= 0) {
        gsap.set(sectionsRef.current[currentIndexRef.current], { zIndex: 0 });
        tl.to(imagesRef.current[currentIndexRef.current], { yPercent: -15 * dFactor })
          .set(sectionsRef.current[currentIndexRef.current], { autoAlpha: 0 });
      }

      gsap.set(sectionsRef.current[index], { autoAlpha: 1, zIndex: 1 });
      
      tl.fromTo(
        [outerWrappersRef.current[index], innerWrappersRef.current[index]], 
        { yPercent: i => i ? -100 * dFactor : 100 * dFactor },
        { yPercent: 0 },
        0
      )
      .fromTo(imagesRef.current[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
      .fromTo(headingsRef.current[index], 
        { autoAlpha: 0, yPercent: 150 * dFactor },
        { autoAlpha: 1, yPercent: 0, duration: 1, ease: "power2" },
        0.2
      );

      currentIndexRef.current = index;
    };

    // Create observer for scroll/touch
    const observer = Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => !animatingRef.current && gotoSection(currentIndexRef.current - 1, -1),
      onUp: () => !animatingRef.current && gotoSection(currentIndexRef.current + 1, 1),
      tolerance: 10,
      preventDefault: true
    });

    // Initialize first section
    gotoSection(0, 1);

    return () => {
      observer.kill();
    };
  }, [sections.length]);

  return (
    <div className="fullscreen-scroll" ref={containerRef}>
      {sections.map((section, index) => (
        <section
          key={index}
          ref={el => sectionsRef.current[index] = el}
          className="scroll-section"
        >
          <div 
            className="outer"
            ref={el => outerWrappersRef.current[index] = el}
          >
            <div 
              className="inner"
              ref={el => innerWrappersRef.current[index] = el}
            >
              <div
                className="bg"
                ref={el => imagesRef.current[index] = el}
                style={{ backgroundImage: `url(${section.image})` }}
              />
            </div>
          </div>

          <div 
            className="section-content"
            ref={el => headingsRef.current[index] = el}
          >
            <h1 className="section-heading">{section.title}</h1>
            <p className="section-subtitle">{section.subtitle}</p>
            <Link to={section.cta.link} className="section-cta" onClick={onComplete}>
              {section.cta.text}
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Scroll Indicator */}
          {index === 0 && (
            <div className="scroll-indicator">
              <span>Scroll to explore</span>
              <div className="scroll-arrow">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          )}
        </section>
      ))}

      {/* Navigation Dots */}
      <div className="scroll-dots">
        {sections.map((_, index) => (
          <div key={index} className="scroll-dot" />
        ))}
      </div>
    </div>
  );
};

export default FullscreenScroll;
