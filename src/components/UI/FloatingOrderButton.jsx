'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './FloatingOrderButton.module.css';

export default function FloatingOrderButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href="/contact" className={styles.floatingButton}>
      <div
        className={`${styles.button} ${isHovered ? styles.hovered : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Order food now"
      >
        <div className={styles.icon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            <path d="M12 8v8m-4-4h8"/>
          </svg>
        </div>
        <span className={styles.text}>Order Now!</span>
        <div className={styles.pulse}></div>
      </div>
    </Link>
  );
}