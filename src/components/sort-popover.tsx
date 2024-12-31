import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useSort } from "@/stores/use-sort";
import { useToolbar } from "@/stores/use-toolbar";

interface SortPopoverProps {
  children: React.ReactNode;
}

export const SortPopover = ({ children }: SortPopoverProps) => {
  const { 
    sorts, 
    isOpen,
    onActive,
    onClose,
  } = useSort();
  const { onOpen } = useToolbar();

  const [sort, setSort] = useState<string>("");

  const searchSorts = sorts.filter((filter) => filter.label.toLowerCase().includes(sort.toLowerCase()));

  return (
    <Popover open={isOpen} onOpenChange={onClose}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent align="end" className="flex flex-col w-[290px] max-h-[80vh] p-0">
        <div className="grow-0 overflow-x-hidden overflow-y-auto">
          <div className="pt-3 pb-2 mx-2">
            <input 
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              placeholder="Sort by..."
              className="max-w-full w-full whitespace-pre-wrap break-words grow text-sm py-1 px-2.5 rounded-md shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] bg-[#f2f1ee99] focus-visible:outline-none text-[#37352f] placeholder:text-[#91918e] font-light dark:bg-[#ffffff0e] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.075)] dark:text-[#ffffffcf] focus-visible:shadow-[inset_0_0_0_1px_rgba(35,131,226,0.57),0_0_0_2px_rgba(35,131,226,0.35)]"
            />
          </div>
          <ScrollArea className="py-1 flex flex-col">
            <div className="flex flex-col gap-1">
              {searchSorts.length > 0 ? (
                searchSorts.map((sort) => (
                  <div 
                    key={sort.label}
                    className="w-[calc(100%-8px)] mx-1 rounded-[6px] hover:bg-[#37352f0f] cursor-pointer"
                    onClick={() => {
                      onOpen();
                      onClose();
                      onActive(sort);
                    }}
                  >
                    <div className="flex items-center w-full min-h-7">
                      <div className="flex items-center justify-center ml-2.5 mr-1">
                        <sort.icon className="size-4 text-[#37352f]" />
                      </div>
                      <div className="ml-1.5 mr-3 min-w-0">
                        <p className="text-[#37352f] text-sm whitespace-pre-wrap overflow-hidden text-ellipsis">
                          {sort.label}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-1 flex flex-col">
                  <div className="flex items-center w-full py-1 mt-0.5 mb-1.5">
                    <div className="flex-auto mx-3 min-w-0">
                      <p className="text-[#787774] text-xs whitespace-pre-wrap overflow-hidden text-ellipsis">
                        No results
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
};
