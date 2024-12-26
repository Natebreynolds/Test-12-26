"use client";

import { useEffect, useState } from 'react';
import { getOptimizedAnimationConfig, getReducedMotionConfig } from '@/lib/optimizations/animation-optimizations';
import { mobileOptimizationConfig } from '@/lib/optimizations/mobile-optimizations';

export function useOptimizedAnimations() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(mobileOptimizationConfig.reducedMotion);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return shouldReduceMotion ? getReducedMotionConfig() : getOptimizedAnimationConfig();
}