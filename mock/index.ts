export const navList: { id: number; label: string; href: string }[] = [
  {
    id: 1,
    label: "Bosh sahifa",
    href: "/",
  },
  // {
  //   id: 2,
  //   label: "TV",
  //   href: "/tv",
  // },
  // {
  //   id: 3,
  //   label: "Filmlar",
  //   href: "/films",
  // },
  // {
  //   id: 4,
  //   label: "Seriallar",
  //   href: "/series",
  // },
  // {
  //   id: 5,
  //   label: "Multfilmlar",
  //   href: "/multfilms",
  // },
  // {
  //   id: 6,
  //   label: "Anime",
  //   href: "/anime",
  // },
  // {
  //   id: 6,
  //   label: "Music",
  //   href: "/music",
  // },
];


export const serials: {
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
    title: "Breaking Bad",
    slug: "breaking-bad",
    poster: "/amir.png",
    rating: 9.5,
    year: 2008,
    categories: ["Crime", "Drama", "Thriller"],
    description:
      "A high school chemistry teacher turned methamphetamine producer navigates the dangers of the drug trade while trying to secure his family's future.",
  },
  {
    id: 2,
    title: "Game of Thrones",
    slug: "game-of-thrones",
    poster: "/amir.png",
    rating: 9.3,
    year: 2011,
    categories: ["Action", "Adventure", "Drama"],
    description:
      "Nine noble families wage war against each other to gain control over the mythical land of Westeros.",
  },
  {
    id: 3,
    title: "Stranger Things",
    slug: "stranger-things",
    poster: "/amir.png",
    rating: 8.7,
    year: 2016,
    categories: ["Drama", "Fantasy", "Horror"],
    description:
      "A group of young friends in a small town encounter terrifying supernatural forces and secret government experiments.",
  },
  {
    id: 4,
    title: "The Mandalorian",
    slug: "the-mandalorian",
    poster: "/amir.png",
    rating: 8.8,
    year: 2019,
    categories: ["Action", "Adventure", "Sci-Fi"],
    description:
      "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
  },
  {
    id: 5,
    title: "Sherlock",
    slug: "sherlock",
    poster: "/amir.png",
    rating: 9.1,
    year: 2010,
    categories: ["Crime", "Drama", "Mystery"],
    description:
      "A modern update finds the famous sleuth and his doctor partner solving crime in 21st-century London.",
  },
  {
    id: 6,
    title: "Friends",
    slug: "friends",
    poster: "/amir.png",
    rating: 8.9,
    year: 1994,
    categories: ["Comedy", "Romance"],
    description:
      "Follows the personal and professional lives of six twenty to thirty-something friends living in Manhattan.",
  },
  {
    id: 7,
    title: "The Office",
    slug: "the-office",
    poster: "/amir.png",
    rating: 8.9,
    year: 2005,
    categories: ["Comedy"],
    description:
      "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.",
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
  {
    id: 6,
    title: "The Matrix",
    slug: "the-matrix",
    poster: "/image.png",
    rating: 8.7,
    year: 1999,
    categories: ["Action", "Sci-Fi"],
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
  },
  {
    id: 7,
    title: "The Lord of the Rings: The Two Towers",
    slug: "the-lord-of-the-rings-the-two-towers",
    poster: "/image.png",
    rating: 8.7,
    year: 2002,
    categories: ["Adventure", "Fantasy"],
    description: "The sequel to The Lord of the Rings: The Fellowship of the Ring and The Two Towers.",
  },
  {
    id: 6,
    title: "The Matrix",
    slug: "the-matrix",
    poster: "/image.png",
    rating: 8.7,
    year: 1999,
    categories: ["Action", "Sci-Fi"],
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
  },
  {
    id: 7,
    title: "The Lord of the Rings: The Two Towers",
    slug: "the-lord-of-the-rings-the-two-towers",
    poster: "/image.png",
    rating: 8.7,
    year: 2002,
    categories: ["Adventure", "Fantasy"],
    description: "The sequel to The Lord of the Rings: The Fellowship of the Ring and The Two Towers.",
  },
  {
    id: 6,
    title: "The Matrix",
    slug: "the-matrix",
    poster: "/image.png",
    rating: 8.7,
    year: 1999,
    categories: ["Action", "Sci-Fi"],
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
  },
  {
    id: 7,
    title: "The Lord of the Rings: The Two Towers",
    slug: "the-lord-of-the-rings-the-two-towers",
    poster: "/image.png",
    rating: 8.7,
    year: 2002,
    categories: ["Adventure", "Fantasy"],
    description: "The sequel to The Lord of the Rings: The Fellowship of the Ring and The Two Towers.",
  },
  {
    id: 6,
    title: "The Matrix",
    slug: "the-matrix",
    poster: "/image.png",
    rating: 8.7,
    year: 1999,
    categories: ["Action", "Sci-Fi"],
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
  },
  {
    id: 7,
    title: "The Lord of the Rings: The Two Towers",
    slug: "the-lord-of-the-rings-the-two-towers",
    poster: "/image.png",
    rating: 8.7,
    year: 2002,
    categories: ["Adventure", "Fantasy"],
    description: "The sequel to The Lord of the Rings: The Fellowship of the Ring and The Two Towers.",
  },
  {
    id: 6,
    title: "The Matrix",
    slug: "the-matrix",
    poster: "/image.png",
    rating: 8.7,
    year: 1999,
    categories: ["Action", "Sci-Fi"],
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
  },
  {
    id: 7,
    title: "The Lord of the Rings: The Two Towers",
    slug: "the-lord-of-the-rings-the-two-towers",
    poster: "/image.png",
    rating: 8.7,
    year: 2002,
    categories: ["Adventure", "Fantasy"],
    description: "The sequel to The Lord of the Rings: The Fellowship of the Ring and The Two Towers.",
  },
  {
    id: 6,
    title: "The Matrix",
    slug: "the-matrix",
    poster: "/image.png",
    rating: 8.7,
    year: 1999,
    categories: ["Action", "Sci-Fi"],
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
  },
  {
    id: 7,
    title: "The Lord of the Rings: The Two Towers",
    slug: "the-lord-of-the-rings-the-two-towers",
    poster: "/image.png",
    rating: 8.7,
    year: 2002,
    categories: ["Adventure", "Fantasy"],
    description: "The sequel to The Lord of the Rings: The Fellowship of the Ring and The Two Towers.",
  },
  {
    id: 6,
    title: "The Matrix",
    slug: "the-matrix",
    poster: "/image.png",
    rating: 8.7,
    year: 1999,
    categories: ["Action", "Sci-Fi"],
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
  },
  {
    id: 7,
    title: "The Lord of the Rings: The Two Towers",
    slug: "the-lord-of-the-rings-the-two-towers",
    poster: "/image.png",
    rating: 8.7,
    year: 2002,
    categories: ["Adventure", "Fantasy"],
    description: "The sequel to The Lord of the Rings: The Fellowship of the Ring and The Two Towers.",
  },
  {
    id: 6,
    title: "The Matrix",
    slug: "the-matrix",
    poster: "/image.png",
    rating: 8.7,
    year: 1999,
    categories: ["Action", "Sci-Fi"],
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
  },
  {
    id: 7,
    title: "The Lord of the Rings: The Two Towers",
    slug: "the-lord-of-the-rings-the-two-towers",
    poster: "/image.png",
    rating: 8.7,
    year: 2002,
    categories: ["Adventure", "Fantasy"],
    description: "The sequel to The Lord of the Rings: The Fellowship of the Ring and The Two Towers.",
  },
  {
    id: 6,
    title: "The Matrix",
    slug: "the-matrix",
    poster: "/image.png",
    rating: 8.7,
    year: 1999,
    categories: ["Action", "Sci-Fi"],
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
  },
];

