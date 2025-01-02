"use client";

import { useEffect } from "react";
import { useQueryState } from "nuqs";
import { useToggle } from "react-use";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchCommand } from "@/stores/use-search-command";

import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { 
  ArrowUpDownIcon, 
  CornerDownLeftIcon, 
  FilterCircleIcon, 
  SearchIcon 
} from "@/components/icons";

import { SearchList } from "@/features/search/components/search-list";
import { SearchFilter } from "@/features/search/components/search-filter";

import { useSort } from "@/features/search/hooks/use-sort";
import { useDate } from "@/features/search/hooks/use-date";
import { useFilter } from "@/features/search/stores/use-filter";
import { useGetSearchs } from "@/features/search/api/use-get-search";
import { Button } from "@/components/ui/button";

export const SearchCommand = () => {
  const searchParams = useSearchParams();

  const type = searchParams.get("type") ?? "create";
  const searchTerm = searchParams.get("search") ?? "";
  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";
  const sort = searchParams.get("sort") ?? "";

  const { data } = useSession();
  const { bestMatch } = useSort();
  const { isDate, onClear, onReset } = useDate();
  const { peoples, categories } = useFilter();
  const { isOpen, onClose } = useSearchCommand();

  const [filter, toggleFilter] = useToggle(false);
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });

  const debouncedSort = useDebounce(sort, 300);

  const { 
    data: searchs, 
    isLoading: loadingSearch, 
    isRefetching: refetchingSearch,
    refetch
  } = useGetSearchs(
    debouncedSort,
    from,
    to,
    type,
    searchTerm, 
  );
  
  const name = data?.user.name ?? "";

  const filteredData = peoples.length > 0 || categories.length > 0
    ? searchs?.data.map((item) => ({
      ...item,
      data: item.data.filter((f) => {
        const matchesPeople = peoples.length === 0 || peoples.includes(f.createdBy);
        const matchesCategories = categories.length === 0 || categories.includes(f.type);

        return matchesPeople && matchesCategories;
      })
    })) ?? []
    : searchs?.data.map((item) => ({...item}))

  const flatedData = filteredData?.flatMap((item) => (item.data.map((f) => f))) ?? [];

  const isLoading = loadingSearch || refetchingSearch;
  const isFilter = isDate || peoples.length > 0 || categories.length > 0;
  
  const handleClose = () => {
    onClose();
    onClear();
    onReset();
    bestMatch();
    setSearch(null);
  }

  useEffect(() => {
    if (debouncedSort) {
      refetch();
    }
  }, [debouncedSort, refetch]);
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="min-h-[max(50vh,570px)] flex flex-row justify-between max-h-[max(50vh,570px)] max-w-[755px] p-0">
        <div className="flex-1 overflow-hidden flex flex-col"> 
          {/* Header */}
          <div className="flex items flex-1">
            <div className="flex items-center px-4 w-full grow-0 shrink-0 text-lg h-12 space-x-2 shadow-[0_1px_0_rgba(55,53,47,0.09)] dark:shadow-[0_1px_0_rgba(255,255,255,0.094)]">
              <div className="size-6 flex items-center justify-center">
                <SearchIcon className="size-5 text-[#a4a4a2]" />
              </div>
              <div className="relative w-full">
                <input 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={`Search or ask a question in ${name}'s Notion...`}
                  className="w-full whitespace-nowrap text-ellipsis focus-visible:outline-none placeholder:text-[#a4a4a2] text-[#37352f] bg-inherit dark:placeholder:text-[#ffffff71] dark:text-[#ffffffcf]"
                />
              </div>
              <div className="ml-auto flex items-center justify-center">
                <Button 
                  variant="ghost"
                  onClick={toggleFilter} 
                  className={cn(
                    "transition flex items-center justify-center rounded-sm h-fit w-fit p-1",
                    isFilter ? "hover:bg-[#ebf5fe] dark:hover:bg-[#2383e212]" : "dark:hover:bg-[#ffffff0e]"
                  )}
                >
                  <FilterCircleIcon className={cn(
                    "size-5",
                    isFilter ? "text-[#2383e2]" : "text-[#acaba9] dark:text-[#5a5a5a]",
                  )} />
                </Button>
              </div>
            </div>
          </div>
          {/* Filter */}
          <div className={cn("items-center", filter ? "flex" : "hidden")}>
            <SearchFilter createdBy={searchs?.createdPeoples} />
          </div>
          {/* List item */}
          <ScrollArea className="pt-2 w-full h-full overflow-y-auto overflow-x-hidden">
            <div className="flex flex-col h-full">
              {isLoading ? (
                <SearchList.Skeleton />
              ) : (
                flatedData.length > 0 ? (
                  <SearchList data={filteredData ?? []} />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-sm font-semibold text-[#787774] dark:text-[#ffffff71]">
                      No results
                    </div>
                    <div className="text-sm text-[#37352f80] dark:text-[#7f7f7f]">
                      Some result may be in your the Trash
                    </div>
                    <div className="text-sm text-[#2383e2] cursor-pointer">
                      Search in trash
                    </div>
                  </div>
                )
              )}
            </div>
          </ScrollArea>
          {/* Footer */}
          <div className="shrink-0">
            <div className="shadow-[0_-1px_0_rgba(55,53,47,0.09)] mt-[1px] flex flex-row justify-between items-center dark:shadow-[0_-1px_0_rgba(255,255,255,0.094)]">
              <div className="flex items-center w-full min-h-8 whitespace-nowrap overflow-hidden text-ellipsis">
                <div className="px-3 flex-auto">
                  <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                    <ul className="whitespace-nowrap overflow-hidden text-ellipsis inline-flex items-center text-xs text-[#37352f80] dark:text-[#ffffff48] gap-5">
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