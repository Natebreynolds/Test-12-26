import dynamic from 'next/dynamic';

// Dynamic imports for heavy components
export const DynamicSplineScene = dynamic(
  () => import('@/components/hero/SplineScene'),
  { ssr: false, loading: () => <div className="w-full h-full bg-background/50" /> }
);

export const DynamicServiceModal = dynamic(
  () => import('@/components/services/ServiceModal'),
  { ssr: false }
);

export const DynamicChatWidget = dynamic(
  () => import('@/components/chat/ChatWidget'),
  { ssr: false }
);