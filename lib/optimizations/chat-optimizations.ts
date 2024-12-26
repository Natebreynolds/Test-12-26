import { memoize, throttle } from './performance-utils';
import { Message } from '@/types/chat';

// Memoized message formatter
export const formatMessage = memoize((message: string): string => {
  return message.trim();
});

// Throttled message sender to prevent spam
export const throttledMessageSender = throttle(
  async (message: string, callback: (response: Message) => void) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      callback(data);
    } catch (error) {
      console.error('Chat error:', error);
    }
  },
  1000
);

// Message batching for better performance
const messageQueue: Message[] = [];
let isProcessing = false;

export async function batchMessages(message: Message): Promise<void> {
  messageQueue.push(message);
  
  if (!isProcessing) {
    isProcessing = true;
    while (messageQueue.length > 0) {
      const batch = messageQueue.splice(0, 5);
      await processBatch(batch);
    }
    isProcessing = false;
  }
}

async function processBatch(messages: Message[]): Promise<void> {
  // Process messages in batches
  await Promise.all(messages.map(message => 
    throttledMessageSender(message.content, () => {})
  ));
}