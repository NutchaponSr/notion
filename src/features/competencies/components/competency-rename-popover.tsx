import { useCallback, useState } from "react";

import {
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { EmojiPicker } from "@/components/emoji-picker";

import { CompetencyInstant } from "@/features/competencies/types";
import { useRenameCompetency } from "@/features/competencies/api/use-rename-competency";

interface CompetencyRenamePopoverProps {
  data: CompetencyInstant;
  isOpen: boolean;
  onClose: () => void;
  height: number;
}

export const CompetencyRenamePopover = ({ 
  data,
  isOpen,
  onClose,
  height
}: CompetencyRenamePopoverProps) => {
  const { mutate: rename } = useRenameCompetency();

  const [name, setName] = useState(data.name);
  const [emoji, setEmoji] = useState(data.icon);
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    rename({
      param: {
        id: data.id,
      },
      json: {
        icon: emoji,
        name: name,
      }
    }, {
      onSuccess: () => {
        onClose();
      }
    });
  }
  
  const handleClose = () => {
    setEmoji(data.icon);
    setName(data.name);

    onClose()
  }

  return (
    <Popover open={isOpen} onOpenChange={handleClose}>
      <PopoverContent 
        ref={setRef}
        className="fixed left-5 p-1.5 w-[380px]"
        style={{ top: `${height + 35}px` }}
      >
        <form onSubmit={onSubmit} className="flex items-center space-x-1.5">
          <EmojiPicker isBottom={isBottom} onSelectEmoji={handleEmoji}>
            <button
              type="button"
              className="notion-record-icon notranslate flex items-center justify-center h-7 w-7 rounded-[0.25em] cursor-pointer flex-shrink-0 flex-grow-0 transition-colors ease-in outline-none duration-75 hover:bg-[#F7F7F5] shadow-[inset_0_0_0_1px_rgba(55,53,47,0.16)]"
            >
              <div className="flex items-center justify-center h-4.5 w-4.5">
                {emoji}
              </div>
            </button>
          </EmojiPicker>
          <input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="max-w-full w-full whitespace-pre-wrap break-words grow text-sm py-1 px-2.5 rounded-sm shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] bg-[#f2f1ee99] focus-visible:outline-none text-[#37352f]"
          />
          <Button variant="primary" size="sm">
            Save
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}