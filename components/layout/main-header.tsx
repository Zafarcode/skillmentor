// components/layout/main-header.tsx
"use client";

import Link from "next/link";
// import { ThemeToggle } from "@/components/ui/theme-toggle"; // <-- Bu qatorni o'chiramiz
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useAuth } from "@/context/AuthContext";

const NAVBAR_HEIGHT = 80;

const MainHeader = () => {
  const { isLoggedIn, logout } = useAuth();
  const { isAdminLoggedIn, adminLogout } = useAdminAuth();

  return (
    <header
      className="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-black text-black dark:text-white border-b border-gray-200 dark:border-gray-800 z-50 shadow-md"
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      <div className="flex items-center gap-6">
        <Link href="/" className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
          SkillMentor
        </Link>
        <Link
          href="/"
          className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors text-lg"
        >
          Vakansiyalar
        </Link>
        {isLoggedIn && (
          <Link
            href="/profile"
            className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors text-lg"
          >
            Profil
          </Link>
        )}
        {/* Yangi: Admin Panel linki */}
        {isAdminLoggedIn && (
          <Link
            href="/admin/dashboard"
            className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors text-lg font-bold"
          >
            Admin Panel
          </Link>
        )}
      </div>
      <nav className="flex items-center gap-4">
        {/* <ThemeToggle /> */} {/* <-- Bu qatorni o'chiramiz */}
        {isAdminLoggedIn ? (
          <Button onClick={adminLogout} className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md">
            Admin Chiqish
          </Button>
        ) : isLoggedIn ? (
          <Button onClick={logout} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md">
            Chiqish
          </Button>
        ) : (
          <Link href="/login">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md">Kirish</Button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default MainHeader;
