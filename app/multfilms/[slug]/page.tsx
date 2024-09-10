import { Button } from "@/components/ui/button";
import { multfilm } from "@/mock";
import { Multfilm } from "@/types";
import { ClockIcon, ListIcon, PlayIcon, StarIcon } from "lucide-react";
import Image from "next/image";

const MultfilmsDetail = ({ params: { slug } }: { params: { slug: string } }) => {
  const selectedFilm = multfilm.find((mult) => mult.slug === slug) as Multfilm;

  return (
    <main className="pt-28">
      <div className="container">
                <h1 className="">Multfilmlar
                </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src={selectedFilm?.poster}
              alt={selectedFilm.title}
              width={600}
              height={600}
              className="w-full h-auto object-cover"
              style={{ aspectRatio: "600/600", objectFit: "cover" }}
            />
            <Button variant="ghost" className="absolute top-2 right-2 text-white p-2 rounded-full ">
              <PlayIcon className="w-6 h-6" />
            </Button>
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white">{selectedFilm.title}</h1>
            <div className="flex items-center gap-2 text-white">
              <StarIcon className="w-5 h-5 fill-primary" />
              <span>{selectedFilm.rating}</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <ListIcon className="w-5 h-5" />
              <span>{selectedFilm.categories.join(",")}</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <ClockIcon className="w-5 h-5" />
              <span>142 min</span>
            </div>
            <div className="prose text-white">
              <p>{selectedFilm.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button>Watch Trailer</Button>
              <Button variant="outline">Add to Watchlist</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default  MultfilmsDetail;
