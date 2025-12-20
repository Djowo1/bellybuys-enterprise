'use client';

import styles from './TestimonialCard.module.css';

export default function TestimonialCard({ review }) {
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          {review.initials || review.name?.substring(0, 2).toUpperCase()}
        </div>
        <div className={styles.info}>
          <h4 className={styles.name}>{review.name}</h4>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill={i < review.rating ? 'var(--secondary-orange)' : 'var(--border)'}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
        </div>
      </div>

      <p className={styles.text}>{review.text}</p>

      <div className={styles.footer}>
        {review.service && <span className={styles.service}>{review.service}</span>}
        <span className={styles.date}>{formatDate(review.createdAt)}</span>
      </div>
    </div>
  );
}