import SeriaCard from "@/components/seria/seria-card";
import { serials } from '@/mock'

const Series = () => {
  return (
    <main className="pt-28 px-5 md:px-0">
      <div className="container">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {serials.map((seria) => (
            <SeriaCard key={seria.id} {...seria} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default Series;
