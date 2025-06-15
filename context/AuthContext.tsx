// context/AuthContext.tsx
"use client";

import { UserProfile } from "@/types"; // UserProfile tipini import qiling
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

// Foydalanuvchi tipini aniqlaymiz. Bu sizning loyihangizdagi User modeliga bog'liq.
// Agar sizning User ob'ektingizda 'id' bo'lmasa, uni qo'shing.
interface User {
  id: string; // Foydalanuvchi IDsi
  email: string;
  // Boshqa foydalanuvchi ma'lumotlari...
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null; // Foydalanuvchi ob'ekti
  isLoading: boolean; // Autentifikatsiya holati yuklanayotganini bildiradi
  login: (credentials: { email: string; password: string }) => boolean; // `any` dan qochish uchun aniq tip
  logout: () => void;
  // YANGI: fetchUserProfile funksiyasini qo'shamiz
  fetchUserProfile: (userId: string) => Promise<UserProfile | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Local storagedan token yoki user ma'lumotlarini yuklash
    const storedToken = localStorage.getItem("userToken");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setIsLoggedIn(true);
        setUser(parsedUser);
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        logout(); // Agar xato bo'lsa, foydalanuvchini tizimdan chiqarish
      }
    }
    setIsLoading(false);
  }, []);

  const login = (credentials: { email: string; password: string }): boolean => {
    // Bu yerda haqiqiy login logikasi bo'ladi (API chaqiruvi orqali)
    // Hozircha oddiy, qattiq kodlangan tekshiruv
    if (credentials.email === "user@example.com" && credentials.password === "password123") {
      const loggedInUser: User = { id: "user-123", email: credentials.email }; // Foydalanuvchi IDsi kerak
      localStorage.setItem("userToken", "valid-user-token");
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      setIsLoggedIn(true);
      setUser(loggedInUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  // YANGI: fetchUserProfile funksiyasi
  const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
    // Bu yerda foydalanuvchi profilini backend API'dan yuklash logikasi bo'ladi
    // Hozircha oddiy misol ma'lumotlari:
    console.log(`Foydalanuvchi profilini yuklash: ${userId}`);
    try {
      // Haqiqiy loyihada bu yerda axios yoki fetch yordamida backend API chaqiruvi bo'ladi
      // const response = await fetch(`/api/users/${userId}/profile`);
      // const data = await response.json();
      // return data.profile;

      // Vaqtinchalik mock data:
      const mockProfile: UserProfile = {
        id: userId,
        email: user?.email || "user@example.com", // Userdan emailni olish
        fullName: "Alijon Valiyev",
        age: 28,
        experienceYears: 5,
        education: "Bakalavr, Kompyuter injeneringi",
        phone: "+998901234567",
        telegram: "@alijon_v",
        linkedin: "https://linkedin.com/in/alijon",
        aboutMe:
          "Men dasturlash sohasida 5 yillik tajribaga ega bo'lgan dasturchiman. React, Next.js va Node.js texnologiyalarida mutaxassislashganman.",
        skills: ["React", "Next.js", "Node.js", "JavaScript", "TypeScript", "SQL"],
        desiredPosition: "Full-stack Developer",
        expectedSalary: "1000 USD",
        preferredProvince: "Toshkent shahri",
        preferredDistrict: "Chilonzor tumani",
        readyToRelocate: false,
        profilePictureUrl: "https://via.placeholder.com/150/0000FF/FFFFFF?text=AV", // Test rasmi
        resumeUrl: "https://www.africau.edu/images/default/sample.pdf", // Test rezyume
      };
      return mockProfile;
    } catch (error) {
      console.error("Profilni yuklashda xatolik:", error);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, isLoading, login, logout, fetchUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
