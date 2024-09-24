"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HeartIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MultfilmCard({
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
  // Favoritlar holatini saqlash
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // Komponent yuklanganida favoritlar ro'yxatini localStorage dan o'qish
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isFilmFavorite = favorites.includes(slug);
    setIsFavorite(isFilmFavorite);
  }, [slug]);

  // Yurakchani bosganda favoritni o'zgartirish
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (isFavorite) {
      // Agar film favorit bo'lsa, uni ro'yxatdan o'chirish
      const updatedFavorites = favorites.filter((s: string) => s !== slug);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      // Agar film favorit bo'lmasa, uni ro'yxatga qo'shish
      favorites.push(slug);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    // State ni yangilash
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className="w-full h-full max-w-sm overflow-hidden shadow-none border-none rounded-t-lg rounded-b-none bg-transparent">
      <CardContent className="p-0">
        <Link className="relative group" href={"/multfilms/" + slug}>
          <Image
            src={poster}
            alt={title}
            width={500}
            height={800}
            className="w-full h-[300px] object-cover rounded-lg"
            style={{ aspectRatio: "500/800", objectFit: "cover" }}
          />
          <div className="pt-4 space-y-3">
            <div className="flex items-center gap-1">
              <StarIcon className="w-5 h-5 fill-primary" />
              <span className="font-medium">{rating}</span>
            </div>
            <h3 className="text-lg font-bold mb-2">{title.slice(0, 20)}</h3>
            <div className="flex items-center justify-between gap-4 mb-2">
              <p className="text-sm text-gray-400">{year}</p>

              <Tooltip>
                <TooltipTrigger>
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Linkning default xatti-harakatini to'xtatish
                      toggleFavorite();
                    }}
                    className="relative"
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"} // Ekran o'quvchilar uchun matn
                    title={isFavorite ? "Remove from favorites" : "Add to favorites"} // Tooltip uchun matn
                  >
                    <HeartIcon
                      className={`w-5 h-5 transition-colors duration-300 ${
                        isFavorite ? "fill-red-500 stroke-red-500" : "fill-transparent stroke-gray-400"
                      }`}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="w-32 absolute right-0 bottom-1">
                  <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
