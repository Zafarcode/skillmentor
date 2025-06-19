"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Linkedin, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";

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

const ProfileDisplay = () => {
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

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg rounded-lg">
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle className="text-3xl font-bold">Mening Profilim</CardTitle>
      </CardHeader>
      {profile.map((userProfile) => (
        <CardContent className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Ism Familiya</p>
              <p className="text-lg font-semibold">{userProfile.fullname}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Yosh</p>
              <p className="text-lg font-semibold">{userProfile.age ? `${userProfile.age} yosh` : "Noma'lum"}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Tajriba</p>
              <p className="text-lg font-semibold">
                {userProfile.experienceyears ? `${userProfile.experienceyears} yil` : "Yo'q"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Ma'lumot</p>
              <p className="text-lg font-semibold">{userProfile.education || "Kiritilmagan"}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
            <h5 className="text-xl font-semibold">Bog'lanish</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <p>{userProfile.email || "Kiritilmagan"}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <p>{userProfile.phone || "Kiritilmagan"}</p>
              </div>
              <div className="flex items-center space-x-2">
                {userProfile.telegram ? (
                  <a
                    href={`https://t.me/${userProfile.telegram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 hover:text-blue-500"
                  >
                    <img src="/icons/telegram.svg" alt="Telegram" className="w-5 h-5" />
                    <p>{userProfile.telegram}</p>
                  </a>
                ) : (
                  <>
                    <img src="/icons/telegram.svg" alt="Telegram" className="w-5 h-5 opacity-50" />
                    <p className="text-gray-500 dark:text-gray-400">Kiritilmagan</p>
                  </>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {userProfile.linkedin ? (
                  <a
                    href={userProfile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 hover:text-blue-500"
                  >
                    <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <p>{userProfile.linkedin}</p>
                  </a>
                ) : (
                  <>
                    <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-400 opacity-50" />
                    <p className="text-gray-500 dark:text-gray-400">Kiritilmagan</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-2">
            <h5 className="text-xl font-semibold">Men haqimda</h5>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {userProfile.aboutme || "Kiritilmagan"}
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-2">
            <h5 className="text-xl font-semibold">Ko'nikmalar</h5>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {userProfile.skills || "Kiritilmagan"}
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-2">
            <h5 className="text-xl font-semibold">Qidirilayotgan ish</h5>
            <p className="text-gray-700 dark:text-gray-300">
              **Lavozim:** {userProfile.desiredposition || "Kiritilmagan"}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              **Kutilayotgan oylik:** {userProfile.expectedsalary || "Kiritilmagan"}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              **Afzal ko'rgan hudud:** {userProfile.preferredprovince || "Kiritilmagan"}
              {userProfile.preferreddistrict ? `, ${userProfile.preferreddistrict}` : ""}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              **Ko'chishga tayyormi:** {userProfile.readytorelocate ? "Ha" : "Yo'q"}
            </p>
          </div>
        </CardContent>
      ))}
    </Card>
  );
};

export default ProfileDisplay;
