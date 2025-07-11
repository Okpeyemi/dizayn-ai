"use client";

import React, { useState, useRef } from "react";
import { Ratio, Image, ArrowUp, Plus, X } from "lucide-react";

interface DesignInputProps {
  onSubmit?: (prompt: string) => void;
  placeholder?: string;
}

const DesignInput = ({
  onSubmit,
  placeholder = "Design ce que tu veux",
}: DesignInputProps) => {
  const [prompt, setPrompt] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageUrl = e.target?.result as string;
            setSelectedImages((prev) => [...prev, imageUrl]);
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-4xl bg-muted rounded-2xl p-4 flex flex-col items-start space-y-4 font-dm-sans">
      {selectedImages.length > 0 && (
        <div className="w-full flex flex-wrap gap-2">
          {selectedImages.map((image, index) => (
            <div key={index} className="relative max-w-xs">
              <img
                src={image}
                alt={`Image sélectionnée ${index + 1}`}
                className="max-w-full max-h-40 object-contain rounded-lg"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70 transition-opacity cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
        className="flex-1 w-full text-muted-foreground bg-transparent text-lg placeholder-muted-foreground focus:outline-none resize-none"
        rows={2}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex items-center justify-between space-x-2 w-full">
        <div className="flex items-center space-x-4">
          <button className="hover:bg-primary-foreground p-2 rounded-full transition-colors cursor-pointer">
            <Plus className="w-4 h-4 text-white" />
          </button>

          <button className="flex items-center space-x-2 bg-primary-foreground hover:bg-background px-3 py-2 rounded-lg transition-colors cursor-pointer">
            <Ratio className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground text-sm font-medium">
              9 : 6
            </span>
          </button>

          <button
            onClick={handleImageSelect}
            className="flex items-center space-x-2 bg-primary-foreground hover:bg-background px-3 py-2 rounded-lg transition-colors cursor-pointer"
          >
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
