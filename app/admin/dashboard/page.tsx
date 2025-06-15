// app/admin/dashboard/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/context/AdminAuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProfiles } from "../lib/profileStore";

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
  skills: string;
  desiredposition: string;
  expectedsalary: string;
  preferredprovince: string;
  preferreddistrict: string;
  readytorelocate: boolean;
};

const AdminDashboardPage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/profile`, {
          cache: "no-store", // Har safar so‘rov qilish uchun
        });
        if (!res.ok) {
          console.error("API dan profilni olishda xatolik:", res.statusText);
          return null;
        }
        const data: any = await res.json();

        setProfile(data);
      } catch (error) {
        console.error("Profilni olishda xatolik:", error);
        return null;
      }
    };

    fetchData();
  }, []);
  console.log(profile);

  const { isAdminLoggedIn, isLoadingAdmin, adminLogout } = useAdminAuth();
  const router = useRouter();

  const allProfiles = getProfiles();
  console.log(allProfiles);

  useEffect(() => {
    if (!isLoadingAdmin && !isAdminLoggedIn) {
      router.push("/admin/login");
    }
  }, [isAdminLoggedIn, isLoadingAdmin, router]);

  if (isLoadingAdmin) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p>Yuklanmoqda...</p>
      </div>
    );
  }

  if (!isAdminLoggedIn) {
    return null; // Yo'naltirishdan keyin render bo'lmasligi uchun
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 flex flex-col items-center px-4">
      <Button onClick={adminLogout} className="bg-red-600 hover:bg-red-700 text-white">
        Chiqish
      </Button>
      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
        <Link href={"/admin/dashboard/vacancy"}>Vacancy</Link>
      </Button>
      {profile.length > 1 ? (
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Link href={"/admin/dashboard/profile"}>Profile</Link>
        </Button>
      ) : (
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Link href={"/admin/dashboard/profile-edit"}>Profile Edit</Link>
        </Button>
      )}
    </div>
  );
};

export default AdminDashboardPage;
