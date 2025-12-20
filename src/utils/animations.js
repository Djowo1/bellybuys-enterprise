// Animation utility functions for BellyBuys Enterprise

/**
 * Stagger animation for lists
 * @param {number} index - Item index
 * @param {number} delay - Base delay in ms
 * @returns {object} Animation delay style
 */
export const staggerAnimation = (index, delay = 100) => ({
  animationDelay: `${index * delay}ms`,
  opacity: 0,
  animation: 'fadeInUp 0.6s ease-out forwards',
});

/**
 * Fade in animation variants
 */
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

/**
 * Slide in from left variants
 */
export const slideInLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

/**
 * Slide in from right variants
 */
export const slideInRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

/**
 * Slide in from bottom variants
 */
export const slideInUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

/**
 * Scale in variants
 */
export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

/**
 * Stagger container variants
 */
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

/**
 * Stagger item variants
 */
export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

/**
 * Hover scale animation
 */
export const hoverScaleVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

/**
 * Hover lift animation
 */
export const hoverLiftVariants = {
  rest: { y: 0, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' },
  hover: { 
    y: -8,
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

/**
 * Rotate animation
 */
export const rotateVariants = {
  initial: { rotate: 0 },
  animate: { 
    rotate: 360,
    transition: { duration: 20, repeat: Infinity, ease: 'linear' }
  }
};

/**
 * Float animation
 */
export const floatVariants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

/**
 * Pulse animation
 */
export const pulseVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

/**
 * Page transition variants
 */
export const pageTransitionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.4, ease: 'easeIn' }
  }
};

/**
 * Modal animation variants
 */
export const modalVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
    y: 50
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    y: 50,
    transition: { 
      duration: 0.3, 
      ease: [0.4, 0, 1, 1]
    }
  }
};

/**
 * Backdrop animation variants
 */
export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

/**
 * Drawer animation variants (for mobile menu)
 */
export const drawerVariants = {
  hidden: { x: '100%' },
  visible: { 
    x: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: { 
    x: '100%',
    transition: { 
      duration: 0.3, 
      ease: [0.4, 0, 1, 1]
    }
  }
};

/**
 * Scroll reveal animation
 * @param {number} delay - Delay before animation starts
 * @returns {object} Animation configuration
 */
export const scrollReveal = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' }
  },
  viewport: { once: true, amount: 0.3 }
});

/**
 * Count up animation for numbers
 * @param {number} end - End value
 * @param {number} duration - Duration in seconds
 * @returns {object} Animation configuration
 */
export const countUpAnimation = (end, duration = 2) => ({
  initial: { value: 0 },
  animate: { 
    value: end,
    transition: { duration, ease: 'easeOut' }
  }
});

/**
 * Shimmer loading animation
 */
export const shimmerVariants = {
  initial: { backgroundPosition: '-1000px 0' },
  animate: {
    backgroundPosition: '1000px 0',
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

/**
 * Typing animation
 * @param {string} text - Text to animate
 * @param {number} speed - Speed in ms per character
 * @returns {object} Animation configuration
 */
export const typingAnimation = (text, speed = 50) => {
  const characters = text.split('');
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: speed / 1000,
        delayChildren: 0.2
      }
    }
  };
};

/**
 * Parallax effect configuration
 * @param {number} speed - Parallax speed multiplier
 * @returns {object} Parallax configuration
 */
export const parallaxConfig = (speed = 0.5) => ({
  initial: { y: 0 },
  animate: (scrollY) => ({
    y: scrollY * speed
  })
});

/**
 * 3D card flip variants
 */
export const cardFlipVariants = {
  front: { 
    rotateY: 0,
    transition: { duration: 0.6 }
  },
  back: { 
    rotateY: 180,
    transition: { duration: 0.6 }
  }
};

/**
 * Wave animation for text
 */
export const waveTextVariants = {
  hidden: { y: 0 },
  visible: (i) => ({
    y: [0, -10, 0],
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      repeat: Infinity,
      repeatDelay: 1
    }
  })
};


/**
 * Smooth scroll to element
 * @param {string} elementId - ID of target element
 * @param {number} offset - Offset from top in pixels
 */
export const smoothScrollTo = (elementId, offset = 80) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Intersection Observer options
 */
export const intersectionOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

/**
 * Get random animation delay
 * @param {number} max - Maximum delay in ms
 * @returns {number} Random delay
 */
export const randomDelay = (max = 500) => Math.random() * max;

/**
 * Easing functions
 */
export const easings = {
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  sharp: [0.4, 0, 0.6, 1],
  linear: [0, 0, 1, 1],
};

/**
 * Spring configurations
 */
export const springs = {
  soft: { type: 'spring', stiffness: 50, damping: 20 },
  medium: { type: 'spring', stiffness: 100, damping: 15 },
  stiff: { type: 'spring', stiffness: 200, damping: 20 },
  bouncy: { type: 'spring', stiffness: 300, damping: 10 },
};

/**
 * Animation duration presets
 */
export const durations = {
  fast: 0.2,
  base: 0.4,
  slow: 0.6,
  slower: 0.8,
};

export default {
  staggerAnimation,
  fadeInVariants,
  slideInLeftVariants,
  slideInRightVariants,
  slideInUpVariants,
  scaleInVariants,
  staggerContainerVariants,
  staggerItemVariants,
  hoverScaleVariants,
  hoverLiftVariants,
  rotateVariants,
  floatVariants,
  pulseVariants,
  pageTransitionVariants,
  modalVariants,
  backdropVariants,
  drawerVariants,
  scrollReveal,
  countUpAnimation,
  shimmerVariants,
  typingAnimation,
  parallaxConfig,
  cardFlipVariants,
  waveTextVariants,
  smoothScrollTo,
  intersectionOptions,
  randomDelay,
  easings,
  springs,
  durations,
};