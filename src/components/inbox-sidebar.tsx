import { ChevronsLeftIcon, ListFilterIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useInboxSidebar } from "@/hooks/use-inbox-sidebar";

import { Button } from "@/components/ui/button";

import { Hint } from "@/components/hint";

interface InboxSidebarProps {
  sidebarWidth: number;
  isDragging: boolean
}

export const InboxSidebar = ({ 
  sidebarWidth,
  isDragging
}: InboxSidebarProps) => {
  const { isOpen } = useInboxSidebar();

  return (
    <div
      className={cn(
        "h-full w-[390px] fixed top-0 left-0 z-50 transition duration-300 ease-in-out bg-white dark:bg-[#191919] shadow-[0_0_0_1px_rgba(15,15,15,0.04),0_3px_6px_rgba(15,15,15,0.03)] dark:shadow-[inset_-1px_0_0_0_rgba(13,13,13),0_0_0_1px_rgba(15,15,15,0.05),0_3px_6px_rgba(15,15,15,0.1),0_9px_24px_rgba(15,15,15,0.2)]",
        isOpen ? "opacity-100" : "opacity-0"
      )}
      style={{
        transform: isDragging 
          ? `translateX(${sidebarWidth}px)` 
          : isOpen 
          ? `translateX(${sidebarWidth}px)`
          : "translateX(-390px)" 
      }}
    >
      <div className="flex flex-col justify-start h-full">
        <div className="py-2.5 px-4 flex items-center">
          <h1 className="flex-1 text-sm text-[#37352f] dark:text-[#ffffffcf] font-semibold">
            Inbox
          </h1>
          <Hint label="Close inbox pane" align="start">
            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm">
              <ChevronsLeftIcon className="size-4 text-[#37352f80] dark:text-[#9b9b9b]" />
            </Button>
          </Hint>
          <Hint label="Filter notifications" align="start">
            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm">
              <ListFilterIcon className="size-4 text-[#37352f80] dark:text-[#9b9b9b]" />
            </Button>
          </Hint>
        </div>
        {/* TODO: Request list */}
      </div>
    </div>
  );
}