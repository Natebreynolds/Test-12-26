export const mobileOptimizationConfig = {
  // Reduce animation complexity on mobile
  reducedMotion: typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  
  // Viewport-based loading thresholds
  mobileViewportThreshold: 0.2,
  desktopViewportThreshold: 0.1,
  
  // Device-specific batch sizes
  mobileBatchSize: 3,
  desktopBatchSize: 5,
  
  // Throttle intervals (in ms)
  mobileThrottleInterval: 150,
  desktopThrottleInterval: 50
};

export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function getDeviceSpecificConfig() {
  const isMobile = isMobileDevice();
  return {
    batchSize: isMobile ? mobileOptimizationConfig.mobileBatchSize : mobileOptimizationConfig.desktopBatchSize,
    throttleInterval: isMobile ? mobileOptimizationConfig.mobileThrottleInterval : mobileOptimizationConfig.desktopThrottleInterval,
    viewportThreshold: isMobile ? mobileOptimizationConfig.mobileViewportThreshold : mobileOptimizationConfig.desktopViewportThreshold
  };
}