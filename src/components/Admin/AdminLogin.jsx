'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '../../lib/firebase';
import { useModal } from '../../hooks/useModal';
import Modal from '../UI/Modal';
import styles from './AdminLogin.module.css';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { modalState, showModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Use the business email from env and the entered password
    const adminEmail = process.env.NEXT_PUBLIC_BUSINESS_EMAIL;
    const result = await loginAdmin(adminEmail, password);
    if (result.success) {
      localStorage.setItem('adminAuth', 'authenticated');
      router.push('/admin/dashboard');
    } else {
      await showModal('Login Failed', result.error, 'error');
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
            <label htmlFor="password">Admin Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
              autoComplete="current-password"
            />
          </div>

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
          <p>Forgot your password? Contact the system administrator.</p>
        </div>
      </div>

      <Modal
        isOpen={modalState.isOpen}
        onClose={modalState.onClose}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />
    </div>
  );
}