// lib/storage.ts
import { LocalApplication, UserProfile, Vacancy } from "@/types"; // UserProfile'ni ham import qiling

const VACANCIES_STORAGE_KEY = "vacancies_data";
const APPLICATIONS_STORAGE_KEY = "applications_data";
const USER_PROFILE_STORAGE_KEY = "user_profile_data"; // Yangi kalit

export const getVacancies = (): Vacancy[] => {
  if (typeof window === "undefined") {
    return [];
  }
  const storedData = localStorage.getItem(VACANCIES_STORAGE_KEY);
  try {
    return storedData ? JSON.parse(storedData) : [];
  } catch (e) {
    console.error("Error parsing vacancies from localStorage", e);
    return [];
  }
};

export const saveVacancies = (vacancies: Vacancy[]): void => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(VACANCIES_STORAGE_KEY, JSON.stringify(vacancies));
};

export const getApplications = (): LocalApplication[] => {
  if (typeof window === "undefined") {
    return [];
  }
  const storedData = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
  try {
    return storedData ? JSON.parse(storedData) : [];
  } catch (e) {
    console.error("Error parsing applications from localStorage", e);
    return [];
  }
};

export const saveApplications = (applications: LocalApplication[]): void => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(applications));
};

// YANGI FUNKSIYALAR: Profil ma'lumotlarini saqlash va olish
export const getProfileData = (userId: string): UserProfile | null => {
  if (typeof window === "undefined") {
    return null;
  }
  const storedData = localStorage.getItem(`${USER_PROFILE_STORAGE_KEY}_${userId}`);
  try {
    return storedData ? JSON.parse(storedData) : null;
  } catch (e) {
    console.error("Error parsing profile data from localStorage", e);
    return null;
  }
};

export const saveProfileData = (userId: string, profile: UserProfile): void => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(`${USER_PROFILE_STORAGE_KEY}_${userId}`, JSON.stringify(profile));
};
