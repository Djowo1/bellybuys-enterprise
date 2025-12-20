'use client';

import { useState } from 'react';
import styles from './MenuSection.module.css';
import MenuCard from './MenuCard';
import { MENU_ITEMS } from '@/utils/constants';

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', ...new Set(MENU_ITEMS.map(item => item.category))];
  
  const filteredItems = activeCategory === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section className={styles.menu} id="menu">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Our Menu</span>
          <h2>Delicious Offerings</h2>
          <p>Experience authentic Nigerian flavors crafted with passion and quality ingredients</p>
        </div>

        {/* Category Filter */}
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

        {/* Menu Grid */}
        <div className={styles.grid}>
          {filteredItems.map(item => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}