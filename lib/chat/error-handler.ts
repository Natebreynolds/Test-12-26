"use client";

import { Message } from "@/types/chat";
import { DEFAULT_OPTIONS } from "./constants";

export function createErrorMessage(error: Error | string): Message {
  const message = error instanceof Error ? error.message : error;
  return {
    role: "assistant",
    content: `I apologize, but there was an issue: ${message}. Please try again.`,
    options: DEFAULT_OPTIONS
  };
}