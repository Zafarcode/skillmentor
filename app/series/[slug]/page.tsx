import SimilarSeria from "@/components/seria/similar-seria";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { serials } from "@/mock";
import { Series } from "@/types";
import { ClockIcon, HeartIcon, ListIcon, PlayIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SeriaDetail = ({ params: { slug } }: { params: { slug: string } }) => {
  const selectedSeria = serials.find((seria) => seria.slug === slug) as Series;

  if (!selectedSeria) {
    return <p>Film topilmadi</p>;
  }

  return (
    <main className="pt-28">
      <div
        className="pt-14 mt-[-115px] mb-20 pb-[84px] w-full"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${selectedSeria?.poster})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "98.75vw",
          height: "100vh",
        }}
      >
        <div className="container">
          <Link className="relative inline-flex gap-2 mb-10 text-white" href="/series">
            <span className="text-3xl">&#8636;</span>
            <p className="text-xl font-medium">Ortga</p>
          </Link>
          <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src={selectedSeria?.poster}
                alt={selectedSeria.title}
                width={450} 
                height={550}
                priority
                className="object-cover rounded-lg" 
              />
              <Button variant="ghost" className="absolute top-2 right-2 text-white p-2 rounded-full">
                <PlayIcon className="w-6 h-6" />
              </Button>
            </div>
            <div className="flex flex-col gap-8 text-white">
              <h1 className="text-3xl font-bold">{selectedSeria.title}</h1>
              <div className="flex items-center gap-2">
                <StarIcon className="w-5 h-5 fill-primary" />
                <span>{selectedSeria.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5" />
                <span>142 min</span>
              </div>
              <div className="prose">
                <span className="font-bold">Batafsil:</span>
                <p>{selectedSeria.description}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <ListIcon className="w-5 h-5" />
                <span>{selectedSeria.categories.join(", ")}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center">
                  <Button
                    variant="outline"
                    className="px-4 py-4 bg-sky-400 text-black border-none rounded-md flex items-center space-x-2"
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
                      className="px-4 py-2 bg-transparent text-white font-bold rounded-md flex items-center space-x-2 group"
                    >
                      <span>Sevimli</span>
                      <HeartIcon className="text-white w-5 h-5 group-hover:text-red-500 group-hover:fill-red-500" />
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
      </div>
      <div className="container">
        <h2 className="font-bold text-2xl mb-[30px]">O&apos;xshash seriallar</h2>
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {serials.map((seria) => (
            <SimilarSeria key={seria.id} {...seria} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default SeriaDetail;
