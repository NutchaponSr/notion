import React from "react";

import { cn } from "@/lib/utils";

import {
  Notebook2Icon,
  PlusIcon,
} from "@/components/icons";
import { IconWrapper } from "@/components/icon-wrapper";
import { WorkspaceItem, WorkspaceSubItem } from "@/components/workspace-item";

import { CompetencyInstant } from "@/features/competencies/types";
import { CompetencyItem } from "./competency-item";

interface CategoryProps {
  label: string;
  query: string;
  className: string[];
  isChild: boolean;
  data: CompetencyInstant[];
  onChild: () => void;
  onClick: () => void;
}

export const Category = ({
  label,
  query,
  className,
  isChild,
  data,
  onChild,
  onClick
}: CategoryProps) => {
  const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    onClick();
  }

  return (
    <React.Fragment>
      <WorkspaceItem 
        label={label} 
        href={`/competencies?type=${query}`}
        sideButton={
          <button onClick={handleOnClick} className="transition relative flex items-center justify-center size-6 rounded-sm hover:bg-[#37352f0f] dark:hover:bg-[#ffffff0e]">
            <PlusIcon className="size-[18px] text-[#91918e]" />
          </button> 
        }
      >
        <IconWrapper
          indent="ml-3"
          isOpen={isChild}
          onClick={onChild}
          className={className[0]}
        >
          <Notebook2Icon className={cn(className[1], "size-4")} variant="BULK" />
        </IconWrapper>
      </WorkspaceItem>
      {isChild && (
        data ? (
          data.map((item) => {

            return (
              <CompetencyItem 
                key={item.id}
                data={item}
              />
            );
          })
        ) : (
          <WorkspaceSubItem indent="ml-5">
            competency
          </WorkspaceSubItem>
        )
      )}
    </React.Fragment>
  ); 
}