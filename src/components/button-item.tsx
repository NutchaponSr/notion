import { cn } from "@/lib/utils";
import { IconType, IconVariant } from "@/types";

interface ButtonItemProps {
  label: string;
  icon: IconType;
  onClick: () => void;
  isActive?: boolean;
  variant: IconVariant;
}

export const ButtonItem = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  variant
}: ButtonItemProps) => {
  return (
    <button 
      onClick={onClick} 
      className={cn(
        "transition flex items-center justify-between px-3 rounded-sm min-h-7 relative hover:bg-[#37352f0f] dark:hover:bg-[#ffffff0e] w-full",
        isActive && "bg-[#37352f0f] dark:bg-[#ffffff0e]",
      )}
    >
      <div className="flex items-center space-x-2">
        <Icon 
          className={cn(
            "size-5 text-[#37352f] dark:text-[#dadada]",
            variant === "SOLID" && "fill-[#37352f] dark:fill-[#dadada]"
          )} 
          variant={variant} 
        />
        <div className={cn("text-sm text-[#37352fd9] dark:text-[#ffffffcf]", isActive && "font-semibold")}>
          {label}
        </div>
      </div>
    </button>
);
}