import { useTheme } from "next-themes";
import { GiCheckMark } from "react-icons/gi";

import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { ChevronDownIcon } from "@/components/icons";

export const ModeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="px-2 gap-1 text-sm font-normal text-[#37352f] dark:text-[#ffffffcf]">
          {theme}
          <ChevronDownIcon className="size-4 text-[#b9b9b7] dark:text-[#ffffff48]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuItem onClick={() => setTheme("system")}>
          Use system setting
          {theme === "system" && <GiCheckMark className="ml-auto size-3" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
          {theme === "light" && <GiCheckMark className="ml-auto size-3" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
          {theme === "dark" && <GiCheckMark className="ml-auto size-3" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}