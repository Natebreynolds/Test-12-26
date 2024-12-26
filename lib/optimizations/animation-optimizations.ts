import { isMobileDevice } from './mobile-optimizations';

export const getOptimizedAnimationConfig = () => {
  const isMobile = isMobileDevice();
  
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: isMobile ? 0.3 : 0.5,
      ease: 'easeOut'
    }
  };
};

export const getReducedMotionConfig = () => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 }
});