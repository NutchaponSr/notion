import { 
  ArrowUpDownIcon, 
  CornerDownLeftIcon, 
  FileIcon, 
  SearchIcon 
} from "lucide-react";
import { useToggle } from "react-use";
import { FaUser } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { HiMiniCalendarDays } from "react-icons/hi2";
import { IoFilterCircleOutline } from "react-icons/io5";
import { useSearchCommand } from "@/stores/use-search-command";

import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Filter } from "@/components/filter";

import { useGetSearchs } from "@/features/search/api/use-get-search";

export const SearchCommand = () => {
  const { data } = useSession();
  const { isOpen, onClose } = useSearchCommand();
  
  const { 
    data: searchs, 
    isLoading: loadingSearch, 
  } = useGetSearchs();

  const [filter, toggleFilter] = useToggle(false);

  const name = data?.user.name ?? "";


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-h-[max(50vh,570px)] flex flex-row justify-between max-h-[max(50vh,570px)] max-w-[755px] p-0">
        <div className="flex-1 overflow-hidden flex flex-col"> 
          {/* Header */}
          <div className="flex items flex-1">
            <div className="flex items-center px-4 w-full grow-0 shrink-0 text-lg h-12 space-x-2 shadow-[0_1px_0_rgba(55,53,47,0.09)]">
              <div className="size-6 flex items-center justify-center">
                <SearchIcon className="size-5 text-[#a4a4a2]" />
              </div>
              <div className="relative w-full">
                <input 
                  placeholder={`Search or ask a question in ${name}'s Notion...`}
                  className="w-full whitespace-nowrap text-ellipsis focus-visible:outline-none placeholder:text-[#a4a4a2]"
                />
              </div>
              <div className="ml-auto flex items-center justify-center">
                <Button onClick={toggleFilter} size="icon" variant="ghost" className="size-7">
                  <IoFilterCircleOutline className="size-5 text-[#acaba9]" />
                </Button>
              </div>
            </div>
          </div>
          {/* Filter */}
          {filter && (
            <div className="flex items-center">
              <div className="relative grow-0 overflow-hidden">
                <div className="flex items-center py-2.5 px-3 overflow-x-auto overflow-y-hidden space-x-1.5">
                  <Filter 
                    icon={ArrowUpDownIcon}
                    variant="dropdown"
                    label="Sort"
                    isSelected={false}
                    onSelect={() => {}}
                    data={undefined}
                  />
                  <Separator orientation="vertical" className="h-4 rounded-md bg-[#37352f29]" />
                  <Filter 
                    icon={FaUser}
                    variant="command"
                    label="Created by"
                    isSelected={false}
                    onSelect={() => {}}
                    data={undefined}
                  />
                  <Filter 
                    icon={FileIcon}
                    variant="command"
                    label="In"
                    isSelected={false}
                    onSelect={() => {}}
                    data={undefined}
                  />
                  <Filter 
                    icon={HiMiniCalendarDays}
                    variant="calendar"
                    label="Date"
                    isSelected={true}
                    onSelect={() => {}}
                    data={undefined}
                  />
                </div>
              </div>
            </div>
          )}
          {/* List item */}
          <ScrollArea className="pt-2 w-full h-full overflow-y-auto overflow-x-hidden">
            list
          </ScrollArea>
          {/* Footer */}
          <div className="shrink-0">
            <div className="shadow-[0_-1px_0_rgba(55,53,47,0.09)] mt-[1px] flex flex-row justify-between items-center">
              <div className="flex items-center w-full min-h-8 whitespace-nowrap overflow-hidden text-ellipsis">
                <div className="px-3 flex-auto">
                  <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                    <ul className="whitespace-nowrap overflow-hidden text-ellipsis inline-flex items-center text-xs text-[#37352f80] gap-5">
                      <li className="flex gap-1.5 items-center h-max">
                        <ArrowUpDownIcon className="size-3 text-[#9a9a97]" />
                        Select
                      </li>
                      <li className="flex gap-1.5 items-center h-max">
                        <CornerDownLeftIcon className="size-3 text-[#9a9a97]" />
                        Open
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}