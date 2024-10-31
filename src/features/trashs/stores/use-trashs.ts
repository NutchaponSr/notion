import { create } from "zustand";

type TrashsStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useTrashs = create<TrashsStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));