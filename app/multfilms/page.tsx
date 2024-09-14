import MultfilmCard from "@/components/multfilm/multfilm-card";
import { multfilm } from "@/mock";
import Link from "next/link";

const Multfilm = () => {
  return <main className="pt-16 px-5 md:px-0">
  <div className="container">
    <Link href="/multfilms"> 
    <h1 className="text-3xl font-bold mb-10">Multfilmlar</h1>
    </Link>
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {multfilm.map((mult) => (
        <MultfilmCard key={mult.id} {...mult} />
      ))}
    </section>
  </div>
</main>;
};

export default Multfilm;
