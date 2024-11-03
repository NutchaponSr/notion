"use client";

import { 
  ArrowUpDownIcon, 
  CornerDownLeftIcon, 
  FileIcon, 
  HashIcon, 
  LoaderCircleIcon, 
  SearchIcon 
} from "lucide-react";
import { 
  HiMiniBuildingLibrary, 
  HiMiniCalendarDays, 
  HiMiniCircleStack 
} from "react-icons/hi2";
import { useToggle } from "react-use";
import { FaUser } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useQueryState, parseAsString } from "nuqs";
import { IoFilterCircleOutline } from "react-icons/io5";

import { Category } from "@/types";
import { useSearchCommand } from "@/hooks/use-search-command";

import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Filter } from "@/components/filter";

import { useGetSearchs } from "@/features/search/api/use-get-search";
import { cn, formatTimeElapsed } from "@/lib/utils";
import { useKeyboard } from "@/hooks/use-keyboard";
import { useDebounce } from "@/hooks/use-debounce";
import { format, parse, startOfToday, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { useSearchParams } from "next/navigation";

const serializeDate = (date: Date | null) => date ? format(date, "yyyy-MM-dd") : "";
const deserializeDate = (date: string | null) => date ? parse(date, "yyyy-MM-dd", new Date()) : null

export const SearchCommand = () => {
  const searchParams = useSearchParams();

  const { data } = useSession();
  const { isOpen, onClose } = useSearchCommand();

  const type = searchParams.get("type") ?? "create";
  const searchParam = searchParams.get("search") ?? "";
  const fromParam = searchParams.get("from") ?? "";
  const toParam = searchParams.get("to") ?? "";
  
  const [filter, toggleFilter] = useToggle(false);
  const [to, setTo] = useQueryState("to", {
    parse: deserializeDate,
    serialize: serializeDate,
    defaultValue: null,
  });
  const [from, setFrom] = useQueryState("from", {
    parse: deserializeDate,
    serialize: serializeDate,
    defaultValue: null,
  });
  const [sort, setSort] = useQueryState("sort", parseAsString);
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  
  const [index, setIndex] = useState(0);
  const [peoples, setPeoples] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>(
    from && to ? { from, to } : undefined
  );
  
  const debouncedSort = useDebounce(sort, 300);
  
  const { 
    data: searchs, 
    isLoading: loadingSearch, 
    isRefetching: refetchingSearch,
    refetch
  } = useGetSearchs(
    debouncedSort,
    fromParam,
    toParam,
    type,
    searchParam, 
  );

  const itemRefs = useRef<HTMLDivElement[]>([]);
  const keyboardTimeoutRef = useRef<NodeJS.Timeout | null>(null);  
  
  const name = data?.user.name ?? "";

  const activateKeyboardMode = () => {
    setIsKeyboardActive(true);
    if (keyboardTimeoutRef.current) {
      clearTimeout(keyboardTimeoutRef.current);
    }
    keyboardTimeoutRef.current = setTimeout(() => {
      setIsKeyboardActive(false);
    }, 1000); 
  };

  const filteredData = peoples.length > 0 || categories.length > 0
    ? searchs?.data.map((item) => ({
      ...item,
      data: item.data.filter((f) => {
        const matchesPeople = peoples.length === 0 || peoples.includes(f.createdBy);
        const matchesCategories = categories.length === 0 || categories.includes(f.type);

        return matchesPeople && matchesCategories;
      })
    }))
    : searchs?.data.map((item) => ({...item}))
  
  const mappedData = searchs?.data.flatMap((item) => (
    item.data
  )) || [];

  const isPeopleSelected = peoples.length > 0;
  const isCategorySelected = categories.length > 0;
  
  const isLoading = loadingSearch || refetchingSearch;

  useKeyboard([
    {
      key: "ArrowUp",
      action: () => {
        setIndex((prev) => (prev > 0 ? prev - 1 : mappedData.length - 1));
        activateKeyboardMode();
      },
    },
    {
      key: "ArrowDown",
      action: () => {
        setIndex((prev) => (prev < mappedData.length - 1 ? prev + 1 : 0));
        activateKeyboardMode();
      },
    },
    {
      key: "Enter",
      action: () => {
        if (index < mappedData.length) {
          const itemToSelect = mappedData[index];
          console.log("Selected item:", itemToSelect);
        }
      }
    }
  ]);
  
  const handleClose = () => {
    onClose();
    setSort(null);
    setTo(null);
    setFrom(null);
    setDate(undefined);
  }

  const handleClear = () => {
    setDate(undefined);
    setFrom(null);
    setTo(null);
  };

  const handlePreset = (range: { from: Date; to: Date | undefined  }) => {
    setDate(range);
    setFrom(range.from);
    setTo(range.to || null);
  };

  const handleDate = (newDate: DateRange | undefined) => {
    setDate(newDate);

    if (newDate) {
      setFrom(newDate.from || null);
      setTo(newDate.to || null);
    } else {
      setFrom(null);
      setTo(null);
    }

    if (!newDate) {
      setDate(undefined);
    }
  };

  useEffect(() => {
    if (isKeyboardActive && itemRefs.current[index]) {
      itemRefs.current[index].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [index, isKeyboardActive]);

  useEffect(() => {
    return () => {
      if (keyboardTimeoutRef.current) {
        clearTimeout(keyboardTimeoutRef.current);
      }
    };
  }, []);

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
            <div className="flex items-center px-4 w-full grow-0 shrink-0 text-lg h-12 space-x-2 shadow-[0_1px_0_rgba(55,53,47,0.09)]">
              <div className="size-6 flex items-center justify-center">
                <SearchIcon className="size-5 text-[#a4a4a2]" />
              </div>
              <div className="relative w-full">
                <input 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={`Search or ask a question in ${name}'s Notion...`}
                  className="w-full whitespace-nowrap text-ellipsis focus-visible:outline-none placeholder:text-[#a4a4a2] text-[#37352f]"
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
                    data={[
                      { name: "Best match", onClick: () => setSort(null) },
                      { name: "Last edited: Newest first", onClick: () => setSort("EDITED_DESC") },
                      { name: "Last edited: Oldest first", onClick: () => setSort("EDITED_ASC") },
                      { name: "Created: Newest first", onClick: () => setSort("CREATED_DESC") },
                      { name: "Created: Oldest first", onClick: () => setSort("CREATED_ASC") },
                    ]}
                  />
                  <Separator orientation="vertical" className="h-4 rounded-md bg-[#37352f29]" />
                  <Filter 
                    icon={FaUser}
                    variant="command"
                    label={isPeopleSelected
                      ? `Created by: ${peoples.join(", ")}`
                      : "Created by"
                    }
                    isSelected={isPeopleSelected}
                    onSelect={(value: string[]) => setPeoples(value)}
                    data={searchs?.createdPeoples}
                  />
                  <Filter 
                    icon={FileIcon}
                    variant="command"
                    label={isCategorySelected
                      ? `In: ${categories.join(", ")}`
                      : "In"
                    }
                    isSelected={isCategorySelected}
                    onSelect={(value: string[]) => setCategories(value as Category[])}
                    data={[
                      { name: Category.COMPETENCY, icon: HiMiniBuildingLibrary },
                      { name: Category.GROUP, icon: HiMiniCircleStack },
                    ]}
                  />
                  <Filter 
                    icon={HiMiniCalendarDays}
                    variant="calendar"
                    label="Date"
                    isSelected={true}
                    onDate={handleDate}
                    onClear={handleClear}
                    date={date}
                    data={undefined}
                    presets={[
                      {
                        range: {
                          from: startOfToday(),
                          to: undefined,
                        },
                        label: "Today",
                        onRange: handlePreset
                      },
                      {
                        range: {
                          from: subDays(startOfToday(), 7),
                          to: startOfToday(),
                        },
                        label: "Last 7 days",
                        onRange: handlePreset
                      },
                      {
                        range: {
                          from: subDays(startOfToday(), 30),
                          to: startOfToday(),
                        },
                        label: "Last 30 days",
                        onRange: handlePreset
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          )}
          {/* List item */}
          <ScrollArea className="pt-2 w-full h-full overflow-y-auto overflow-x-hidden">
            <div className="flex flex-col h-full">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full space-y-2">
                  <LoaderCircleIcon className="text-[#c7c6c4] size-9 animate-spin" />
                  <div className="text-sm font-semibold text-[#787774]">
                    Loading result... 
                  </div>
                </div>
              ) : (
                filteredData?.map(({ label, data }) => (
                  <div key={label} className="mb-[18px]">
                    <div className="flex px-3 my-2 text-[#37352fa6] text-xs font-semibold">
                      {label}
                    </div>
                    {data.map((item) => {
                      const globalIndex = mappedData?.findIndex(
                        data => data.id === item.id
                      );

                      return (
                        <div
                          key={item.id}
                          className={cn(
                            "mx-1 rounded-[6px] cursor-pointer group",
                            globalIndex === index && "bg-[#37352f0f]"
                          )}
                          ref={(el) => {
                            if (el) itemRefs.current[globalIndex] = el;
                          }}
                          onMouseEnter={() => {
                            if (!isKeyboardActive) {
                              setIndex(globalIndex);
                            }
                          }}
                        >
                          <div className="flex items-center w-full min-h-9 text-sm py-2">
                            <div className="flex items-center justify-center ml-2.5 mr-1">
                              <div className="grid overflow-visible place-items-center">
                                <div className="flex items-center justify-center size-5">
                                  {item.icon ? (
                                    item.icon
                                  ) : (
                                    <HashIcon className="size-4 text-[#a5a29a]" />
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="mx-1 flex-auto inline-flex items-center w-full">
                              <div className="flex items-center space-x-1 text-sm text-ellipsis overflow-hidden font-medium whitespace-nowrap">
                                <p className="text-[#37352f]">{item.name}</p>
                                <Separator className="w-3 h-[0.5px] bg-[#37352f80]" />
                                <span className="whitespace-nowrap overflow-hidden text-ellipsis text-[#37352f80] text-xs">
                                  {item.description}
                                </span>
                              </div>
                            </div>
                            <div className="ml-auto mr-3 min-w-0 flex-none">
                              <div className="flex items-center">
                                {globalIndex === index ? (
                                  <CornerDownLeftIcon className="size-3 text-[#acaba9] hiddengroup-hover:block" />
                                ) : (
                                  <p className="text-xs text-[#acaba9] visible group-hover:hidden">
                                    {formatTimeElapsed(item.createdAt)}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
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