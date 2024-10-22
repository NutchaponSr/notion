import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import { useState } from "react";

interface IconWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const IconWrapper = ({ children, className }: IconWrapperProps) => {
  const [isChild, setIsChild] = useState(false);

  return (
    <div className="shrink-0 grow-0 rounded-sm flex justify-center items-center ml-1 mr-2">
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
              onClick={() => setIsChild((prev) => !prev)}
              className="transition relative hidden items-center justify-center size-6 rounded-sm group-hover/workspace:flex text-[#91918e] bg-[#37352f0f]"
            >
              <ChevronRightIcon className={cn(
                "size-[18px] stroke-[2.5] transition",
                isChild ? "rotate-90" : "rotate-0",
              )} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}