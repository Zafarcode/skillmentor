"use client"; // Komponentni Client Component qilish uchun

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HeartIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AnimeCard({
  title,
  slug,
  poster,
  rating,
  year,
}: {
  title: string;
  slug: string;
  poster: string;
  rating: number;
  year: number;
}) {
  // Yurakcha ikonkasining holatini ushlab turuvchi state
  const [isFavorite, setIsFavorite] = useState(false);

  // Yurakcha ikonkasining holatini saqlash va o'qish uchun localStorage kaliti
  const storageKey = `favorite-anime-${slug}`;

  // Komponent yuklanganida localStorage dan saqlangan holatni o'qish
  useEffect(() => {
    const savedFavoriteStatus = localStorage.getItem(storageKey);
    if (savedFavoriteStatus) {
      setIsFavorite(JSON.parse(savedFavoriteStatus));
    }
  }, [storageKey]);

  // Yurakcha ikonkasining holatini o'zgartiruvchi funksiya va localStorage ga yozish
  const toggleFavorite = () => {
    setIsFavorite((prev) => {
      const newFavoriteStatus = !prev;
      localStorage.setItem(storageKey, JSON.stringify(newFavoriteStatus));
      return newFavoriteStatus;
    });
  };

  return (
    <Card className="w-full h-full max-w-sm overflow-hidden shadow-none border-none rounded-t-lg rounded-b-none bg-transparent">
      <CardContent className="p-0">
        <Link href={"/anime/" + slug} className="relative group block">
          <Image
            src={poster}
            alt={title}
            width={500}
            height={800}
            className="w-full h-[300px] object-cover rounded-lg"
            style={{ aspectRatio: "500/800", objectFit: "cover" }}
          />
        </Link>
        <div className="pt-4 space-y-3">
          <div className="flex items-center gap-1">
            <StarIcon className="w-5 h-5 fill-primary" />
            <span className="font-medium">{rating}</span>
          </div>
          <h3 className="text-lg font-bold mb-2">{title ? title.slice(0, 20) : "No title available"}</h3>

          <div className="flex items-center justify-between gap-4 mb-2">
            <p className="text-sm text-gray-400">{year}</p>

            <Tooltip>
              <TooltipTrigger onClick={toggleFavorite}>
                <HeartIcon className={`w-5 h-5 cursor-pointer ${isFavorite ? "fill-red-500" : "fill-none"}`} />
                <TooltipContent className="w-32 absolute right-0 bottom-1">
                  <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
                </TooltipContent>
              </TooltipTrigger>
            </Tooltip>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
