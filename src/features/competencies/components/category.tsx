import React from "react";

import { PlusIcon } from "lucide-react";
import { SiGitbook } from "react-icons/si";

import { cn } from "@/lib/utils";

import { IconWrapper } from "@/components/icon-wrapper";
import { WorkspaceItem } from "@/components/workspace-item";

interface CategoryProps {
  label: string;
  query: string;
  className: string[];
  isChild: boolean;
  onChild: () => void;
}

export const Category = ({
  label,
  query,
  className,
  isChild,
  onChild
}: CategoryProps) => {

  return (
    <React.Fragment>
      <WorkspaceItem 
        label={label} 
        href={`/competencies?type=${query}`}
        sideButton={
          <button onClick={() => {}} className="transition relative flex items-center justify-center size-6 rounded-sm text-[#91918e] hover:bg-[#37352f0f]">
            <PlusIcon className="size-[18px]" />
          </button> 
        }
      >
        <IconWrapper
          indent="ml-3"
          isOpen={isChild}
          onClick={onChild}
          className={className[0]}
        >
          <SiGitbook className={cn(className[1], "size-4")} />
        </IconWrapper>
      </WorkspaceItem>
      {isChild && (
        <div>
          competency
        </div>
      )}
    </React.Fragment>
  ); 
}