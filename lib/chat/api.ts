"use client";

import { Message } from "@/types/chat";
import { ChatContext } from "./types";
import { CHAT_WEBHOOK_URL, TIMEOUT_MS } from "./constants";
import { parseResponse } from "./parser";
import { createErrorMessage, createSystemMessage } from "./message-handler";

export async function sendChatMessage(
  message: string,
  context: ChatContext[]
): Promise<Message> {
  try {
    // Prepare the request payload
    const payload = {
      message: message.trim(),
      context: context.slice(-3),
      timestamp: new Date().toISOString()
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const response = await fetch(CHAT_WEBHOOK_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      mode: 'cors'
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    let data;

    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      try {
        data = JSON.parse(text);
      } catch {
        data = { response: text };
      }
    }

    if (!data) {
      throw new Error("Empty response received");
    }

    return parseResponse(data);
  } catch (error) {
    console.error('Chat API error:', error);
    return createErrorMessage(
      error instanceof Error ? error.message : 'An unexpected error occurred'
    );
  }
}