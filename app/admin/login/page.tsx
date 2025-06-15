// app/admin/login/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AdminLoginPage: React.FC = () => {
  // Foydalanuvchi kiritadigan qiymatlar uchun useState
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { adminLogin, isAdminLoggedIn, isLoadingAdmin } = useAdminAuth(); // isLoadingAdmin ham kerak bo'lishi mumkin
  const router = useRouter();

  // isLoadingAdmin holatini kuzatish va foydalanuvchi kirgan bo'lsa yo'naltirish
  useEffect(() => {
    if (!isLoadingAdmin && isAdminLoggedIn) {
      router.push("/admin/dashboard");
    }
  }, [isAdminLoggedIn, isLoadingAdmin, router]);

  // Agar yuklanish tugagan va admin kirgan bo'lsa, bu komponentni render qilmaslik
  if (isLoadingAdmin || isAdminLoggedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p>Yuklanmoqda...</p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Iltimos, username va parolni kiriting.");
      return;
    }

    // AdminLogin funksiyasiga foydalanuvchi kiritgan ma'lumotlarni uzatish
    // Bu yerda useAdminAuth ichidagi adminLogin funksiyasi .env dagi ma'lumotlar bilan tekshirishi kerak
    const success = adminLogin({ username, password });

    if (!success) {
      setError("Username yoki parol noto'g'ri.");
    }
    // Agar success true bo'lsa, useEffect orqali yo'naltirish avtomatik amalga oshadi
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Admin Kirish</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username">Username</label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Admin username"
                className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <label htmlFor="password">Parol</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin parol"
                className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Kirish
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
