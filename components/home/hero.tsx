"use client";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { PlayIcon, StarIcon } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  const imageUrl = "https://files.itv.uz/uploads/helper/2024/06/06//c01744ef18aa3251c621e956c0544cd6-q-1920x750.jpeg";

  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
    >
      <CarouselContent>
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index}>
            <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}>
              <div className="absolute inset-0 bg-black opacity-60"></div>

              <section className="relative pt-80 pl-48 items-center z-10">
                <div className="container">
                  <div className="mb-16 grid grid-cols-1 md:grid-cols-2 items-center">
                    <div className="absolute flex gap-[680px]">
                      <div className="space-y-5 mt-28">
                        <h1 className="text-3xl font-bold text-white">Nomi</h1>
                        <div className="flex items-center gap-2">
                          <StarIcon className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="text-white">Rating</span>
                        </div>
                        <div className="prose text-white">
                          <p className="opacity-50">Qisqa Malumoti</p>
                        </div>
                        <div className="flex items-center justify-center">
                          <Button
                            variant="outline"
                            className="px-5 py-5 bg-sky-400 text-white font-bold border-none rounded-md flex items-center space-x-2"
                          >
                            <span>Ko&apos;proq ko&apos;rish</span>
                            <PlayIcon className=" fill-white w-5 h-5" />
                          </Button>
                        </div>
                      </div>

                      <div className="overflow-hidden">
                        <Image
                          src={"/image.png"}
                          width={300}
                          height={450}
                          className="w-60 h-auto object-cover rounded-lg"
                          style={{ aspectRatio: "300/450", objectFit: "cover" }}
                          alt="Descriptive image alt text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </section>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Hero;
