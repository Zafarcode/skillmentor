// app/admin/dashboard/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/context/AdminAuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminDashboardPage: React.FC = () => {
  const { isAdminLoggedIn, isLoadingAdmin, adminLogout } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoadingAdmin && !isAdminLoggedIn) {
      router.push("/admin/login");
    }
  }, [isAdminLoggedIn, isLoadingAdmin, router]);

  if (isLoadingAdmin) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p>Yuklanmoqda...</p>
      </div>
    );
  }

  if (!isAdminLoggedIn) {
    return null; // Yo'naltirishdan keyin render bo'lmasligi uchun
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 flex flex-col items-center px-4">
      <Button onClick={adminLogout} className="bg-red-600 hover:bg-red-700 text-white">
        Chiqish
      </Button>
      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
        <Link href={"/admin/dashboard/vacancy"}>Vacancy</Link>
      </Button>
      <Button className="bg-green-600 hover:bg-green-700 text-white">
        <Link href={"/admin/dashboard/profile"}>Profile</Link>
      </Button>
    </div>
  );
};

export default AdminDashboardPage;
