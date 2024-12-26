"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { formatAnalysisResponse } from "@/lib/analysis/format-response";

interface AnalysisResponseProps {
  response: any;
  onReset: () => void;
}

export default function AnalysisResponse({ response, onReset }: AnalysisResponseProps) {
  const formattedResponse = formatAnalysisResponse(response);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-card/30 backdrop-blur-md p-6 md:p-8 rounded-xl border border-white/10"
    >
      <h2 className="text-2xl font-semibold mb-6">Analysis Results</h2>
      
      <div className="space-y-8">
        {formattedResponse.map((section, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-xl font-medium text-blue-400">
              {section.title}
            </h3>
            <div className="space-y-3">
              {section.items.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  <p className="text-foreground/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={onReset}
        className="mt-8 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
      >
        Analyze Another Call
      </Button>
    </motion.div>
  );
}