import React from 'react'

export type ChildrenProps = {
	children: React.ReactNode
}


export type Film = {
  id: number;
  title: string;
  slug: string;
  poster: string;
  rating: number;
  categories: string[];
  description: string;
};