// src/contexts/UserProfileContext.js (yoki .ts)
"use client";

import { UserProfile } from '@/types'; // UserProfile tipini import qilish
import { createContext, useContext, useState } from 'react'

// Context yaratish
const UserProfileContext = createContext(undefined); // undefined ni boshlang'ich qiymat qilib qo'yish

// Provider komponenti
export const UserProfileProvider = ({ children }) => {
  // Global massiv
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);

  const addUserProfile = (profile: UserProfile) => {
    setUserProfiles((prevProfiles) => [...prevProfiles, profile]);
  };

  const updateUserProfile = (userId: string, updatedProfile: UserProfile) => {
    setUserProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile.userId === userId ? { ...profile, ...updatedProfile } : profile
      )
    );
  };

  const contextValue = {
    userProfiles,
    addUserProfile,
    updateUserProfile,
  };

  return (
    <UserProfileContext.Provider value={contextValue}>
      {children}
    </UserProfileContext.Provider>
  );
};

// Contextdan foydalanish uchun hook
export const useUserProfiles = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfiles must be used within a UserProfileProvider');
  }
  return context;
};