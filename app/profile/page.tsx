"use client";

import ProfileDisplay from "@/components/profile/ProfileDisplay";
import { UserProfile } from "@/types";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
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
    <ProfileDisplay
      profile={profile}
      onEdit={() => {
        alert("Tahrirlash tugmasi bosildi");
      }}
    />
  );
};

export default ProfilePage;
