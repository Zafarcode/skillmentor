import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HeartIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FilmCard({
  title,
  slug,
  poster,
  rating,
  year,
}: {
  title: string;
  slug: string;
  poster: string;
  rating: number;
  year: number;
}) {
  return (
    <Card className="w-full h-full max-w-sm overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl border-none rounded-t-lg rounded-b-none bg-transparent">
      <CardContent className="p-0">
        <Link className="relative group" href={"/films/" + slug}>
          <Image
            src={poster}
            alt={title}
            width={500}
            height={800}
            className="w-full h-[300px] object-cover rounded-lg"
            style={{ aspectRatio: "500/800", objectFit: "cover" }}
          />
          <div className="dark:text-white text-white pt-4 space-y-3">
            <div className="flex items-center gap-1">
              <StarIcon className="w-5 h-5 fill-primary" />
              <span className="font-medium">{rating}</span>
            </div>
            <h3 className="text-lg font-bold mb-2">{title.slice(0, 20)}</h3>
            <div className="flex items-center justify-between gap-4 mb-2">
              <p className="text-sm text-gray-400">{year}</p>

              <Tooltip>
                <TooltipTrigger>
                  <HeartIcon className="w-5 h-5" />
                  <TooltipContent className="w-32 absolute right-0 bottom-1">
                    <p>Add to favorites</p>
                  </TooltipContent>
                </TooltipTrigger>
              </Tooltip>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
