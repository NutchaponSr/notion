import { useState } from "react";
import { IconType } from "react-icons/lib";
import { DateRange } from "react-day-picker";
import { GiCheckMark } from "react-icons/gi";
import { HiMiniCalendarDays } from "react-icons/hi2";
import { ChevronDownIcon, LucideIcon } from "lucide-react";

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


interface FilterProps {
  icon: IconType | LucideIcon;
  label: string;
  data: {
    name: string;
    image?: string | null;
    icon?: LucideIcon | IconType;
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
  variant: "command" | "dropdown" | "calendar";
}

export const Filter = ({
  icon: Icon,
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
      <Icon className="size-[14px]" />
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
                          <item.icon className="text-[#91918e]" />
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
            <div className="my-3 pb-4 shadow-[0_1px_0_rgba(55,53,47,0.09)]">
              {presets?.map((preset) => (
                <button 
                  key={preset.label}
                  onClick={() => preset.onRange(preset.range)}
                  className="rounded-[6px] transition w-[calc(100%-8px)] mx-1 hover:bg-[#37352f0f] text-[#37352f]"
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
  }
}