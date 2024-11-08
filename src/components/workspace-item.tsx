import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

interface WorkspaceItemProps {
  children: React.ReactNode;
  label: string;
  showBadge?: boolean;
  sideButton?: React.ReactNode;
  href: string;
}

interface WorkspaceSubItemProps {
  href?: string;
  children: React.ReactNode;
  indent: string;
}

export const WorkspaceItem = ({
  children,
  label,
  showBadge,
  sideButton,
  href
}: WorkspaceItemProps) => {
  const router = useRouter();

  return (
    <div 
      onClick={() => router.push(href)}
      className="flex items-center h-[30px] w-full hover:bg-[#00000008] dark:hover:bg-[#ffffff0e] p-1 group/workspace cursor-pointer"
    >
      {children}
      <div className="flex-auto whitespace-nowrap overflow-hidden text-clip flex items-center space-x-2">
        <div className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">
          {label}
        </div>
        {showBadge && (
          <Badge className="rounded-sm h-[18px]">
            current
          </Badge>
        )}
      </div>
      <div className="flex items-center justify-center grow-0 shrink-0 h-full">
        <div className="group-hover/workspace:opacity-100 opacity-0 transition-opacity">
          <div className="flex pl-1">
            {sideButton}
          </div>
        </div>
      </div>
    </div>
  );
}

export const WorkspaceSubItem = ({
  href,
  children,
  indent
}: WorkspaceSubItemProps) => {
  const router = useRouter();

  return (
    <div 
      onClick={() => href ? router.push(href) : null} 
      className="flex items-center h-[30px] w-full hover:bg-[#00000008] dark:hover:bg-[#ffffff0e] cursor-pointer space-x-2"
    >
      <div className={cn("text-sm text-[#91918e] dark:text-[#ffffff48] flex items-center", indent)}>
        {children}
      </div>
    </div>
  );
}