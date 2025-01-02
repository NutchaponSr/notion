import { SquareDashedKanbanIcon } from "lucide-react";

import {
  FolderLibraryIcon,
  Notebook1Icon,
  UsersIcon,
} from "@/components/icons";
import { WorkspaceCard } from "@/components/workspace-card";


export const WorkspaceList = () => {
  return (
    <div className="col-start-2">
      <div className="w-full flex flex-row items-center h-11 ml-2">
        <div className="flex-shrink-0 flex justify-between items-center">
          <div className="flex items-center flex-shrink-0 w-full">
            <div className="flex justify-center items-center">
              <SquareDashedKanbanIcon className="text-[#787774] dark:text-[#7f7f7f] size-4 mr-2" />
            </div>
            <span className="text-xs font-medium text-[#787774] dark:text-[#7f7f7f]">Workspace</span>
          </div>
        </div>
      </div>
      <div className="relative min-h-[149px]">
        <div className="-ml-6 mr-0 -mb-8 overflow-x-auto overflow-y-hidden">
          <div className="grid grid-cols-3 gap-4 px-8 pt-[2px] pb-6">
            <WorkspaceCard 
              href="/groups"
              className={[
                "bg-[#f5e0e9] dark:bg-[#4e2c3c]",
                "fill-[#ac5488] dark:fill-[#b24b78]"
              ]}
              icon={FolderLibraryIcon}
              title="Group"
              description="Combining diverse skills to achieve shared goals."
            />
            <WorkspaceCard 
              href="/competencies"
              className={[
                "bg-[#fadec9] dark:bg-[#5c3b23]",
                "fill-[#c47830] dark:fill-[#c37a38]"
              ]}
              icon={Notebook1Icon}
              title="Competency"
              description="Diverse skills and competencies to achieve shared goals."
            />
            <WorkspaceCard 
              href="/employees"
              className={[
                "bg-[#d8e5ee] dark:bg-[#143a4e]",
                "fill-[#527da5] dark:fill-[#527cca]"
              ]}
              icon={UsersIcon}
              title="Employee"
              description="Manage employees with diverse competencies to achieve goals."
            />
          </div>
        </div>
      </div>
    </div>
  );
}