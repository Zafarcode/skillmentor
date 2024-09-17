import MultfilmCard from "@/components/multfilm/multfilm-card";
import { multfilms } from '@/mock'

const Multfilms = () => {
  return (
    <main className="pt-28 px-5 md:px-0">
      <div className="container">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {multfilms.map((mult) => (
            <MultfilmCard key={mult.id} {...mult} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default Multfilms;
