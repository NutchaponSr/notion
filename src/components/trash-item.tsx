import { 
  CornerUpLeftIcon, 
  HashIcon, 
  Trash2Icon 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useConfirm } from "@/hooks/use-confirm";
import { comfirmDeleteTrash } from "@/contants";
import { Hint } from "./hint";

interface TrashItemProps {
  name: string;
  icon: string | null;
  description: string;
  onRestore: () => void;
  onDelete: () => void;
}

export const TrashItem = ({
  name,
  icon,
  description,
  onRestore,
  onDelete
}: TrashItemProps) => {
  const [ConfirmDialog, confirm] = useConfirm(comfirmDeleteTrash);

  const handleDelete = async () => {
    const ok = await confirm();

    if (!ok) return;

    onDelete();
  }

  return (
    <div className="mx-2 rounded-md hover:bg-[#37352f0f] dark:hover:bg-[#ffffff0e] transition">
      <ConfirmDialog />
      <div className="flex items-center w-full min-h-7 h-7 text-sm py-1">
        <div className="flex items-center justify-center ml-2.5 mr-1">
          <div className="flex items-center justify-center size-5 shrink-0 text-base">
          {icon ? (
            icon
          ) : (
            <HashIcon className="size-[18px] text-[#91918e]" />
          )}
          </div>
        </div>
        <div className="flex-auto mx-1.5">
          <div className="flex flex-row space-x-1 items-center">
            <h2 className="whitespace-nowrap overflow-hidden text-ellipsis text-[#37352f] dark:text-[#ffffffcf] text-sm">
              {name}
            </h2>
            <Separator className="w-3 h-[1px] bg-[#37352f80] dark:bg-[#ffffff71]" />
            <p className="whitespace-nowrap overflow-hidden text-ellipsis text-[#37352f80] dark:text-[#ffffff71] text-xs">
              {description}
            </p>
          </div>
        </div>
        <div className="ml-auto mr-2.5">
          <div className="flex gap-1">
            <Hint label="Restore" side="bottom" sideOffset={8}>
              <Button onClick={onRestore} variant="ghost" className="size-6 hover:bg-[#37352f0f] text-[#a4a4a2] rounded-sm dark:text-[#8C8C8C]">
                <CornerUpLeftIcon className="size-4" />
              </Button>
            </Hint>
            <Hint label="Delete from Trash" side="bottom" sideOffset={8}>
              <Button onClick={handleDelete} variant="ghost" className="size-6 hover:bg-[#37352f0f] text-[#a4a4a2] rounded-sm dark:text-[#8C8C8C]">
                <Trash2Icon className="size-4" />
              </Button>
            </Hint>
          </div>
        </div>
      </div>
    </div>
  );
}