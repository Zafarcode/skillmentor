import RootProvider from "@/components/global/provider";
import "@/styles/globals.css";
import { baseURL, createMetadata } from "@/utils/metadata";
import { Viewport } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = createMetadata({
  title: {
    template: "%s | CinemTube - Media Platform",
    default:
      "CinemaTube is your go-to platform for streaming the latest movies, series, and exclusive content, all in one place.",
  },
  description:
    "CinemaTube is your go-to platform for streaming the latest movies, series, and exclusive content, all in one place.",
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
