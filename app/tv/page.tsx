import TvCard from "@/components/tv/tv-card";
import { tv } from "@/mock";

const Tv = () => {
  return (
    <main className="pt-28 px-5 md:px-0">
      <div className="container">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {tv.map((tv) => (
            <TvCard key={tv.id} {...tv} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default Tv;
