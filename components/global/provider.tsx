"use client";
import { ThemeProvider } from "@/components/global/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChildrenProps } from "@/types";
import { SessionProvider } from "next-auth/react";

const RootProvider = ({ children }: ChildrenProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TooltipProvider>
        <SessionProvider>{children}</SessionProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default RootProvider;
