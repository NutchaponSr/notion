import { LucideIcon } from "lucide-react";

interface NavigationItemProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export const NavigationItem = ({
  icon: Icon,
  label,
  onClick
}: NavigationItemProps) => {
  return (
    <button onClick={onClick} className="flex items-center h-[30px] w-full hover:bg-[#00000008] focus-visible:ring-0 focus-visible:outline-none p-1">
      <div className="shrink-0 grow-0 rounded-sm size-[22px] flex justify-center items-center ml-1 mr-2">
        <Icon className="size-[18px] text-[#91918e]" />
      </div>
      <div className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">
        {label}
      </div>
    </button>
  );
}