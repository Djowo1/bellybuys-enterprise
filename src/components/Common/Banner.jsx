'use client';

import Link from 'next/link';
import styles from './Banner.module.css';

export default function Banner() {
  return (
    <section className={styles.banner} style={{backgroundImage: `url(/images/nice-hero.jpg)`}}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>Ready to Experience Culinary Excellence?</h2>
          <p>Let us bring exceptional flavors to your next event or celebration</p>
          <div className={styles.actions}>
            <Link href="/contact" className={styles.primaryButton}>
              Book Now
            </Link>
            <Link href="/menu" className={styles.secondaryButton}>
              View Menu
            </Link>
          </div>
        </div>
        <div className={styles.decoration}>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
        </div>
      </div>
    </section>
  );
}