export const anime: {
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
    poster: "/anime.jpg",
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
    poster: "/anime.jpg",
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
    poster: "/anime.jpg",
    rating: 9.0,
    year: 2008,
    categories: ["Action", "Crime", "Drama"],
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  },
  {
    id: 3,
    title: "The Dark Knight",
    slug: "the-dark-knight",
    poster: "/anime.jpg",
    rating: 9.0,
    year: 2008,
    categories: ["Action", "Crime", "Drama"],
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  },
  {
    id: 3,
    title: "The Dark Knight",
    slug: "the-dark-knight",
    poster: "/anime.jpg",
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
    poster: "/anime.jpg",
    rating: 8.8,
    year: 2010,
    categories: ["Action", "Sci-Fi", "Thriller"],
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea in the mind of a CEO.",
  },
  {
    id: 4,
    title: "Inception",
    slug: "inception",
    poster: "/anime.jpg",
    rating: 8.8,
    year: 2010,
    categories: ["Action", "Sci-Fi", "Thriller"],
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea in the mind of a CEO.",
  },
  {
    id: 4,
    title: "Inception",
    slug: "inception",
    poster: "/anime.jpg",
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
    poster: "/anime.jpg",
    rating: 8.8,
    year: 2001,
    categories: ["Adventure", "Fantasy"],
    description:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
  },
  {
    id: 5,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    slug: "the-lord-of-the-rings-the-fellowship-of-the-ring",
    poster: "/anime.jpg",
    rating: 8.8,
    year: 2001,
    categories: ["Adventure", "Fantasy"],
    description:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
  },
  {
    id: 5,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    slug: "the-lord-of-the-rings-the-fellowship-of-the-ring",
    poster: "/anime.jpg",
    rating: 8.8,
    year: 2001,
    categories: ["Adventure", "Fantasy"],
    description:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
  },
];



