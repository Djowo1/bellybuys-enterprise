'use client';
import styles from './Button.module.css';

export default function Button({ children, variant = 'primary', onClick, href, className = '', ...props }) {
  const Component = href ? 'a' : 'button';
  
  return (
    <Component
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={onClick}
      href={href}
      {...props}
    >
      {children}
    </Component>
  );
}