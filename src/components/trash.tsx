import { useState } from "react";
import { Category } from "@/types";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

import { 
  File1Icon,
  FolderLibraryIcon,
  HelpCircleIcon,
  Notebook1Icon,
  TrashIcon, 
  UserIcon
} from "@/components/icons";
import { Filter } from "@/components/filter";
import { TrashItem } from "@/components/trash-item";

import { useTrashs } from "@/features/trashs/stores/use-trashs";
import { useGetTrashs } from "@/features/trashs/api/use-get-trashs";
import { useDeleteGroup } from "@/features/groups/api/use-delete-group";
import { useReStoreGroup } from "@/features/groups/api/use-restore-group";
import { useDeleteCompetency } from "@/features/competencies/api/use-delete-competency";
import { useReStoreCompetency } from "@/features/competencies/api/use-restore-competency";


export const Trash = () => {
  const { 
    data: trashs, 
    isLoading: loadingTrashs 
  } = useGetTrashs();
  const { onOpen } = useTrashs();
  const { mutate: deleteGroup } = useDeleteGroup();
  const { mutate: restoreGroup } = useReStoreGroup();
  const { mutate: deleteCompetency } = useDeleteCompetency();
  const { mutate: restoreCompetency } = useReStoreCompetency();

  const [search, setSearch] = useState("");
  const [peoples, setPeoples] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const initialTrashs = trashs?.populatedData.map((trash) => ({
    ...trash,
    onRestore: () => trash.type === Category.COMPETENCY 
      ? restoreCompetency({ param: { id: trash.id } }) 
      : restoreGroup({ param: { id: trash.id } }),
    onDelete: () =>  trash.type === Category.COMPETENCY 
      ? deleteCompetency({ param: { id: trash.id } }) 
      : deleteGroup({ param: { id: trash.id } })
  })) || [];

  const filteredTrashs = peoples.length <= 0 || categories.length <= 0
    ? initialTrashs.filter((item) => {
      const matchesPeople = peoples.length === 0 || peoples.includes(item.updatedBy);
      const matchesCategories = categories.length === 0 || categories.includes(item.type);
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      return matchesPeople && matchesCategories && matchesSearch;
    }) 
    : initialTrashs

  const isPeopleSelected = peoples.length > 0;
  const isCategorySelected = categories.length > 0;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button onClick={onOpen} className="flex items-center h-[30px] w-full hover:bg-[#00000008] dark:hover:bg-[#ffffff0e] focus-visible:ring-0 focus-visible:outline-none p-1">
          <div className="shrink-0 grow-0 rounded-sm size-[22px] flex justify-center items-center ml-1 mr-2">
            <TrashIcon variant="BULK" className="size-[18px]" fill="#91918e" />
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
          <div className="shrink-0 my-2.5 space-y-2.5">
            <div className="flex items-center w-full min-h-7">
              <div className="mx-2 flex-auto">
                <input 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search in Trash"
                  className="max-w-full w-full whitespace-pre-wrap break-words grow text-sm py-1 px-2.5 rounded-sm shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] bg-[#f2f1ee99] focus-visible:outline-none text-[#37352f] placeholder:text-[#91918e] font-light dark:bg-[#ffffff0e] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.075)] dark:text-[#ffffffcf]"
                />
              </div>
            </div>
            <div className="flex flex-row mx-2 space-x-1.5">
              <Filter
                icon={UserIcon}
                iconVariant="SOLID"
                variant="command"
                isSelected={isPeopleSelected}
                label="Last edited by"
                placeholder="Search people"
                data={trashs?.updatedPeoples}
                onSelect={(value: string[]) => setPeoples(value)}
              />
              <Filter
                icon={File1Icon}
                iconVariant="STROKE"
                variant="command"
                isSelected={isCategorySelected}
                label="In"
                placeholder="Search in"
                data={[
                  { name: Category.COMPETENCY, icon: Notebook1Icon },
                  { name: Category.GROUP, icon: FolderLibraryIcon },
                ]}
                onSelect={(value: string[]) => setCategories(value as Category[])}
              />
            </div>
          </div>
          <ScrollArea className="grow overflow-x-hidden overflow-y-auto">
            <div className="py-1.5 h-full">
              {loadingTrashs ? (
                <div className="flex flex-col items-center justify-center h-full space-y-2">
                  <TrashIcon className="text-[#c7c6c4] size-9" />
                  <div className="text-sm font-semibold text-[#787774]">
                    Trashed stuff appear here 
                  </div>
                </div>
              ) : (
                filteredTrashs.length <= 0 ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-2">
                    <TrashIcon className="text-[#c7c6c4] dark:text-[#7f7f7f] size-9" />
                    <div className="text-sm font-semibold text-[#787774] dark:text-[#7f7f7f]">
                      No results
                    </div>
                  </div>
                ) : (
                  filteredTrashs?.map((item) => (
                    <TrashItem 
                      key={item.id}
                      name={item.name}
                      icon={item.icon}
                      description={item.description}
                      onDelete={item.onDelete}
                      onRestore={item.onRestore}
                    />
                  ))
                )
              )}
            </div>
          </ScrollArea>
          <footer className="shrink-0">
            <div className="py-2 bg-[#2383e212] shadow-[0_-1px_0_rgba(55,53,47,0.09)] rounded-b-md">
              <div className="px-2 flex items-center justify-between">
                <p className="text-xs text-[#37352fa6] dark:text-[#ffffff71]">Pages in Trash for over 30 days will be automatically deleted</p>
                <button className="size-6 hover:bg-[#37352f0f] rounded-sm flex justify-center items-center flex-shrink-0">
                  <HelpCircleIcon className="size-4 text-[#37352fa6] dark:text-[#ffffff71]" />
                </button>
              </div>
            </div>
          </footer>
        </div>
      </PopoverContent>
    </Popover>
  );
}