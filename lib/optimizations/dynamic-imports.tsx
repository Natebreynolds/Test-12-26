"use client";

import dynamic from 'next/dynamic';
import React from 'react';

const LoadingFallback = () => (
  <div className="w-full h-full bg-background/50" />
);

export const DynamicSplineScene = dynamic(
  () => import('@/components/hero/SplineScene'),
  { 
    ssr: false, 
    loading: () => <LoadingFallback /> 
  }
);

export const DynamicServiceModal = dynamic(
  () => import('@/components/services/ServiceModal'),
  { ssr: false }
);

export const DynamicChatWidget = dynamic(
  () => import('@/components/chat/ChatWidget'),
  { ssr: false }
);