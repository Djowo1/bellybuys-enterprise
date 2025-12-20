import styles from './Loader.module.css';

export default function Loader({ fullscreen = false }) {
  if (fullscreen) {
    return (
      <div className={styles.fullscreen}>
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
    </div>
  );
}