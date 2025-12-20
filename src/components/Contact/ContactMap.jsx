'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ContactMap.module.css';

export default function ContactMap() {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      setMapLoaded(true);
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => setMapLoaded(true));
      return;
    }

    // Load script only once
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => setMapLoaded(true);
    script.onerror = () => console.error('Failed to load Google Maps');

    document.head.appendChild(script);

    return () => {
      // Cleanup is handled by browser
    };
  }, []);

  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapWrapper}>
        {/* Use iframe embed - No API key needed, no conflicts */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.2!2d4.5521!3d7.4905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMjknMjUuOCJOIDTCsDMzJzA3LjYiRQ!5e0!3m2!1sen!2sng!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="BellyBuys Enterprise Location - Aji Bamidili, Ile-Ife, Osun State, Nigeria"
        />
      </div>
      
      <div className={styles.mapOverlay}>
        <div className={styles.locationCard}>
          <div className={styles.locationIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <div className={styles.locationInfo}>
            <h4>Our Location</h4>
            <p>Ajebamidele, Ile-Ife<br/>Osun State, Nigeria</p>
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=7.4905,4.5521" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.directionsButton}
            >
              Get Directions →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}