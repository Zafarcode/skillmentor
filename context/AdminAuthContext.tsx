// context/AdminAuthContext.tsx
"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface AdminAuthContextType {
  isAdminLoggedIn: boolean;
  isLoadingAdmin: boolean;
  adminLogin: (credentials: { username: string; password: string }) => boolean;
  adminLogout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoadingAdmin, setIsLoadingAdmin] = useState(true);

  // .env faylidan admin credentials (ishlab chiqarishda server-side API orqali olish tavsiya etiladi)
  const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  useEffect(() => {
    // Sahifa yuklanganda localstoragedan admin kirganligini tekshirish
    const token = localStorage.getItem("adminToken");
    if (token === "valid-admin-token") {
      // Bu token sizning haqiqiy admin login logic'ingizga bog'liq bo'lishi kerak
      setIsAdminLoggedIn(true);
    }
    setIsLoadingAdmin(false);
  }, []);

  const adminLogin = ({ username, password }: { username: string; password: string }): boolean => {
    // .env faylidan olingan admin ma'lumotlari bilan taqqoslash
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem("adminToken", "valid-admin-token"); // Oddiy token saqlash
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAdminLoggedIn(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAdminLoggedIn, isLoadingAdmin, adminLogin, adminLogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
