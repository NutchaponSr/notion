import { 
  ChevronDownIcon, 
  ListFilterIcon, 
  MoreHorizontalIcon, 
  Trash2Icon, 
} from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { GiCheckMark } from "react-icons/gi";
import { HiMiniCalendarDays } from "react-icons/hi2";

import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { UserAvatar } from "@/features/auth/components/user-avatar";

import { useDate } from "@/features/search/hooks/use-date";

import { IconType, IconVariant } from "@/types";
import { useSort } from "@/stores/use-sort";
import { useFilter } from "@/stores/use-filter";
import { FILTER_CONDITIONS } from "@/constants/filters";

interface FilterProps {
  icon: IconType;
  iconVariant: IconVariant;
  fill?: boolean;
  label: string;
  data: {
    name: string;
    image?: string | null;
    icon?: IconType;
    onClick?: () => void;
  }[] | undefined;
  onSelect?: (value: string[]) => void;
  onDate?: (date: DateRange | undefined) => void;
  onClear?: () => void;
  date?: DateRange | undefined;
  isSelected: boolean;
  placeholder?: string;
  presets?: {
    label: string;
    range: {
      from: Date;
      to: Date | undefined;
    };
    onRange: (range: { from: Date; to: Date | undefined; }) => void;
  }[];
  variant: "command" | "dropdown" | "calendar" | "filter" | "sort";
}

