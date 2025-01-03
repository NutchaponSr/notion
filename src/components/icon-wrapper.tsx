import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "@/components/icons";

interface IconWrapperProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isOpen?: boolean;
  indent: string;
  notChild?: boolean;
}

export const IconWrapper = ({ 
  children, 
  className,
  onClick,
  isOpen,
  indent,
  notChild = false
}: IconWrapperProps) => {
  const handleOnClick = (e: React.MouseEvent) => {
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
                "transition relative flex items-center justify-center size-6 rounded-sm visible",
                !notChild && "group-hover/workspace:hidden",
                className,
              )}
            >
              {children}
            </div>
            {!notChild && (
              <div 
                role="button"
                onClick={handleOnClick}
                className="transition relative hidden items-center justify-center size-6 rounded-sm group-hover/workspace:flex bg-[#37352f0f] dark:bg-[#ffffff0e]"
              >
                <ChevronRightIcon className={cn(
                  "size-[18px] transition text-[#91918e]",
                  isOpen ? "rotate-90" : "rotate-0",
                )} />
              </div>
            )} 
          </div>
        </div>
      </div>
    </div>
  );
}