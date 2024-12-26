"use client";

import { useState, useCallback } from 'react';
import { ServiceType } from "@/types/services";

export function useModalState() {
  const [isOpen, setIsOpen] = useState(false);
  const [service, setService] = useState<ServiceType | null>(null);

  const openModal = useCallback((serviceData: ServiceType) => {
    setService(serviceData);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setService(null);
  }, []);

  return {
    isOpen,
    service,
    openModal,
    closeModal
  };
}