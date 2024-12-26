"use client";

import { useEffect, useRef, useState } from 'react';
import { getIntersectionObserver } from '@/lib/optimizations/lazy-loading';

export function useIntersectionObserver(options = {}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = getIntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer?.unobserve(element);
        }
      });
    });

    if (observer) {
      observer.observe(element);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return { elementRef, isVisible };
}