'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './BlogCard.module.css';

export default function BlogCard({ blog }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleCardClick = (e) => {
    // Don't expand if clicking on an external link
    if (e.target.tagName === 'A' && e.target.target === '_blank') {
      return;
    }
    // Don't expand if clicking on the read more button (it handles its own click)
    if (e.target.closest('.readMore')) {
      return;
    }
    setIsExpanded(!isExpanded);
  };

  const handleReadMoreClick = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <article className={`${styles.card} ${isExpanded ? styles.expanded : ''}`} onClick={handleCardClick}>
      <div className={styles.imageContainer}>
        {blog.imageUrl && !imageError ? (
          <img src={blog.imageUrl} alt="Blog Image" style={{ width: '100%', height: 'auto' }} />
        ) : (
          <div className={styles.imagePlaceholder}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.author}>{blog.author || 'BellyBuys'}</span>
          <span className={styles.dot}>•</span>
          <span className={styles.date}>{formatDate(blog.createdAt)}</span>
        </div>

        <h3 className={styles.title}>{blog.title}</h3>

        <div className={styles.textContent}>
          {!isExpanded ? (
            <p className={styles.excerpt}>
              {blog.excerpt || blog.content?.substring(0, 150) + '...'}
            </p>
          ) : (
            <div className={styles.fullContent}>
              {blog.content?.split('\n\n').map((paragraph, index) => (
                <p key={index} className={styles.paragraph}>
                  {paragraph.split('\n').map((line, lineIndex) => (
                    <span key={lineIndex}>
                      {line}
                      {lineIndex < paragraph.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          )}
        </div>

        {blog.category && (
          <span className={styles.category}>{blog.category}</span>
        )}

        <button className={styles.readMore} onClick={handleReadMoreClick}>
          {isExpanded ? 'Show Less' : 'Read More'}
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            className={isExpanded ? styles.rotated : ''}
          >
            <path d="M6 12l4-4-4-4"/>
          </svg>
        </button>
      </div>
    </article>
  );
}