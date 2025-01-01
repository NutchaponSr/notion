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
import { FolderLibraryIcon, Notebook1Icon, UsersIcon } from "./icons";

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
          {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Skeleton className="h-6 w-6 rounded-sm" />
            <Skeleton className="h-3 w-2/4 rounded-full" />
          </div>
          ))}
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
            className="bg-[#f5e0e9] dark:bg-[#4e2c3c]"
          >
            <FolderLibraryIcon className="size-[18px]" variant="SOLID" fill="#ac5488" />
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
            className="bg-[#fadec9] dark:bg-[#5c3b23]"
          >
            <Notebook1Icon className="size-[18px]" variant="SOLID" fill="#c47830" />
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
                fill={category.fill}
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
            className="bg-[#d8e5ee] dark:bg-[#143a4e]"
          >
            <UsersIcon className="size-[18px]" variant="SOLID" fill="#527da5" />
          </IconWrapper>
        </WorkspaceItem> 
      </div>
    </div>
  );
}