import { useState } from "react";
import { IconType } from "react-icons/lib";
import { GiCheckMark } from "react-icons/gi";
import { ChevronDownIcon, LucideIcon } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/features/auth/components/user-avatar";
import { cn } from "@/lib/utils";

interface FilterCommandProps {
  icon: IconType | LucideIcon;
  label: string;
  data: {
    name: string;
    image?: string | null;
    icon?: LucideIcon | IconType;
  }[] | undefined;
  onSelect: (value: string[]) => void;
  isSelected: boolean;
  placeholder: string;
}

export const FilterCommand = ({
  icon: Icon,
  label,
  data,
  onSelect,
  isSelected,
  placeholder
}: FilterCommandProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelect = (itemName: string) => {
    const newSelection = selectedItems.includes(itemName)
      ? selectedItems.filter(item => item !== itemName)
      : [...selectedItems, itemName]; 

    setSelectedItems(newSelection); 
    onSelect(newSelection); 
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          size="filter" 
          variant={isSelected ? "active": "outline"} 
          className="gap-1"
        >
          <Icon size={12} />
          <span>{label}</span>
          <ChevronDownIcon className={cn(
            isSelected ? "text-[#2383e2]" : "text-[#b9b9b7]"
          )} />
        </Button>
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
}