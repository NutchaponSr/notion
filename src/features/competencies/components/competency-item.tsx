import React, { useEffect, useRef, useState } from "react";

import { MoreHorizontalIcon } from "@/components/icons";
import { IconWrapper } from "@/components/icon-wrapper";
import { WorkspaceItem } from "@/components/workspace-item";

import { CompetencyActions } from "@/features/competencies/components/competency-actions";
import { CompetencyRenamePopover } from "@/features/competencies/components/competency-rename-popover";
import { CompetencyInstant } from "@/features/competencies/types";

interface CompetencyItemProps {
  data: CompetencyInstant;
}

export const CompetencyItem = ({
  data
}: CompetencyItemProps) => {
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
          label={data.name} 
          href={`/compotencies/${data.id}`}
          sideButton={
            <CompetencyActions data={data} onRename={onRename}>
              <button className="transition relative flex items-center justify-center size-6 rounded-sm hover:bg-[#37352f0f] dark:hover:bg-[#ffffff0e]">
                <MoreHorizontalIcon className="size-[18px] text-[#91918e]" />
              </button> 
            </CompetencyActions>
          }
        >
          <IconWrapper
            notChild
            indent="ml-5"
          >
            {data.icon}
          </IconWrapper>
        </WorkspaceItem>
      </div>
      <CompetencyRenamePopover 
        data={data}
        isOpen={isRename}
        onClose={() => setIsRename(false)}
        height={height}
      />
    </React.Fragment>
  );
}