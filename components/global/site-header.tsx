"use client";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { navList } from "@/mock";
import { EllipsisVertical, Heart, UserIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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

  const mentorTextColorClass = theme === "dark" ? "text-white" : "text-black";

  return (
    <header className="sticky top-0 left-0 right-0 z-50 py-5 bg-white dark:bg-black">
      <div className="container">
        <div className="flex justify-between items-center">
          {/* Chap yuqori burchakdagi profil tugmasi */}
          <div className="absolute top-6 left-6 z-50">
            {/* <Button
              variant="secondary"
              className="bg-white text-black hover:bg-gray-200 w-[100px] h-[40px] flex items-center justify-center"
              onClick={toggleProfile}
            >
              <Link href={"/profile"}>
                <div className=" border-black w-full text-center">Profile</div>
              </Link>
            </Button> */}

            {/* /Profil paneli */}
          </div>
          <div className="flex items-center gap-20">
            <Link className="text-xl" href="/">
              <h1 className="text-3xl font-bold">
                <h1 className="text-5xl font-bold">
                  <span className="dark:text-blue-500">Skill</span>
                  <span className="text-white">Mentor</span>
                </h1>
              </h1>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link className="bg-transparent" href="/favorites">
              <Heart />
            </Link>

            <ModeToggle />

            <Link className="flex gap-1 items-center bg-transparent" href="/admin/login">
              <UserIcon /> <span className="hidden lg:block">Kirish</span>
            </Link>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="block lg:hidden">
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
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
