"use client";

import { Children, cloneElement } from 'react';
import { motion } from 'framer-motion';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

function getOffset(direction, distance) {
  switch (direction) {
    case 'left': return { x: -distance, y: 0 };
    case 'right': return { x: distance, y: 0 };
    case 'down': return { x: 0, y: distance };
    case 'up':
    default:
      return { x: 0, y: -distance };
  }
}

export default function MotionReveal({
  children,
  direction = 'up',
  distance = 50,
  delay = 0,
  duration = 0.6,
  stagger = 0.08,
  threshold = 0.2,
  className = ''
}) {
  const [ref, isVisible] = useIntersectionObserver({ threshold });
  const offset = getOffset(direction, distance);

  // If multiple children, stagger them
  const items = Children.toArray(children);

  if (items.length > 1) {
    return (
      <div ref={ref} className={className}>
        {items.map((child, i) => (
          <motion.div
            key={i}
            initial={{ x: offset.x, y: offset.y }}
            animate={isVisible ? { x: 0, y: 0 } : {}}
            transition={{ delay: delay + i * stagger, duration, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {cloneElement(child)}
          </motion.div>
        ))}
      </div>
    );
  }

  // Single child
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ x: offset.x, y: offset.y }}
        animate={isVisible ? { x: 0, y: 0 } : {}}
        transition={{ delay, duration, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
