import type { Metadata } from "next/types";

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? "CinemaTube - Media Platform",
      description:
        override.description ??
        "CinemaTube is your go-to platform for streaming the latest movies, series, and exclusive content, all in one place.",
      url: "https://cinematube.uz",
      images: "https://cinematube.uz/og.png",
      siteName: "CinemaTube",
      ...override.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      creator: "@miracleprogrammer",
      title: override.title ?? "CinemaTube - Media Platform",
      description:
        override.description ??
        "Explore CinemaTube for a wide range of movies, series, and more, tailored to your entertainment needs.",
      images: "https://cinematube.uz/og.png",
      ...override.twitter,
    },
  };
}

export const baseURL =
  process.env.NODE_ENV === "development"
    ? new URL("http://localhost:3000")
    : new URL(`https://${process.env.VERCEL_URL!}`);
