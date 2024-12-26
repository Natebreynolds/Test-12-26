"use client";

import { motion } from "framer-motion";
import { Message } from "@/types/chat";
import ChatMessageOptions from "./ChatMessageOptions";

interface ChatMessageItemProps {
  message: Message;
  onOptionClick: (option: string) => void;
}

export default function ChatMessageItem({ message, onOptionClick }: ChatMessageItemProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] p-3 rounded-2xl ${
          isUser
            ? "bg-blue-500 text-white"
            : "bg-card/50 border border-white/10"
        }`}
      >
        <p className="text-sm">{message.content}</p>
        {message.options && (
          <ChatMessageOptions 
            options={message.options} 
            onOptionClick={onOptionClick}
          />
        )}
      </div>
    </motion.div>
  );
}