"use client";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { navList } from "@/mock";
import { EllipsisVertical, Heart } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "./mode-toggle";

const SiteHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();

  const [showProfile, setShowProfile] = useState(false);

  const resumeFilePath = "/Tuyanazarov_Zafar_Resume.pdf";

  const handleDownloadResume = () => {
    window.open(resumeFilePath, "_blank");
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 py-3 bg-white dark:bg-black shadow-md">
      {" "}
      {/* py-4 dan py-3 ga o'zgartirildi, yuqoridan/pastdan paddingni kamaytirish uchun */}
      <div className="container mx-auto px-3 sm:px-4">
        {" "}
        {/* px-4 dan px-3 ga o'zgartirildi, chekkalardan paddingni kamaytirish uchun */}
        {/* Asosiy Flex Konteyner: Barcha navigatsiya elementlari uchun */}
        <div className="flex items-center gap-2 sm:gap-3 flex-nowrap overflow-x-auto scrollbar-hide whitespace-nowrap">
          {" "}
          {/* gap-3 dan gap-2 ga, sm:gap-3 ga o'zgartirildi. whitespace-nowrap qo'shildi. */}
          {/* SkillMentor logotipi - chap tomonda */}
          <Link className="flex-shrink-0 text-base sm:text-xl" href="/">
            {" "}
            {/* text-xl dan text-base ga o'zgartirildi, sm uchun text-xl */}
            <h1 className="text-xl sm:text-2xl font-extrabold leading-tight md:text-4xl">
              {" "}
              {/* text-2xl dan text-xl ga, sm uchun text-2xl */}
              <span className="text-blue-700 dark:text-blue-500">Skill</span>
              <span className="text-gray-900 dark:text-white">Mentor</span>
            </h1>
          </Link>
          {/* O'rta bo'shliq yoki menyu itemlari (hozircha yo'q) */}
          <div className="flex-grow hidden lg:block">
            {/* Bu yerda kattaroq ekranlar uchun menyu elementlari bo'lishi mumkin */}
          </div>
          {/* O'ng tarafdagi tugmalar: Sevimlilar, Tema almashtirgich, Profil */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
            {" "}
            {/* gap-3 dan gap-2 ga o'zgartirildi */}
            {/* Sevimlilar tugmasi */}
            <Link className="bg-transparent flex-shrink-0" href="/favorites">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300 hover:text-red-500 transition-colors" />{" "}
              {/* Ikonaning o'lchami w-5 h-5 ga o'zgartirildi, sm uchun w-6 h-6 */}
            </Link>
            {/* Dark/Light Mode tugmasi */}
            <div className="flex-shrink-0">
              <ModeToggle />
            </div>
            {/* Profil tugmasi */}
            <Button
              variant="secondary"
              className="flex-shrink-0 bg-white border-2 border-gray-300 text-gray-900 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600
                         min-w-[60px] sm:min-w-[80px] h-[32px] sm:h-[36px] flex items-center justify-center transition-colors duration-200 px-2 text-xs sm:text-sm" /* min-w, h, px va text-size yanada kichraytirildi */
              onClick={toggleProfile}
            >
              <Link href={"/profile"} className="w-full text-center font-medium">
                Profile
              </Link>
            </Button>
            {/* Mobil menyu tugmasi (agar kerak bo'lsa, LG breakpointdan kichik ekranlarda ko'rinadi) */}
            {/* Hozircha sizning kodingizda izohlab qo'yilgan qismni qoldiraman, agar kerak bo'lsa faollashtirasiz */}
            {/* <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="block lg:hidden flex-shrink-0">
                <EllipsisVertical className="w-7 h-7" />
                <span className="sr-only">Menu icon</span>
              </SheetTrigger>
              <SheetContent className="flex flex-col items-center justify-start border-none text-center">
                <SheetTitle></SheetTitle>
                <SheetDescription className="sr-only">Untitled - movies and tv series database</SheetDescription>
                <NavigationMenu className="flex flex-col space-y-5 list-none justify-center">
                  {navList.map((item) => (
                    <NavigationMenuItem key={item.id}>
                      <NavigationMenuLink asChild>
                        <Link
                          className={cn("text-gray-400 hover:text-white", pathname === item.href ? "text-white" : "")}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenu>
              </SheetContent>
            </Sheet> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
