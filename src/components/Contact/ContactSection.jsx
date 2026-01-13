'use client';

import MotionReveal from '../UI/MotionReveal';
import styles from './ContactSection.module.css';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import ContactMap from './ContactMap';

export default function ContactSection() {
  return (
    <MotionReveal direction="up" distance={50} delay={0.7}>
      <section className={styles.contact} id="contact">
        <div className={styles.container}>
          <div className={styles.header}>
            <span className={styles.badge}>Get In Touch</span>
            <h2>Contact Us</h2>
            <p>Ready to order or have questions? We'd love to hear from you!</p>
          </div>

          <div className={styles.content}>
            <ContactInfo />
            <ContactForm />
          </div>
           <ContactMap />
        </div>
      </section>
    </MotionReveal>
  );
}