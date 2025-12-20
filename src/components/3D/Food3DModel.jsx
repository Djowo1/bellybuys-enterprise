'use client';

import { useEffect, useRef } from 'react';
import styles from './Food3DModel.module.css';

export default function Food3DModel({ modelType = 'plate' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Simple 3D-like animation using CSS transforms
    // For actual 3D, you would use Three.js
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationId;
    let rotation = 0;

    const animate = () => {
      rotation += 0.005;
      if (canvas) {
        canvas.style.transform = `
          perspective(1000px) 
          rotateX(${Math.sin(rotation) * 10}deg) 
          rotateY(${rotation * 50}deg)
          translateZ(0)
        `;
      }
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <div ref={canvasRef} className={styles.model}>
        <div className={styles.plate}>
          {/* Decorative food elements */}
          <div className={styles.food}></div>
          <div className={styles.food}></div>
          <div className={styles.food}></div>
        </div>
      </div>
    </div>
  );
}