'use client';

import styles from './ServicesSection.module.css';
import ServiceCard from './ServiceCard';
import { SERVICES } from '@/utils/constants';

export default function ServicesSection() {
  return (
    <section className={styles.services} id="services">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>What We Offer</span>
          <h2 className={styles.title}>Our Premium Services</h2>
          <p className={styles.description}>
            From intimate gatherings to grand celebrations, we deliver exceptional culinary experiences tailored to your needs.
          </p>
        </div>

        <div className={styles.grid}>
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}