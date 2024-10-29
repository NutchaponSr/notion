import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

type LoaderProps = {
  state: boolean;
  className?: string;
  color?: string;
  children?: React.ReactNode
}

export const Loader = ({
  state,
  className,
  color,
  children
}: LoaderProps) => {
  return state ? (
    <div className={cn(className)}>
      <Loader2Icon color={color} className="animate-spin" />
    </div>
  ) : (
    children
  )
}