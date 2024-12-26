import { NextResponse } from "next/server";
import { ANALYSIS_WEBHOOK_URL } from "@/lib/chat/constants";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const response = await fetch(ANALYSIS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    return NextResponse.json({ response: data.response });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}