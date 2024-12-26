export interface Message {
  role: "user" | "assistant";
  content: string;
  options?: string[];
}

export interface ChatContext {
  role: "user" | "assistant";
  content: string;
}

export interface ParsedResponse {
  content: string;
  options?: string[];
}

export interface ChatConfig {
  maxContextLength: number;
  typingDelay: number;
  retryAttempts: number;
  retryDelay: number;
}