"use client";

import { Message } from "@/types/chat";
import { createErrorMessage } from "./message-handler";

export function parseResponse(data: unknown): Message {
  try {
    // Handle string responses
    if (typeof data === 'string') {
      return {
        role: "assistant",
        content: data.trim()
      };
    }

    // Handle object responses
    if (data && typeof data === 'object') {
      const obj = data as Record<string, unknown>;
      
      // Extract content from various possible response structures
      let content = '';
      
      if (typeof obj.response === 'string') {
        content = obj.response;
      } else if (typeof obj.message === 'string') {
        content = obj.message;
      } else if (typeof obj.content === 'string') {
        content = obj.content;
      }

      // If no direct string found, try nested response object
      if (!content && typeof obj.response === 'object' && obj.response) {
        const nestedResponse = obj.response as Record<string, unknown>;
        if (typeof nestedResponse.message === 'string') {
          content = nestedResponse.message;
        } else if (typeof nestedResponse.content === 'string') {
          content = nestedResponse.content;
        }
      }

      content = content.trim();

      if (!content) {
        console.error('Response data:', obj);
        throw new Error('No valid content found in response');
      }

      return {
        role: "assistant",
        content,
        options: Array.isArray(obj.options) ? obj.options : undefined
      };
    }

    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Error parsing response:', error);
    return createErrorMessage('Failed to parse response');
  }
}