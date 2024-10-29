import toast from "react-hot-toast";

import { 
  CopyIcon, 
  LinkIcon, 
  MoveUpRightIcon, 
  SquarePenIcon, 
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

import { CompetencyInstant } from "@/features/competencies/types";
import { useTrashCompetency } from "@/features/competencies/api/use-trash-competency";
import { useDuplicateCompetency } from "@/features/competencies/api/use-duplicate-competency";

interface CompetencyActionsProps {
  children: React.ReactNode;
  data: CompetencyInstant;
  onRename: () => void;
}

export const CompetencyActions = ({
  children,
  data,
  onRename,
}: CompetencyActionsProps) => {
  const { mutate: trash } = useTrashCompetency();
  const { mutate: duplicate } = useDuplicateCompetency();

  const baseUrl = `${process.env.NEXT_PUBLIC_APP_URL}/competencies/${data.id}`;

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
        align="start"
        side="right"
        sideOffset={8}
        className="w-[265px]"
        onClick={handleContentClick}
      >
        <DropdownMenuItem onClick={handleClipboard}>
          <LinkIcon className="size-4" />
          Copy link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => duplicate({ param: { id: data.id } })}>
          <CopyIcon className="size-4" />
          duplicate
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onRename}>
          <SquarePenIcon className="size-4" />
          Rename
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