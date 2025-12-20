'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './PortfolioGallery.module.css';

export default function PortfolioGallery({ items }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const openLightbox = (item) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <div className={styles.gallery}>
        {items.map(item => (
          <div 
            key={item.id} 
            className={styles.item}
            onClick={() => openLightbox(item)}
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

      {/* Lightbox */}
      {selectedItem && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.closeButton} onClick={closeLightbox}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            {selectedItem.video ? (
              <video
                src={selectedItem.video}
                className={styles.lightboxMedia}
                controls
                autoPlay
              />
            ) : (
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                width={1200}
                height={800}
                className={styles.lightboxMedia}
              />
            )}
            <div className={styles.lightboxInfo}>
              <h3>{selectedItem.title}</h3>
              <p>{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}