import toast from "react-hot-toast";

import { 
  CopyIcon, 
  LinkIcon, 
  MoveUpRightIcon, 
  SquarePenIcon, 
  StarIcon, 
  Trash2Icon 
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { GroupSidebarType } from "@/features/groups/types";

import { useTrashGroup } from "@/features/groups/api/use-trash-group";
import { useDuplicateGroup } from "@/features/groups/api/use-duplicate-group";

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
  const { mutate: trash } = useTrashGroup();
  const { mutate: duplicate } = useDuplicateGroup();
  
  const handleClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();

    const baseUrl = `${process.env.NEXT_PUBLIC_APP_URL}/groups/${data.id}`;

    navigator.clipboard.writeText(baseUrl)
      .then(() => toast.success("Copied link to clipboard"));
  }

  const handleRename = (e: React.MouseEvent) => {
    e.stopPropagation();

    onRename();
  }

  const handleTrash = (e: React.MouseEvent) => {
    e.stopPropagation();

    trash({ param: { id: data.id } });
  }

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();

    duplicate({ param: { id: data.id } });
  }

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
        <DropdownMenuItem onClick={() => {}}>
          <StarIcon className="size-4" />
          Add to Favorite
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleClipboard}>
          <LinkIcon className="size-4" />
          Copy link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDuplicate}>
          <CopyIcon className="size-4" />
          <span className="flex-auto">Duplicate</span>
          <span className="text-xs text-[#37352f80]">Ctrl+D</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleRename}>
          <SquarePenIcon className="size-4" />
          <span className="flex-auto">Rename</span>
          <span className="text-xs text-[#37352f80]">Ctrl+Shift+R</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleTrash} className="focus:text-[#eb5757]">
          <Trash2Icon className="size-4" />
          Move to trash
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {}}>
          <MoveUpRightIcon className="size-4" />
          Open in new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}