"use client";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Hero = () => {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {Array.from({ length: 2 }).map((_, index) => (
          <CarouselItem key={index}>
            <section className='h-screen bg-[url("https://files.itv.uz/uploads/helper/2024/06/06//c01744ef18aa3251c621e956c0544cd6-q-1920x750.jpeg")] bg-center bg-cover '></section>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Hero;
