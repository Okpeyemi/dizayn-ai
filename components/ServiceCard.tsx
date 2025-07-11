"use client";

import React from "react";
import Image from "next/image";
import { Ratio } from "lucide-react";

interface ServiceCardProps {
  title: string;
  ratio: string;
  modifiedDate: string;
  imageUrl: string;
  onCardClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  ratio,
  modifiedDate,
  imageUrl,
  onCardClick,
}) => {
  return (
    <div
      onClick={onCardClick}
      className="rounded-lg flex flex-col space-y-2 shadow-md overflow-hidden font-dm-sans cursor-pointer hover:shadow-lg transition-shadow max-w-xs"
    >
      <div className="relative bg-muted w-full h-32 overflow-hidden rounded-[10px] p-3">
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300"
          />
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-2 truncate">{title}</h3>
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Ratio className="w-4 h-4 text-muted-foreground" />
            <span>{ratio}</span>
          </div>
          <span>{modifiedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
