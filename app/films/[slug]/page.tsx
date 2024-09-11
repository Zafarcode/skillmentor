import SimilarFilm from "@/components/film/similar-film";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { films } from "@/mock";
import { Film } from "@/types";

import { ClockIcon, HeartIcon, ListIcon, PlayIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FilmsDetail = ({ params: { slug } }: { params: { slug: string } }) => {
  const selectedFilm = films.find((film) => film.slug === slug) as Film;

  return (
    <main className="pt-28">
      <div className="container">
        <div
          className="relative bg-cover bg-center bg-no-repeat p-5 mb-20 rounded-xl overflow-hidden"
          style={{
            backgroundImage: `url(${selectedFilm?.poster || "/default-poster.png"})`,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>

          <Link className="relative flex gap-2 mb-10 text-white" href="/films">
            <span className="text-3xl">&#8636;</span>
            <p className="text-2xl font-bold">Ortga</p>
          </Link>

          <div className="mb-16 grid grid-cols-1 md:grid-cols-2 items-center relative z-10">
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src={selectedFilm?.poster || "/default-poster.png"}
                alt={selectedFilm.title}
                width={400}
                height={600}
                className="w-72 h-auto object-cover"
                style={{ aspectRatio: "400/600", objectFit: "cover" }}
              />
              <Button variant="ghost" className="absolute top-1 left-[245px] text-white p-2 rounded-full">
                <PlayIcon className="w-6 h-6" />
              </Button>
            </div>
            <div className="relative space-y-4 xl:ml-[-340px] lg:ml-[-150px] sm:ml-0 md:ml-0 mb-10">
              <h1 className="text-3xl font-bold text-white">{selectedFilm.title}</h1>
              <div className="flex items-center gap-2">
                <StarIcon className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-white">{selectedFilm.rating}</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <ListIcon className="w-5 h-5" />
                <span>{selectedFilm.categories.join(",")}</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <ClockIcon className="w-5 h-5" />
                <span>142 min</span>
              </div>
              <div>
                <span className="font-bold text-white">Batafsil</span>
              </div>
              <div className="prose text-white">
                <p>{selectedFilm.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center">
                  <Button
                    variant="outline"
                    className="px-4 py-2 bg-sky-400 text-black border-none rounded-md flex items-center space-x-2"
                  >
                    <span>Treylerni korish</span>
                    <div className="w-6 h-6 bg-white flex items-center justify-center rounded-full">
                      <PlayIcon className="text-sky-600 fill-sky-600 w-4 h-4" />
                    </div>
                  </Button>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="px-4 py-2 bg-red-400 border-none text-black rounded-md flex items-center space-x-2"
                    >
                      <span>Sevimli</span>
                      <div className="w-6 h-6 bg-gray-300 flex items-center justify-center rounded-full">
                        <HeartIcon className="w-4 h-4 text-red-600 fill-red-600" />
                      </div>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="w-40 absolute right-0 bottom-1">
                    <p>Sevimliga qo&apos;shish</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-bold text-3xl mb-16">O&apos;xshash filmlar</h2>

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
