"use client";

import React, { useState } from "react";
import { X, Ratio } from "lucide-react";
import Image from "next/image";

interface CreateDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Template {
  id: number;
  imageUrl: string;
  title: string;
}

const CreateDesignModal: React.FC<CreateDesignModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedRatio, setSelectedRatio] = useState("3:2");

  const ratios = [
    { value: "3:2", label: "3 : 2" },
    { value: "4:3", label: "4 : 3" },
    { value: "1:1", label: "1 : 1" },
    { value: "5:4", label: "5 : 4" },
    { value: "7:5", label: "7 : 5" },
  ];

  // Modèles mockés pour chaque ratio
  const templates: Record<string, Template[]> = {
    "3:2": Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      imageUrl: "/affiche.png",
      title: `Modèle ${i + 1}`,
    })),
    "4:3": Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      imageUrl: "/affiche.png",
      title: `Modèle ${i + 1}`,
    })),
    "1:1": Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      imageUrl: "/affiche.png",
      title: `Modèle ${i + 1}`,
    })),
    "5:4": Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      imageUrl: "/affiche.png",
      title: `Modèle ${i + 1}`,
    })),
    "7:5": Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      imageUrl: "/affiche.png",
      title: `Modèle ${i + 1}`,
    })),
  };

  const handleTemplateClick = (template: Template) => {
    console.log("Template sélectionné:", template);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 border border-muted flex items-center justify-center z-50">
      <div className="bg-background rounded-lg w-full font-dm-sans max-w-6xl flex flex-col p-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-6">
            <h2 className="text-xl font-bold text-foreground">
              Créer un design
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden px-6 pb-6">
          {/* Section des ratios */}
          <div className="w-64 pr-6 space-y-2">
            {ratios.map((ratio) => (
              <button
                key={ratio.value}
                onClick={() => setSelectedRatio(ratio.value)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors cursor-pointer text-left ${
                  selectedRatio === ratio.value
                    ? "bg-foreground text-background"
                    : "hover:bg-muted/50 text-foreground"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Ratio className="w-4 h-4" />
                  <span className="font-medium">{ratio.label}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Section des modèles */}
          <div className="flex-1">
            <h3 className="text-lg font-medium text-foreground mb-4">
              Modèles
            </h3>
            <div className="grid grid-cols-4 gap-4 overflow-y-auto max-h-[calc(80vh-200px)]">
              {templates[selectedRatio]?.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleTemplateClick(template)}
                  className="relative bg-muted rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group"
                >
                  <div className="aspect-[3/2] relative">
                    <Image
                      src={template.imageUrl}
                      alt={template.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity"></div>
                  </div>
                  <div className="absolute top-2 right-2 bg-white bg-opacity-90 text-black text-xs px-2 py-1 rounded-full">
                    6
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDesignModal;
