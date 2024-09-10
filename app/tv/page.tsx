import FilmCard from "@/components/film/film-card";
import { films } from "@/mock";

const Tv = () => {
  return (
    <main className="pt-28 px-5 md:px-0">
      <div className="container">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {films.map((film) => (
            <FilmCard key={film.id} {...film} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default Tv;
