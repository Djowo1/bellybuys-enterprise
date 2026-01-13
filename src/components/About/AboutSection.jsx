'use client';

import Image from 'next/image';
import Link from 'next/link';
import MotionReveal from '../UI/MotionReveal';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  const stats = [
    { value: '500+', label: 'Happy Clients' },
    { value: '500+', label: 'Events Catered' },
    { value: '12+', label: 'Years Experience' },
    { value: '15+', label: 'Team Members' }
  ];

  return (
    <MotionReveal direction="up" distance={50} delay={0.3}>
      <section className={styles.about}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.textContent}>
              <span className={styles.badge}>About BellyBuys</span>
              <h1>Crafting Memorable Culinary Experiences Since 2019</h1>
              <p className={styles.lead}>
                BellyBuys Enterprise is Ile-Ife's premier food service provider, dedicated to bringing exceptional taste and quality to every occasion.
              </p>
              <p>
                From intimate weekend meals to grand celebrations, we pour our passion into every dish we create. Our commitment to using fresh, quality ingredients and traditional cooking methods ensures that every meal tells a story of flavor and excellence.
              </p>
              <p>
                What started as a small weekend meal service has grown into a full-service catering company, offering private chef experiences, event catering, logistics, and more. Our success is built on the trust of our community and our unwavering dedication to culinary excellence.
              </p>

              <div className={styles.features}>
                <div className={styles.feature}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <div>
                    <h3>Premium Quality</h3>
                    <p>Only the freshest ingredients</p>
                  </div>
                </div>

                <div className={styles.feature}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  <div>
                    <h3>Expert Team</h3>
                    <p>Skilled chefs and service staff</p>
                  </div>
                </div>

                <div className={styles.feature}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <div>
                    <h3>On-Time Delivery</h3>
                    <p>Punctual and reliable service</p>
                  </div>
                </div>
              </div>

              <div className={styles.actions}>
                <Link href="/menu" className={styles.primaryButton}>
                  View Our Menu
                </Link>
                <Link href="/contact" className={styles.secondaryButton}>
                  Book a Service
                </Link>
              </div>
            </div>

            <div className={styles.imageContent}>
              <div className={styles.imageGrid}>
                <div className={styles.imageWrapper}>
                  <Image
                    src="/images/about/team.jpg"
                    alt="BellyBuys Chef"
                    fill
                    className={styles.image}
                  />
                </div>
                <div className={styles.imageWrapper}>
                  <Image
                    src="/images/about/bellybuys-1.jpg"
                    alt="Food Preparation"
                    fill
                    className={styles.image}
                  />
                </div>
                <div className={styles.imageWrapper}>
                  <Image
                    src="/images/about/bellybuys-2.jpg"
                    alt="Catered Event"
                    fill
                    className={styles.image}
                  />
                </div>
              </div>

              <div className={styles.stats}>
                {stats.map((stat, index) => (
                  <div key={index} className={styles.stat}>
                    <span className={styles.statValue}>{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionReveal>
  );
}