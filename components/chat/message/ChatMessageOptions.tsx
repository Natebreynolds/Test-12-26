"use client";

import { Button } from "@/components/ui/button";

interface ChatMessageOptionsProps {
  options: string[];
  onOptionClick: (option: string) => void;
}

export default function ChatMessageOptions({ options, onOptionClick }: ChatMessageOptionsProps) {
  return (
    <div className="mt-4 space-y-2">
      {options.map((option, idx) => (
        <Button
          key={idx}
          variant="ghost"
          className="w-full justify-start text-left hover:bg-blue-500/10"
          onClick={() => onOptionClick(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}