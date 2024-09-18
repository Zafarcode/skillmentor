import MusicCard from "@/components/music/music-card";
import { music } from "@/mock";

const Music = () => {
  return (
    <main className="pt-28 px-5 md:px-0">
      <div className="container">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {music.map((music) => (
            <MusicCard key={music.id} {...music} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default Music;
