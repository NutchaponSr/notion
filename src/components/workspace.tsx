import { 
  HiMiniBuildingLibrary, 
  HiMiniCircleStack,
  HiMiniUsers
} from "react-icons/hi2";

import { Skeleton } from "@/components/ui/skeleton";

import { IconWrapper } from "@/components/icon-wrapper";
import { WorkspaceItem } from "@/components/workspace-item";

import { Category } from "@/features/competencies/components/category";
import { GroupYearItem } from "@/features/groups/components/group-year-item";

import { categories } from "@/features/competencies/types";
import { useGroupChild } from "@/features/groups/stores/use-group-child";
import { useCategory } from "@/features/competencies/stores/use-category";
import { useGroupYearChild } from "@/features/groups/stores/use-group-year-child";
import { useGetInstantGroup } from "@/features/groups/api/use-get-instant-groups";
import { useCreateInstantGroup } from "@/features/groups/api/use-create-instant-group";
import { useCompetencyChild } from "@/features/competencies/stores/use-competency-child";

export const Workspace = () => {
  const {
    isOpen: openGroupChild,
    onToggle: toggleGroupChild,
  } = useGroupChild();
  const {
    isOpen: openCompetencyChild,
    onToggle: toggleCompetencyChild,
  } = useCompetencyChild();
  const {
    isOpen: openCategoryChild,
    onToggle: toggleCategoryChild,
  } = useCategory();

  const { mutate: createGroup } = useCreateInstantGroup();
  const { data: groups, isLoading: loadingGroups } = useGetInstantGroup();

  const isLoading = loadingGroups;

  const { 
    isOpen: openGroupYearChild,
    onToggle: toggleGroupYearChild,
  } = useGroupYearChild();

  if (isLoading || !groups) {
    return (
      <div className="flex flex-col w-full mb-3 px-1">
        <div className="flex items-center px-3 py-1.5 text-xs text-[#91918e]">
          Workspace
        </div>
        <div className="flex flex-col gap-[1px]">
          <Skeleton className="h-[30px] w-full rounded-sm" />
          <Skeleton className="h-[30px] w-full rounded-sm" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full mb-3">
      <div className="flex items-center px-3 py-1.5 text-xs text-[#91918e]">
        Workspace
      </div>
      <div className="flex flex-col">
        <WorkspaceItem href="/groups" label="Group">
          <IconWrapper 
            indent="ml-1"
            isOpen={openGroupChild}
            onClick={toggleGroupChild}
            className="bg-[#f5e0e9] text-[#ac5488]"
          >
            <HiMiniCircleStack className="size-[18px]" />
          </IconWrapper>
        </WorkspaceItem>       
        {openGroupChild && (
          Array.from({ length: 5 }, (_, index) => {
            const year = String(new Date().getFullYear() - index);
            const isChild = openGroupYearChild[year]; 

            return (
              <GroupYearItem 
                key={index}
                year={year}
                isChild={isChild}
                onClick={() => createGroup({
                  json: {
                    year
                  }
                })}
                onChild={() => toggleGroupYearChild(year)}
                data={groups[year]}
              />
            );
          }
        ))}
        {openGroupChild && (
          <div className="flex items-center h-[30px] w-full hover:bg-[#00000008] cursor-pointer space-x-2">
            <div className="ml-3 text-sm text-[#91918e]">
              More detail...
            </div>
          </div>
        )}
        <WorkspaceItem label="Competency" href="/competencies">
          <IconWrapper
            indent="ml-1"
            isOpen={openCompetencyChild}
            onClick={toggleCompetencyChild}
            className="bg-[#fadec9] text-[#c47830]"
          >
            <HiMiniBuildingLibrary className="size-[18px]" />
          </IconWrapper>
        </WorkspaceItem> 
        {openCompetencyChild && (
          categories.map((category, index) => {
            const isChild = openCategoryChild[category.label];

            return (
              <Category
                key={index}
                label={category.label}
                query={category.query}
                className={category.className}
                isChild={isChild}
                onChild={() => toggleCategoryChild(category.label)}
              />
            );
          })
        )}
        {/* TODO: Employee workspace */}
        <WorkspaceItem label="Employee" href="/employees">
          <IconWrapper
            indent="ml-1"
            isOpen={false}
            onClick={() => {}}
            className="bg-[#d8e5ee] text-[#527da5]"
          >
            <HiMiniUsers className="size-[18px]" />
          </IconWrapper>
        </WorkspaceItem> 
      </div>
    </div>
  );
}