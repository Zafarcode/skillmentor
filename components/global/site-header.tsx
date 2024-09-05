"use client";
import LogoIcon from "@/components/LogoIcon";
import { buttonVariants } from "@/components/ui/button";
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
import { Heart, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SiteHeader = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-5 bg-black/30 backdrop-blur-lg">
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-20">
            <Link className="text-xl text-white" href="/">
              <LogoIcon />
              <span className="sr-only">CinemaTube logo</span>
            </Link>

            <NavigationMenu className="hidden lg:block">
              <NavigationMenuList className="gap-5">
                {navList.map((item) => (
                  <NavigationMenuItem key={item.id}>
                    <NavigationMenuLink asChild>
                      <Link
                        className={cn("text-gray-400 hover:text-white", pathname === item.href ? "text-white" : "")}
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

          <div className="flex items-center gap-5">
            <search className="hidden lg:block">
              <Input
                className="w-96 bg-transparent border border-white placeholder:text-white text-white"
                type="search"
                placeholder="Izlash"
              />
            </search>

            <Link className={cn("bg-transparent text-white border border-white", buttonVariants())} href="/favorite">
              <Heart />
            </Link>

            <Link className={cn("bg-transparent text-white border border-white", buttonVariants())} href="/auth/login">
              Kirish
            </Link>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="block lg:hidden">
                <Menu className="w-8 h-8 text-white" />
                <span className="sr-only">Menu icon</span>
              </SheetTrigger>
              <SheetContent className="flex flex-col bg-primary items-center justify-start border-primary text-center">
                <SheetTitle className="pt-5 text-xl font-bold bg-gradient-to-l to-white to-50% from-green-500 from-45% text-transparent bg-clip-text">
                  Menu
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
