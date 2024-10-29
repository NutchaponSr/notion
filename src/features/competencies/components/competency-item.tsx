import { MoreHorizontalIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { IconWrapper } from "@/components/icon-wrapper";
import { WorkspaceItem } from "@/components/workspace-item";

import { CompetencyInstant } from "../types";
import { CompetencyActions } from "./competency-actions";
import { CompetencyRenamePopover } from "./competency-rename-popover";

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
              <button className="transition relative flex items-center justify-center size-6 rounded-sm text-[#91918e] hover:bg-[#37352f0f]">
                <MoreHorizontalIcon className="size-[18px]" />
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