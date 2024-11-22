"use client";

import { useSidebar } from "@/stores/use-sidebar";

import { cn } from "@/lib/utils";

interface MainContentProps {
  children: React.ReactNode;
}

export const MainContent = ({
  children
}: MainContentProps) => {
  const { isCollapsed } = useSidebar();

  return (
    <div className={cn(
      "flex flex-col overflow-hidden w-full",
    )}>
      {children}
    </div>
  );
}