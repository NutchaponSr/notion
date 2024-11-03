"use client";

import { cn } from "@/lib/utils";

import { useMedia } from "react-use";
import { ChevronsLeft } from "lucide-react";
import { ElementRef, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Trash } from "@/components/trash";
import { Favorite } from "@/components/favorite";
import { Workspace } from "@/components/workspace";
import { Navigation } from "@/components/navigation";

import { UserButton } from "@/features/auth/components/user-button";

export const Sidebar = () => {
  const isMobile = useMedia("(max-width: 768px)");

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);

  const [isResetting, setIsResetting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(true);
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = e.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    setIsDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );

      navbarRef.current.style.setProperty(
        "left",
        isMobile ? "100%" : "240px"
      );

      setTimeout(() => setIsResetting(false), 300);
    }
  }

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");

      setTimeout(() => setIsResetting(false), 300);
    }
  }

  return (
    <>
      <aside 
        ref={sidebarRef} 
        className={cn(
          "h-full bg-secondary overflow-hidden select-none relative flex w-60 flex-col z-[100] bg-[#f7f7f5] transition group [&:has(>.resize-handle:hover)]:shadow-[inset_-2px_0_0_0_rgba(0,0,0,0.1)]",
          isDragging ? 
            "shadow-[inset_-2px_0_0_0_rgba(0,0,0,0.1)]" : 
            "shadow-[inset_-1px_0_0_0_rgba(0,0,0,0.024)]",
        )}
      >
        <Button
          size="icon"
          variant="ghost"
          onClick={collapse}
          className="hover:bg-[#00000008] text-[#91918e] hover:text-[#37352f] group-hover:opacity-100 transition opacity-0 ml-2.5 absolute top-0.5 right-1 z-[100]"
        >
          <ChevronsLeft className="size-4"/>
        </Button>
        <div className="text-[#5f5e5b] font-medium h-full">
          <div className="flex flex-col h-full relative w-full">
            <div className="flex flex-col h-full max-h-full justify-between overflow-hidden relative">
              <div className="flex flex-col h-full max-h-full">
                <UserButton side="left" />
                <Navigation />
                <div className="contents">
                  <ScrollArea className="z-[1] pt-1.5 grow overflow-x-hidden overflow-y-auto">
                    <div className="flex flex-col min-h-full">
                      <div className="flex flex-col gap-3 pb-5">
                        <div className="flex flex-col gap-1">
                          <Favorite />
                          <Workspace />
                        </div>
                        <div className="shrink-0 grow-0 pb-2 flex flex-col">
                          <Trash />
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="resize-handle absolute right-0 w-0 grow-0 z-[1] top-0 bottom-0">
          <div 
            onMouseDown={handleMouseDown} 
            className={cn(
              "cursor-e-resize h-full w-3 -ml-1.5", 
              isDragging ? "opacity-100" : "opacity-0 hover:opacity-100"
            )} 
          />
        </div>
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc-(100%-240px)]",
        )}
      />
    </>
  );
}