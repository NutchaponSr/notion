import { startOfToday, subDays } from "date-fns";

import { Category } from "@/types";

import { Separator } from "@/components/ui/separator";

import { 
  ArrowUpDownIcon, 
  CalendarDaysIcon, 
  File1Icon, 
  FolderLibraryIcon, 
  Notebook1Icon, 
  UserIcon 
} from "@/components/icons";
import { Filter } from "@/components/filter";

import { useSort } from "@/features/search/hooks/use-sort";
import { useDate } from "@/features/search/hooks/use-date";
import { useFilter } from "@/features/search/stores/use-filter";

interface SearchFilterProps {
  createdBy: {
    name: string;
    image: string | null;
  }[] | undefined;
}

export const SearchFilter = ({
  createdBy = []
}: SearchFilterProps) => {
  const { 
    bestMatch, 
    editedAsc,
    editedDesc,
    createdAsc,
    createdDesc
  } = useSort();
  const {
    date,
    onClear,
    onDate,
    onPreset
  } = useDate();
  const {
    peoples,
    categories,
    onPeoples,
    onCategories,
  } = useFilter();

  const isPeopleSelected = peoples.length > 0;
  const isCategorySelected = categories.length > 0;

  return (
    <div className="relative grow-0 overflow-hidden">
      <div className="flex items-center py-2.5 px-3 overflow-x-auto overflow-y-hidden space-x-1.5">
        <Filter 
          icon={ArrowUpDownIcon}
          iconVariant="STROKE"
          variant="dropdown"
          label="Sort"
          isSelected={false}
          onSelect={() => {}}
          data={[
            { name: "Best match", onClick: () => bestMatch() },
            { name: "Last edited: Newest first", onClick: () => editedDesc() },
            { name: "Last edited: Oldest first", onClick: () => editedAsc() },
            { name: "Created: Newest first", onClick: () => createdDesc() },
            { name: "Created: Oldest first", onClick: () => createdAsc() },
          ]}
        />
        <Separator orientation="vertical" className="h-4 rounded-md bg-[#37352f29]" />
        <Filter 
          icon={UserIcon}
          iconVariant="SOLID"
          variant="command"
          label={isPeopleSelected
            ? `Created by: ${peoples.join(", ")}`
            : "Created by"
          }
          isSelected={isPeopleSelected}
          onSelect={onPeoples}
          data={createdBy}
        />
        <Filter 
          icon={File1Icon}
          iconVariant="STROKE"
          variant="command"
          label={isCategorySelected
            ? `In: ${categories.join(", ")}`
            : "In"
          }
          isSelected={isCategorySelected}
          onSelect={onCategories}
          data={[
            { name: Category.COMPETENCY, icon: Notebook1Icon },
            { name: Category.GROUP, icon: FolderLibraryIcon },
          ]}
        />
        <Filter 
          icon={CalendarDaysIcon}
          variant="calendar"
          label="Date"
          iconVariant="STROKE"
          isSelected={date !== undefined}
          onDate={onDate}
          onClear={onClear}
          date={date}
          data={undefined}
          presets={[
            {
              range: {
                from: startOfToday(),
                to: undefined,
              },
              label: "Today",
              onRange: onPreset
            },
            {
              range: {
                from: subDays(startOfToday(), 7),
                to: startOfToday(),
              },
              label: "Last 7 days",
              onRange: onPreset
            },
            {
              range: {
                from: subDays(startOfToday(), 30),
                to: startOfToday(),
              },
              label: "Last 30 days",
              onRange: onPreset
            },
          ]}
        />
      </div>
    </div>
  );
}