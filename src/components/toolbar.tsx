import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useSort } from "@/stores/use-sort";
import { useFilter } from "@/stores/use-filter";
import { useToolbar } from "@/stores/use-toolbar";

import { ArrowUpDownIcon, EyeIcon, FilterIcon, SearchIcon, TableIcon } from "@/components/icons"
import { SortPopover } from "@/components/sort-popover";
import { FiltersPopover } from "@/components/filters-popover";
import { ToolbarFilters } from "@/components/toolbar-filters";


export const Toolbar = () => {
  const { 
    isActive: isActiveFilter, 
    onOpen: onOpenFilter, 
  } = useFilter();
  const {
    isActive: isActiveSort,
    onOpen: onOpenSort,
  } = useSort();
  const { isToolbar, onToggle } = useToolbar();

  return (
    <div className="min-h-10 px-24 sticky left-0 shrink-0 z-[80]">
      <div className="flex items-center h-10 w-full shadow-[inset_0_-1px_0_rgb(233,233,231)]">
        <div className="flex items-center h-full grow space-x-1">
          <Button variant="ghost" size="sm">
            <TableIcon className="size-4 text-[#37352f]" />
            2024
          </Button>
          <Button variant="ghost" size="icon">
            <EyeIcon className="size-4 text-[#A4A4A2]" />
          </Button>
        </div>
        <div className="flex items-center gap-0.5">
          <FiltersPopover variant="main">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => {
                if (isActiveFilter || (!isActiveFilter && isToolbar)) {
                  onToggle();
                } else {
                  setTimeout(() => {
                    onOpenFilter("main");
                  }, 10);
                }
              }}
            >
              <FilterIcon className="size-4 text-[#A4A4A2]" />
            </Button>
          </FiltersPopover>
          <SortPopover>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => {
                if (isActiveSort || (!isActiveSort && isToolbar)) {
                  onToggle();
                } else {
                  setTimeout(() => {
                    onOpenSort();
                  }, 10);
                }
              }}
            >
              <ArrowUpDownIcon className={cn("size-4 text-[#A4A4A2]", isActiveSort && "text-[#2383e2]")} />
            </Button>
          </SortPopover>
          <Button variant="ghost" size="icon">
            <SearchIcon className="size-4 text-[#A4A4A2]" />
          </Button>
          <Button variant="primary" size="sm" className="shadow-none">
            New
          </Button>
        </div>
      </div>
      {(isActiveFilter || isActiveSort) && isToolbar && (
        <ToolbarFilters />
      )}
    </div>
  );
}