import React from "react";

export type ChildrenProps = {
  children: React.ReactNode;
};

export type Film = {
  id: number;
  title: string;
  slug: string;
  poster: string;
  rating: number;
  categories: string[];
  description: string;
};

export type Multfilm = {
  id: number;
  title: string;
  slug: string;
  poster: string;
  rating: number;
  categories: string[];
  description: string;
};

export type Anime = {
  id: number;
  title: string;
  slug: string;
  poster: string;
  rating: number;
  categories: string[];
  description: string;
};

export type Tv = {
  id: number;
  title: string;
  slug: string;
  poster: string;
  rating: number;
  categories: string[];
  description: string;
};

export type Music = {
  id: number;
  title: string;
  slug: string;
  poster: string;
  rating: number;
  categories: string[];
  description: string;
};
export type Series = {
  id: number;
  title: string;
  slug: string;
  poster: string;
  rating: number;
  categories: string[];
  description: string;
};
