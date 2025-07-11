"use client";

import React, { useState } from "react";
import { Ratio, Image, ArrowUp, Plus } from "lucide-react";

interface DesignInputProps {
  onSubmit?: (prompt: string) => void;
  placeholder?: string;
}

const DesignInput = ({
  onSubmit,
  placeholder = "Design ce que tu veux",
}: DesignInputProps) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    if (prompt.trim() && onSubmit) {
      onSubmit(prompt);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-4xl bg-muted rounded-2xl p-4 flex flex-col items-start space-y-4 font-dm-sans">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
        className="flex-1 w-full text-muted-foreground bg-transparent text-lg placeholder-muted-foreground focus:outline-none resize-none"
        rows={2}
      />

      <div className="flex items-center justify-between space-x-2 w-full">
        <div className="flex items-center space-x-4">
          <button className="hover:bg-primary-foreground p-2 rounded-full transition-colors cursor-pointer">
            <Plus className="w-4 h-4 text-white" />
          </button>

          <button className="flex items-center space-x-2 bg-primary-foreground hover:bg-background px-3 py-2 rounded-lg transition-colors cursor-pointer">
            <Ratio className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground text-sm font-medium">9 : 6</span>
          </button>

          <button className="flex items-center space-x-2 bg-primary-foreground hover:bg-background px-3 py-2 rounded-lg transition-colors cursor-pointer">
            <Image className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground text-sm font-medium">
              Choisir une image
            </span>
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <ArrowUp className="w-5 h-5 text-gray-900" />
        </button>
      </div>
    </div>
  );
};

export default DesignInput;
