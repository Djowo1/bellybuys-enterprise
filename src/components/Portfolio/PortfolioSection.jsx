'use client';

import { useState } from 'react';
import styles from './PortfolioSection.module.css';
import PortfolioGallery from './PortfolioGallery';

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Events', 'Weekend Meals', 'Private Chef', 'Setup'];

  // Mock portfolio items - replace with real data from Firebase
  const portfolioItems = [
    {
      id: 1,
      category: 'Events',
      title: 'Corporate Event Catering',
      image: '/images/portfolio/event-1.jpg',
      video: null,
      description: '300+ guests served'
    },
    {
      id: 2,
      category: 'Weekend Meals',
      title: 'Family Weekend Package',
      image: '/images/portfolio/weekend-1.jpg',
      video: null,
      description: 'Fresh meals delivered'
    },
    {
      id: 3,
      category: 'Private Chef',
      title: 'Intimate Dinner Service',
      image: '/images/portfolio/class-2.jpg',
      video: null,
      description: '5-course meal experience'
    },
    {
      id: 4,
      category: 'Events',
      title: 'Wedding Reception',
      image: '/images/portfolio/wedding-1.jpg',
      video: null,
      description: '500 guests celebrated'
    },
    {
      id: 5,
      category: 'Setup',
      title: 'Buffet Arrangement',
      image: '/images/portfolio/setup-1.jpg',
      video: null,
      description: 'Professional display'
    },
    {
      id: 6,
      category: 'Private Chef',
      title: 'Home Cooking Class',
      image: '/images/portfolio/chef-1.jpg',
      video: null,
      description: 'Interactive session'
    }
  ];

  const filteredItems = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section className={styles.portfolio} id="portfolio">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Our Work</span>
          <h2>Portfolio Gallery</h2>
          <p>Explore our culinary creations and successful events</p>
        </div>

        <div className={styles.filters}>
          {categories.map(category => (
            <button
              key={category}
              className={`${styles.filterButton} ${activeCategory === category ? styles.active : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <PortfolioGallery items={filteredItems} />
      </div>
    </section>
  );
}