export const routePrefetchConfig = {
  // Routes that should be prefetched
  criticalRoutes: [
    '/about',
    '/services',
    '/book'
  ],
  
  // Delay prefetching of less critical routes
  deferredRoutes: [
    '/free-sales-call-analysis'
  ]
};

export function prefetchCriticalRoutes() {
  if (typeof window === 'undefined') return;
  
  // Prefetch critical routes immediately
  routePrefetchConfig.criticalRoutes.forEach(route => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
  });
  
  // Defer prefetching of non-critical routes
  setTimeout(() => {
    routePrefetchConfig.deferredRoutes.forEach(route => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      document.head.appendChild(link);
    });
  }, 3000);
}