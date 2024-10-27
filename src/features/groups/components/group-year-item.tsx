import React from "react";

import { PlusIcon } from "lucide-react";
import { HiMiniCalendarDays } from "react-icons/hi2";

import { IconWrapper } from "@/components/icon-wrapper";
import { WorkspaceItem } from "@/components/workspace-item";

import { GroupItem } from "@/features/groups/components/group-item";

import { GroupSidebarType } from "@/features/groups/types";
import { useGroupItemChild } from "@/features/groups/stores/use-group-item-child";

interface GroupYearItemProps {
  year: string;
  isChild: boolean;
  onClick: () => void;
  onChild: () => void;
  data: GroupSidebarType;
}

export const GroupYearItem = ({
  year,
  isChild,
  onClick,
  onChild,
  data
}: GroupYearItemProps) => {
  const {
    isOpen: openGroupItemChild,
    onToggle: toggleGroupItemChild,
  } = useGroupItemChild();

  return (
    <React.Fragment>
      <WorkspaceItem 
        label={year}
        showBadge={year === new Date().getFullYear().toString()}
        sideButton={
          <button onClick={onClick} className="transition relative flex items-center justify-center size-6 rounded-sm text-[#91918e] hover:bg-[#37352f0f]">
            <PlusIcon className="size-[18px]" />
          </button> 
        }
      >
        <IconWrapper 
          isOpen={isChild}
          onClick={onChild}
          indent="ml-3"
          className="bg-[#37352f0f] text-[#91918e]"
        >
          <HiMiniCalendarDays className="size-[18px]" />
        </IconWrapper>
      </WorkspaceItem>
      {isChild && (
        data ? (
          data.map((group) => {
            const isChild = openGroupItemChild[group.id];

            return (
              <GroupItem 
                key={group.id}
                data={group}
                isChild={isChild}
                onChlid={() => toggleGroupItemChild(group.id)}
              />
            );
          })
        ) : (
          <div className="h-[30px]">
            No Data
          </div>
        )
      )}
    </React.Fragment>
  );
}