// src/components/Hero/HeroSection.jsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './HeroSection.module.css';
import HeroSlide from './HeroSlide';
import { HERO_SLIDES } from '@/utils/constants';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('next');

  const totalSlides = HERO_SLIDES.length;

  const goToSlide = useCallback((index) => {
    if (isTransitioning) return;
    
    setDirection(index > currentSlide ? 'next' : 'prev');
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 100);
  }, [currentSlide, isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % totalSlides);
  }, [currentSlide, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
  }, [currentSlide, totalSlides, goToSlide]);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000); // Change slide every 7 seconds

    return () => clearInterval(interval);
  }, [nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide, prevSlide]);

  return (
    <section className={styles.hero} aria-label="Hero Section">
      {/* Slides Container */}
      <div className={styles.slidesContainer}>
        {HERO_SLIDES.map((slide, index) => (
          <HeroSlide
            key={slide.id}
            slide={slide}
            isActive={index === currentSlide}
            direction={direction}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        className={`${styles.navButton} ${styles.prevButton}`}
        onClick={prevSlide}
        aria-label="Previous slide"
        disabled={isTransitioning}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>

      <button
        className={`${styles.navButton} ${styles.nextButton}`}
        onClick={nextSlide}
        aria-label="Next slide"
        disabled={isTransitioning}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className={styles.indicators}>
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${
              index === currentSlide ? styles.active : ''
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide}
          >
            <span className={styles.indicatorProgress}></span>
          </button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel}></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}