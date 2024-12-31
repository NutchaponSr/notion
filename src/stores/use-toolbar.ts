import { create } from "zustand";

type ToolbarStore = {
  isToolbar: boolean;
  onOpen: () => void;
  onToggle: () => void;
}

export const useToolbar = create<ToolbarStore>((set) => ({
  isToolbar: false,
  onOpen: () => set({ isToolbar: true }),
  onToggle: () => set((state) => ({ isToolbar: !state.isToolbar })),
}));