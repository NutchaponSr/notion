import { 
  CircleHelpIcon, 
  CornerUpLeftIcon, 
  FileIcon, 
  HashIcon, 
  Trash2Icon 
} from "lucide-react";
import { useState } from "react";
import { Category } from "@/types";
import { 
  HiMiniBuildingLibrary, 
  HiMiniCircleStack, 
  HiOutlineTrash, 
  HiUser 
} from "react-icons/hi2";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import { FilterCommand } from "@/components/filter-command";

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
        <button className="flex items-center h-[30px] w-full hover:bg-[#00000008] focus-visible:ring-0 focus-visible:outline-none p-1">
          <div className="shrink-0 grow-0 rounded-sm size-[22px] flex justify-center items-center ml-1 mr-2">
            <Trash2Icon className="size-[18px] text-[#91918e]" />
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
                  className="max-w-full w-full whitespace-pre-wrap break-words grow text-sm py-1 px-2.5 rounded-sm shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] bg-[#f2f1ee99] focus-visible:outline-none text-[#37352f] placeholder:text-[#91918e] font-light"
                />
              </div>
            </div>
            <div className="flex flex-row mx-2 space-x-1.5">
              <FilterCommand
                icon={HiUser}
                isSelected={isPeopleSelected}
                label="Last edited by"
                placeholder="Search people"
                data={trashs?.updatedPeoples}
                onSelect={(value: string[]) => setPeoples(value)}
              />
              <FilterCommand
                icon={FileIcon}
                isSelected={isCategorySelected}
                label="In"
                placeholder="Search in"
                data={[
                  { name: Category.COMPETENCY, icon: HiMiniBuildingLibrary },
                  { name: Category.GROUP, icon: HiMiniCircleStack },
                ]}
                onSelect={(value: string[]) => setCategories(value as Category[])}
              />
            </div>
          </div>
          <ScrollArea className="grow overflow-x-hidden overflow-y-auto">
            <div className="py-1.5 h-full">
              {loadingTrashs ? (
                <div className="flex flex-col items-center justify-center h-full space-y-2">
                  <HiOutlineTrash className="text-[#c7c6c4] size-9" />
                  <div className="text-sm font-semibold text-[#787774]">
                    Trashed stuff appear here 
                  </div>
                </div>
              ) : (
                filteredTrashs.length <= 0 ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-2">
                    <HiOutlineTrash className="text-[#c7c6c4] size-9" />
                    <div className="text-sm font-semibold text-[#787774]">
                      No results
                    </div>
                  </div>
                ) : (
                  filteredTrashs?.map((item) => (
                    <div 
                      key={item.id}
                      className="mx-2 rounded-md hover:bg-[#37352f0f] transition"
                    >
                      <div className="flex items-center w-full min-h-7 h-7 text-sm py-1">
                        <div className="flex items-center justify-center ml-2.5 mr-1">
                          <div className="flex items-center justify-center size-5 shrink-0 text-base">
                          {item.icon ? (
                            item.icon
                          ) : (
                            <HashIcon className="size-[18px] text-[#91918e]" />
                          )}
                          </div>
                        </div>
                        <div className="flex-auto mx-1.5">
                          <div className="flex flex-row space-x-1 items-center">
                            <h2 className="whitespace-nowrap overflow-hidden text-ellipsis text-[#37352f] text-sm">
                              {item.name}
                            </h2>
                            <Separator className="w-3 h-[1px] bg-[#37352f80]" />
                            <p className="whitespace-nowrap overflow-hidden text-ellipsis text-[#37352f80] text-xs">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <div className="ml-auto mr-2.5">
                          <div className="flex gap-1">
                            <Button onClick={item.onRestore} variant="ghost" className="size-6 hover:bg-[#37352f0f] text-[#a4a4a2] hover:text-[#a4a4a2] rounded-sm">
                              <CornerUpLeftIcon />
                            </Button>
                            <Button onClick={item.onDelete} variant="ghost" className="size-6 hover:bg-[#37352f0f] text-[#a4a4a2] hover:text-[#a4a4a2] rounded-sm">
                              <Trash2Icon />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )
              )}
            </div>
          </ScrollArea>
          <footer className="shrink-0">
            <div className="py-2 bg-[#2383e212]">
              <div className="px-2 text-xs text-[#37352fa6] dark:text-[#ffffff71] flex items-center justify-between">
                <p> Pages in Trash for over 30 days will be automatically deleted</p>
                <button className="size-6 hover:bg-[#37352f0f] rounded-sm flex justify-center items-center flex-shrink-0">
                  <CircleHelpIcon className="size-4" />
                </button>
              </div>
            </div>
          </footer>
        </div>
      </PopoverContent>
    </Popover>
  );
}