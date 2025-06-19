// app/admin/dashboard/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/context/AdminAuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// `getProfiles` funksiyasi hozircha ishlatilmayapti, agar kerak bo'lmasa o'chirilishi mumkin.
// import { getProfiles } from "../lib/profileStore";

type ProfileData = {
  userId: number;
  email: string;
  fullname: string;
  age: number;
  experienceyears: number;
  education: string;
  phone: string;
  telegram: string;
  linkedin: string;
  aboutme: string;
  skills: string; // Skills endi string emas, string[] bo'lishi kerak. API dan kelayotgan formatga qarab o'zgartiriladi.
  desiredposition: string;
  expectedsalary: string;
  preferredprovince: string;
  preferreddistrict: string;
  readytorelocate: boolean;
};

const AdminDashboardPage: React.FC = () => {
  const [profiles, setProfiles] = useState<ProfileData[]>([]); // O'zgaruvchi nomini `profiles` ga o'zgartirdim, chunki u massiv.
  const { isAdminLoggedIn, isLoadingAdmin, adminLogout } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/profile`, {
          cache: "no-store", // Har safar so‘rov qilish uchun
        });
        if (!res.ok) {
          console.error("API dan profilni olishda xatolik:", res.statusText);
          return; // Null qaytarish o'rniga return qilish kerak
        }
        const data: ProfileData[] = await res.json(); // Typecast to ProfileData[]
        setProfiles(data);
      } catch (error) {
        console.error("Profilni olishda xatolik:", error);
      }
    };

    fetchData();
  }, []); // Dependencylarni bo'sh qoldirib, faqat bir marta ishga tushirish

  // `allProfiles` ishlatilmaganligi sababli izohga olindi.
  // const allProfiles = getProfiles();
  // console.log(allProfiles); // Agar kerak bo'lmasa, bu console.log ham o'chirilishi mumkin

  useEffect(() => {
    if (!isLoadingAdmin && !isAdminLoggedIn) {
      router.push("/admin/login");
    }
  }, [isAdminLoggedIn, isLoadingAdmin, router]);

  if (isLoadingAdmin) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p className="text-xl font-semibold animate-pulse">Yuklanmoqda...</p>
      </div>
    );
  }

  if (!isAdminLoggedIn) {
    return null; // Yo'naltirishdan keyin render bo'lmasligi uchun
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-950 dark:to-gray-800  px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full space-y-10 bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-3xl border border-blue-100 dark:border-gray-700 transform transition-all duration-500 hover:scale-[1.01] hover:shadow-4xl">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">Admin Panel</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
            Boshqaruv markaziga xush kelibsiz! Kerakli boʻlimni tanlang.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Chiqish tugmasi */}
          <Button
            onClick={adminLogout}
            className="w-full flex items-center justify-center py-4 px-6 rounded-xl text-lg font-semibold transition duration-300 ease-in-out bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-70 group"
          >
            Chiqish
            <svg
              className="ml-3 w-6 h-6 transform transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H5a3 3 0 01-3-3v-5a3 3 0 013-3h3m2-2V7a3 3 0 013-3h5a3 3 0 013 3v5a3 3 0 01-3 3h-3"
              ></path>
            </svg>
          </Button>

          {/* Vakansiyalar tugmasi */}
          <Button className="w-full flex items-center justify-center py-4 px-6 rounded-xl text-lg font-semibold transition duration-300 ease-in-out bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-70 group">
            <Link href={"/admin/dashboard/vacancy"} className="w-full h-full flex items-center justify-center">
              Vakansiyalar
              <svg
                className="ml-3 w-6 h-6 transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                ></path>
              </svg>
            </Link>
          </Button>

          <Button className="w-full flex items-center justify-center py-4 px-6 rounded-xl text-lg font-semibold transition duration-300 ease-in-out bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-70 group">
            <Link href={"/admin/dashboard/resumes"} className="w-full mx-a h-full flex items-center justify-center ">
              Resumes
              <svg
                className="ml-3 w-6 h-6 transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                ></path>
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
