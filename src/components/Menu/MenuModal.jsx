'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './MenuModal.module.css';

export default function MenuModal({ item, isOpen, onClose }) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  const media = [
    ...(item.images || []),
    ...(item.video ? [item.video] : [])
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % media.length);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  const currentMedia = media[currentMediaIndex];
  const isVideo = currentMedia?.includes('.mp4');

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className={styles.content}>
          {/* Media Section */}
          <div className={styles.mediaSection}>
            <div className={styles.mediaContainer}>
              {currentMedia && !imageErrors[currentMediaIndex] ? (
                isVideo ? (
                  <video
                    src={currentMedia}
                    className={styles.video}
                    controls
                    autoPlay
                    muted
                    loop
                  />
                ) : (
                  <Image
                    src={currentMedia}
                    alt={item.name}
                    fill
                    className={styles.image}
                    onError={() => setImageErrors(prev => ({ ...prev, [currentMediaIndex]: true }))}
                  />
                )
              ) : (
                <div className={styles.placeholder}>
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
              )}
            </div>

            {media.length > 1 && (
              <>
                <button className={`${styles.navButton} ${styles.prev}`} onClick={prevMedia}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                </button>
                <button className={`${styles.navButton} ${styles.next}`} onClick={nextMedia}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>

                <div className={styles.mediaDots}>
                  {media.map((_, index) => (
                    <button
                      key={index}
                      className={`${styles.dot} ${index === currentMediaIndex ? styles.active : ''}`}
                      onClick={() => setCurrentMediaIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Info Section */}
          <div className={styles.infoSection}>
            <div className={styles.header}>
              <div>
                <span className={styles.category}>{item.category}</span>
                <h2 className={styles.title}>{item.name}</h2>
              </div>
              {item.popular && <span className={styles.popularBadge}>Popular</span>}
            </div>

            <p className={styles.description}>{item.description}</p>

            <div className={styles.pricesSection}>
              <h3 className={styles.sectionTitle}>Pricing Options</h3>
              <div className={styles.priceList}>
                {item.prices.map((price, index) => (
                  <div key={index} className={styles.priceItem}>
                    <span className={styles.variant}>{price.variant}</span>
                    <span className={styles.priceValue}>₦{price.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.actions}>
              <Link href="/contact" className={styles.orderButton} onClick={onClose}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                Order Now
              </Link>
              <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace('+', '')}`} 
                    target="_blank" 
                    className={styles.whatsappButton}
                    onClick={onClose}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}