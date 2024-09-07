export const navList: { id: number; label: string; href: string }[] = [
  {
    id: 1,
    label: "Bosh sahifa",
    href: "/",
  },
  {
    id: 2,
    label: "TV",
    href: "/tv",
  },
  {
    id: 3,
    label: "Filmlar",
    href: "/films",
  },
  {
    id: 4,
    label: "Seriallar",
    href: "/series",
  },
  {
    id: 5,
    label: "Multfilmlar",
    href: "/multfilms",
  },
  {
    id: 6,
    label: "Anime",
    href: "/anime",
  },
];

export const films: {
  id: number;
  title: string;
  slug: string;
  poster: string;
  rating: number;
  year: number;
  categories: string[];
  description: string;
}[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    slug: "the-shawshank-redemption",
    poster: "/image.png",
    rating: 9.3,
    year: 1994,
    categories: ["Drama", "Crime"],
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  },
  {
    id: 2,
    title: "The Godfather",
    slug: "the-godfather",
    poster: "/image.png",
    rating: 9.2,
    year: 1972,
    categories: ["Drama", "Crime"],
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
  },
  {
    id: 3,
    title: "The Dark Knight",
    slug: "the-dark-knight",
    poster: "/image.png",
    rating: 9.0,
    year: 2008,
    categories: ["Action", "Crime", "Drama"],
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  },
  {
    id: 4,
    title: "Inception",
    slug: "inception",
    poster: "/image.png",
    rating: 8.8,
    year: 2010,
    categories: ["Action", "Sci-Fi", "Thriller"],
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea in the mind of a CEO.",
  },
  {
    id: 5,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    slug: "the-lord-of-the-rings-the-fellowship-of-the-ring",
    poster: "/image.png",
    rating: 8.8,
    year: 2001,
    categories: ["Adventure", "Fantasy"],
    description:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
  },
];
