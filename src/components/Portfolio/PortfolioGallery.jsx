'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './PortfolioGallery.module.css';

export default function PortfolioGallery({ items }) {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className={styles.gallery}>
      {items.map(item => (
        <div 
          key={item.id} 
          className={styles.item}
        >
          <div className={styles.imageWrapper}>
            {item.image && !imageErrors[item.id] ? (
              <Image
                src={item.image}
                alt={item.title}
                fill
                className={styles.image}
                onError={() => handleImageError(item.id)}
              />
            ) : (
              <div className={styles.placeholder}>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
            )}

            {item.video && (
              <div className={styles.videoIndicator}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                  <circle cx="12" cy="12" r="10" opacity="0.8"/>
                  <polygon points="10 8 16 12 10 16 10 8" fill="var(--primary-green)"/>
                </svg>
              </div>
            )}

            <div className={styles.overlay}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
          <span className={styles.category}>{item.category}</span>
        </div>
      ))}
    </div>
  );
}