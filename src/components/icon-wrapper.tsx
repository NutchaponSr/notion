import { ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface IconWrapperProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isOpen?: boolean;
  indent: string;
}

export const IconWrapper = ({ 
  children, 
  className,
  onClick,
  isOpen,
  indent,
}: IconWrapperProps) => {
  const handleOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (onClick) onClick();
  }

  return (
    <div 
      className={cn(
        "shrink-0 grow-0 rounded-sm flex justify-center items-center mr-2", indent
      )}
    >
      <div className="flex items-center justify-center shrink-0 grow-0 size-[22px] relative">
        <div className="grid">
          <div className="row-start-1 col-start-1 row-auto col-auto">
            <div 
              role="button"
              className={cn(
                "transition relative flex items-center justify-center size-6 rounded-sm group-hover/workspace:hidden visible",
                className,
              )}
            >
              {children}
            </div>
            <div 
              role="button"
              onClick={handleOnClick}
              className="transition relative hidden items-center justify-center size-6 rounded-sm group-hover/workspace:flex text-[#91918e] bg-[#37352f0f]"
            >
              <ChevronRightIcon className={cn(
                "size-[18px] transition",
                isOpen ? "rotate-90" : "rotate-0",
              )} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}