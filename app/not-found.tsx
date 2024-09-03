import { FilmIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-primary px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <FilmIcon className="mx-auto h-12 w-12 text-white" />

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-300 sm:text-4xl">Voy! Sahifa topilmadi</h1>
        <p className="mt-4 text-muted-foreground">
          Siz mavjud bo&apos;lmagan sahifaga kirganga o&apos;xshaysiz. Xavotir olmang, Bosh sahifaga qaytib, filmlarimiz
          bilan tanishishni davom ettirishingiz mumkin.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Bosh Sahifaga qaytish
          </Link>
        </div>
      </div>
    </div>
  );
}
