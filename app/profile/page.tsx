"use client";

import ProfileDisplay from "@/components/profile/ProfileDisplay";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [leng, setLeng] = useState<Number | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile");
        if (!res.ok) throw new Error("Ma'lumot olishda xatolik");
        const data = await res.json();

        // Agar skills string ko'rinishida kelsa, massivga aylantirish
        if (data.skills && typeof data.skills === "string") {
          data.skills = data.skills.split(",").map((s: string) => s.trim());
        }

        setProfile(data);
        setLeng(data.length);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (loading) return <p>Yuklanmoqda...</p>;
  if (!profile) return <p>Profil topilmadi</p>;
  return (
    <>
      <div className=" w-full mt-5 mb-5 flex justify-center items-center">
        {leng > 0 ? (
          <Button className="w-1/2 flex items-center justify-center py-4 px-6 rounded-xl text-lg font-semibold transition duration-300 ease-in-out bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-70 col-span-1 md:col-span-2 group">
            <Link href={"/profile/profile-edit"} className="w-full h-full flex items-center justify-center">
              Profilni Tahrirlash
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
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                ></path>
              </svg>
            </Link>
          </Button>
        ) : (
          <Button className="w-1/2 flex items-center justify-center py-4 px-6 rounded-xl text-lg font-semibold transition duration-300 ease-in-out bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-70 col-span-1 md:col-span-2 group">
            <Link href={"/profile/profile-add"} className="w-full h-full flex items-center justify-center">
              Profillar
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
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0h4m-4 0H9m-6 9h9"
                ></path>
              </svg>
            </Link>
          </Button>
        )}
      </div>
      <ProfileDisplay
        profile={profile}
        onEdit={() => {
          alert("Tahrirlash tugmasi bosildi");
        }}
      />
    </>
  );
};

export default ProfilePage;
