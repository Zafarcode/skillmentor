import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import Image from "next/image";

export default function FilmCard({
  title,
  poster,
  rating,
  categories,
}: {
  title: string;
  poster: string;
  rating: number;
  categories: string[];
}) {
  return (
    <Card className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl border-none">
      <CardContent className="p-0">
        <div className="relative group">
          <Image
            src={poster}
            alt={title}
            width={500}
            height={750}
            className="w-full h-[300px] object-cover"
            style={{ aspectRatio: "500/750", objectFit: "cover" }}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white group-hover:hidden">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-1">
                <StarIcon className="w-5 h-5 fill-primary" />
                <span className="font-medium">{rating}</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">{categories.join(", ")}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
