import { create } from "zustand";

type GroupChildStore = {
  isOpen: boolean;
  onToggle: () => void;
}

export const useGroupChild = create<GroupChildStore>((set) => ({
  isOpen: false,
  onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));