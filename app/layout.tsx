import RootProvider from "@/components/global/provider";
import SiteHeader from "@/components/global/site-header";
import "@/styles/globals.css";
import { baseURL, createMetadata } from "@/utils/metadata";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

// Autentifikatsiya provayderlarini import qilish
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import { AuthProvider } from "@/context/AuthContext";

// 'sonner' importini olib tashlash
// import { Toaster } from "sonner"; // <-- Bu qatorni o'chiramiz

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = createMetadata({
  title: {
    template: "%s | SkillMentor - Vakansiyalar Platformasi",
    default:
      "SkillMentor - O'zbekistondagi eng yaxshi vakansiyalar platformasi, malakali kadrlar uchun eng yaxshi ish takliflari.",
  },
  description:
    "SkillMentor - O'zbekistondagi eng yaxshi vakansiyalar platformasi, malakali kadrlar uchun eng yaxshi ish takliflari.",
  metadataBase: baseURL,
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "black" },
    { media: "(prefers-color-scheme: light)", color: "white" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const NAVBAR_HEIGHT = 80;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <RootProvider>
          <AuthProvider>
            <AdminAuthProvider>
              <SiteHeader />
              <div style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}>{children}</div>
            </AdminAuthProvider>
          </AuthProvider>
        </RootProvider>
        {/* <Toaster position="top-right" richColors /> */} {/* <-- Bu qatorni ham o'chiramiz */}
      </body>
    </html>
  );
}
