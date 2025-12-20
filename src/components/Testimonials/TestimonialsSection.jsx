'use client';

import { useState, useEffect } from 'react';
import styles from './TestimonialsSection.module.css';
import TestimonialCard from './TestimonialCard';
import ReviewForm from './ReviewForm';
import { getReviews } from '@/lib/firebase';

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoading(true);
    const fetchedReviews = await getReviews();
    setReviews(fetchedReviews);
    setLoading(false);
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <section className={styles.testimonials} id="testimonials">
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <span className={styles.badge}>Testimonials</span>
            <h2>What Our Clients Say</h2>
            <p>Real experiences from real customers</p>
          </div>
          <div className={styles.stats}>
            <div className={styles.rating}>
              <span className={styles.ratingValue}>{averageRating}</span>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill={i < Math.round(averageRating) ? 'var(--secondary-orange)' : 'var(--border)'}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className={styles.reviewCount}>{reviews.length} reviews</span>
            </div>
            <button onClick={() => setShowForm(true)} className={styles.writeReviewButton}>
              Write a Review
            </button>
          </div>
        </div>

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
          </div>
        ) : reviews.length > 0 ? (
          <div className={styles.grid}>
            {reviews.map(review => (
              <TestimonialCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            <h3>No reviews yet</h3>
            <p>Be the first to share your experience!</p>
            <button onClick={() => setShowForm(true)} className={styles.ctaButton}>
              Write First Review
            </button>
          </div>
        )}
      </div>

      {showForm && (
        <ReviewForm 
          onClose={() => setShowForm(false)} 
          onSuccess={loadReviews}
        />
      )}
    </section>
  );
}