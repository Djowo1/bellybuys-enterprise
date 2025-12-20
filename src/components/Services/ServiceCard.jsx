'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ServiceCard.module.css';

export default function ServiceCard({ service, index }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={styles.card}
      style={{ '--delay': `${index * 0.1}s` }}
    >
      {/* Image Container */}
      <div className={styles.imageContainer}>
        {service.image && !imageError ? (
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span className={styles.placeholderIcon}>{service.icon}</span>
          </div>
        )}
        <div className={styles.imageOverlay}>
          <span className={styles.overlayIcon}>{service.icon}</span>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.title}>{service.title}</h3>
        <p className={styles.description}>{service.description}</p>
        
        <ul className={styles.features}>
          {service.features.map((feature, i) => (
            <li key={i}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        
        <div className={styles.footer}>
          <span className={styles.hours}>{service.operatingHours}</span>
          <Link href="/contact" className={styles.cta}>
            {service.cta}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 12l4-4-4-4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}