export const Filter = ({
  icon: Icon,
  iconVariant,
  label,
  data,
  onSelect,
  onDate,
  onClear,
  date,
  isSelected,
  placeholder,
  presets,
  variant,
}: FilterProps) => {
  const { onRemove } = useSort();
  const { onDelete } = useFilter();
  const { type, onReset, onCreate, onEdit } = useDate();

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelect = (itemName: string) => {
    const newSelection = selectedItems.includes(itemName)
      ? selectedItems.filter(item => item !== itemName)
      : [...selectedItems, itemName]; 

    setSelectedItems(newSelection); 
    if (onSelect) onSelect(newSelection); 
  };

  const handleClear = () => {
    if (onClear) onClear();
    onReset();
  }

  const triggerButton = (
    <Button 
      size="filter" 
      variant={isSelected ? "active": "outline"} 
      className="gap-1 text-xs"
    >
      <Icon className="text-[#7c7c78] size-[14px]" variant={iconVariant} fill="#7c7c78" />
      <span className="max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis">{label}</span>
      <ChevronDownIcon className={cn(
        "size-3",
        isSelected ? "text-[#2383e2]" : "text-[#b9b9b7]",
      )} />
    </Button>
  );

  switch (variant) {
    case "command":
      return (
        <Popover>
          <PopoverTrigger asChild>
            {triggerButton}
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0" align="start">
            <Command>
              <CommandInput placeholder={placeholder} />
              <CommandList>
                <CommandEmpty>No result found</CommandEmpty>
                <CommandGroup>
                  {data?.map((item, index) => (
                    <CommandItem
                      key={index}
                      onSelect={() => handleSelect(item.name)}
                      className="space-x-2"
                    >
                      {item.icon ? (
                        <div className="flex items-center justify-center size-5 shrink-0 text-base">
                          <item.icon variant="BULK" fill="#91918e" />
                        </div>
                      ) : (
                        <UserAvatar
                          name={item.name}
                          imageUrl={item.image ?? ""}
                          className="size-5"
                          fallbackClassName="size-5 bg-blue-500 text-white text-xs"
                        />
                      )}
                      <div className="flex-auto whitespace-nowrap text-ellipsis overflow-hidden">
                        {item.name}
                      </div>
                      {selectedItems.includes(item.name) && <GiCheckMark className="ml-auto size-3" />} 
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      );
    case "dropdown": 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {triggerButton}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {data?.map((item, index) => (
              <DropdownMenuItem
                key={index}
                onClick={item.onClick}
              >
                {item.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    case "calendar": 
      return (
        <Popover>
          <PopoverTrigger asChild>
            {triggerButton}
          </PopoverTrigger>
          <PopoverContent className="w-[256px] p-0 py-2 overflow-hidden" align="start">
            <div className="flex justify-between items-center mx-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="xs" variant="ghost">
                    {type === "create" ? "Create" : "Last edited"}
                    <ChevronDownIcon className="size-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={onCreate}>
                    Created
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onEdit}>
                    Last edited
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="xs" variant="ghost" onClick={handleClear}>
                Clear
              </Button>
            </div>
            <div className="my-3 pb-4 shadow-[0_1px_0_rgba(55,53,47,0.09)] dark:shadow-[0_1px_0_rgba(255,255,255,0.094)]">
              {presets?.map((preset) => (
                <button 
                  key={preset.label}
                  onClick={() => preset.onRange(preset.range)}
                  className="rounded-[6px] transition w-[calc(100%-8px)] mx-1 hover:bg-[#37352f0f] text-[#37352f] dark:text-[#ffffffcf] dark:hover:bg-[#ffffff0e]"
                >
                  <div className="flex items-center w-full min-h-7 text-sm">
                    <div className="flex items-center justify-center ml-2.5">
                      <HiMiniCalendarDays className="size-[18px]" />
                    </div>
                    <div className="mx-1.5 flex-auto text-start">
                      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                        {preset.label}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <Calendar 
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={onDate}
              numberOfMonths={1}
            />
          </PopoverContent>
        </Popover>
      );
    case "filter":
      return (
        <Popover>
          <PopoverTrigger asChild>
            {triggerButton}
          </PopoverTrigger>
          <PopoverContent className="w-[220px] min-w-[180px] max-w-[calc(100vw-24px)] h-full max-h-[50vh] p-0 overflow-hidden flex flex-col">
            <div className="flex flex-col py-1">
              <div className="flex justify-between text-[#37352f80] text-xs mb-1.5 mx-2">
                <div className="flex items-center">
                  <span className="shrink whitespace-nowrap overflow-hidden text-ellipsis">
                    {label}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="mx-0.5 transition px-0.5 rounded-[4px] hover:bg-[#37352f0f] shrink-0">
                        <div className="flex items-center gap-0.5">
                          <span className="text-[#37352fa6] font-medium text-xs">
                            contains
                          </span>
                          <ChevronDownIcon className="size-3" />
                        </div>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[190px]" align="center">
                      {FILTER_CONDITIONS.map((condition) => (
                        <DropdownMenuItem key={condition.value}>
                          <span>{condition.label}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-4 rounded-sm text-[#7C7C78] hover:text-[#7C7C78]">
                      <MoreHorizontalIcon className="size-[14px]" /> 
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start" className="w-[240px]">
                    <DropdownMenuItem className="focus:text-[#eb5757]" onClick={() => onDelete(label)}>
                      <Trash2Icon className="size-4" />
                      Delete filter
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ListFilterIcon className="size-4" />
                      Add to advanced filter
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="pt-3 pb-2 mx-2">
                <input 
                  value={""}
                  onChange={() => {}}
                  placeholder="Type a value..."
                  className="max-w-full w-full whitespace-pre-wrap break-words grow text-sm py-1 px-2.5 rounded-md shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] bg-[#f2f1ee99] focus-visible:outline-none text-[#37352f] placeholder:text-[#91918e] font-light dark:bg-[#ffffff0e] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.075)] dark:text-[#ffffffcf] focus-visible:shadow-[inset_0_0_0_1px_rgba(35,131,226,0.57),0_0_0_2px_rgba(35,131,226,0.35)]"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      );
    case "sort":
      return (
        <Popover>
          <PopoverTrigger asChild>
            {triggerButton}
          </PopoverTrigger>
          <PopoverContent className="flex flex-col w-full h-full max-h-[80vh] p-0">
            <div className="flex flex-col px-2 py-2 w-full">
                <div className="flex items-center w-full min-h-7 text-sm">
                  <div className="flex-auto mx-3">
                    <div className="flex items-center whitespace-nowrap space-x-2">
                      <Button variant="outline" size="md" className="text-sm text-[#37352f]">
                        {/* <icon className="size-4 text-[#a4a4a2]" /> */}
                        {label}
                        <ChevronDownIcon className="size-3 text-[#a4a4a2]" />
                      </Button>
                      <Button variant="outline" size="md" className="text-sm text-[#37352f]">
                        Ascending
                        <ChevronDownIcon className="size-3 text-[#a4a4a2]" />
                      </Button>
                    </div>
                  </div>
                </div>
              <div className="flex flex-col pt-1">
                <div 
                  className="w-[calc(100%-8px)] mx-1 rounded-[6px] hover:bg-[#37352f0f] cursor-pointer group transition-colors"
                  onClick={onRemove}
                >
                  <div className="flex items-center w-full min-h-7">
                    <div className="flex items-center justify-center ml-2.5 mr-1">
                      <Trash2Icon className="size-4 text-[#9A9A97] group-hover:text-[#eb5757]" />
                    </div>
                    <div className="ml-1.5 mr-3 min-w-0">
                      <p className="text-[#37352fa6] text-sm whitespace-pre-wrap overflow-hidden text-ellipsis group-hover:text-[#eb5757]">
                        Delete sort
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      );
  }
}