export const multfilms: {
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
    poster: "/dragons.png",
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
    poster: "/dragons.png",
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
    poster: "/dragons.png",
    rating: 9.0,
    year: 2008,
    categories: ["Action", "Crime", "Drama"],
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  },
  {
    id: 3,
    title: "The Dark Knight",
    slug: "the-dark-knight",
    poster: "/dragons.png",
    rating: 9.0,
    year: 2008,
    categories: ["Action", "Crime", "Drama"],
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  },
  {
    id: 3,
    title: "The Dark Knight",
    slug: "the-dark-knight",
    poster: "/dragons.png",
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
    poster: "/dragons.png",
    rating: 8.8,
    year: 2010,
    categories: ["Action", "Sci-Fi", "Thriller"],
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea in the mind of a CEO.",
  },
  {
    id: 4,
    title: "Inception",
    slug: "inception",
    poster: "/dragons.png",
    rating: 8.8,
    year: 2010,
    categories: ["Action", "Sci-Fi", "Thriller"],
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea in the mind of a CEO.",
  },
  {
    id: 4,
    title: "Inception",
    slug: "inception",
    poster: "/dragons.png",
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
    poster: "/dragons.png",
    rating: 8.8,
    year: 2001,
    categories: ["Adventure", "Fantasy"],
    description:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
  },
  {
    id: 5,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    slug: "the-lord-of-the-rings-the-fellowship-of-the-ring",
    poster: "/dragons.png",
    rating: 8.8,
    year: 2001,
    categories: ["Adventure", "Fantasy"],
    description:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
  },
  {
    id: 5,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    slug: "the-lord-of-the-rings-the-fellowship-of-the-ring",
    poster: "/dragons.png",
    rating: 8.8,
    year: 2001,
    categories: ["Adventure", "Fantasy"],
    description:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
  },
];




export const music: {
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
    poster: "/music.jpeg",
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
    poster: "/music.jpeg",
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
    poster: "/music.jpeg",
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
    poster: "/music.jpeg",
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
    poster: "/music.jpeg",
    rating: 8.8,
    year: 2001,
    categories: ["Adventure", "Fantasy"],
    description:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
  },
  {
    id: 6,
    title: "The Matrix",
    slug: "the-matrix",
    poster: "/music.jpeg",
    rating: 8.7,
    year: 1999,
    categories: ["Action", "Sci-Fi"],
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
  },
  {
    id: 7,
    title: "The Lord of the Rings: The Two Towers",
    slug: "the-lord-of-the-rings-the-two-towers",
    poster: "/music.jpeg",
    rating: 8.7,
    year: 2002,
    categories: ["Adventure", "Fantasy"],
    description: "The sequel to The Lord of the Rings: The Fellowship of the Ring and The Two Towers.",
  },
];

export const tv: {
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
    poster: "/tv.jpg",
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
    poster: "/tv.jpg",
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
    poster: "/tv.jpg",
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
    poster: "/tv.jpg",
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
    poster: "/tv.jpg",
    rating: 8.8,
    year: 2001,
    categories: ["Adventure", "Fantasy"],
    description:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
  },
  {
    id: 6,
    title: "The Matrix",
    slug: "the-matrix",
    poster: "/tv.jpg",
    rating: 8.7,
    year: 1999,
    categories: ["Action", "Sci-Fi"],
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
  },
  {
    id: 7,
    title: "The Lord of the Rings: The Two Towers",
    slug: "the-lord-of-the-rings-the-two-towers",
    poster: "/tv.jpg",
    rating: 8.7,
    year: 2002,
    categories: ["Adventure", "Fantasy"],
    description: "The sequel to The Lord of the Rings: The Fellowship of the Ring and The Two Towers.",
  },
];



