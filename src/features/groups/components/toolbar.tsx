import { 
  ArrowDownUpIcon, 
  EyeIcon, 
  ListFilterIcon, 
  SearchIcon, 
  TableIcon 
} from "lucide-react";

import { Button } from "@/components/ui/button";

export const Toolbar = () => {
  return (
    <div className="min-h-10 px-24 sticky left-0 shrink-0 z-[80]">
      <div className="flex items-center h-10 w-full shadow-[inset_0_-1px_0_rgb(233,233,231)]">
        <div className="flex items-center h-full grow space-x-1">
          <Button variant="ghost" size="sm">
            <TableIcon className="size-4" />
            2024
          </Button>
          <Button variant="ghost" size="icon">
            <EyeIcon className="size-4 text-[#A4A4A2]" />
          </Button>
        </div>
        <div className="flex items-center gap-0.5">
          <Button variant="ghost" size="icon">
            <ListFilterIcon className="size-4 text-[#A4A4A2]" />
          </Button>
          <Button variant="ghost" size="icon">
            <ArrowDownUpIcon className="size-4 text-[#A4A4A2]" />
          </Button>
          <Button variant="ghost" size="icon">
            <SearchIcon className="size-4 text-[#A4A4A2]" />
          </Button>
          <Button variant="primary" size="sm" className="shadow-none">
            New
          </Button>
        </div>
      </div>
    </div>
  );
}