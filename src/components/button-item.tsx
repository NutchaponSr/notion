import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

import { cn } from "@/lib/utils";

interface ButtonItemProps {
  label: string;
  icon: LucideIcon | IconType;
  onClick: () => void;
  isActive?: boolean;
}

export const ButtonItem = ({
  label,
  icon: Icon,
  onClick,
  isActive
}: ButtonItemProps) => {
  return (
    <button 
      onClick={onClick} 
      className={cn(
        "transition flex items-center justify-between px-3 rounded-sm min-h-7 relative hover:bg-[#37352f0f] dark:hover:bg-[#ffffff0e] w-full",
        isActive && "bg-[#37352f0f] dark:bg-[#ffffff0e]",
      )}
    >
      <div className="flex items-center text-[#37352fd9] dark:text-[#ffffffcf] space-x-2">
        <Icon className="size-5" />
        <div className={cn("text-sm", isActive && "font-semibold")}>
          {label}
        </div>
      </div>
    </button>
);
}