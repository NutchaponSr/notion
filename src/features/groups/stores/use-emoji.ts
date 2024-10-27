import { create } from "zustand";

type EmojiStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useEmoji = create<EmojiStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));