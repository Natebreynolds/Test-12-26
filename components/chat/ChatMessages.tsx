"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Message } from "@/types/chat";
import ChatMessageItem from "./message/ChatMessageItem";
import TypingIndicator from "./TypingIndicator";

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
}

export default function ChatMessages({ 
  messages = [], // Provide default empty array
  isTyping = false,
  onSendMessage 
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <ChatMessageItem 
          key={index}
          message={message}
          onOptionClick={onSendMessage}
        />
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
}