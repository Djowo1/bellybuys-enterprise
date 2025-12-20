'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './AdminDashboard.module.css';
import BlogManager from './BlogManager';
import Analytics from './Analytics';
import { getBlogs, getOrders, getReviews } from '@/lib/firebase';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    blogs: 0,
    pendingBlogs: 0,
    orders: 0,
    reviews: 0
  });
  const router = useRouter();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const [allBlogs, orders, reviews] = await Promise.all([
      getBlogs(false),
      getOrders(),
      getReviews()
    ]);

    setStats({
      blogs: allBlogs.filter(b => b.approved).length,
      pendingBlogs: allBlogs.filter(b => !b.approved).length,
      orders: orders.length,
      reviews: reviews.length
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <h2>BellyBuys Admin</h2>
        </div>

        <nav className={styles.nav}>
          <button
            className={`${styles.navButton} ${activeTab === 'overview' ? styles.active : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            Overview
          </button>

          <button
            className={`${styles.navButton} ${activeTab === 'blogs' ? styles.active : ''}`}
            onClick={() => setActiveTab('blogs')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            Blog Posts
            {stats.pendingBlogs > 0 && (
              <span className={styles.badge}>{stats.pendingBlogs}</span>
            )}
          </button>

          <button
            className={`${styles.navButton} ${activeTab === 'analytics' ? styles.active : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="20" x2="18" y2="10"/>
              <line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
            Analytics
          </button>
        </nav>

        <button onClick={handleLogout} className={styles.logoutButton}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Logout
        </button>
      </aside>

      <main className={styles.main}>
        {activeTab === 'overview' && (
          <div className={styles.overview}>
            <h1>Dashboard Overview</h1>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                </div>
                <div>
                  <p>Published Blogs</p>
                  <h3>{stats.blogs}</h3>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <p>Pending Approval</p>
                  <h3>{stats.pendingBlogs}</h3>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                </div>
                <div>
                  <p>Total Orders</p>
                  <h3>{stats.orders}</h3>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div>
                  <p>Customer Reviews</p>
                  <h3>{stats.reviews}</h3>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'blogs' && <BlogManager onUpdate={loadStats} />}
        {activeTab === 'analytics' && <Analytics stats={stats} />}
      </main>
    </div>
  );
}