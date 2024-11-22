import Link from "next/link";

import { cn } from "@/lib/utils";
import { IconType } from "react-icons/lib";
import { LucideIcon } from "lucide-react";

interface WorkspaceCardProps {
  href: string;
  className: string[];
  icon: IconType | LucideIcon;
  title: string;
  description: string;
}

export const WorkspaceCard = ({
  href,
  className,
  icon: Icon,
  title,
  description
}: WorkspaceCardProps) => {
  return (
    <div className="relative">
      <Link 
        href={href}
        className="flex flex-col transition cursor-pointer overflow-hidden rounded-2xl bg-white dark:bg-[#ffffff0d] relative h-36 justify-stretch shadow-[unset] z-10"
      >
        <div className="relative mb-[14px]">
          <div className={cn("h-11", className[0])} />
          <div className="flex items-center justify-center rounded-e-sm absolute -bottom-[14px] left-4">
            <Icon className={cn("size-7", className[1])} />
          </div>
        </div>
        <div className="w-full min-h-[72px] py-2.5 px-4 relative flex flex-col justify-start gap-2 grow">
          <h1 className="whitespace-pre-wrap overflow-hidden text-ellipsis font-medium text-sm w-auto text-[#37352f]">
            {title}
          </h1>
          <p className="text-xs text-[#37352f80] line-clamp-2">
            {description}
          </p>
        </div>
      </Link>
      <div className="absolute rounded-2xl inset-0 shadow-[0px_12px_32px_rgba(0,0,0,0.02),0_0_0_1px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.03),_0_0_0_1px_rgba(0,0,0,0.086)]" /> 
    </div>
  );
}