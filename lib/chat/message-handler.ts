"use client";

import { Message } from "@/types/chat";

export function validateMessageContent(content: string): boolean {
  return Boolean(content && content.trim().length > 0);
}

export function sanitizeMessage(content: string): string {
  return content.trim();
}

export function createErrorMessage(error: Error | string): Message {
  const message = error instanceof Error ? error.message : error;
  return {
    role: "assistant",
    content: `I apologize, but there was an issue: ${message}. Please try again.`
  };
}

export function createSystemMessage(content: string, options?: string[]): Message {
  return {
    role: "assistant",
    content,
    options
  };
}