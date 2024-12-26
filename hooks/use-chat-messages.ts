"use client";

import { useState, useCallback } from "react";
import { Message } from "@/types/chat";
import { ChatContext } from "@/lib/chat/types";
import { sendChatMessage } from "@/lib/chat/api";
import { createSystemMessage } from "@/lib/chat/message-handler";

const initialMessage: Message = createSystemMessage(
  "Welcome to Breakthrough Coaching AI! What would you like to learn about?",
  [
    "Tell me about Fractional CSO Services",
    "How does AI-Powered Sales Coaching work?",
    "Explain your Sales Automation Solutions",
    "What Custom Training Programs do you offer?"
  ]
);

export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    try {
      // Add user message immediately
      const userMessage: Message = { role: "user", content: content.trim() };
      setMessages(prev => [...prev, userMessage]);
      setIsTyping(true);

      // Get recent context
      const context: ChatContext[] = messages.slice(-3).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Artificial delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));

      // Send message and get response
      const assistantMessage = await sendChatMessage(content.trim(), context);
      
      // Add assistant message
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [
        ...prev,
        createSystemMessage("I apologize, but something went wrong. Please try again.")
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [messages]);

  return { messages, isTyping, sendMessage };
}