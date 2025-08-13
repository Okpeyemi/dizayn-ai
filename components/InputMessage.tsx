"use client";

import React from "react";
import DesignInput from "./DesignInput";
import ServiceCard from "./ServiceCard";

const InputMessage = () => {
  const handlePromptSubmit = (prompt: string) => {
    console.log("Prompt soumis:", prompt);
  };

  const handleCardClick = () => {
    console.log("Card clicked!");
  };

  const cardDataList = [
    {
      title: "Objectifs Professionnels",
      ratio: "1:1",
      modifiedDate: "Il y a 2 jours",
      imageUrl: "/affiche.png",
    },
    {
      title: "Présentation PowerPoint",
      ratio: "16:10",
      modifiedDate: "Il y a 6 jours",
      imageUrl: "/presentation.png",
    },
    {
      title: "Objectifs Professionnels",
      ratio: "1:1",
      modifiedDate: "Il y a 2 jours",
      imageUrl: "/affiche.png",
    },
    {
      title: "Présentation PowerPoint",
      ratio: "16:10",
      modifiedDate: "Il y a 6 jours",
      imageUrl: "/presentation.png",
    },
    {
      title: "Objectifs Professionnels",
      ratio: "1:1",
      modifiedDate: "Il y a 2 jours",
      imageUrl: "/affiche.png",
    },
    {
      title: "Présentation PowerPoint",
      ratio: "16:10",
      modifiedDate: "Il y a 6 jours",
      imageUrl: "/presentation.png",
    },
    {
      title: "Objectifs Professionnels",
      ratio: "1:1",
      modifiedDate: "Il y a 2 jours",
      imageUrl: "/affiche.png",
    },
    {
      title: "Présentation PowerPoint",
      ratio: "16:10",
      modifiedDate: "Il y a 6 jours",
      imageUrl: "/presentation.png",
    },
    {
      title: "Objectifs Professionnels",
      ratio: "1:1",
      modifiedDate: "Il y a 2 jours",
      imageUrl: "/affiche.png",
    },
    {
      title: "Présentation PowerPoint",
      ratio: "16:10",
      modifiedDate: "Il y a 6 jours",
      imageUrl: "/presentation.png",
    },
    {
      title: "Objectifs Professionnels",
      ratio: "1:1",
      modifiedDate: "Il y a 2 jours",
      imageUrl: "/affiche.png",
    },
    {
      title: "Présentation PowerPoint",
      ratio: "16:10",
      modifiedDate: "Il y a 6 jours",
      imageUrl: "/presentation.png",
    },
    {
      title: "Objectifs Professionnels",
      ratio: "1:1",
      modifiedDate: "Il y a 2 jours",
      imageUrl: "/affiche.png",
    },
    {
      title: "Présentation PowerPoint",
      ratio: "16:10",
      modifiedDate: "Il y a 6 jours",
      imageUrl: "/presentation.png",
    },
    {
      title: "Objectifs Professionnels",
      ratio: "1:1",
      modifiedDate: "Il y a 2 jours",
      imageUrl: "/affiche.png",
    },
    {
      title: "Présentation PowerPoint",
      ratio: "16:10",
      modifiedDate: "Il y a 6 jours",
      imageUrl: "/presentation.png",
    },
    {
      title: "Objectifs Professionnels",
      ratio: "1:1",
      modifiedDate: "Il y a 2 jours",
      imageUrl: "/affiche.png",
    },
    {
      title: "Présentation PowerPoint",
      ratio: "16:10",
      modifiedDate: "Il y a 6 jours",
      imageUrl: "/presentation.png",
    },
    {
      title: "Objectifs Professionnels",
      ratio: "1:1",
      modifiedDate: "Il y a 2 jours",
      imageUrl: "/affiche.png",
    },
    {
      title: "Présentation PowerPoint",
      ratio: "16:10",
      modifiedDate: "Il y a 6 jours",
      imageUrl: "/presentation.png",
    },
    {
      title: "Objectifs Professionnels",
      ratio: "1:1",
      modifiedDate: "Il y a 2 jours",
      imageUrl: "/affiche.png",
    },
    {
      title: "Présentation PowerPoint",
      ratio: "16:10",
      modifiedDate: "Il y a 6 jours",
      imageUrl: "/presentation.png",
    },
    {
      title: "Objectifs Professionnels",
      ratio: "1:1",
      modifiedDate: "Il y a 2 jours",
      imageUrl: "/affiche.png",
    },
    {
      title: "Présentation PowerPoint",
      ratio: "16:10",
      modifiedDate: "Il y a 6 jours",
      imageUrl: "/presentation.png",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 h-full">
      <div className="max-w-4xl text-center mb-4">
        <h1 className="text-5xl font-bold text-foreground font-rakkas mb-10">
          Qu&apos;est-ce qu&apos;on fait aujourd&apos;hui ?
        </h1>

        <DesignInput onSubmit={handlePromptSubmit} />
      </div>

      <div
        className={`${
          cardDataList.length > 0
            ? "mt-12 flex flex-wrap w-full justify-start gap-8 overflow-y-auto"
            : "hidden"
        }`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          overflowY: "auto",
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {cardDataList.map((cardData, idx) => (
          <ServiceCard
            key={idx}
            title={cardData.title}
            ratio={cardData.ratio}
            modifiedDate={cardData.modifiedDate}
            imageUrl={cardData.imageUrl}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
};

export default InputMessage;
