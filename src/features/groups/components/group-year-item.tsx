import React from "react";

import { HashIcon, LucideIcon, MoreHorizontalIcon } from "lucide-react";
import { InferResponseType } from "hono";
import { HiMiniCalendarDays } from "react-icons/hi2";

import { IconWrapper } from "@/components/icon-wrapper";
import { WorkspaceItem } from "@/components/workspace-item";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.groups["instant"]["$get"], 200>["data"][0];

interface GroupYearItemProps {
  year: string;
  icon: LucideIcon;
  isChild: boolean;
  onClick: () => void;
  onChild: () => void;
  data: ResponseType;
}

export const GroupYearItem = ({
  year,
  icon,
  isChild,
  onClick,
  onChild,
  data
}: GroupYearItemProps) => {
  return (
    <React.Fragment>
      <WorkspaceItem 
        label={year}
        onClick={onClick}
        icon={icon}
        showSideMenu
        showBadge={year === new Date().getFullYear().toString()}
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
          data.map((group) => (
            <WorkspaceItem 
              label={group.name}
              key={group.id} 
              onClick={() => {}}
              icon={MoreHorizontalIcon}
              showSideMenu
            >
              <IconWrapper 
                isOpen={false}
                onClick={() => {}}
                indent="ml-5"
                className="text-[#91918e]"
              >
                <HashIcon className="size-[18px]" />
              </IconWrapper>
            </WorkspaceItem>
          ))
        ) : (
          <div className="h-[30px]">
            No Data
          </div>
        )
      )}
    </React.Fragment>
  );
}