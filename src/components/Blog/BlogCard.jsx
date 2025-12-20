'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './BlogCard.module.css';

export default function BlogCard({ blog }) {
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

  return (
    <article className={styles.card}>
      <Link href={`/blog/${blog.id}`} className={styles.imageLink}>
        <div className={styles.imageContainer}>
          {blog.imageUrl && !imageError ? (
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              className={styles.image}
              onError={() => setImageError(true)}
            />
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
      </Link>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.author}>{blog.author || 'BellyBuys'}</span>
          <span className={styles.dot}>•</span>
          <span className={styles.date}>{formatDate(blog.createdAt)}</span>
        </div>

        <Link href={`/blog/${blog.id}`} className={styles.titleLink}>
          <h3 className={styles.title}>{blog.title}</h3>
        </Link>

        <p className={styles.excerpt}>
          {blog.excerpt || blog.content?.substring(0, 150) + '...'}
        </p>

        {blog.category && (
          <span className={styles.category}>{blog.category}</span>
        )}

        <Link href={`/blog/${blog.id}`} className={styles.readMore}>
          Read More
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 12l4-4-4-4"/>
          </svg>
        </Link>
      </div>
    </article>
  );
}