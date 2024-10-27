import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GroupSidebarType } from "../types";
import { CopyIcon, LinkIcon, MoveUpRightIcon, SquarePenIcon, StarIcon, Trash2Icon } from "lucide-react";

interface GroupActionsProps {
  children: React.ReactNode;
  data: GroupSidebarType[0];
  onRename: () => void;
}

export const GroupActions = ({ 
  children, 
  data,
  onRename,
}: GroupActionsProps) => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        side="right" 
        align="start" 
        sideOffset={8} 
        className="w-[265px]"
      >
        <DropdownMenuItem onClick={onRename}>
          <StarIcon className="size-4" />
          Add to Favorite
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onRename}>
          <LinkIcon className="size-4" />
          Copy link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onRename}>
          <CopyIcon className="size-4" />
          <span className="flex-auto">Duplicate</span>
          <span className="text-xs text-[#37352f80]">Ctrl+D</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onRename}>
          <SquarePenIcon className="size-4" />
          <span className="flex-auto">Rename</span>
          <span className="text-xs text-[#37352f80]">Ctrl+Shift+R</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onRename} className="focus:text-[#eb5757]">
          <Trash2Icon className="size-4" />
          Move to trash
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onRename}>
          <MoveUpRightIcon className="size-4" />
          Open in new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}