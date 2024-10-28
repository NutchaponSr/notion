
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface EmojiPickerProps {
  children: React.ReactNode;
  isBottom: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelectEmoji: (emoji: any) => void;
}

export const EmojiPicker = ({ 
  children, 
  isBottom,
  onSelectEmoji
}: EmojiPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className={cn(
          "p-0 w-full border-none shadow-none bg-transparent fixed right-2",
          isBottom ? "top-2" : "-top-[480px]"
      )}>
        <Picker 
          data={data}
          onEmojiSelect={onSelectEmoji}
          theme="light"
          previewPosition="none"
          searchPosition="none"
        />
      </PopoverContent>
    </Popover>
  );
}