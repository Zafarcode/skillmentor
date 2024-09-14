import SimilarTv from "@/components/tv/similar-tv";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { tv } from "@/mock";
import { Film } from "@/types";

import { ClockIcon, HeartIcon, ListIcon, MoveLeftIcon, PlayIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TvDetail = ({ params: { slug } }: { params: { slug: string } }) => {
  const selectedtv = tv.find((tv) => tv.slug === slug) as Film;

  return (
    <main className="pt-28">
      <div className="container">
        <Link className="flex gap-2 mb-5" href="/tv">
          <MoveLeftIcon />

          <p>Ortga</p>
        </Link>

        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src={selectedtv?.poster}
              alt={selectedtv.title}
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
            <h1 className="text-3xl font-bold ">{selectedtv.title}</h1>
            <div className="flex items-center gap-2 ">
              <StarIcon className="w-5 h-5 fill-primary" />
              <span>{selectedtv.rating}</span>
            </div>
            <div className="flex items-center gap-2 ">
              <ListIcon className="w-5 h-5" />
              <span>{selectedtv.categories.join(",")}</span>
            </div>
            <div className="flex items-center gap-2 ">
              <ClockIcon className="w-5 h-5" />
              <span>142 min</span>
            </div>
            <div>
              <span className="font-bold">Batafsil</span>
            </div>
            <div className="prose">
              <p>{selectedtv.description}</p>
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
                    <p>Sevimliga qoshish</p>
                  </TooltipContent>
                </TooltipTrigger>
              </Tooltip>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-16">O&apos;xshash Tv</h2>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {tv.map((tv) => (
              <SimilarTv key={tv.id} {...tv} />
            ))}
          </section>
        </div>
      </div>
    </main>
  );
};

export default TvDetail;
