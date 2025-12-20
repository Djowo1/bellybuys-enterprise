'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './HeroSlide.module.css';

export default function HeroSlide({ slide, isActive, direction }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(e => console.log('Video play failed:', e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  return (
    <div className={`${styles.slide} ${isActive ? styles.active : ''} ${styles[direction]}`}>
      {/* Media Background */}
      <div className={styles.mediaContainer}>
        {slide.media.type === 'video' ? (
          <>
            <video
              ref={videoRef}
              className={styles.media}
              src={slide.media.src}
              poster={slide.media.poster}
              loop
              muted
              playsInline
              preload="metadata"
            />
            <div className={styles.videoOverlay} />
          </>
        ) : (
          <>
            <div
              className={styles.media}
              style={{ backgroundImage: `url(${slide.media.src})` }}
            />
            <div className={styles.imageOverlay} />
          </>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.contentInner}>
          <span className={styles.subtitle}>{slide.subtitle}</span>
          <h1 className={styles.title}>{slide.title}</h1>
          <p className={styles.description}>{slide.description}</p>
          
          <div className={styles.cta}>
            <Link href={slide.cta.link} className={styles.primaryButton}>
              {slide.cta.text}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            {slide.secondaryCta && (
              <Link href={slide.secondaryCta.link} className={styles.secondaryButton}>
                {slide.secondaryCta.text}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className={styles.decorativeCircle} />
      <div className={styles.decorativeLine} />
    </div>
  );
}