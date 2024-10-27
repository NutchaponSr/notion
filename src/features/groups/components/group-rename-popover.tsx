import { useCallback, useState } from "react";

import {
  Popover,
  PopoverContent,
} from "@/components/ui/popover";

import { EmojiPicker } from "@/components/emoji-picker";

import { GroupSidebarType } from "@/features/groups/types";
import { useEmoji } from "../stores/use-emoji";

interface GroupRenamePopoverProps {
  data: GroupSidebarType[0];
  isOpen: boolean;
  onClose: () => void;
  height: number;
}

export const GroupRenamePopover = ({ 
  data: group,
  isOpen,
  onClose,
  height
}: GroupRenamePopoverProps) => {
  const { onOpen } = useEmoji();

  const [emoji, setEmoji] = useState(group.icon);
  const [isBottom, setIsBottom] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEmoji = (emoji: any) => {
    setEmoji(emoji.native);
  }

  const setRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      const rect = node.getBoundingClientRect();
      const heightBottom = window.innerHeight - rect.top;

      if (heightBottom > 425) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    }
  }, []);


  return (
    <Popover open={isOpen} onOpenChange={onClose}>
      <PopoverContent 
        ref={setRef}
        className="fixed left-5 p-1.5 w-[380px]"
        style={{ top: `${height + 35}px` }}
      >
        <EmojiPicker isBottom={isBottom} onSelectEmoji={handleEmoji}>
          <button
            type="button"
            onClick={onOpen}
            className="notion-record-icon notranslate flex items-center justify-center h-7 w-7 rounded-[0.25em] cursor-pointer flex-shrink-0 flex-grow-0 transition-colors ease-in outline-none duration-75 hover:bg-[#F7F7F5] shadow-[inset_0_0_0_1px_rgba(55,53,47,0.16)]"
          >
            <div className="flex items-center justify-center h-4.5 w-4.5">
              {emoji}
            </div>
          </button>
        </EmojiPicker>
      </PopoverContent>
    </Popover>
  );
}