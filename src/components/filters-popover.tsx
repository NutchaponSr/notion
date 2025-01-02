import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

import { PlusIcon } from "@/components/icons";

import { useFilter } from "@/stores/use-filter";
import { useToolbar } from "@/stores/use-toolbar";

interface FiltersPopoverProps {
  children: React.ReactNode;
  variant: "main" | "table";
}

export const FiltersPopover = ({ children, variant }: FiltersPopoverProps) => {
  const { 
    onActive, 
    filters,
    isOpen,
    onClose,
    type,
  } = useFilter();
  const { onOpen } = useToolbar();

  const [search, setSearch] = useState<string>("");

  const searchFilters = filters.filter((filter) => filter.label.toLowerCase().includes(search.toLowerCase()));

  const isOpenPopover = isOpen && type === variant;

  return (
    <Popover open={isOpenPopover} onOpenChange={onClose}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent align="end" className="flex flex-col w-[290px] max-h-[80vh] p-0">
        <div className="grow-0 overflow-x-hidden overflow-y-auto">
          <div className="pt-3 pb-2 flex flex-col">
            <div className="flex items-center min-h-7 mx-3">
              <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter by..."
                className="max-w-full w-full whitespace-pre-wrap break-words grow text-sm py-1 px-2.5 rounded-md shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] bg-[#f2f1ee99] focus-visible:outline-none text-[#37352f] placeholder:text-[#91918e] font-light dark:bg-[#ffffff0e] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.075)] dark:text-[#ffffffcf] focus-visible:shadow-[inset_0_0_0_1px_rgba(35,131,226,0.57),0_0_0_2px_rgba(35,131,226,0.35)]"
              />
            </div>
          </div>
          <ScrollArea className="py-1 flex flex-col">
            <div className="flex flex-col gap-1">
              {searchFilters.length > 0 ? (
                searchFilters.map((filter) => (
                  <div 
                    key={filter.label}
                    className="w-[calc(100%-8px)] mx-1 rounded-[6px] hover:bg-[#37352f0f] cursor-pointer"
                    onClick={() => {
                      onOpen();
                      onActive(filter);
                      onClose();
                    }}
                  >
                    <div className="flex items-center w-full min-h-7">
                      <div className="flex items-center justify-center ml-2.5 mr-1">
                        <filter.icon className="size-4 text-[#37352f]" />
                      </div>
                      <div className="ml-1.5 mr-3 min-w-0">
                        <p className="text-[#37352f] text-sm whitespace-pre-wrap overflow-hidden text-ellipsis">
                          {filter.label}
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
        <div className="gap-[1px] py-1 flex flex-col shadow-[0px_-1px_0px_rgba(55,53,47,0.09)]">
          <button className="w-[calc(100%-8px)] mx-1 rounded-[6px] hover:bg-[#37352f0f]">
            <div className="flex items-center w-full min-h-7">
              <div className="flex items-center justify-center ml-2.5 mr-1">
                <PlusIcon className="size-4 text-[#7C7C78]" />
              </div>
              <div className="ml-1.5 mr-3 min-w-0">
                <p className="text-[#37352fa6] text-sm whitespace-pre-wrap overflow-hidden text-ellipsis">
                  Add advanced filter
                </p>
              </div>
            </div>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}