import { HiUser } from "react-icons/hi2";
import { CircleHelpIcon, FileIcon, Trash2Icon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import { FilterButton } from "@/components/filter-button";
import { ScrollArea } from "./ui/scroll-area";

export const Trash = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center h-[30px] w-full hover:bg-[#00000008] focus-visible:ring-0 focus-visible:outline-none p-1">
          <div className="shrink-0 grow-0 rounded-sm size-[22px] flex justify-center items-center ml-1 mr-2">
            <Trash2Icon className="size-[18px] text-[#91918e]" />
          </div>
          <div className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">
            Trash
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        side="right"
        sideOffset={4}
        className="w-[414px] h-[50vh] max-h-[70vh] mb-1 p-0"
      >
        <div className="flex flex-col h-full">
          <div className="shrink-0 my-2.5">
            <div className="flex items-center w-full min-h-7">
              <div className="mx-3 flex-auto">
                <input 
                  value={""}
                  onChange={() => {}}
                  placeholder="Search in Trash"
                  className="max-w-full w-full whitespace-pre-wrap break-words grow text-sm py-1 px-2.5 rounded-sm shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] bg-[#f2f1ee99] focus-visible:outline-none text-[#37352f] placeholder:text-[#91918e] font-light"
                />
              </div>
            </div>
            <div className="flex flex-row my-2.5 mx-3 space-x-1.5">
              <FilterButton icon={HiUser} label="Last edited by" />
              <FilterButton icon={FileIcon} label="In" />
            </div>
          </div>
          <div className="grow overflow-x-hidden overflow-y-auto">
            <div className="py-1.5">
              {/* Item */}
              dgd
            </div>
          </div>
          <footer className="shrink-0">
            <div className="py-2 bg-[#2383e212]">
              <div className="px-2 text-xs text-[#37352fa6] dark:text-[#ffffff71] flex items-center justify-between">
                <p> Pages in Trash for over 30 days will be automatically deleted</p>
                <button className="size-6 hover:bg-[#37352f0f] rounded-sm flex justify-center items-center flex-shrink-0">
                  <CircleHelpIcon className="size-4" />
                </button>
              </div>
            </div>
          </footer>
        </div>
      </PopoverContent>
    </Popover>
  );
}