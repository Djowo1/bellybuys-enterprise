'use client';

import { useState } from 'react';
import styles from './ContactForm.module.css';
import { ORDER_CATEGORIES } from '@/utils/constants';
import { sendOrderEmail } from '@/lib/emailService';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    eventDate: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const result = await sendOrderEmail(formData);
      
      if (result.success) {
        setStatus({
          type: 'success',
          message: 'Order sent successfully! Redirecting to WhatsApp in 3 seconds...'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          eventDate: ''
        });
      } else {
        setStatus({
          type: 'error',
          message: 'Failed to send order. Please try again or contact us directly.'
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'An error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+234 XXX XXX XXXX"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="service">Service Type *</label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">Select a service</option>
            {ORDER_CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="eventDate">Event Date (Optional)</label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Message / Special Requirements *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          placeholder="Tell us about your requirements, guest count, dietary restrictions, etc."
        />
      </div>

      {status.message && (
        <div className={`${styles.status} ${styles[status.type]}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {status.type === 'success' ? (
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            ) : (
              <circle cx="12" cy="12" r="10"/>
            )}
            {status.type === 'success' ? (
              <polyline points="22 4 12 14.01 9 11.01"/>
            ) : (
              <>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </>
            )}
          </svg>
          <span>{status.message}</span>
        </div>
      )}

      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className={styles.spinner}></span>
            Sending...
          </>
        ) : (
          <>
            <span>Send Order Request</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </>
        )}
      </button>

      <p className={styles.note}>
        * After submitting, you'll receive a confirmation and be redirected to WhatsApp for direct communication.
      </p>
    </form>
  );
}