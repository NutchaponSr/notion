import React from "react";

import { useEffect, useRef, useState } from "react";
import { DotIcon, MoreHorizontalIcon } from "lucide-react";

import { IconWrapper } from "@/components/icon-wrapper";
import { WorkspaceItem, WorkspaceSubItem } from "@/components/workspace-item";

import { GroupActions } from "@/features/groups/components/group-actions";
import { GroupRenamePopover } from "@/features/groups/components/group-rename-popover";
import { GroupInstant } from "../types";
import { HashIcon } from "@/components/icons";

interface GroupItemProps {
  isChild: boolean;
  onChlid: () => void;
  data: GroupInstant;
}

export const GroupItem = ({
  data,
  isChild,
  onChlid
}: GroupItemProps) => {
  const [height, setHeight] = useState(0);
  const [isRename, setIsRename] = useState(false);

  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRename && itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      setHeight(rect.top);
    }
  }, [isRename]);

  const onRename = () => {
    setTimeout(() => {
      setIsRename(true);
    }, 200);
  };

  return (
    <React.Fragment>
      <div ref={itemRef}>
        <WorkspaceItem 
          href={`/groups/${data.id}`}
          label={data.name}
          sideButton={
            <GroupActions data={data} onRename={onRename}>
              <button className="transition relative flex items-center justify-center size-6 rounded-sm text-[#91918e] hover:bg-[#37352f0f] dark:hover:bg-[#ffffff0e]">
                <MoreHorizontalIcon className="size-[18px]" />
              </button> 
            </GroupActions>
          }
        >
          <IconWrapper 
            isOpen={isChild}
            onClick={onChlid}
            indent="ml-5"
          >
            {data.icon ? (
              data.icon
            ) : (
              <HashIcon className="size-[18px] text-[#91918e]" />
            )}
          </IconWrapper>
        </WorkspaceItem>
      </div>
      {isChild && (
        <>
          <WorkspaceSubItem 
            indent="ml-7" 
            href={`/groups/${data.id}/competencies`}
          >
            <DotIcon className="size-4 mr-2" />
            Competency
          </WorkspaceSubItem>
          <WorkspaceSubItem 
            indent="ml-7" 
            href={`/groups/${data.id}/employees`}
          >
            <DotIcon className="size-4 mr-2" />
            Employee
          </WorkspaceSubItem>
        </>
      )}
      <GroupRenamePopover 
        data={data}
        isOpen={isRename}
        height={height}
        onClose={() => setIsRename(false)}
      />
    </React.Fragment>
  );
}