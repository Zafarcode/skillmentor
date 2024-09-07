"use client";
import LogoIcon from "@/components/LogoIcon";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { navList } from "@/mock";
import { EllipsisVertical, Heart, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ModeToggle } from "./mode-toggle";

const SiteHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 py-5 bg-white dark:bg-black">
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-20">
            <Link className="text-xl" href="/">
              <LogoIcon />
              <span className="sr-only">CinemaTube logo</span>
            </Link>

            <NavigationMenu className="hidden lg:block">
              <NavigationMenuList className="gap-5">
                {navList.map((item) => (
                  <NavigationMenuItem key={item.id}>
                    <NavigationMenuLink asChild>
                      <Link
                        className={cn(
                          "text-gray-400 relative after:content-[''] after:w-0 after:h-[2px] after:absolute after:top-[110%] after:left-0 after:right-0 after:bg-primary after:transition-all after:duration-300 after:rounded-md after:mx-auto",
                          pathname === item.href ? "after:w-full" : "",
                        )}
                        href={item.href}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-3">
            <search className="hidden lg:block">
              <Input className="w-96 border " type="search" placeholder="Izlash" />
            </search>

            <Link className="bg-transparent" href="/favorite">
              <Heart />
            </Link>

            <ModeToggle />

            <Link className="flex gap-1 items-center bg-transparent" href="/auth/login">
              <UserIcon /> <span className="hidden lg:block">Kirish</span>
            </Link>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="block lg:hidden">
                <EllipsisVertical className="w-7 h-7" />
                <span className="sr-only">Menu icon</span>
              </SheetTrigger>
              <SheetContent className="flex flex-col items-center justify-start border-none text-center">
                <SheetTitle>
                  <LogoIcon />
                </SheetTitle>
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
