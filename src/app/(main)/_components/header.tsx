"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";

import { Logo } from "@/components/logo";

import { Navbar } from "./navbar";
import { cn } from "@/lib/utils";

export const Header = () => {
  const scrolled = useScrollTop();

  return (
    <div className="top-0 sticky z-[100]">
      <header className={cn(
        "relative flex flex-col transition bg-background",
        scrolled && "shadow-[0_1px_0_rgba(55,53,47,0.09)]",
      )}>
        <div className="flex items-center justify-between w-full p-4 mx-auto gap-x-8">
          <Logo size={28} showTitle />
          <div className="lg:flex grow items-center hidden">
            <Navbar />
          </div>
        </div>
      </header>
    </div>
  );
}