// app/favorites/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { getVacancies, saveVacancies } from "@/lib/storage";
import { Vacancy } from "@/types";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

const FavoritesPage: React.FC = () => {
  const [favoriteVacancies, setFavoriteVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allVacancies = getVacancies();
    const favorites = allVacancies.filter((vacancy) => vacancy.isFavorite);
    setFavoriteVacancies(favorites);
    setLoading(false);
  }, []);

  const handleRemoveFavorite = (id: string) => {
    const allVacancies = getVacancies();
    const updatedAllVacancies = allVacancies.map((v) => (v.id === id ? { ...v, isFavorite: false } : v));
    saveVacancies(updatedAllVacancies); // localStorage'ni yangilash
    setFavoriteVacancies((prevFavorites) => prevFavorites.filter((v) => v.id !== id)); // State'ni yangilash
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p>Sevimlilar yuklanmoqda...</p>
      </div>
    );
  }

  const NAVBAR_HEIGHT = 80; // Assuming your Navbar height
  const PAGE_TITLE_HEIGHT = 80; // Assuming height for the title "Saqlangan Vakansiyalar"

  return (
    <div className="relative min-h-screen">
      {/* Fixed header for title */}
      <div
        className="fixed left-0 w-full bg-white dark:bg-black/90 backdrop-blur-md z-40 py-4 shadow-lg dark:shadow-none border-b border-gray-200 dark:border-gray-800"
        style={{ top: `${NAVBAR_HEIGHT}px` }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl text-center font-bold text-black dark:text-white">Saqlangan Vakansiyalar</h1>
        </div>
      </div>

      {/* Main content area, offset by header height */}
      <div
        className="w-full max-w-full xl:max_w-7xl mx-auto px-4 relative z-10"
        style={{ paddingTop: `${NAVBAR_HEIGHT + PAGE_TITLE_HEIGHT}px` }}
      >
        {favoriteVacancies.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300 text-lg py-10">
            Sizda hali saqlangan vakansiyalar yo'q.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteVacancies.map((vacancy) => (
              <Card
                key={vacancy.id}
                className="bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg rounded-lg p-6 flex flex-col justify-between border border-gray-200 dark:border-gray-700"
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <CardTitle className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {vacancy.direction}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFavorite(vacancy.id)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                      title="Sevimlilardan olib tashlash"
                    >
                      <X className="w-5 h-5" /> {/* O'chirish ikonkasini qo'shdik */}
                    </Button>
                  </div>
                  <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">
                    {vacancy.province}, {vacancy.district}
                  </CardDescription>
                  <p className="mt-2 text-lg font-semibold text-gray-800 dark:text-gray-200">{vacancy.salary}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Tajriba: {vacancy.experience}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mt-2">{vacancy.description}</p>
                </div>
                {/* Bu yerda ham "Batafsil" tugmasini qo'shishingiz mumkin, agar kerak bo'lsa */}
                {/* <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white w-full">
                    Batafsil
                </Button> */}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
