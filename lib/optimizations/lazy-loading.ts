export const lazyLoadOptions = {
  threshold: 0.1,
  rootMargin: '50px',
};

export function getIntersectionObserver(callback: IntersectionObserverCallback) {
  if (typeof window === 'undefined') return null;
  
  return new IntersectionObserver(callback, lazyLoadOptions);
}