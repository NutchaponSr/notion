import { IconType } from "react-icons/lib";
import { ChevronDownIcon, LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface FilterButtonProps {
  icon: LucideIcon | IconType;
  label: string;
}

export const FilterButton = ({
  icon: Icon,
  label
}: FilterButtonProps) => {
  return (
    <Button size="filter" variant="outline" className="gap-1">
      <Icon size={12} />
      <span>{label}</span>
      <ChevronDownIcon />
    </Button>
  );
}