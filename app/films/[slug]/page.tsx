import SimilarFilm from "@/components/film/similar-film";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { films } from "@/mock";
import { Film } from "@/types";

import { ClockIcon, HeartIcon, ListIcon, MoveLeftIcon, PlayIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FilmsDetail = ({ params: { slug } }: { params: { slug: string } }) => {
  const selectedFilm = films.find((film) => film.slug === slug) as Film;

  return (
    <main className="pt-28">
      <div className="container">
        <Link className="flex gap-2 mb-5" href="http://localhost:3000/films">
          <MoveLeftIcon />

          <p>Ortga</p>
        </Link>

        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src={selectedFilm?.poster}
              alt={selectedFilm.title}
              width={400}
              height={600}
              className="w-full h-auto object-cover "
              style={{ aspectRatio: "400/600", objectFit: "cover" }}
            />
            <Button variant="ghost" className="absolute top-2 right-2 text-white p-2 rounded-full ">
              <PlayIcon className="w-6 h-6" />
            </Button>
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold ">{selectedFilm.title}</h1>
            <div className="flex items-center gap-2 ">
              <StarIcon className="w-5 h-5 fill-primary" />
              <span>{selectedFilm.rating}</span>
            </div>
            <div className="flex items-center gap-2 ">
              <ListIcon className="w-5 h-5" />
              <span>{selectedFilm.categories.join(",")}</span>
            </div>
            <div className="flex items-center gap-2 ">
              <ClockIcon className="w-5 h-5" />
              <span>142 min</span>
            </div>
            <div>
              <span className="font-bold">Batafsil</span>
            </div>
            <div className="prose">
              <p>{selectedFilm.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center">
                <Button
                  variant="outline"
                  className="px-4 py-2 bg-gray-200 text-black rounded-md flex items-center space-x-2"
                >
                  <span>Treylerni korish</span>
                  <div className="w-6 h-6 bg-gray-300 flex items-center justify-center rounded-full">
                    <PlayIcon className="text-black w-4 h-4" />
                  </div>
                </Button>
              </div>

              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="outline"
                    className="px-4 py-2 bg-gray-200 text-black rounded-md flex items-center space-x-2"
                  >
                    <span>Sevimli</span>
                    <div className="w-6 h-6 bg-gray-300 flex items-center justify-center rounded-full">
                      <HeartIcon className="w-4 h-4" />
                    </div>
                  </Button>
                  <TooltipContent className="w-40 absolute right-0 bottom-1">
                    <p>Sevimliga qo'shish</p>
                  </TooltipContent>
                </TooltipTrigger>
              </Tooltip>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-16">O'xshash filmlar</h2>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {films.map((film) => (
              <SimilarFilm key={film.id} {...film} />
            ))}
          </section>
        </div>
      </div>
    </main>
  );
};

export default FilmsDetail;
