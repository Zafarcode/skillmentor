import AnimeCard from "@/components/anime/anime-card";
import { anime } from "@/mock";

const Animes = () => {
  return (
    <main className="pt-28 px-5 md:px-0">
      <div className="container">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {anime.map((anim) => (
            <AnimeCard key={anim.id} {...anim} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default Animes;
