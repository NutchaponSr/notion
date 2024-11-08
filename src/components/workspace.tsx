import { 
  HiMiniBuildingLibrary, 
  HiMiniCircleStack,
  HiMiniUsers
} from "react-icons/hi2";

import { typesCompetency } from "@/db/schema";

import { Skeleton } from "@/components/ui/skeleton";

import { IconWrapper } from "@/components/icon-wrapper";
import { WorkspaceItem, WorkspaceSubItem } from "@/components/workspace-item";

import { Category } from "@/features/competencies/components/category";
import { GroupYearItem } from "@/features/groups/components/group-year-item";

import { categories } from "@/features/competencies/types";
import { useGroupChild } from "@/features/groups/stores/use-group-child";
import { useCategory } from "@/features/competencies/stores/use-category";
import { useGroupYearChild } from "@/features/groups/stores/use-group-year-child";
import { useGetInstantGroup } from "@/features/groups/api/use-get-instant-groups";
import { useCreateInstantGroup } from "@/features/groups/api/use-create-instant-group";
import { useCompetencyChild } from "@/features/competencies/stores/use-competency-child";
import { useCreateInstantCompetency } from "@/features/competencies/api/use-create-instant-group";
import { useGetInstantCompetencies } from "@/features/competencies/api/use-get-instant-competencies";

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
  const { mutate: createCompetency } = useCreateInstantCompetency();
  const { data: groups, isLoading: loadingGroups } = useGetInstantGroup();
  const { data: competencies, isLoading: loadingCompetencies } = useGetInstantCompetencies();

  const isLoading = loadingGroups || loadingCompetencies;

  const { 
    isOpen: openGroupYearChild,
    onToggle: toggleGroupYearChild,
  } = useGroupYearChild();

  if (isLoading || !groups || !competencies) {
    return (
      <div className="flex flex-col w-full mb-3 px-1">
        <div className="flex items-center px-3 py-1.5 text-xs text-[#91918e]">
          Workspace
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-[26px] w-full rounded-sm" />
          <Skeleton className="h-[26px] w-full rounded-sm" />
          <Skeleton className="h-[26px] w-full rounded-sm" />
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
          <WorkspaceSubItem indent="ml-3">
            More detail...
          </WorkspaceSubItem>
        )}
        <WorkspaceItem label="Competency" href="/competencies">
          <IconWrapper
            indent="ml-1"
            isOpen={openCompetencyChild}
            onClick={toggleCompetencyChild}
            className="bg-[#fadec9] text-[#c47830] dark:bg-[#5c3b23] dark:text-[#c37a38]"
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
                data={competencies[category.query as typeof typesCompetency.enumValues[number]]}
                onChild={() => toggleCategoryChild(category.label)}
                onClick={() => createCompetency({
                  json: {
                    type: category.query as typeof typesCompetency.enumValues[number]
                  }
                })}
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