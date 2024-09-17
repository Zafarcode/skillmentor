import SimilarFilm from "@/components/tv/similar-tv";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { tv } from "@/mock";
import { Tv } from "@/types";

import { ClockIcon, HeartIcon, ListIcon, PlayIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FilmsDetail = ({ params: { slug } }: { params: { slug: string } }) => {
  const selectedTV = tv.find((tv) => tv.slug === slug) as Tv;

  return (
    <main className="pt-28">
      <section
        className="pt-14 mt-[-115px] mb-20 pb-[84px] w-full"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${selectedTV?.poster})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <Link className=" flex gap-2 mb-10 text-white" href="/tv">
            <span className="text-3xl">&#8636;</span>
            <p className="text-2xl font-bold">Ortga</p>
          </Link>

          <div className="mb-16 grid grid-cols-1 md:grid-cols-2 items-center relative z-10">
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src={selectedTV?.poster || "/default-poster.png"}
                alt={selectedTV.title}
                width={400}
                height={600}
                className="w-72 h-auto object-cover"
                style={{ aspectRatio: "400/600", objectFit: "cover" }}
              />
              <Button variant="ghost" className="absolute top-1 left-[245px] text-white p-2 rounded-full">
                <PlayIcon className="w-6 h-6" />
              </Button>
            </div>
            <div className=" space-y-4 xl:ml-[-340px] lg:ml-[-150px] sm:ml-0 md:ml-0 mb-10">
              <h1 className="text-3xl font-bold text-white">{selectedTV.title}</h1>
              <div className="flex items-center gap-2">
                <StarIcon className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-white">{selectedTV.rating}</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <ListIcon className="w-5 h-5" />
                <span>{selectedTV.categories.join(",")}</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <ClockIcon className="w-5 h-5" />
                <span>142 min</span>
              </div>
              <div>
                <span className="font-bold text-white">Batafsil</span>
              </div>
              <div className="prose text-white">
                <p>{selectedTV.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center">
                  <Button
                    variant="outline"
                    className="px-4 py-2 bg-sky-400 text-white font-bold border-none rounded-md flex items-center space-x-2 p-6"
                  >
                    <span>Treylerni korish</span>
                    <PlayIcon className="text-white fill-white w-5 h-5" />
                  </Button>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="px-4 py-2 bg-transparent text-white font-bold border-white rounded-md flex items-center space-x-2 p-6"
                    >
                      <span>Sevimli</span>
                      <HeartIcon className="text-white fill-white w-5 h-5" />
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
      </section>

      <div className="container">
        <div>
          <h2 className="font-bold text-3xl mb-16">O&apos;xshash filmlar</h2>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {tv.map((tv) => (
              <SimilarFilm key={tv.id} {...tv} />
            ))}
          </section>
        </div>
      </div>
    </main>
  );
};

export default FilmsDetail;
