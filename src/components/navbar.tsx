import { MenuIcon, MoreHorizontalIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Breadcrumb } from "./breadcrumb";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

export const Navbar = ({
  isCollapsed,
  onResetWidth
}: NavbarProps) => {
  return (
    <header className="bg-transparent max-w-[100vw] z-[70]">
      <div className="w-full max-w-[100vw] h-11 relative left-0">
        <div className="flex justify-between items-center overflow-hidden h-11 px-3">
          <div className="grow shrink flex items-center space-x-2.5">
            {isCollapsed && (
              <Button variant="ghost" size="icon" onClick={onResetWidth}>
                <MenuIcon className="size-[18px]" />
              </Button>
            )}
            <Breadcrumb />
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontalIcon className="size-[18px]" />
          </Button>
        </div>
      </div>
    </header>
  );
}