'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './AdminLogin.module.css';

export default function AdminLogin() {
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication - replace with actual auth
    if (secretKey === process.env.NEXT_PUBLIC_ADMIN_SECRET) {
      localStorage.setItem('adminAuth', 'authenticated');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid secret key. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.icon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h1>Admin Access</h1>
          <p>Enter your secret key to continue</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="secretKey">Secret Key</label>
            <input
              type="password"
              id="secretKey"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="Enter admin secret key"
              required
              autoComplete="off"
            />
          </div>

          {error && (
            <div className={styles.error}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button type="submit" disabled={isLoading} className={styles.submitButton}>
            {isLoading ? (
              <>
                <span className={styles.spinner}></span>
                Verifying...
              </>
            ) : (
              <>
                <span>Access Dashboard</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </>
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p>Lost your secret key? Contact the system administrator.</p>
        </div>
      </div>
    </div>
  );
}