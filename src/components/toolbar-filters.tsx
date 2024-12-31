import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Filter } from "@/components/filter";
import { FiltersPopover } from "@/components/filters-popover";

import { useFilter } from "@/stores/use-filter";
import { useSort } from "@/stores/use-sort";

export const ToolbarFilters = () => {
  const { activeSort } = useSort();
  const { activeFilters, onOpen } = useFilter();

  return (
    <div className="w-full">
      <div className="flex items-center">
        <div className="relative grow-0 overflow-hidden">
          <div className="flex items-center pt-3 pb-2 overflow-x-auto overflow-y-hidden space-x-2">
            {activeSort && (
              <Filter
                icon={activeSort.icon}
                label={activeSort.label}
                data={[]}
                isSelected={true}
                variant="sort"
              />
            )}
            <Separator orientation="vertical" className="h-6 w-[0.5px]" /> 
            {activeFilters.map((filter, index) => (
              <Filter 
                key={index}
                icon={filter.icon}
                label={filter.label}
                data={[]}
                isSelected={false}
                variant="filter"
              />
            ))}
            <FiltersPopover variant="table">
              <Button 
                variant="ghost" 
                size="ms" 
                className="text-[#37352f80] hover:text-[#37352f80] gap-1"
                onClick={() => {
                  setTimeout(() => {
                    onOpen("table");
                  }, 10);
                }}
              >
                <PlusIcon className="size-4 text-[#9A9A97]" />
                Add filter
              </Button>
            </FiltersPopover>
          </div>
        </div>
      </div>
    </div>
  );
}