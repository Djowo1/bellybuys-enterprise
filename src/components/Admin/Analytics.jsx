'use client';

import styles from './Analytics.module.css';

export default function Analytics({ stats }) {
  const metrics = [
    { label: 'Total Blog Posts', value: stats.blogs, change: '+12%', trend: 'up' },
    { label: 'Pending Approvals', value: stats.pendingBlogs, change: '+3', trend: 'up' },
    { label: 'Total Orders', value: stats.orders, change: '+25%', trend: 'up' },
    { label: 'Customer Reviews', value: stats.reviews, change: '+8%', trend: 'up' }
  ];

  return (
    <div className={styles.analytics}>
      <h1>Analytics Overview</h1>

      <div className={styles.metricsGrid}>
        {metrics.map((metric, index) => (
          <div key={index} className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>{metric.label}</span>
              <span className={`${styles.metricChange} ${styles[metric.trend]}`}>
                {metric.change}
              </span>
            </div>
            <div className={styles.metricValue}>{metric.value}</div>
          </div>
        ))}
      </div>

      <div className={styles.chartPlaceholder}>
        <div className={styles.placeholderContent}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="20" x2="18" y2="10"/>
            <line x1="12" y1="20" x2="12" y2="4"/>
            <line x1="6" y1="20" x2="6" y2="14"/>
          </svg>
          <h3>Detailed Analytics Coming Soon</h3>
          <p>Advanced charts and insights will be available here</p>
        </div>
      </div>
    </div>
  );
}