import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface HintProps {
  children: React.ReactNode;
  label: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export const Hint = ({
  children,
  label,
  side,
  align,
  sideOffset
}: HintProps) => {
  return (
    <TooltipProvider delayDuration={10}>
      <Tooltip>
        <TooltipTrigger asChild>
          { children }
        </TooltipTrigger>
        <TooltipContent
          align={align}
          side={side}
          sideOffset={sideOffset}
          className="py-1 px-2"
        >
          <p className="text-xs font-medium">{ label }</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}