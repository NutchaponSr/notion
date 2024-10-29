import toast from "react-hot-toast";

import { 
  CopyIcon, 
  LinkIcon, 
  MoveUpRightIcon, 
  SquarePenIcon, 
  StarIcon, 
  StarOffIcon, 
  Trash2Icon 
} from "lucide-react";
import { format } from "date-fns";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { GroupSidebarType } from "@/features/groups/types";

import { useFavorite } from "@/features/groups/api/use-favorite";
import { useUnfavorite } from "@/features/groups/api/use-unfavorite";
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
  const { mutate: favorite } = useFavorite();
  const { mutate: unfavorite } = useUnfavorite();
  const { mutate: duplicate } = useDuplicateGroup();
  
  const baseUrl = `${process.env.NEXT_PUBLIC_APP_URL}/groups/${data.id}`;

  const handleClipboard = () => {
    navigator.clipboard.writeText(baseUrl)
      .then(() => toast.success("Copied link to clipboard"));
  }

  const handleNewTab = () => {
    if (typeof window !== "undefined") {
      window.open(baseUrl, "_blank");
    }
  }

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

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
        onClick={handleContentClick}
      >
        {data.isFavorite ? (
          <DropdownMenuItem onClick={() => unfavorite({ param: { id: data.id } })}>
            <StarOffIcon className="size-4" />
            Remove from Favorite
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => favorite({ param: { id: data.id } })}>
            <StarIcon className="size-4" />
            Add to Favorite
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleClipboard}>
          <LinkIcon className="size-4" />
          Copy link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => duplicate({ param: { id: data.id } })}>
          <CopyIcon className="size-4" />
          <span className="flex-auto">Duplicate</span>
          <span className="text-xs text-[#37352f80]">Ctrl+D</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onRename}>
          <SquarePenIcon className="size-4" />
          <span className="flex-auto">Rename</span>
          <span className="text-xs text-[#37352f80]">Ctrl+Shift+R</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => trash({ param: { id: data.id } })} 
          className="focus:text-[#eb5757]"
        >
          <Trash2Icon className="size-4" />
          Move to trash
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleNewTab}>
          <MoveUpRightIcon className="size-4" />
          Open in new tab
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="py-1 flex items-center w-full">
          <div className="mx-2 flex-auto">
            <div className="text-xs text-[#37352f80]">
              Last edited by {data.updatedBy}
            </div>
            <div className="text-xs text-[#37352f80]">
              {format(data.updatedAt, "MMM dd, yyyy, p")}
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}