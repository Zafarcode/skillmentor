import SimilarMultfilm from "@/components/multfilm/similar-multfilm";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { multfilms } from "@/mock";
import { Multfilm } from "@/types";
import { ClockIcon, HeartIcon, ListIcon, PlayIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MultfilmsDetail = ({ params: { slug } }: { params: { slug: string } }) => {
  const selectedFilm = multfilms.find((mult) => mult.slug === slug) as Multfilm;

  if (!selectedFilm) {
    return <p>Film topilmadi</p>;
  }

  return (
<main className="pt-28">
<div
  className="pt-14 mt-[-115px] mb-20 pb-[84px] w-full"
  style={{
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${selectedFilm?.poster})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "98.75vw",
    height: "100vh",
  }}
>
  <div className="container">
    <Link className="relative inline-flex gap-2 mb-10 text-white" href="/multfilms">
      <span className="text-3xl">&#8636;</span>
      <p className="text-xl font-medium">Ortga</p>
    </Link>
    <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
      <div className="relative rounded-lg overflow-hidden">
        <Image
          src={selectedFilm?.poster}
          alt={selectedFilm.title}
          width={450} // Kenglikni 450 ga o'rnatish
          height={550} // Balandlikni 550 ga o'rnatish
          priority
          className="object-cover rounded-lg" // Aniq o'lchamlarni berish
        />
        <Button variant="ghost" className="absolute top-2 right-2 text-white p-2 rounded-full">
          <PlayIcon className="w-6 h-6" />
        </Button>
      </div>
      <div className="flex flex-col gap-8 text-white">
        <h1 className="text-3xl font-bold">{selectedFilm.title}</h1>
        <div className="flex items-center gap-2">
          <StarIcon className="w-5 h-5 fill-primary" />
          <span>{selectedFilm.rating}</span>
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon className="w-5 h-5" />
          <span>142 min</span>
        </div>
        <div className="prose">
          <span className="font-bold">Batafsil:</span>
          <p>{selectedFilm.description}</p>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <ListIcon className="w-5 h-5" />
          <span>{selectedFilm.categories.join(", ")}</span>
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
  <h2 className="font-bold text-2xl mb-[30px]">O&apos;xshash multfilmlar</h2>
  <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
    {multfilms.map((mult) => (

<SimilarMultfilm key={mult.id} {...mult} />
))}
</section>
</div>
</main>
);
};

export default MultfilmsDetail;
