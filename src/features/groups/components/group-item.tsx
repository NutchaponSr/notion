import React from "react";

import { useEffect, useRef, useState } from "react";
import { HashIcon, MoreHorizontalIcon } from "lucide-react";

import { IconWrapper } from "@/components/icon-wrapper";
import { WorkspaceItem } from "@/components/workspace-item";

import { GroupActions } from "@/features/groups/components/group-actions";
import { GroupRenamePopover } from "@/features/groups/components/group-rename-popover";

interface GroupItemProps {
  isChild: boolean;
  onChlid: () => void;
  data: {
    id: string;
    name: string;
    icon: string | null;
    year: string;
  }
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

  const handleOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    onChlid();
  }

  return (
    <React.Fragment>
      <div ref={itemRef}>
        <WorkspaceItem 
          href={`/groups/${data.id}`}
          label={data.name}
          sideButton={
            <GroupActions data={data} onRename={onRename}>
              <button className="transition relative flex items-center justify-center size-6 rounded-sm text-[#91918e] hover:bg-[#37352f0f]">
                <MoreHorizontalIcon className="size-[18px]" />
              </button> 
            </GroupActions>
          }
        >
          <IconWrapper 
            isOpen={isChild}
            onClick={() => handleOnClick}
            indent="ml-5"
            className="text-[#91918e]"
          >
            <HashIcon className="size-[18px]" />
          </IconWrapper>
        </WorkspaceItem>
      </div>
      {/* TODO: Group navigates */}
      <GroupRenamePopover 
        data={data}
        isOpen={isRename}
        height={height}
        onClose={() => setIsRename(false)}
      />
    </React.Fragment>
  );
}