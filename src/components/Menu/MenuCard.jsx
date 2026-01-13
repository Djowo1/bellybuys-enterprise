'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './MenuCard.module.css';
import MenuModal from './MenuModal';

export default function MenuCard({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const lowestPrice = Math.min(...item.prices.map(p => p.price));

  return (
    <>
      <div 
        className={styles.card} 
        onClick={() => setIsModalOpen(true)}
        onTouchEnd={(e) => {
          e.preventDefault();
          setIsModalOpen(true);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsModalOpen(true);
          }
        }}
        aria-label={`View details for ${item.name}`}
      >
        {item.popular && <span className={styles.badge}>Popular</span>}
        
        <div className={styles.imageContainer}>
          {!imageError && item.images?.[0] ? (
            <Image
              src={item.images[0]}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={styles.image}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                <path d="M12 8v8m-4-4h8"/>
              </svg>
            </div>
          )}
          <div className={styles.overlay}>
            <span>View Details</span>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.category}>{item.category}</div>
          <h3 className={styles.name}>{item.name}</h3>
          <p className={styles.description}>{item.description}</p>
          
          <div className={styles.footer}>
            <span className={styles.price}>From ₦{lowestPrice.toLocaleString()}</span>
            <button className={styles.viewButton}>
              <span>View Menu</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 12l4-4-4-4"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <MenuModal 
        item={item} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}