import { LucideIcon } from "lucide-react";
import { Badge } from "./ui/badge";

interface WorkspaceItemProps {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  showSideMenu?: boolean;
  showBadge?: boolean;
  icon?: LucideIcon;
}

export const WorkspaceItem = ({
  children,
  label,
  onClick,
  showBadge,
  showSideMenu = false,
  icon: Icon
}: WorkspaceItemProps) => {
  return (
    <div className="flex items-center h-[30px] w-full hover:bg-[#00000008] p-1 group/workspace cursor-pointer">
      {children}
      <div className="flex-auto whitespace-nowrap overflow-hidden text-clip flex items-center space-x-2">
        <div className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">
          {label}
        </div>
        {showBadge && (
          <Badge className="rounded-sm h-[18px] shadow-[0px_0px_0px_1px_rgba(91,151,189,.12)_inset,0_1px_2px_rgba(91,151,189,.12)_inset]">
            current
          </Badge>
        )}
      </div>
      {showSideMenu && Icon && (
        <div className="flex items-center justify-center grow-0 shrink-0 h-full">
          <div className="group-hover/workspace:opacity-100 opacity-0 transition-opacity">
            <div className="flex pl-1">
              <button onClick={onClick} className="transition relative flex items-center justify-center size-6 rounded-sm text-[#91918e] hover:bg-[#37352f0f]">
                <Icon className="size-[18px]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}