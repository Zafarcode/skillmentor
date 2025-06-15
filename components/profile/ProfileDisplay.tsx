// components/profile/ProfileDisplay.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfile } from '@/types'
import { FileText, Linkedin, Mail, Phone } from "lucide-react"; // FileText ikonkasi qo'shildi
import React from "react";

interface ProfileDisplayProps {
  profile: UserProfile;
  onEdit: () => void;
}

const ProfileDisplay: React.FC<ProfileDisplayProps> = ({ profile, onEdit }) => {
  // Agar profil rasmi bo'lmasa, default avatar ko'rsatish
  const defaultAvatar = "https://via.placeholder.com/150/CCCCCC/FFFFFF?text=No+Photo";
  // O'zingizning default avatar yo'lingizni belgilashingiz mumkin
  // const defaultAvatar = "/path/to/your/default-avatar.png";

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg rounded-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-3xl font-bold">Mening Profilim</CardTitle>
        <Button onClick={onEdit} className="bg-blue-600 hover:bg-blue-700 text-white">
          Tahrirlash
        </Button>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">

        {/* Shaxsiy ma'lumotlar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Ism Familiya</p>
            <p className="text-lg font-semibold">{profile.fullName}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Yosh</p>
            <p className="text-lg font-semibold">{profile.age ? `${profile.age} yosh` : "Noma'lum"}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Tajriba</p>
            <p className="text-lg font-semibold">
              {profile.experienceYears ? `${profile.experienceYears} yil` : "Yo'q"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Ma'lumot</p>
            <p className="text-lg font-semibold">{profile.education}</p>
          </div>
        </div>

        {/* Bog'lanish ma'lumotlari */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
          <h5 className="text-xl font-semibold">Bog'lanish</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <p>{profile.email || "Kiritilmagan"}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <p>{profile.phone || "Kiritilmagan"}</p>
            </div>
            <div className="flex items-center space-x-2">
              {/* Telegram ikonka yo'li, agar loyihangizda mavjud bo'lmasa, uni yuklab oling yoki `lucide-react` dan boshqa ikonka ishlating */}
              {profile.telegram ? (
                <a
                  href={`https://t.me/${profile.telegram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:text-blue-500"
                >
                  <img src="/icons/telegram.svg" alt="Telegram" className="w-5 h-5" />
                  <p>{profile.telegram}</p>
                </a>
              ) : (
                <>
                  <img src="/icons/telegram.svg" alt="Telegram" className="w-5 h-5 opacity-50" />
                  <p className="text-gray-500 dark:text-gray-400">Kiritilmagan</p>
                </>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {profile.linkedin ? (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:text-blue-500"
                >
                  <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <p>{profile.linkedin}</p>
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

        {/* Rezyume (CV) */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-2">
          <h5 className="text-xl font-semibold">Rezyume (CV)</h5>
          {profile.resumeUrl ? (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 transition-colors"
            >
              <FileText className="w-5 h-5" />
              Rezyumeni ko'rish/yuklab olish
            </a>
          ) : (
            <p className="text-gray-700 dark:text-gray-300">Rezyume yuklanmagan.</p>
          )}
        </div>

        {/* Men haqimda */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-2">
          <h5 className="text-xl font-semibold">Men haqimda</h5>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{profile.aboutMe || "Kiritilmagan"}</p>
        </div>

        {/* Ko'nikmalar */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-2">
          <h5 className="text-xl font-semibold">Ko'nikmalar</h5>
          {profile.skills && profile.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-blue-900 dark:text-blue-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-300">Ko'nikmalar kiritilmagan.</p>
          )}
        </div>

        {/* Qidirilayotgan ish */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-2">
          <h5 className="text-xl font-semibold">Qidirilayotgan ish</h5>
          <p className="text-gray-700 dark:text-gray-300">**Lavozim:** {profile.desiredPosition || "Kiritilmagan"}</p>
          <p className="text-gray-700 dark:text-gray-300">
            **Kutilayotgan oylik:** {profile.expectedSalary || "Kiritilmagan"}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            **Afzal ko'rgan hudud:** {profile.preferredProvince || "Kiritilmagan"}
            {profile.preferredDistrict ? `, ${profile.preferredDistrict}` : ""}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            **Ko'chishga tayyormi:** {profile.readyToRelocate ? "Ha" : "Yo'q"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileDisplay;
