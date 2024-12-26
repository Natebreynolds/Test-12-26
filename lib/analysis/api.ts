"use client";

import { ANALYSIS_WEBHOOK_URL } from "@/lib/chat/constants";

export async function submitAnalysis(data: any) {
  try {
    const response = await fetch(ANALYSIS_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Analysis API error:", error);
    throw error;
  }
}