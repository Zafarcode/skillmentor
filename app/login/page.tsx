// app/profile/page.tsx
"use client";

import ProfileDisplay from "@/components/profile/ProfileDisplay";
import ProfileEditForm from "@/components/profile/ProfileEditForm";
import { useAuth } from "@/context/AuthContext";
import { UserProfile } from "@/types";
import { useCallback, useEffect, useState } from "react";

const loginPage = () => {
  const { user, isLoading, fetchUserProfile, isLoggedIn } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    if (user && user.id) {
      setProfileLoading(true);
      const profileData = await fetchUserProfile(user.id);
      if (profileData) {
        setUserProfile(profileData);
      }
      setProfileLoading(false);
    } else if (!isLoading && !user) {
      setProfileLoading(false);
    }
  }, [user, isLoading, fetchUserProfile]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleSave = (updatedProfile: UserProfile) => {
    // Backendga yangilangan profilni yuborish logikasi bu yerda bo'ladi
    // const response = await fetch(`/api/users/${updatedProfile.id}/profile`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedProfile),
    // });
    // if (response.ok) {
    //   setUserProfile(updatedProfile);
    //   setIsEditing(false);
    // } else {
    //   console.error("Profilni saqlashda xatolik");
    // }

    setUserProfile(updatedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p>Autentifikatsiya yuklanmoqda...</p>
      </div>
    );
  }

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p>
          Tizimga kirmagan. Iltimos,{" "}
          <a href="/admin/login" className="text-blue-500 hover:underline">
            kirish
          </a>{" "}
          sahifasiga o'ting.
        </p>
      </div>
    );
  }

  if (profileLoading || !userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p>Profil yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 dark:bg-gray-900">
      {isEditing ? (
        // ********** CHANGE THIS LINE **********
        <ProfileEditForm initialProfile={userProfile} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <ProfileDisplay profile={userProfile} onEdit={() => setIsEditing(true)} />
      )}
    </div>
  );
};

export default loginPage;
