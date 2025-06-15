// src/data/mockProfiles.ts
import { UserProfile } from "@/types";

// Bu massiv global hisoblanadi va butun ilovada import qilinishi mumkin.
// UNUTMANG: Bu faqat client-side (brauzer xotirasi) da mavjud bo'ladi!
export const mockProfiles: UserProfile[] = [];

// Yangi profil qo'shish funksiyasi
export const addMockProfile = (profile: UserProfile) => {
  // userId ni qo'lda qo'shamiz, chunki backend yo'q
  const newProfile = { ...profile, userId: `mock_user_${Date.now()}` };
  mockProfiles.push(newProfile);
  console.log("Mock profillar yangilandi:", mockProfiles);
  return newProfile;
};

// userId bo'yicha profilni topish funksiyasi
export const getMockProfileById = (fullName: string): UserProfile | undefined => {
  return mockProfiles.find((p) => p.fullName === fullName);
};
