"use client";

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import ChatButton from "./ChatButton";

// Dynamically import ChatWindow to reduce initial bundle size
const ChatWindow = dynamic(() => import('./ChatWindow'), {
  ssr: false,
  loading: () => null
});

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed bottom-0 right-0 z-50">
      <ChatButton onClick={() => setIsOpen(true)} isOpen={isOpen} />
      {isOpen && (
        <ChatWindow
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}